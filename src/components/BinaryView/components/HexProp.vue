<script setup lang="ts">
import type { TNode } from '../types'
import { useBinaryViewStore } from '../store'

const props = defineProps<{
  index: number;
  data: TNode;
}>()

const store = useBinaryViewStore(props.index)

const { colors, range } = store.nextData('HexProp')

const leaveFocusHighlight = () => {
  store.leaveFocusHighlight()
}

const setFocusHighligh = () => {
  setTimeout(() => {
    store.setFocusHighlight(range.start, range.end)
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
      <HexProp :index="props.index" v-for="(data, propsIndex) in props.data.children" :key="propsIndex" :data="data" />
    </span>
  </span>
</template>
