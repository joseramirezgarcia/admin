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
import Chartkick from 'chartkick'
import VueChartkick from 'vue-chartkick'
import VueCarousel from 'vue-carousel'
import {vueAccordion} from 'vue-accordion'
import VueAnalytics from 'vue-analytics'

let db = fb.database()

Vue.use(VueAnalytics, {
  id: 'UA-119292021-1',
  router
})

Vue.component('vue-accordion', vueAccordion)

Vue.use(VueCarousel)

Vue.use(VueChartkick, { Chartkick })

Vue.use(VueFire)

Vue.use(Vuetify, {
  theme: {
    primary: '#005090',
    secondary: '#cf274e',
    error: '#cf274e',
    action: '#cf274e',
    tertiary: '#009CDE',
    primary5areunion: '#04436a',
    secondary5areunion: '#3d449a'
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
        db.ref('roles/administrador').once('value', function (r) {
          let administradores = r.val()
          let administrador = false
          if (administradores.filter(a => a.email === firebaseUser.email).length > 0) {
            administrador = true
            store.dispatch('autoAdminSignIn', { email: firebaseUser.email, admin: administrador })
          }
        })
      }
    }
  })
  unsubscribe()
})
