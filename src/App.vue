<template>
  <v-app>

    <v-card flat class="elevation-6 mb-0">
      <v-navigation-drawer v-model='sidebar' app>
        <v-list>
          <v-list-tile
            v-for='item in menuItems'
            :key='item.title'
            :to='item.path'>
            <v-list-tile-content>{{ item.title }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click='userSignOut'>
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>Salir</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>      
      <v-toolbar flat extended color="blue-grey lighten-5">
        <v-toolbar-side-icon class='hidden-sm-and-up primary--text' @click='sidebar = !sidebar'></v-toolbar-side-icon>
        <v-toolbar-title class="pt-3"> 
          <router-link to='/' tag='span' style='cursor: pointer' title="C-MIC COLEGIO MEXICANO PARA LA INVESTIGACIÓN DEL CÁNCER">
            <img src="@/assets/C-MIC.png" width="19%" alt="C-MIC COLEGIO MEXICANO PARA LA INVESTIGACIÓN DEL CÁNCER">
          </router-link>
        </v-toolbar-title>
        <v-toolbar-items class="pt-2">
          <v-btn color="secondary" :to="{name: 'inscripcion'}">
            Registrate en la 5a Reunión Anual
          </v-btn>
        </v-toolbar-items>
        <v-toolbar-title class="caption mx-auto primary--text" slot="extension">
          COLEGIO MEXICANO PARA LA INVESTIGACIÓN DEL CÁNCER
        </v-toolbar-title>
      </v-toolbar>
      <v-layout row class="hidden-sm-and-down">
        <v-flex xs12 md10 offset-md1>
          <v-card class="card--flex-toolbar">
            <v-toolbar card prominent color="primary" dense :style="{ 'background': 'url(\'' + image + '\') ' }" class='fondo'>
              <v-toolbar-items class="hidden-sm-and-down mx-auto">
                <v-btn
                  v-if="typeof item.submenus === 'undefined'"
                  color="white"
                  flat
                  v-for='item in menuItems'
                  :key='item.title'
                  :to='item.path'>
                  {{ item.title }}
                </v-btn>
                <v-menu open-on-hover bottom offset-y v-else>
                  <v-btn flat color="white" slot="activator">{{item.title}}</v-btn>
                  <v-list>
                    <v-list-tile color="primary" v-for="(s,index) in item.submenus" :key="index" :to="{name: s.path}">
                      <v-list-tile-title>{{ s.title }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-toolbar-items> 
            </v-toolbar>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>    

    <v-content>
      <router-view></router-view>
    </v-content>
    
    <v-footer height="auto" class="mt-0">
      <v-card flat tile class="flex">
        <v-card-title class="secondary white--text">
          <strong class="subheading">COLEGIO MEXICANO PARA LA INVESTIGACIÓN DEL CÁNCER</strong>
          <v-spacer></v-spacer>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            icon
            dark
            class="mx-3"
          >
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="blue-grey lighten-5">
          <v-layout>
            <v-flex
              v-for="(col, i) in rows"
              :key="i"
              xs12 sm6
            >
              <span class="body-2 secondary--text" v-text="col.title.toUpperCase()"></span>
              <router-link 
                v-if="col.title=='C-MIC'"
                tag="div" 
                :to="item.path" 
                v-for='item in menuItems' 
                :key='item.title' 
              >
                {{item.title}}
              </router-link>
              <div
                v-else
                v-for="(child, i) in col.children"
                :key="i"
                v-text="child"
              ></div>
            </v-flex>
            <v-flex xs12 sm6 layout column>
              <span class="body-2 secondary--text">CONTACTO</span>
              <div>
                <a href="https://www.google.com.mx/maps/place/El+Instituto+Nacional+de+Cancerolog%C3%ADa/@19.289244,-99.1625718,17z/data=!3m1!4b1!4m5!3m4!1s0x85ce00f640f39f8d:0x2d9a3aae260bc9!8m2!3d19.2892389!4d-99.1603831?hl=es" target="_blank">
                  <v-icon size="18px" class="mr-3">fa fa-home</v-icon>
                </a>
                Ave. San Fernando #22, sección XVI, Tlalpan. CDMX. C.P. 14080
              </div>
              <div>
                <a href="mailto:'reuniones@c-mic.mx'">
                  <v-icon size="18px" class="mr-3">fa fa-envelope</v-icon>
                </a>
                reuniones@c-mic.mx
              </div>
              <div>
                <v-icon size="18px" class="mr-3">fa fa-phone</v-icon>
                + 01 234 456 78
              </div>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="blue-grey lighten-3 justify-center">
          &copy;{{año}}—<strong>C-MIC</strong> | TODOS LOS DERECHOS RESERVADOS.
        </v-card-actions>
      </v-card>
    </v-footer>

  </v-app>
</template>

<script>
import fondo from './assets/5reunionanual.jpg'

export default {
  data () {
    return {
      sidebar: false,
      image: fondo,
      icons: ['fa fa-facebook', 'fa fa-twitter'],
      rows: [
        {
          title: 'C-MIC'
        }
      ],
      año: new Date().getFullYear()
    }
  },
  computed: {
    appTitle () {
      return this.$store.state.appTitle
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    menuItems () {
      if (this.isAuthenticated) {
        return [{ title: 'Inicio', path: '/home', icon: 'home' }]
      } else {
        return [
          { title: 'Nosotros', path: '/Nosotros', icon: 'face' },
          { title: 'Difusión', path: '/Difusion', icon: 'lock_open' },
          /* { title: 'Convocatorias', path: '/Registro', icon: 'lock_open' }, */
          { title: 'Miembros', path: '/Miembros', icon: 'lock_open', submenus: [{title: 'Registro', path: 'registro'}, {title: 'Directorio', path: 'directorio'}, {title: 'Investigadores', path: 'investigadores'}, {title: 'Estudiantes', path: 'estudiantes'}] },
          { title: 'Contacto', path: '/contacto', icon: 'lock_open' }
        ]
      }
    }
  },
  methods: {
    userSignOut () {
      this.$store.dispatch('userSignOut')
    }
  }
}
</script>
<style>
  .card--flex-toolbar {
    margin-top: -48px;
  }
.fondo{
  background-repeat: no-repeat !important;
  background-position: center top !important;
  background-size: cover !important;
}
a{
  text-decoration: none;
}
</style>