<script setup lang="ts">
import { cn } from '@/components/BinaryView/utils/shadcn'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  size?: number
  icon: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <svg
    :width="props.size ?? 24"
    :height="props.size ?? 24"
    viewBox="0 0 24 24"
    style="fill: hsl(var(--foreground))"
    :class="cn('inline-block', props.class)"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path :d="props.icon" />
  </svg>
</template>
