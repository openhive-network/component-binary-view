import { defineConfig } from 'vite'
import userConfig from '../vite.config.base'

export default defineConfig({
  ...userConfig,
  build: {
    lib: {
      entry: './web-component/main.ts',
      name: 'binary-view',
      fileName: 'binary-view',
      formats: ['es', 'umd']
    }
  },
})
