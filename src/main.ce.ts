import vuetifyStyles from 'vuetify/dist/vuetify.min.css?inline';
import binaryViewStyles from './components/BinaryView/BinaryView.css?inline';

import { defineCustomElement as VueDefineCustomElement, h, createApp, getCurrentInstance } from 'vue';
import { createWebComponent } from 'vue-web-component-wrapper';

import { createVuetify } from 'vuetify';
import { createPinia } from 'pinia';

import BinaryView from './components/BinaryView/BinaryView.vue';

export const pluginsWrapper = {
  install(GivenVue: any) {
    const Vue = GivenVue;

    const pinia = createPinia();
    Vue.use(pinia);

    const vuetify = createVuetify();
    Vue.use(vuetify);
  }
};

createWebComponent({
  rootComponent: BinaryView,
  elementName: 'binary-view',
  plugins: pluginsWrapper,
  cssFrameworkStyles: vuetifyStyles + binaryViewStyles,
  VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance,
  replaceRootWithHostInCssFramework: true
});
