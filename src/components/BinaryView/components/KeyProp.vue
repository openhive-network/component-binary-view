<script setup lang="ts">
import type { TNode } from '../types'
import { Icon } from './ui/icon'
import { Tooltip } from './ui/tooltip'
import { useBinaryViewStore } from '../store'
import { mdiMinus, mdiPlus, mdiInformationSlabCircleOutline } from '@mdi/js'

const props = defineProps<{
  index: number;
  data: TNode;
}>()

const store = useBinaryViewStore(props.index)

const { index, nestedLevel, colors, key, displayValue, range } = store.nextData('KeyProp')

const leaveFocusHighlight = () => {
  store.leaveFocusHighlight()
}

const setFocusHighligh = () => {
  setTimeout(() => {
    store.setFocusHighlight(range.start, range.end)
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
      :style="{
        'padding-left': `${nestedLevel * 16}px`,
        ...colors.css,
        'background-color': store.shouldHighlight(range.start, range.end)
          ? 'rgba(68,85,90,0.15)'
          : 'transparent'
      }"
      @mouseenter="store.setHighligh(range.start, range.end)"
      @mouseleave="store.leaveHighlight()"
    >
      <span class="binary-view-keyprop-unfold-icon-container bvc-tw-opacity-75">
        <Icon
          v-if="canFold"
          :size="16"
          class="bvc-tw-cursor-pointer"
          @click="store.unfolded[index] = !store.unfolded[index]"
          :icon="!!store.unfolded[index] ? mdiMinus : mdiPlus"
        />
      </span>
      <Tooltip location="top">
        <Icon class="bvc-tw-mr-1 bvc-tw-opacity-75" :size="16" :icon="mdiInformationSlabCircleOutline" />
        <template v-slot:text>
          <div class="binary-view-keyprop-keyprop-details">
            <div>
              <span class="bvc-tw-mr-2">Size: </span><b>{{ (range.end - range.start) / 2 }}B</b>
            </div>
            <div>
              <span class="bvc-tw-mr-2">Start: </span
              ><b>{{ store.normalizeHexValue(range.start / 2, range.end / 2) }}</b>
            </div>
            <div>
              <span class="bvc-tw-mr-2">End: </span><b>{{ store.normalizeHexValue(range.end / 2) }}</b>
            </div>
          </div>
        </template>
      </Tooltip>
      <span
        class="binary-view-keyprop-props-key-data bvc-tw-text-sm"
        v-click-outside="leaveFocusHighlight"
        @click="setFocusHighligh()"
      >
        <span v-if="displayValue === undefined">
          <span class="bvc-tw-px-1 binary-view-force-bold-rarget">{{ key }}</span
          >:
        </span>
        <span v-else class="bvc-tw-pr-1">
          <span class="px-1 binary-view-force-bold-rarget">{{ key }}</span>
          <span v-if="props.data.type === 'scalar'"
            >:
            <span class="binary-view-keyprop-display-value">{{
              JSON.stringify(displayValue)
            }}</span></span
          >
          <span v-else
            >: <span class="binary-view-keyprop-display-value">{{ displayValue }}</span></span
          >
        </span>
      </span>
    </div>
    <div v-if="props.data.type !== 'scalar' && props.data.children.length > 0">
      <KeyProp
        :index="props.index"
        :style="{ display: !!store.unfolded[index] ? 'block' : 'none' }"
        v-for="(data, propsIndex) in props.data.children"
        :key="propsIndex"
        :data="data"
      />
    </div>
  </div>
</template>
