<script setup lang="ts">
import type { TNode } from '../types'
import { useBinaryViewStore } from '../store'
import { nextTick } from 'vue'
const store = useBinaryViewStore()

const props = defineProps<{
  data: TNode
}>()

const { index, colors, range } = store.nextData('HexProp')

let isFocused = false

const leaveFocusHighlight = () => {
  store.leaveFocusHighlight()
  isFocused = false
}

const setFocusHighligh = () => {
  setTimeout(() => {
    if (isFocused) store.leaveFocusHighlight()
    else store.setFocusHighlight(range.start, range.end)

    isFocused = !isFocused
  }, 0)
}
</script>

<template>
  <span :class="{ 'binary-view-force-bold': store.shouldHighlight(range.start, range.end) }">
    <span
      @click="store.copyBinary(index), setFocusHighligh()"
      v-on:click.alt="store.copyHex(index), setFocusHighligh()"
      v-click-outside="leaveFocusHighlight"
      :style="{
        color: colors.css.color,
        'background-color': store.shouldHighlight(range.start, range.end)
          ? colors.css['background-color']
          : 'transparent'
      }"
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
      v-if="props.data.type !== 'scalar' && props.data.children.length > 0"
      v-for="(data, propsIndex) in props.data.children"
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
