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
        'shrink-0 bg-border relative',
        props.orientation === 'vertical' ? 'h-full' : 'w-full',
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
          'text-xs text-muted-foreground bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center',
          props.orientation === 'vertical' ? 'px-1 py-2' : 'py-1 px-2'
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
