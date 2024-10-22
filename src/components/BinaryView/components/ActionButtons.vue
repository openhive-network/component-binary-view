<script setup lang="ts">
import { useBinaryViewStore } from '../store'

import { Button } from './ui/button'
import { Tooltip } from './ui/tooltip'
import { Icon } from './ui/icon'
import { Separator } from './ui/separator'

import {
  mdiHexadecimal,
  mdiContentCopy,
  mdiUnfoldLessVertical,
  mdiUnfoldMoreVertical
} from '@mdi/js'

const store = useBinaryViewStore()

const emit = defineEmits(['copy'])
</script>

<template>
  <div class="flex flex-col gap-1">
    <Tooltip text="Copy binary selected range" side="right">
      <Button
        @click="store.copyBinary(), emit('copy')"
        :disabled="store.focusHighlightRange.start < 0"
        size="icon"
        variant="outline"
        ><Icon :size="18" :icon="mdiHexadecimal"
      /></Button>
    </Tooltip>
    <Tooltip text="Copy hex selected range" side="right">
      <Button
        @click="store.copyHex(), emit('copy')"
        :disabled="store.focusHighlightRange.start < 0"
        size="icon"
        variant="outline"
        ><Icon :size="18" :icon="mdiContentCopy"
      /></Button>
    </Tooltip>
    <Separator class="my-1" :thickness="2" decorative />
    <Tooltip text="Fold all" side="right">
      <Button size="icon" @click="store.foldAll()" variant="outline"
        ><Icon :size="18" :icon="mdiUnfoldLessVertical"
      /></Button>
    </Tooltip>
    <Tooltip text="Unfold all" side="right">
      <Button size="icon" @click="store.unfoldAll()" variant="outline"
        ><Icon :size="18" :icon="mdiUnfoldMoreVertical"
      /></Button>
    </Tooltip>
  </div>
</template>
