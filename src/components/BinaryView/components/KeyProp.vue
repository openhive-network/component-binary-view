<script setup lang="ts">
import type { TNode } from '../types'
import { useBinaryViewStore } from '../store'
const store = useBinaryViewStore()

import { mdiMinus, mdiPlus, mdiInformationSlabCircleOutline } from '@mdi/js'

const props = defineProps<{
  data: TNode
}>()

const { index, nestedLevel, colors, key, displayValue, range } = store.nextData('KeyProp')

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

const canFold =
  (props.data.type === 'object' && props.data.children.length > 0) ||
  (props.data.type === 'array' && props.data.length > 0)

if (canFold) store.unfolded[index] = true
</script>

<template>
  <div :class="{ 'binary-view-force-bold': store.shouldHighlight(range.start, range.end) }">
    <div
      :style="{ 'margin-left': `${nestedLevel * 16}px` }"
      @mouseenter="store.setHighligh(range.start, range.end)"
      @mouseleave="store.leaveHighlight()"
    >
      <span class="unfold-icon-container">
        <v-icon v-if="canFold" size="16" @click="store.unfolded[index] = !store.unfolded[index]" :icon="!!store.unfolded[index] ? mdiMinus : mdiPlus" />
      </span>
      <v-tooltip open-on-click open-on-hover location="top">
        <template v-slot:activator="{ props }">
          <v-icon class="mr-1" size="xs" v-bind="props" :icon="mdiInformationSlabCircleOutline" />
        </template>
        <div class="keyprop-details">
          <div>
            <span class="mr-2">Size: </span><b>{{ (range.end - range.start) / 2 }}B</b>
          </div>
          <div>
            <span class="mr-2">Start: </span><b>{{ store.normalizeHexValue(range.start / 2, range.end / 2) }}</b>
          </div>
          <div>
            <span class="mr-2">End: </span><b>{{ store.normalizeHexValue(range.end / 2) }}</b>
          </div>
        </div>
      </v-tooltip>
      <span
        class="props-key-data"
        @click="setFocusHighligh()"
        v-click-outside="leaveFocusHighlight"
      >
        <span v-if="displayValue === undefined">
          <span
            :style="{
              ...colors.css,
              'background-color': store.shouldHighlight(range.start, range.end)
                ? colors.css['background-color']
                : 'transparent'
            }"
            class="px-1 binary-view-force-bold-rarget"
            >{{ key }}</span
          >:
        </span>
        <span v-else class="pr-1">
          <span
            :style="{
              ...colors.css,
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
    <div v-if="props.data.type !== 'scalar' && props.data.children.length > 0">
      <KeyProp
        :style="{ display: !!store.unfolded[index] ? 'block' : 'none' }"
        v-for="(data, propsIndex) in props.data.children"
        :key="propsIndex"
        :data="data"
      />
    </div>
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
