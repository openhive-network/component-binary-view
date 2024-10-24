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
        'bvc-tw-shrink-0 bvc-tw-bg-border bvc-tw-relative',
        props.orientation === 'vertical' ? 'bvc-tw-h-full' : 'bvc-tw-w-full',
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
          'bvc-tw-text-xs bvc-tw-text-muted-foreground bvc-tw-bg-background bvc-tw-absolute bvc-tw-top-1/2 bvc-tw-left-1/2 bvc-tw--translate-x-1/2 bvc-tw--translate-y-1/2 bvc-tw-flex bvc-tw-justify-center bvc-tw-items-center',
          props.orientation === 'vertical' ? 'bvc-tw-px-1 bvc-tw-py-2' : 'bvc-tw-py-1 bvc-tw-px-2'
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
