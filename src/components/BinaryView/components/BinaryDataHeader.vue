<script setup lang="ts">
import { useBinaryViewStore } from '../store'

import { Separator } from './ui/separator'
import { Icon } from './ui/icon'

import { mdiMinus } from '@mdi/js'

const props = defineProps<{ index: number }>()

const store = useBinaryViewStore(props.index)
</script>

<template>
  <div class="bvc-tw-opacity-75 bvc-tw-inline-flex bvc-tw-flex-row bvc-tw-h-[1.2em]">
    <div>
      Total size: <b>{{ store.data.binary.length / 2 }}B</b>
    </div>
    <Separator orientation="vertical" :thickness="2" decorative class="bvc-tw-mx-2" />
    <div>
      <span class="bvc-tw-mr-1 bvc-tw-align-top">Selected range:</span>
      <b v-if="store.focusHighlightRange.start >= 0">
        {{
          store.normalizeHexValue(
            store.focusHighlightRange.start / 2,
            store.focusHighlightRange.end / 2
          )
        }}
        - {{ store.normalizeHexValue(store.focusHighlightRange.end / 2) }}
      </b>
      <span v-else>
        <Icon :size="16" :icon="mdiMinus" />
      </span>
    </div>
    <Separator orientation="vertical" :thickness="2" decorative class="bvc-tw-mx-2" />
    <div>
      <span class="bvc-tw-mr-1 bvc-tw-align-top">Highlighted range:</span>
      <b v-if="store.highlightedRange.start >= 0">
        {{
          store.normalizeHexValue(store.highlightedRange.start / 2, store.highlightedRange.end / 2)
        }}
        - {{ store.normalizeHexValue(store.highlightedRange.end / 2) }}
      </b>
      <span v-else>
        <Icon :size="16" :icon="mdiMinus" />
      </span>
    </div>
  </div>
</template>
