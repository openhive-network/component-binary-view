import { fileURLToPath, URL } from 'node:url'

import { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

import tailwindcss from '@tailwindcss/postcss'

// https://vitejs.dev/config/
const userConfig: UserConfig = {
  plugins: [
    Vue(),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }
};

export default userConfig;
