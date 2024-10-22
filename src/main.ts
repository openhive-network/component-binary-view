import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { appInit } from './app.init';

const app = createApp(App);

appInit(app);

app.mount('#app')
