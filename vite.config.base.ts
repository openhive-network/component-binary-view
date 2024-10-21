import { fileURLToPath, URL } from 'node:url'

import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
const userConfig: UserConfig = {
  plugins: [
    Vue({
      template: {
        transformAssetUrls,
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('binary-view')
        }
      }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify(),
  ],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
};

export default userConfig;
