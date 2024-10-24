import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'bvc-tw-inline-flex bvc-tw-items-center bvc-tw-justify-center bvc-tw-whitespace-nowrap bvc-tw-rounded-md bvc-tw-text-sm bvc-tw-font-medium bvc-tw-ring-offset-background bvc-tw-transition-colors bvc-tw-focus-visible:outline-none bvc-tw-focus-visible:ring-2 bvc-tw-focus-visible:ring-ring bvc-tw-focus-visible:ring-offset-2 bvc-tw-disabled:pointer-events-none bvc-tw-disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bvc-tw-bg-primary bvc-tw-text-primary-foreground bvc-tw-hover:bg-primary/90',
        destructive:
          'bvc-tw-bg-destructive bvc-tw-text-destructive-foreground bvc-tw-hover:bg-destructive/90',
        outline:
          'bvc-tw-border bvc-tw-border-input bvc-tw-bg-background bvc-tw-hover:bg-accent bvc-tw-hover:text-accent-foreground',
        secondary:
          'bvc-tw-bg-secondary bvc-tw-text-secondary-foreground bvc-tw-hover:bg-secondary/80',
        ghost: 'bvc-tw-hover:bg-accent bvc-tw-hover:text-accent-foreground',
        link: 'bvc-tw-text-primary bvc-tw-underline-offset-4 bvc-tw-hover:underline',
      },
      size: {
        default: 'bvc-tw-h-10 bvc-tw-px-4 bvc-tw-py-2',
        xs: 'bvc-tw-h-7 bvc-tw-rounded bvc-tw-px-2',
        sm: 'bvc-tw-h-9 bvc-tw-rounded-md bvc-tw-px-3',
        lg: 'bvc-tw-h-11 bvc-tw-rounded-md bvc-tw-px-8',
        icon: 'bvc-tw-h-8 bvc-tw-w-8 bvc-tw-rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
