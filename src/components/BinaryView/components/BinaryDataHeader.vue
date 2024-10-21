<script setup lang="ts">
import { useBinaryViewStore } from '../store'

import { mdiMinus } from '@mdi/js'

const store = useBinaryViewStore()
</script>

<template>
  <div class="text-subtitle-1 mb-2 d-inline-flex flex-col">
    <span>
      Total size: <b>{{ store.data.binary.length / 2 }}B</b>
    </span>
    <v-divider inset vertical class="mx-2"/>
    <span>
      Selected range:
      <b v-if="store.focusHighlightRange.start >= 0">
        {{ store.normalizeHexValue(store.focusHighlightRange.start / 2, store.focusHighlightRange.end / 2) }} - {{ store.normalizeHexValue(store.focusHighlightRange.end / 2) }}
      </b>
      <span v-else>
        <v-icon size="xs" :icon="mdiMinus" />
      </span>
    </span>
    <v-divider inset vertical class="mx-2"/>
    <span>
      Highlighted range:
      <b v-if="store.highlightedRange.start >= 0">
        {{ store.normalizeHexValue(store.highlightedRange.start / 2, store.highlightedRange.end / 2) }} - {{ store.normalizeHexValue(store.highlightedRange.end / 2) }}
      </b>
      <span v-else>
        <v-icon size="xs" :icon="mdiMinus" />
      </span>
    </span>
  </div>
</template>
