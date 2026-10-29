<script setup lang="ts">
import { cn } from '@/components/BinaryView/utils/shadcn'
import { Separator, type SeparatorProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<
  SeparatorProps & { class?: HTMLAttributes['class']; label?: string; thickness?: number }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <Separator
    v-bind="delegatedProps"
    :class="
      cn(
        'bvc:shrink-0 bvc:bg-border bvc:relative',
        props.orientation === 'vertical' ? 'bvc:h-full' : 'bvc:w-full',
        props.class
      )
    "
    :style="
      props.orientation === 'vertical'
        ? { width: `${props.thickness}px` }
        : { height: `${props.thickness}px` }
    "
  >
    <span
      v-if="props.label"
      :class="
        cn(
          'bvc:text-xs bvc:text-muted-foreground bvc:bg-background bvc:absolute bvc:top-1/2 bvc:left-1/2 bvc:-translate-x-1/2 bvc:-translate-y-1/2 bvc:flex bvc:justify-center bvc:items-center',
          props.orientation === 'vertical' ? 'bvc:px-1 bvc:py-2' : 'bvc:py-1 bvc:px-2'
        )
      "
      :style="
        props.orientation === 'vertical'
          ? { width: `${props.thickness}px` }
          : { height: `${props.thickness}px` }
      "
      >{{ props.label }}</span
    >
  </Separator>
</template>
