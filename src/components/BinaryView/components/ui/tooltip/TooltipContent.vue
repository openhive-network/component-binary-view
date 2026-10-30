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
          'bvc:z-50 bvc:overflow-hidden bvc:rounded-md bvc:border-width-1 bvc:bg-popover bvc:px-3 bvc:py-1.5 bvc:text-sm bvc:text-popover-foreground bvc:shadow-md bvc:animate-in bvc:fade-in-0 bvc:zoom-in-95',
          props.class
        )
      "
    >
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>
