# <%= it.name %>

<%= it.description %>

## Usage

```bash
pnpm add <%= it.name %>

```

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

### Nuxt usage

`plugins/binary-view.ts`:

```diff
+ import '@hiveio/component-binary-view/styles';
+ import BinaryView from '@hiveio/component-binary-view';

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

## Web component

This component is available to use as [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components). If you want to use this component in different frameworks or Vanilla JS, use [`<%= it.name %>-web-component`](<https://www.npmjs.com/package/><%= it.name %>-web-component)
