import { fileURLToPath, URL } from 'node:url'

import { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
const userConfig: UserConfig = {
  plugins: [
    Vue(),
  ],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
};

export default userConfig;
