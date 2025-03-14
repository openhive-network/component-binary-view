<script setup lang="ts">
import { useBinaryViewStore } from '../store'

import { Separator } from './ui/separator'
import { Icon } from './ui/icon'

import { mdiMinus } from '@mdi/js'

const props = defineProps<{ index: number }>()

const store = useBinaryViewStore(props.index)
</script>

<template>
  <div class="bvc-tw-max-w-[100%] bvc-tw-opacity-75 bvc-tw-inline-flex bvc-tw-flex-row bvc-tw-text-[18px]/[18px] bvc-tw-justify-between ">
    <div class="bvc-tw-inline-flex bvc-tw-flex-col md:bvc-tw-space-y-0 bvc-tw-space-y-2 md:bvc-tw-space-x-2 md:bvc-tw-flex-row">
      <span>Total size:</span>
      <b>{{ store.data.binary.length / 2 }}B</b>
    </div>
    <Separator orientation="vertical" :thickness="2" decorative class="bvc-tw-mx-2" />
    <div class="bvc-tw-inline-flex bvc-tw-flex-col bvc-tw-space-y-2 md:bvc-tw-space-y-0 md:bvc-tw-space-x-2 md:bvc-tw-flex-row">
      <span class="bvc-tw-align-top">Selected range:</span>
      <b v-if="store.focusHighlightRange.start >= 0">
        {{
          store.normalizeHexValue(
            store.focusHighlightRange.start / 2,
            store.focusHighlightRange.end / 2
          )
        }}-{{ store.normalizeHexValue(store.focusHighlightRange.end / 2) }}
      </b>
      <span v-else class="bvc-tw-h-[18px] bvc-tw-min-w-[75px]">
        <Icon :size="16" :icon="mdiMinus" />
      </span>
    </div>
    <Separator orientation="vertical" :thickness="2" decorative class="bvc-tw-mx-2" />
    <div class="bvc-tw-inline-flex bvc-tw-flex-col bvc-tw-space-y-2 md:bvc-tw-space-y-0 md:bvc-tw-space-x-2 md:bvc-tw-flex-row">
      <span class="bvc-tw-align-top">Highlighted range:</span>
      <b v-if="store.highlightedRange.start >= 0">
        {{
          store.normalizeHexValue(store.highlightedRange.start / 2, store.highlightedRange.end / 2)
        }}-{{ store.normalizeHexValue(store.highlightedRange.end / 2) }}
      </b>
      <span v-else class="bvc-tw-h-[18px] bvc-tw-min-w-[75px]">
        <Icon :size="16" :icon="mdiMinus" />
      </span>
    </div>
  </div>
</template>
