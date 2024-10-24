<script setup lang="ts">
import { cn } from '@/components/BinaryView/utils/shadcn'
import {
  TooltipContent,
  type TooltipContentEmits,
  type TooltipContentProps,
  TooltipPortal,
  useForwardPropsEmits
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(
  defineProps<TooltipContentProps & { class?: HTMLAttributes['class'] }>(),
  {
    sideOffset: 4
  }
)

const emits = defineEmits<TooltipContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TooltipPortal disabled>
    <TooltipContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        cn(
          'bvc-tw-z-50 bvc-tw-overflow-hidden bvc-tw-rounded-md bvc-tw-border bvc-tw-bg-popover bvc-tw-px-3 bvc-tw-py-1.5 bvc-tw-text-sm bvc-tw-text-popover-foreground bvc-tw-shadow-md bvc-tw-animate-in bvc-tw-fade-in-0 bvc-tw-zoom-in-95 bvc-tw-data-[state=closed]:animate-out bvc-tw-data-[state=closed]:fade-out-0 bvc-tw-data-[state=closed]:zoom-out-95 bvc-tw-data-[side=bottom]:slide-in-from-top-2 bvc-tw-data-[side=left]:slide-in-from-right-2 bvc-tw-data-[side=right]:slide-in-from-left-2 bvc-tw-data-[side=top]:slide-in-from-bottom-2',
          props.class
        )
      "
    >
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>
