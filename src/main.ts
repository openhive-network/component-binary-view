import './assets/main.css'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

import { createApp } from 'vue'
import App from './App.vue'

const vuetify = createVuetify({ theme: { defaultTheme: 'dark' },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  }, });

const pinia = createPinia()
createApp(App).use(vuetify).use(pinia).mount('#app')
