<script setup lang="ts">
import Tooltip from './Tooltip.vue'
import TooltipProvider from './TooltipProvider.vue'
import TooltipTrigger from './TooltipTrigger.vue'
import TooltipContent from './TooltipContent.vue'

const props = defineProps<{
  text?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}>()
</script>

<template>
  <TooltipProvider :disableHoverableContent="true" :delayDuration="30">
    <Tooltip>
      <TooltipTrigger as-child>
        <span
          :tabIndex="0 /* https://github.com/shadcn-ui/ui/issues/1022#issuecomment-1701775535 */"
        >
          <slot />
        </span>
      </TooltipTrigger>
      <TooltipContent :side="side ?? 'top'">
        <p v-if="props.text">{{ props.text }}</p>
        <slot name="text" />
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
