# <%= it.name %>

<%= it.description %>

## Usage

```bash
pnpm add <%= it.name %>

```

### Vue app

`main.ts`:

```diff
+ import '<%= it.name %>/styles' // Import static styles
+ import BinaryView from '<%= it.name %>'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
+  .use(BinaryView)
.mount('#app')
```

`App.vue`:

```diff
<template>
+  <BinaryView :data="waxTxBinaryData" dark />
</template>
```

### Nuxt app

> Note: It is preferred to use client-only plugin version of this component

`plugins/binary-view.client.ts`:

```diff
+ import '<%= it.name %>/styles';
+ import BinaryView from '<%= it.name %>';

+ export default defineNuxtPlugin((nuxtApp) => {
+   nuxtApp.vueApp.use(BinaryView);
+ });
```

`App.vue`:

```diff
<template>
+  <BinaryView :data="waxTxBinaryData" dark />
</template>
```

## Component Properties

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
<% for(const prop of it.properties) { %>
| `<%= prop.name %>` | `<%= prop.type %>` | `<%= prop.default %>` | <%= prop.description %> |
<% } %>

## Component Events

| Name | Description | Example |
| ---- | ----------- | ------- |
<% for(const event of it.events) { %>
| `<%= event.name %>` | <%= event.description %> | `<%~ event.example %>` |
<% } %>

### Component exposed functions

#### Retrieving selected range

Binary View components exposes `getSelectedRange` function, which can be useful when implementing custom buttons (e.g. save to file). It takes no arguments and returns object with two properties: `start` and `end` denoting begin and end of selection in bytes. Example code:

```vue
<script setup lang="ts">
import { useTemplateRef } from 'vue';
import type { BinaryViewComponent } from '<%= it.name %>';

const binaryView = useTemplateRef<BinaryViewComponent>('binaryViewNode');

const alertSelectedRange = () => {
  alert(JSON.stringify(binaryView.value!.getSelectedRange()));
};
</script>

<template>
  <button @click="alertSelectedRange">Alert selected range</button>
  <BinaryView :data="data" ref="binaryViewNode" rootnode="transaction" dark />
</template>
```

## Web component

This component is available to use as [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components). If you want to use this component in different frameworks or Vanilla JS, use [`<%= it.name %>-web-component`](<https://www.npmjs.com/package/><%= it.name %>-web-component)
