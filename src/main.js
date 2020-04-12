import Vue from 'vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import App from './App.vue'
import router from './router'
import store from './store'
import '@/misc/register-service-worker'
import '@/misc/handle-network-status'
import '@/firebase/init'
import '@/firebase/authentication'
import '@/misc/handle-apple-install-prompt'
import 'pwacompat'
import vuetify from '@/plugins/vuetify'
import notification from '@/plugins/notification'

Vue.config.productionTip = false

// adding plugins
Vue.use(notification)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

console.log(`
🍱 This app was bootstrapped with bento-starter 🍱

👉 https://bento-starter.netlify.com/

`)
