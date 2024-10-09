<script setup lang="ts">
import { IDataNode, IObjectNode } from '../types'
import { useBinaryViewStore } from '../store'
// Random colors are already generated in HexProp.vue
const store = useBinaryViewStore()

const props = defineProps<{
  data: IDataNode | IObjectNode
}>()

const { nestedLevel, colors, key, displayValue, range } = store.nextData('KeyProp')
</script>

<template>
  <div :class="{ 'binary-view-force-bold': store.shouldHighlight(range.start, range.end) }">
    <div
      :style="{ 'margin-left': `${nestedLevel * 16}px` }"
      class="props-key-data"
      @mouseenter="store.setHighligh(range.start, range.end)"
      @mouseleave="store.leaveHighlight()"
      v-if="range.start !== range.displayEnd"
    >
      <span :style="colors.css" class="binary-view-force-bold-rarget">{{ key }}</span>
      <span v-if="!props.data.isObject || (props.data.isObject && displayValue !== undefined)"
        >:
        {{
          props.data.isObject && displayValue !== undefined
            ? displayValue
            : JSON.stringify(displayValue)
        }}</span
      >
    </div>
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
