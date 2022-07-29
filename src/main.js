import { createApp } from 'vue'
import App from './App.vue'
import vuex from './store'
import router from './router'

import VueClipboards from 'vue-clipboard2'


const app = createApp(App)

app.use(vuex)
app.use(router)

app.use(VueClipboards)

app.mount('#app');
