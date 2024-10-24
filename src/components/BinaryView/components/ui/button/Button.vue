<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/components/BinaryView/utils/shadcn'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { type ButtonVariants, buttonVariants } from '.'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button'
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :disabled="props.disabled ?? false"
    :style="{ cursor: props.disabled ? 'default' : 'pointer', opacity: props.disabled ? '0.5' : '1' }"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
