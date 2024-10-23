# <%= it.name %>-web-component

<%= it.description %>

## Usage

```bash
pnpm add <%= it.name %>-web-component
```

`index.html`:

```diff
+ <script src="<%= it.name %>-web-component" type="module"></script>

+ <binary-view data={JSON.stringify(waxTxBinaryData)} dark />
```

### React usage

`index.js`:

```diff
import React from 'react'
import ReactDOM from 'react-dom/client'

+ import '<%= it.name %>-web-component' // Remember to import it only once

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
+     <binary-view data={JSON.stringify(waxTxBinaryData)} dark />
  </React.StrictMode>
)
```

## Component Properties

> Note: When using web components you may be forced to pass all properties as string due to DOM limitations

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

## Vue component

This component is available to use as Vue Component. If you want to use this component in Vue framework, use [`<%= it.name %>`](<https://www.npmjs.com/package/><%= it.name %>)
