<script setup lang="ts">
import { IDataNode, IObjectNode } from '../types'
import { generateRandomColorSpace } from '../utils/colors'
import { useBinaryViewStore } from '../store'
const store = useBinaryViewStore()

const props = defineProps<{
  data: IDataNode | IObjectNode
  index: number
}>()

const nestedLevel = (store.nestedLevels[props.index] =
  (store.nestedLevels[props.index - 1] ?? 0) + (props.data.isObject ? 1 : 0))
const previousBackgroundColor =
  nestedLevel === 0 ? { r: 0, g: 0, b: 0, a: 0 } : store.colors[props.index - 1]?.backgroundColor

const colors = (store.colors[props.index] = generateRandomColorSpace(
  props.data.key,
  props.data.isObject ? undefined : previousBackgroundColor // Change background color if new object is created
))
</script>

<template>
  <span class="single-byte" :style="colors.css" v-if="!props.data.isObject">
    {{ props.data.key }}
  </span>
</template>

<style scoped>
.single-byte {
  padding: 0 0.2rem;
}
</style>
