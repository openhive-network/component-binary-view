import { cva, type VariantProps } from 'class-variance-authority'
// In scope so that the declaration of buttonVariants can name cva's ClassProp (TS2883)
import type { ClassProp as _ClassProp } from 'class-variance-authority/types'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'bvc:inline-flex bvc:items-center bvc:justify-center bvc:whitespace-nowrap bvc:rounded-md bvc:text-sm bvc:font-medium bvc:ring-offset-background bvc:transition-colors',
  {
    variants: {
      variant: {
        default: 'bvc:bg-primary bvc:text-primary-foreground',
        destructive:
          'bvc:bg-destructive bvc:text-destructive-foreground',
        outline:
          'bvc:border-width-1 bvc:border-input bvc:bg-background',
        secondary:
          'bvc:bg-secondary bvc:text-secondary-foreground',
        ghost: '',
        link: 'bvc:text-primary bvc:underline-offset-4',
      },
      size: {
        default: 'bvc:h-10 bvc:px-4 bvc:py-2',
        xs: 'bvc:h-7 bvc:rounded-sm bvc:px-2',
        sm: 'bvc:h-9 bvc:rounded-md bvc:px-3',
        lg: 'bvc:h-11 bvc:rounded-md bvc:px-8',
        icon: 'bvc:h-8 bvc:w-8 bvc:rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
