import { defineStore } from 'pinia'
import { generateRandomColorSpace, type TGenerateRandomColorSpaceOutput } from './utils/colors'
import type { IBinaryView, TNode } from './types';

export interface IBufferRangeData {
  start: number;
  end: number;
  /**
   * Display end may vary from the actual end of the buffer if the buffer is an object (arrays contain a one-byte prefix that should be displayed as part of the array - length)
   */
  displayEnd: number;
  hex: string[] | null; // null if the display range is empty (start === displayEnd)
  fullHexString: string;
}

export interface IIndexData {
  key: string;
  displayValue: string | undefined; // undefined if the node is an object
  index: number;
  nestedLevel: number;
  colors: TGenerateRandomColorSpaceOutput;
  range: IBufferRangeData;
}

const hex2bin = (hex: string) => (parseInt(hex, 16).toString(2)).padStart(8, '0');

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
    },
    /* Public props: */
    bytesInRow: -1
  }),
  getters: {
    /* Public getters: */
    shouldHighlight: (state) => (start: number, end: number) => {
      return start >= state.highlightedRange.start && end <= state.highlightedRange.end;
    }
  },
  actions: {
    /* Private actions: */
    indexNode(node: TNode, prev?: TNode) {
      const index = this.nextIndex('internal_store');

      const nestedLevel = this.nestedLevels[index] = (this.nestedLevels[index - 1] ?? 0) + (prev ? (prev?.type === 'pod' ? 0 : 1) : 0);
      const previousBackgroundColor = nestedLevel === 0 ? { r: 0, g: 0, b: 0, a: 0 } : this.colors[index - 1]?.backgroundColor
      this.colors[index] = generateRandomColorSpace(node.key, node.type === 'pod' ? previousBackgroundColor : undefined);

      const start = node.offset;
      const end = start + node.size;
      const displayEnd: number | undefined = node.type === 'pod' ? end : (node.value[0]?.offset ?? this.data.binary.length);
      const fullHexString = this.data.binary.slice(start, end);
      const hex = start === displayEnd ? null : this.data.binary.slice(start, displayEnd).match(/.{1,2}/g);

      this.rangeData[index] = { start, end, displayEnd, hex, fullHexString };

      this.nodeKeys[index] = node.key;
      if (node.type === 'pod')
        this.nodeValues[index] = node.value;
      else if (node.type === 'array')
        this.nodeValues[index] = `Length: ${node.length}`;

      prev = node;
      if (node.type !== 'pod')
        for (const child of node.value) {
          this.indexNode(child, prev);
          prev = child;
        }
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
        index: index,
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
    },
    copyHex(index?: number) { // When no index provided - copy entire buffer
      const hex = index === undefined ? this.data.binary : this.rangeData[index].fullHexString;

      navigator.clipboard.writeText(hex);
    },
    copyBinary(index?: number) { // When no index provided - copy entire buffer
      const hex = (index === undefined ? this.data.binary : this.rangeData[index].fullHexString).match(/.{1,2}/g) as RegExpMatchArray;

      const bytes = new Uint8Array(hex as any).map(byte => parseInt(String(byte), 16));

      const binaryString = String.fromCharCode.apply(null, bytes as any);

      navigator.clipboard.writeText(binaryString);
    }
  }
});
