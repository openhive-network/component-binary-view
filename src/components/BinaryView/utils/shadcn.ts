import type { HTMLAttributes } from "vue";

export const cn = (...inputs: Array<string | HTMLAttributes['class']>) => {
  const classes = inputs.filter(Boolean).join(' ').split(' ');
  const uniqueClasses = new Set(classes);
  return Array.from(uniqueClasses).join(' ');
};
