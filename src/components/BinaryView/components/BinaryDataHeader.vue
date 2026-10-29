<script setup lang="ts">
import { useBinaryViewStore } from '../store'

import { Separator } from './ui/separator'
import { Icon } from './ui/icon'

import { mdiMinus } from '@mdi/js'

const props = defineProps<{ index: number }>()

const store = useBinaryViewStore(props.index)
</script>

<template>
  <div class="bvc:max-w-[100%] bvc:opacity-75 bvc:inline-flex bvc:flex-row bvc:text-[18px]/[18px] bvc:justify-between ">
    <div class="bvc:inline-flex bvc:flex-col bvc:md:space-y-0 bvc:space-y-2 bvc:md:space-x-2 bvc:md:flex-row">
      <span>Total size:</span>
      <b>{{ store.data.binary.length / 2 }}B</b>
    </div>
    <Separator orientation="vertical" :thickness="2" decorative class="bvc:mx-2" />
    <div class="bvc:inline-flex bvc:flex-col bvc:space-y-2 bvc:md:space-y-0 bvc:md:space-x-2 bvc:md:flex-row">
      <span class="bvc:align-top">Selected range:</span>
      <b v-if="store.focusHighlightRange.start >= 0">
        {{
          store.normalizeHexValue(
            store.focusHighlightRange.start / 2,
            store.focusHighlightRange.end / 2
          )
        }}-{{ store.normalizeHexValue(store.focusHighlightRange.end / 2) }}
      </b>
      <span v-else class="bvc:h-[18px] bvc:min-w-[75px]">
        <Icon :size="16" :icon="mdiMinus" />
      </span>
    </div>
    <Separator orientation="vertical" :thickness="2" decorative class="bvc:mx-2" />
    <div class="bvc:inline-flex bvc:flex-col bvc:space-y-2 bvc:md:space-y-0 bvc:md:space-x-2 bvc:md:flex-row">
      <span class="bvc:align-top">Highlighted range:</span>
      <b v-if="store.highlightedRange.start >= 0">
        {{
          store.normalizeHexValue(store.highlightedRange.start / 2, store.highlightedRange.end / 2)
        }}-{{ store.normalizeHexValue(store.highlightedRange.end / 2) }}
      </b>
      <span v-else class="bvc:h-[18px] bvc:min-w-[75px]">
        <Icon :size="16" :icon="mdiMinus" />
      </span>
    </div>
  </div>
</template>
