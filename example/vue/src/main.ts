import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import '@hiveio/component-binary-view/styles' // Import static styles
import BinaryView from '@hiveio/component-binary-view'

const app = createApp(App)

app.use(createPinia())
app.use(BinaryView)

app.mount('#app')
