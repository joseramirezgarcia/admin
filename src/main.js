// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import { fb } from './config/firebase'
import VueFire from 'vuefire'
Vue.use(VueFire)

Vue.use(Vuetify, {
  theme: {
    primary: '#194e91',
    secondary: '#c41949',
    error: '#c51a4a'
  }
})

Vue.config.productionTip = true

/* eslint-disable no-new */
const unsubscribe = fb.auth()
.onAuthStateChanged((firebaseUser) => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser)
      }
    }
  })
  unsubscribe()
})
