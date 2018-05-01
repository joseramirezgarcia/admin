import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

const routerOptions = [
  { path: '/', component: 'Inicio' },
  { path: '/inicio', component: 'Inicio', name: 'inicio' },
  { path: '/nosotros', component: 'Nosotros', name: 'nosotros' },
  { path: '/difusion', component: 'Difusion', name: 'difusion' },
  { path: '/miembros', component: 'Miembros', name: 'miembros', children: [{path: '/miembros/directorio', component: resolve => require(['../components/Directorio.vue'], resolve), name: 'directorio'}, {path: '/miembros/registro', component: resolve => require(['../components/Registro.vue'], resolve), name: 'registro'}, {path: '/miembros/investigadores', component: resolve => require(['../components/Investigadores.vue'], resolve), name: 'investigadores'}, {path: '/miembros/estudiantes', component: resolve => require(['../components/Estudiantes.vue'], resolve), name: 'estudiantes'}] },
  { path: '/contacto', component: 'Contacto', name: 'contacto' },
  { path: '/confirmacion', component: 'Confirmacion', name: 'confirmacion', props: true },
  { path: '/5areunion', component: '5aReunion', name: '5areunion', children: [{path: '/5areunion/inscripcion', component: resolve => require(['../components/Inscripcion.vue'], resolve), name: 'inscripcion'}] },
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
