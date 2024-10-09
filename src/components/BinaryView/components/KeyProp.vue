<script setup lang="ts">
import { IDataNode, IObjectNode } from '../types'
import { useBinaryViewStore } from '../store'
// Random colors are already generated in HexProp.vue
const store = useBinaryViewStore()

const props = defineProps<{
  data: IDataNode | IObjectNode
}>()

const index = store.nextIndex('KeyProp')

const nestedLevel = store.nestedLevels[index]
const colors = store.colors[index]

const start = props.data.offset
const end: number | undefined = start + (props.data.objectSize ?? props.data.length)
let displayEnd: number | undefined = start + (props.data.objectSize ?? props.data.length)
if (props.data.isObject) {
  displayEnd = props.data.value[0]?.offset ?? store.data.binary.length
}
</script>

<template>
  <div :class="{ 'binary-view-force-bold': store.shouldHighlight(start, end) }">
    <span
      :style="colors.css"
      class="props-key-data"
      @mouseenter="store.setHighligh(start, end)"
      @mouseleave="store.leaveHighlight()"
      v-if="start !== displayEnd"
    >
      {{ props.data.key }}
    </span>
    <KeyProp
      v-if="props.data.isObject && props.data.value.length > 0"
      v-for="(data, propsIndex) in props.data.value"
      :key="propsIndex"
      :data="data"
    />
  </div>
</template>

<style scoped>
.props-key-data {
  cursor: pointer;
}
</style>
