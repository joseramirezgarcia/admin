// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import firebase from 'firebase'
import { FBconfig } from './config/firebase'

Vue.use(Vuetify)

firebase.initializeApp({
  apiKey: FBconfig.apiKey,
  authDomain: FBconfig.authDomain,
  databaseURL: FBconfig.databaseURL,
  projectId: FBconfig.projectId,
  storageBucket: FBconfig.storageBucket,
  messagingSenderId: FBconfig.messagingSenderId
})

Vue.config.productionTip = false

/* eslint-disable no-new */
const unsubscribe = firebase.auth()
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
