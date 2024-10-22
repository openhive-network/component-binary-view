<script setup lang="ts">
import { useBinaryViewStore } from '../store'

import { Separator } from './ui/separator'
import { Icon } from './ui/icon'

import { mdiMinus } from '@mdi/js'

const store = useBinaryViewStore()
</script>

<template>
  <div class="opacity-75 inline-flex flex-row h-[1.2em]">
    <div>
      Total size: <b>{{ store.data.binary.length / 2 }}B</b>
    </div>
    <Separator orientation="vertical" :thickness="2" decorative class="mx-2" />
    <div>
      Selected range:
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
    <Separator orientation="vertical" :thickness="2" decorative class="mx-2" />
    <div>
      Highlighted range:
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
