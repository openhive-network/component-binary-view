declare module '@hiveio/component-binary-view' {
  import { App, ComponentPublicInstance } from 'vue';

  export const BinaryView: {
    install(app: App): void;
  };

  export type BinaryViewComponent = ComponentPublicInstance<{
        <% it.properties.forEach((prop) => { %>
          <%= prop.name %><%= prop.default === '' ? '' : '?' %>: <%= prop.type %>;
        <% }) %>
getSelectedRange: () => number;
      }, {}, {}, {}, {}, <%~ JSON.stringify(it.events.map(node => node.name)) %>>;

  // Extend the global Vue component types
  module '@vue/runtime-core' {
    export interface GlobalComponents {
      BinaryView: BinaryViewComponent;
    }
  }

  export default BinaryView;
}

declare module '@hiveio/component-binary-view/styles';
