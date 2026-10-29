import { defineConfig } from 'vite'
import userConfig from '../vite.config.base'
import tailwindcss from '@tailwindcss/postcss'
import shadowRootProperties from './postcss-shadow-root-properties'

export default defineConfig({
  ...userConfig,
  css: {
    postcss: {
      plugins: [tailwindcss(), shadowRootProperties()],
    },
  },
  build: {
    lib: {
      entry: './web-component/main.ts',
      name: 'binary-view',
      fileName: 'binary-view',
      formats: ['es', 'umd']
    }
  },
})
