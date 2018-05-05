<template>
  <v-app>

    <v-layout row wrap fluid v-if="micrositio5areunion">
      <v-flex xs12 sm12 md12 lg12 fluid>
        <v-toolbar color="primary" fixed>
          <v-toolbar-title class="white--text">
            <img :src="logo5areunion" width="90vw" alt="5A REUNIÓN ANUAL DEL COLEGIO MEXICANO PARA LA INVESTIGACIÓN DEL CÁNCER">
          </v-toolbar-title>          
                    <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              color="white"
              flat
              large
              v-for='item in menuItems'
              :key='item.title'
              :to='item.path'>
              {{ item.title }}
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-flex>
    </v-layout>

    <v-layout row wrap fluid v-else>
      <v-flex xs12 sm12 md12 lg12 fluid>
        <v-toolbar flat fixed color="action">
          <v-toolbar-title class="white--text mx-auto hidden-sm-and-down"> 
            REGISTRATE A LA 5A REUNIÓN ANUAL DEL COLEGIO MEXICANO PARA LA INVESTIGACIÓN DEL CÁNCER
            <v-btn class="primary" :to="{name: 'inscripcion'}">click aquí</v-btn>
          </v-toolbar-title>   
          <v-toolbar-title class="white--text hidden-md-and-up"> 
            <v-spacer></v-spacer>
            <v-btn small class="primary" style="font-size:10px" :to="{name: 'inscripcion'}">REGISTRATE A LA 5A REUNIÓN ANUAL DEL C-MIC</v-btn>
            <v-spacer></v-spacer>
          </v-toolbar-title>          
        </v-toolbar>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 fluid>
        <v-toolbar flat dense fixed style="margin-top:56px" color="white">
          <v-spacer class="hidden-md-and-up"></v-spacer>
          <v-toolbar-title class="white--text"> 
            <router-link to='/' tag='span' style='cursor: pointer' title="C-MIC COLEGIO MEXICANO PARA LA INVESTIGACIÓN DEL CÁNCER">
              <img src="@/assets/C-MIC.png" width="90vw" alt="C-MIC COLEGIO MEXICANO PARA LA INVESTIGACIÓN DEL CÁNCER">
            </router-link>
          </v-toolbar-title>          
          <v-spacer class="hidden-md-and-up"></v-spacer>
        </v-toolbar>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 fluid>
        <v-toolbar flat fixed style="margin-top:104px" color="white" class="hidden-sm-and-down">
          <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-toolbar-items class="mx-auto">
              <v-btn
                v-if="typeof item.submenus === 'undefined'"
                color="secondary"
                flat
                large
                v-for='item in menuItems'
                :key='item.title'
                :to='item.path'>
                {{ item.title }}
              </v-btn>
              <v-menu open-on-hover bottom offset-y v-else>
                <v-btn flat color="secondary" large slot="activator">{{item.title}}</v-btn>
                <v-list>
                  <v-list-tile color="secondary" v-for="(s,index) in item.submenus" :key="index" :to="{name: s.path}">
                    <v-list-tile-title>{{ s.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-toolbar-items>           
          <v-spacer class="hidden-md-and-up"></v-spacer>
        </v-toolbar>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 fluid>
        <v-toolbar flat fixed style="margin-top:104px" color="white" class="hidden-md-and-up">
            <v-toolbar-items>
              <v-btn
                v-if="typeof item.submenus === 'undefined'"
                color="secondary"
                flat
                small
                style="font-size:1.8vh; margin:0"
                v-for='item in menuItems'
                :key='item.title'
                :to='item.path'>
                {{ item.title }}
              </v-btn>
              <v-menu open-on-hover bottom offset-y v-else>
                <v-btn flat color="secondary" style="font-size:1.8vh; margin:0" small slot="activator">{{item.title}}</v-btn>
                <v-list>
                  <v-list-tile color="secondary" v-for="(s,index) in item.submenus" :key="index" :to="{name: s.path}">
                    <v-list-tile-title>{{ s.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-toolbar-items>           
        </v-toolbar>
      </v-flex>                    
    </v-layout>    

    <v-content>
      <router-view></router-view>
    </v-content>
    
    <v-footer height="auto" class="mt-0">
      <v-card flat tile class="flex">
        <v-card-title class="tertiary white--text">
          <strong class="subheading">COLEGIO MEXICANO PARA LA INVESTIGACIÓN DEL CÁNCER</strong>
          <v-spacer></v-spacer>
          <a href="http://microscopia.c-mic.mx/"><img src="http://c-mic.mx/images/cima_a.png" width="90vw"></a>
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
          <span style="white-space: nowrap">&copy;{{año}}—<strong>C-MIC</strong></span> | TODOS LOS DERECHOS RESERVADOS.
        </v-card-actions>
      </v-card>
    </v-footer>

  </v-app>
</template>

<script>
import fondo from './assets/5reunionanual.jpg'
import logo5areunion from './assets/logo5areunion.png'

export default {
  data () {
    return {
      sidebar: false,
      image: fondo,
      logo5areunion: logo5areunion,
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
    micrositio5areunion () {
      return /5areunion/.test(this.$route.path)
    },
    appTitle () {
      return this.$store.state.appTitle
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    menuItems () {
      if (this.micrositio5areunion) {
        return [{ title: 'Registro', path: '/5areunion/registro', icon: 'home' }]
      } else {
        return [
          { title: 'Nosotros', path: '/Nosotros', icon: 'face' },
          { title: 'Difusión', path: '/Difusion', icon: 'lock_open' },
          /* { title: 'Convocatorias', path: '/Registro', icon: 'lock_open' }, */
          { title: 'Avisos', path: '/Avisos', icon: 'lock_open', submenus: [{title: 'Convocatorias', path: 'convocatorias'}, {title: 'Próximos eventos', path: 'eventos'}] },
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
@import url('https://fonts.googleapis.com/css?family=Montserrat');
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
.actioncall{
  font-size: 2vw;
  white-space: normal;
  overflow: visible;
}
.VueCarousel-dot--active button.VueCarousel-dot-button{
  background:#005090 !important;
}
.btn{
  min-width:45px !important
}
#app {
  font-family: 'Montserrat', sans-serif;
}
</style>