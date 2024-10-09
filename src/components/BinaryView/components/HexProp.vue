<script setup lang="ts">
import { IDataNode, IObjectNode } from '../types'
import { generateRandomColorSpace } from '../utils/colors'
import { useBinaryViewStore } from '../store'
const store = useBinaryViewStore()

const props = defineProps<{
  data: IDataNode | IObjectNode
}>()

const index = store.nextIndex('HexProp')

const nestedLevel = (store.nestedLevels[index] =
  (store.nestedLevels[index - 1] ?? 0) + (props.data.isObject ? 1 : 0))

const previousBackgroundColor =
  nestedLevel === 0 ? { r: 0, g: 0, b: 0, a: 0 } : store.colors[index - 1]?.backgroundColor

const colors = (store.colors[index] = generateRandomColorSpace(
  props.data.key,
  props.data.isObject ? undefined : previousBackgroundColor // Change background color if new object is created
))

const start = props.data.offset
const end: number | undefined = start + (props.data.objectSize ?? props.data.length)
let displayEnd: number | undefined = start + (props.data.objectSize ?? props.data.length)
if (props.data.isObject) {
  displayEnd = props.data.value[0]?.offset ?? store.data.binary.length
}

const hex = start === displayEnd ? '' : store.data.binary.slice(start, displayEnd).match(/.{1,2}/g)
</script>

<template>
  <span :class="{ 'binary-view-force-bold': store.shouldHighlight(start, end) }">
    <span
      :style="colors.css"
      @mouseenter="store.setHighligh(start, end)"
      @mouseleave="store.leaveHighlight()"
      class="bytes-group"
      v-if="hex !== null"
      :data-debug-key-name="props.data.key"
    >
      <span class="single-byte" v-for="(hexByte, index) in hex" :key="index">
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
