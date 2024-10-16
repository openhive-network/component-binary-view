import { defineStore } from 'pinia'
import { generateRandomColorSpace, type TGenerateRandomColorSpaceOutput } from './utils/colors'
import type { IBinaryView, TNode } from './types';

export interface IBufferRangeData {
  /** `start`, `end` and `displayEnd` values are not offsets in bytes, but in characters written in hexadecimal format representing binary view */
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
    focusHighlightRange: {
      start: -1,
      end: -1
    },
    /* Public props: */
    bytesInRow: -1,
    uppercase: false,
    unfolded: {} as Record<number, boolean>
  }),
  getters: {
    /* Public getters: */
    shouldHighlight: (state) => (start: number, end: number) => {
      return start >= state.highlightedRange.start && end <= state.highlightedRange.end
        || start >= state.focusHighlightRange.start && end <= state.focusHighlightRange.end;
    }
  },
  actions: {
    /* Private actions: */
    indexNode(node: TNode, nestedLevel: number, prev?: TNode) {
      const index = this.nextIndex('internal_store');

      this.nestedLevels[index] = nestedLevel;
      const previousBackgroundColor = this.colors[index - 1]?.backgroundColor
      this.colors[index] = generateRandomColorSpace(node.key, node.type === 'scalar' ? previousBackgroundColor : undefined);

      const start = node.offset * 2;
      const end = start + (node.size * 2);
      const displayEnd = (node.type !== 'scalar' && node.children.length > 0) ? node.children[0].offset * 2 : end;
      const fullHexString = this.data.binary.slice(start, end);
      const hex = start === displayEnd ? null : this.data.binary.slice(start, displayEnd).match(/.{1,2}/g);

      this.rangeData[index] = { start, end, displayEnd, hex, fullHexString };

      this.nodeKeys[index] = node.key;
      if (node.value !== undefined)
        this.nodeValues[index] = node.value;

      prev = node;
      if (node.type !== 'scalar')
        for (const child of node.children) {
          this.indexNode(child, nestedLevel + 1, prev);
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

      this.data.binary = this.setCase(this.data.binary);

      for (const index of data.offsets)
        this.indexNode(index, 0);
    },
    resetStore() {
      this.colors = {};
      this.nestedLevels = {};
      this.nodeKeys = {};
      this.nodeValues = {};
      this.currentIndex = {};
      this.rangeData = {};
      this.unfolded = {};
      this.data = {} as IBinaryView;
      this.highlightedRange = {
        start: -1,
        end: -1
      };
      this.focusHighlightRange = {
        start: -1,
        end: -1
      };
    },
    setCase(value: string) {
      if (this.uppercase)
        return value.toUpperCase();

      return value.toLowerCase();
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
    setBytesInRow(bytesInRow = 16) {
      this.bytesInRow = bytesInRow;

      if (this.bytesInRow < 1 || this.bytesInRow > 255)
        throw new Error('Bytes in row must be between 1 and 255');
    },
    setUppercase(value = false) {
      this.uppercase = value;
    },
    setHighligh(start: number, end: number) {
      this.highlightedRange.start = start;
      this.highlightedRange.end = end;
    },
    leaveHighlight() {
      this.highlightedRange.start = -1;
      this.highlightedRange.end = -1;
    },
    setFocusHighlight(start: number, end: number) {
      this.focusHighlightRange.start = start;
      this.focusHighlightRange.end = end;
    },
    leaveFocusHighlight() {
      this.focusHighlightRange.start = -1;
      this.focusHighlightRange.end = -1;
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
