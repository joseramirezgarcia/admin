import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

const titulo = 'C-MIC :: Colegio Mexicano para la Investigación del Cáncer'

const routerOptions = [
  { path: '/', component: 'Inicio', meta: {title: titulo} },
  { path: '/inicio', component: 'Inicio', name: 'inicio', meta: {title: titulo} },
  { path: '/nosotros', component: 'Nosotros', name: 'nosotros', meta: {title: 'Nosotros - ' + titulo} },
  { path: '/difusion', component: 'Difusion', name: 'difusion', meta: {title: 'Difusión - ' + titulo} },
  { path: '/avisos', component: 'Avisos', name: 'avisos', meta: {title: 'Avisos - ' + titulo}, children: [{path: '/avisos/convocatorias', component: resolve => require(['../components/Convocatorias.vue'], resolve), name: 'convocatorias', meta: {title: 'Convocatorias - ' + titulo}}, {path: '/avisos/eventos', component: resolve => require(['../components/Eventos.vue'], resolve), name: 'eventos', meta: {title: 'Eventos - ' + titulo}}] },
  { path: '/miembros', component: 'Miembros', name: 'miembros', meta: {title: 'Miembros - ' + titulo}, children: [{path: '/miembros/directorio', component: resolve => require(['../components/Directorio.vue'], resolve), name: 'directorio', meta: {title: 'Directorio - ' + titulo}}, {path: '/miembros/registro', component: resolve => require(['../components/Registro.vue'], resolve), name: 'registro', meta: {title: 'Registro - ' + titulo}}, {path: '/miembros/investigadores', component: resolve => require(['../components/Investigadores.vue'], resolve), name: 'investigadores', meta: {title: 'Investigadores - ' + titulo}}, {path: '/miembros/estudiantes', component: resolve => require(['../components/Estudiantes.vue'], resolve), name: 'estudiantes', meta: {title: 'Estudiantes - ' + titulo}}] },
  { path: '/contacto', component: 'Contacto', name: 'contacto', meta: {title: 'Contacto - ' + titulo} },
  { path: '/confirmacion', component: 'Confirmacion', name: 'confirmacion', props: true, meta: {title: 'Confirmación - ' + titulo} },
  { path: '/5areunion', component: '5aReunion', name: '5areunion', meta: {title: '5a Reunión Anual - ' + titulo}, children: [{path: '/5areunion/inscripcion', component: resolve => require(['../components/Inscripcion.vue'], resolve), name: 'inscripcion', meta: {title: 'Inscripción - 5a Reunión Anual - ' + titulo}}] },
  { path: '/signin', component: 'Signin', name: 'signin' },
  { path: '/signup', component: 'Signup', name: 'signup' },
  { path: '/home', component: 'Home', name: 'home', meta: { requiresAuth: true } },
  { path: '*', component: 'NotFound', meta: {title: 'Página no encontrada - ' + titulo} }
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
  document.title = to.meta.title
  if (requiresAuth && !isAuthenticated) {
    // next('/signin')
    next('/registro')
  } else {
    next()
  }
})

export default router
