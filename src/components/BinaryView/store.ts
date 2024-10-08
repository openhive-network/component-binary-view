import { defineStore } from 'pinia'
import { type TGenerateRandomColorSpaceOutput } from './utils/colors'

export const useBinaryViewStore = defineStore('binaryView', {
  state: () => ({
    colors: {} as Record<number, TGenerateRandomColorSpaceOutput>,
    nestedLevels: {} as Record<number, number> // Starts with 0
  }),
  getters: {},
  actions: {}
});
