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
    >
      <span v-if="displayValue === undefined">
        <span :style="{ ...colors.css, color: 'white', 'padding': '0 3px' }"  class="binary-view-force-bold-rarget">{{ key }}</span>:
      </span>
      <span v-else>
        <span :style="{ ...colors.css, 'padding': '0 3px' }" class="binary-view-force-bold-rarget">{{ key }}</span>
        <span v-if="props.data.type === 'pod'">: {{ JSON.stringify(displayValue) }}</span>
        <span v-else>: {{ displayValue }}</span>
      </span>
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
