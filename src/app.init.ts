import { createPinia } from "pinia";
import { type App, type DirectiveBinding } from "vue";

type ClickOutsideElement = HTMLElement & { clickOutsideEvent: (event: MouseEvent) => void };

// Polyfill of vuetify v-click-outside directive (we are using shadcn instead of vuetify) - https://stackoverflow.com/a/64698630
const clickOutside = {
  beforeMount: (el: ClickOutsideElement, binding: DirectiveBinding) => {
    el.clickOutsideEvent = (event: MouseEvent) => {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target as Node))) {
        // and if it did, call method provided in attribute value
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: (el: ClickOutsideElement) => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

export const appInit = (GivenVue: App) => {
  const Vue = GivenVue;

  Vue.directive("click-outside", clickOutside);

  // Add Pinia to the app if it hasn't been added.
  if (!Vue.config.globalProperties.$pinia) {
    const pinia = createPinia();
    Vue.use(pinia);
  }
};
