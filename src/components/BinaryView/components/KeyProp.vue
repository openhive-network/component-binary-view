<script setup lang="ts">
import type { TNode } from '../types'
import { useBinaryViewStore } from '../store'
import { ref } from 'vue'
const store = useBinaryViewStore()

const props = defineProps<{
  data: TNode
}>()

const { index, nestedLevel, colors, key, displayValue, range } = store.nextData('KeyProp')

const normalizeHexValue = (data: number) => {
  return (
    '0x' +
    data
      .toString(16)
      .match(/.{1,2}/g)!
      .map((node) => node.padStart(2, '0'))
      .join('')
  )
}

const isUnfolded = ref(true)
</script>

<template>
  <div :class="{ 'binary-view-force-bold': store.shouldHighlight(range.start, range.end) }">
    <div
      :style="{ 'margin-left': `${nestedLevel * 16}px` }"
      class="props-key-data"
      @mouseenter="store.setHighligh(range.start, range.end)"
      @mouseleave="store.leaveHighlight()"
    >
      <span class="unfold-icon-container">
        <v-icon
          v-if="
            (props.data.type === 'object' && props.data.children.length > 0) ||
            (props.data.type === 'array' && props.data.length > 0)
          "
          size="16"
          @click="isUnfolded = !isUnfolded"
          >{{ isUnfolded ? 'mdi-minus' : 'mdi-plus' }}</v-icon
        >
      </span>
      <v-tooltip open-on-click open-on-hover location="top">
        <template v-slot:activator="{ props }">
          <v-icon class="mr-1" size="xs" v-bind="props">mdi-information-slab-circle-outline</v-icon>
        </template>
        <div class="keyprop-details">
          <div>
            <span class="mr-2">Size: </span><b>{{ (range.end - range.start) / 2 }}B</b>
          </div>
          <div>
            <span class="mr-2">Start: </span><b>{{ normalizeHexValue(range.start / 2) }}</b>
          </div>
          <div>
            <span class="mr-2">End: </span><b>{{ normalizeHexValue(range.end / 2) }}</b>
          </div>
        </div>
      </v-tooltip>
      <span @click="store.copyBinary(index)" v-on:click.alt="store.copyHex(index)">
        <span v-if="displayValue === undefined">
          <span
            :style="{
              'background-color': store.shouldHighlight(range.start, range.end)
                ? colors.css['background-color']
                : 'transparent',
              color: 'white'
            }"
            class="px-1 binary-view-force-bold-rarget"
            >{{ key }}</span
          >:
        </span>
        <span v-else class="pr-1">
          <span
            :style="{
              color: colors.css.color,
              'background-color': store.shouldHighlight(range.start, range.end)
                ? colors.css['background-color']
                : 'transparent'
            }"
            class="px-1 binary-view-force-bold-rarget"
            >{{ key }}</span
          >
          <span v-if="props.data.type === 'scalar'"
            >: <span class="display-value">{{ JSON.stringify(displayValue) }}</span></span
          >
          <span v-else
            >: <span class="display-value">{{ displayValue }}</span></span
          >
        </span>
      </span>
    </div>
    <KeyProp
      v-if="props.data.type !== 'scalar' && props.data.children.length > 0"
      :style="{ display: isUnfolded ? 'block' : 'none' }"
      v-for="(data, propsIndex) in props.data.children"
      :key="propsIndex"
      :data="data"
    />
  </div>
</template>

<style scoped>
.unfold-icon-container {
  width: 16px;
  margin-right: 4px;
  display: inline-block;
}
.props-key-data {
  cursor: pointer;
}
.display-value {
  word-break: break-all;
}
.keyprop-details > div {
  display: flex;
  justify-content: space-between;
}
.keyprop-details > div > b {
  font-family: 'Courier New', Courier, monospace;
}
</style>
