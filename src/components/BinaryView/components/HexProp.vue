<script setup lang="ts">
import type { TNode } from '../types'
import { useBinaryViewStore } from '../store'
const store = useBinaryViewStore()

const props = defineProps<{
  data: TNode
}>()

const { colors, range } = store.nextData('HexProp')

let isFocused = false

const leaveFocusHighlight = () => {
  isFocused = false
  store.leaveFocusHighlight()
}

const setFocusHighligh = () => {
  setTimeout(() => {
    if (isFocused) return leaveFocusHighlight()

    store.setFocusHighlight(range.start, range.end)
    isFocused = true
  }, 0)
}
</script>

<template>
  <span :class="{ 'binary-view-force-bold': store.shouldHighlight(range.start, range.end) }">
    <span
      v-if="range.hex !== null"
      @click="setFocusHighligh()"
      v-click-outside="leaveFocusHighlight"
      :style="{
        color: colors.css.color,
        'background-color': store.shouldHighlight(range.start, range.end)
          ? colors.css['background-color']
          : 'transparent'
      }"
      @mouseenter="store.setHighligh(range.start, range.end)"
      @mouseleave="store.leaveHighlight()"
      class="binary-view-hexprop-bytes-group binary-view-force-bold-rarget"
    >
      <span
        class="binary-view-hexprop-single-byte"
        v-for="(hexByte, index) in range.hex"
        :key="index"
      >
        {{ hexByte }}
      </span>
    </span>
    <span v-if="props.data.type !== 'scalar' && props.data.children.length > 0">
      <HexProp v-for="(data, propsIndex) in props.data.children" :key="propsIndex" :data="data" />
    </span>
  </span>
</template>
