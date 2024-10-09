import { defineStore } from 'pinia'
import { generateRandomColorSpace, type TGenerateRandomColorSpaceOutput } from './utils/colors'
import type { IBinaryView, IDataNode, IObjectNode } from './types';

export interface IBufferRangeData {
  start: number;
  end: number;
  /**
   * Display end may vary from the actual end of the buffer if the buffer is an object (arrays contain a one-byte prefix that should be displayed as part of the array - length)
   */
  displayEnd: number;
  hex: string[] | null; // null if the display range is empty (start === displayEnd)
}

export interface IIndexData {
  key: string;
  displayValue: string | undefined; // undefined if the node is an object
  index: number;
  nestedLevel: number;
  colors: TGenerateRandomColorSpaceOutput;
  range: IBufferRangeData;
}

export const useBinaryViewStore = defineStore('binaryView', {
  state: () => ({
    /* Private props: */
    colors: {} as Record<number, TGenerateRandomColorSpaceOutput>,
    nestedLevels: {} as Record<number, number>,
    nodeKeys: {} as Record<number, string>,
    nodeValues: {} as Record<number, string>,
    currentIndex: {} as Record<string, number>,
    rangeData: {} as Record<number, IBufferRangeData>,
    data: {} as IBinaryView,
    highlightedRange: {
      start: -1,
      end: -1
    }
    /* Public props: */
  }),
  getters: {
    /* Public getters: */
    shouldHighlight: (state) => (start: number, end: number) => {
      return start >= state.highlightedRange.start && end <= state.highlightedRange.end;
    }
  },
  actions: {
    /* Private actions: */
    indexNode(node: IDataNode | IObjectNode) {
      const index = this.nextIndex('internal_store');

      const nestedLevel = this.nestedLevels[index] = (this.nestedLevels[index - 1] ?? 0) + (node.isObject ? 1 : 0);
      const previousBackgroundColor = nestedLevel === 0 ? { r: 0, g: 0, b: 0, a: 0 } : this.colors[index - 1]?.backgroundColor
      this.colors[index] = generateRandomColorSpace(node.key, node.isObject ? undefined : previousBackgroundColor);

      const start = node.offset;
      const end = start + (node.isObject ? node.objectSize : node.length);
      const displayEnd: number | undefined = node.isObject ? (node.value[0]?.offset ?? this.data.binary.length) : end;
      const hex = start === displayEnd ? null : this.data.binary.slice(start, displayEnd).match(/.{1,2}/g);

      this.rangeData[index] = { start, end, displayEnd, hex };

      this.nodeKeys[index] = node.key;
      if (!node.isObject)
        this.nodeValues[index] = node.value;
      else if (node.isObject && node.value[0].key === '0') // is Array
        this.nodeValues[index] = `Length: ${node.value.length}`;

      if (node.isObject)
        for (const child of node.value)
          this.indexNode(child);
    },
    nextIndex(indexingKey: string): number {
      if (this.currentIndex[indexingKey] === undefined)
        this.currentIndex[indexingKey] = 0;

      return this.currentIndex[indexingKey]++;
    },
    /* Public actions: */
    indexBinaryData(data: IBinaryView) {
      this.data = data;

      for (const index of data.offsets)
        this.indexNode(index);
    },
    nextData(indexingKey: string): IIndexData {
      const index = this.nextIndex(indexingKey);

      return {
        index: this.currentIndex[index],
        nestedLevel: this.nestedLevels[index],
        colors: this.colors[index],
        range: this.rangeData[index],
        key: this.nodeKeys[index],
        displayValue: this.nodeValues[index]
      };
    },
    setHighligh(start: number, end: number) {
      this.highlightedRange.start = start;
      this.highlightedRange.end = end;
    },
    leaveHighlight() {
      this.highlightedRange.start = -1;
      this.highlightedRange.end = -1;
    }
  }
});
