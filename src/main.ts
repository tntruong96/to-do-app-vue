import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { defaultConfig, plugin } from '@formkit/vue'
import { en } from '@formkit/i18n'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(
  plugin,
  defaultConfig({
    locales: { en },
    locale: 'en',
    theme: 'genesis',
  }),
)

app.mount('#app')
