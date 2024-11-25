import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { defaultConfig, plugin } from '@formkit/vue'
import config from '../formkit.config'

import App from './App.vue'
import router from './router'
import { VueFire, VueFireAuth, VueFireFirestoreOptionsAPI } from 'vuefire'
import { firebaseApp } from './assets/utils/firebaseConfig'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, defaultConfig(config))
app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
})

app.mount('#app')
