<script setup lang="ts">
import { IDataNode, IObjectNode } from '../types'
import { generateRandomColorSpace } from '../utils/colors'
import { useBinaryViewStore } from '../store'
const store = useBinaryViewStore()

const props = defineProps<{
  data: IDataNode | IObjectNode
}>()

const { nestedLevel, colors, displayValue, range } = store.nextData('HexProp')
</script>

<template>
  <span :class="{ 'binary-view-force-bold': store.shouldHighlight(range.start, range.end) }">
    <span
      :style="colors.css"
      @mouseenter="store.setHighligh(range.start, range.end)"
      @mouseleave="store.leaveHighlight()"
      class="bytes-group binary-view-force-bold-rarget"
      v-if="range.hex !== null"
    >
      <span class="single-byte" v-for="(hexByte, index) in range.hex" :key="index">
        {{ hexByte }}
      </span>
    </span>
    <HexProp
      v-if="props.data.isObject && props.data.value.length > 0"
      v-for="(data, propsIndex) in props.data.value"
      :key="propsIndex"
      :data="data"
    />
  </span>
</template>

<style scoped>
.bytes-group {
  cursor: pointer;
  word-break: break-word;
}
.single-byte {
  padding: 0 3px;
}
</style>
