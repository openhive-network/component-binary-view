import themeStyles from './components/BinaryView/assets/styles.css?inline';
import tailwindStyles from 'tailwindcss/tailwind.css?inline';
import binaryViewStyles from './components/BinaryView/BinaryView.css?inline';

import { defineCustomElement as VueDefineCustomElement, h, createApp, getCurrentInstance, type App } from 'vue';
import { createWebComponent } from 'vue-web-component-wrapper';

import BinaryView from './components/BinaryView/BinaryView.vue';
import { appInit } from './app.init';

export const pluginsWrapper = {
  install(GivenVue: App) {
    appInit(GivenVue);
  }
};

createWebComponent({
  rootComponent: BinaryView,
  elementName: 'binary-view',
  plugins: pluginsWrapper,
  cssFrameworkStyles: themeStyles + tailwindStyles + binaryViewStyles,
  VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance,
  replaceRootWithHostInCssFramework: true
});
