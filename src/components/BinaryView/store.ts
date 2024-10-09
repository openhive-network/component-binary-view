import { defineStore } from 'pinia'
import { type TGenerateRandomColorSpaceOutput } from './utils/colors'
import type { IBinaryView } from './types';

export const useBinaryViewStore = defineStore('binaryView', {
  state: () => ({
    colors: {} as Record<number, TGenerateRandomColorSpaceOutput>,
    nestedLevels: {} as Record<number, number>,
    currentIndex: 0,
    data: {} as IBinaryView,
    highlightedRange: {
      start: -1,
      end: -1
    }
  }),
  getters: {
    shouldHighlight: (state) => (start: number, end: number) => {
      return start >= state.highlightedRange.start && end <= state.highlightedRange.end;
    }
  },
  actions: {
    nextIndex() {
      ++this.currentIndex;
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
