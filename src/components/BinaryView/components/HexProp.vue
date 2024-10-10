<script setup lang="ts">
import type { TNode } from '../types'
import { useBinaryViewStore } from '../store'
const store = useBinaryViewStore()

const props = defineProps<{
  data: TNode
}>()

const { index, colors, range } = store.nextData('HexProp')

console.log(props.data.key, range.displayEnd, JSON.stringify(range.hex))
</script>

<template>
  <span :class="{ 'binary-view-force-bold': store.shouldHighlight(range.start, range.end) }">
    <span
      @click="store.copyBinary(index)"
      v-on:click.ctrl="store.copyHex(index)"
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
      v-if="props.data.type !== 'pod' && props.data.value.length > 0"
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
