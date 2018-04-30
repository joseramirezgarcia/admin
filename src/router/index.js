import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

const routerOptions = [
  { path: '/', component: 'Inicio' },
  { path: '/inicio', component: 'Inicio', name: 'inicio' },
  { path: '/registro', component: 'Registro', name: 'registro' },
  { path: '/confirmacion', component: 'Confirmacion', name: 'confirmacion', props: true },
  { path: '/registroreunionanual', component: 'RegistroReunionAnual', name: 'registroreunionanual' },
  { path: '/signin', component: 'Signin', name: 'signin' },
  { path: '/signup', component: 'Signup', name: 'signup' },
  { path: '/home', component: 'Home', name: 'home', meta: { requiresAuth: true } },
  { path: '*', component: 'NotFound' }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if (requiresAuth && !isAuthenticated) {
    // next('/signin')
    next('/registro')
  } else {
    next()
  }
})

export default router
