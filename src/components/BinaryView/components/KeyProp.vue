<script setup lang="ts">
import type { TNode } from '../types'
import { useBinaryViewStore } from '../store'
const store = useBinaryViewStore()

const props = defineProps<{
  data: TNode
}>()

const { index, nestedLevel, colors, key, displayValue, range } = store.nextData('KeyProp')
</script>

<template>
  <div :class="{ 'binary-view-force-bold': store.shouldHighlight(range.start, range.end) }">
    <div
      @click="store.copyBinary(index)"
      v-on:click.ctrl="store.copyHex(index)"
      :style="{ 'margin-left': `${nestedLevel * 16}px` }"
      class="props-key-data"
      @mouseenter="store.setHighligh(range.start, range.end)"
      @mouseleave="store.leaveHighlight()"
      v-if="range.start !== range.displayEnd"
    >
      <span :style="colors.css" class="binary-view-force-bold-rarget">{{ key }}</span>
      <span v-if="props.data.type === 'pod'">: {{ JSON.stringify(displayValue) }}</span>
      <span v-else-if="displayValue !== undefined">: {{ displayValue }}</span>
    </div>
    <KeyProp
      v-if="props.data.type !== 'pod' && props.data.value.length > 0"
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
