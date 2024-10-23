import { defineConfig } from 'vite'
import userConfig from '../vite.config.base'

export default defineConfig({
  ...userConfig,
  build: {
    lib: {
      entry: './vue-component/main.ts',
      name: 'BinaryView',
      fileName: 'binary-view',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue', 'pinia'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          pinia: 'Pinia'
        }
      }
    }
  }
})
