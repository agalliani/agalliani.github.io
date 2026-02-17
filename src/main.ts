import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createUnhead, headSymbol } from '@unhead/vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const head = createUnhead()
app.provide(headSymbol, head)

app.mount('#app')
