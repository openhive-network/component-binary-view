# binary-view-presentation

Binary view representation of the transaction

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
  <BinaryView :data="data" :rowbytes="16" :uppercase="false" @copy="console.log('copied')" dark />
</template>
```

> Note: `dark` property is still in beta version and only dark theme is currently fully supported

## Web component

Upon [building](#build-for-production) there will be created a directory named `dist-wc`, where [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) files will be located

## Development

### Project Setup

```sh
pnpm install
```

### Run development server

```sh
pnpm dev
```

### Build for production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
