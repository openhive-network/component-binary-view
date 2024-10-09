import './assets/main.css'
import { createPinia } from 'pinia'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import { createApp } from 'vue'
import App from './App.vue'

const vuetify = createVuetify({ theme: { defaultTheme: 'dark' } });

const pinia = createPinia()
createApp(App).use(vuetify).use(pinia).mount('#app')
