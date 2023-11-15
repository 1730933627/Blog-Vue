import { createApp } from 'vue'
import App from './App.vue'
import vuex from './store'
import router from './router'
import VueClipboards from 'vue-clipboard2'
import VueLazyLoad from 'vue-lazyload'

const app = createApp(App)

app.use(vuex)
app.use(router)

app.use(VueClipboards)
app.use(VueLazyLoad, {
    preLoad: 1,
    error: require('./assets/error.jpg'),
    loading: require('./assets/loading.jpg'),
    attempt: 2,
})

app.mount('#app');
