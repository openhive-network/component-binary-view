# binary-view-presentation

Binary view representation of the hexadecimal values

## Important files

- [`src/components/BinaryView`](src/components/BinaryView) - directory containing main component files

## Usage

1. Install [pinia](https://pinia.vuejs.org/getting-started.html#Installation), [vuetify](https://www.npmjs.com/package/vuetify) and introduce them into your codebase
2. Copy files from `src/components/BinaryView` to your components' directory
3. Example usage:

```vue
<script setup lang="ts">
import data from '@/assets/data'
import BinaryView from '@/components/BinaryView'
</script>

<template>
  <BinaryView :data="data" />
</template>
```

## Development

### Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
