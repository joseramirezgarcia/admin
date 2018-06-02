import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'
import { fb } from '../config/firebase'

let db = fb.database()

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    appTitle: 'C-MIC::Colegio Mexicano para la Investigación del Cáncer',
    user: null,
    error: null,
    loading: false,
    admin: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setAdmin (state, payload) {
      state.admin = payload
    }
  },
  actions: {
    adminSignIn ({ commit, state }, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          db.ref('roles/administrador').once('value', function (r) {
            let administradores = r.val()
            let administrador = false
            if (administradores.filter(a => a.email === payload.email).length > 0) {
              administrador = true
              commit('setAdmin', { email: firebaseUser.email, admin: administrador })
              commit('setLoading', false)
              commit('setError', null)
              router.push('/admin/home')
            }
          })
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    adminSignOut ({commit}) {
      firebase.auth().signOut()
      commit('setAdmin', null)
      router.push('/admin')
    },
    autoAdminSignIn ({commit, state}, payload) {
      commit('setAdmin', {email: payload.email, admin: true})
    },
    userSignUp ({ commit }, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          // commit('setUser', { email: firebaseUser.email, admin: false })
          // commit('setLoading', false)
          // router.push('/miembros/entrada')
          // commit('setError', null)
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    userSignIn ({ commit }, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', { email: firebaseUser.email })
          commit('setLoading', false)
          commit('setError', null)
          router.push('/miembros/datos')
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    userSignOut ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
      router.push('/miembros/entrada')
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {email: payload.email})
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.user !== null && state.user !== undefined
    },
    isAdmin (state) {
      console.log(state.admin)
      return state.admin !== null && state.admin !== undefined
    }
  }
})
