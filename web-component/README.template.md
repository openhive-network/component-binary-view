# <%= it.name %>-web-component

<%= it.description %>

## Usage

```bash
pnpm add <%= it.name %>-web-component
```

### Vanilla JS app

`index.html`:

```diff
+ <script src="<%= it.name %>-web-component" type="module"></script>

+ <binary-view data='{"binary":"80c6334ada743465b064012b076265657371636b01...}' dark />
```

> Note: The code above is just a pseudo code. Remember, you should provide the actual binary representation of the transaction to the data attribute of the web component

### React app

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

### Next app

`pages/index.js`:

```diff
+ import { useEffect } from "react";

export default function Home() {
+  useEffect(() => {
+   import('<%= it.name %>-web-component') // Remember to import it only once
+  });

  return (
+    <binary-view data={JSON.stringify(data)} dark />
  );
}
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
| `<%= event.name %>` | <%= event.description %> | `node.addEventListener('<%= event.name %>', () => console.log('Got event <%= event.name %>'))` |
<% } %>

### Component exposed functions

#### Retrieving selected range

Binary View components exposes `getSelectedRange` function, which can be useful when implementing custom buttons (e.g. save to file). It takes no arguments and returns object with two properties: `start` and `end` denoting begin and end of selection in bytes. Example code:

```html
<!DOCTYPE html>
<html>
  <body>
    <script src="<%= it.name %>-web-component" type="module"></script>
    <binary-view data='{"binary":"80c6334ada743465b064012b076265657371636b01...}' dark />
    <script>
      const node = document.getElementsByTagName('binary-view')[0];
      setInterval(() => {
        console.log(node.getSelectedRange());
      }, 1000); // Report every second the selected range
    </script>
  </body>
</html>
```

## Vue component

This component is available to use as Vue Component. If you want to use this component in Vue framework, use [`<%= it.name %>`](<https://www.npmjs.com/package/><%= it.name %>)
