<template>
  <v-app>

    <v-toolbar dense fixed v-if="admin && isAdmin">
      <v-toolbar-title>
        <router-link to='/' tag='span' style='cursor: pointer'>
          C-MIC Módulo de Administración
        </router-link>
      </v-toolbar-title>          
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          flat
          small
          v-for='item in menuItems'
          :key='item.title'
          :to='item.path'>
          {{ item.title }}
        </v-btn>
        <v-btn small flat @click='adminSignOut'>
          Salir
        </v-btn>        
      </v-toolbar-items>
      <v-toolbar-items class="hidden-md-and-up">
        <v-menu bottom offset-y>
          <v-btn flat large slot="activator">&nbsp;<v-icon>menu</v-icon></v-btn>
          <v-list>
            <v-list-tile v-for="(item,index) in menuItems" :key="index" :to='item.path'>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click='adminSignOut'>
              <v-list-tile-title>Salir</v-list-tile-title>
            </v-list-tile>            
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>

    <v-layout row wrap fluid v-if="micrositio5areunion">
      <v-flex xs12 sm12 md12 lg12 fluid>
        <v-toolbar flat fixed color="action">
          <v-toolbar-title class="white--text mx-auto hidden-sm-and-down body-1"> 
            REGÍSTRATE A LA 5A REUNIÓN ANUAL DEL COLEGIO MEXICANO PARA LA INVESTIGACIÓN DEL CÁNCER
            <v-btn class="primary" :to="{name: 'inscripcion' }">click aquí</v-btn>
          </v-toolbar-title>   
          <v-toolbar-title class="white--text hidden-md-and-up mx-auto"> 
            <v-spacer></v-spacer>
            <v-btn small class="primary" style="font-size:10px" :to="{name: 'inscripcion' }">REGÍSTRATE A LA 5A REUNIÓN ANUAL DEL C-MIC</v-btn>
            <v-spacer></v-spacer>
          </v-toolbar-title>          
        </v-toolbar>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 fluid>
        <v-toolbar color="primary5areunion" style="margin-top:56px; line-height: 1.0;" fixed>
          <v-toolbar-title class="white--text">
            <router-link to='/' tag='span' style='cursor: pointer' title="C-MIC COLEGIO MEXICANO PARA LA INVESTIGACIÓN DEL CÁNCER">
              <img src="http://c-mic.mx/img/C-MICblanco.png" width="90vw" alt="C-MIC COLEGIO MEXICANO PARA LA INVESTIGACIÓN DEL CÁNCER">
            </router-link>
            <router-link to='/5areunion' tag='span' style='cursor: pointer' title="5A REUNIÓN ANUAL DEL COLEGIO MEXICANO PARA LA INVESTIGACIÓN DEL CÁNCER">
              <img src="http://c-mic.mx/img/logo5areunion.png" width="90vw" alt="5A REUNIÓN ANUAL DEL COLEGIO MEXICANO PARA LA INVESTIGACIÓN DEL CÁNCER">
            </router-link>
          </v-toolbar-title>          
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn
              color="white"
              flat
              medium
              v-for='item in menuItems'
              :key='item.title'
              :to='item.path'>
              {{ item.title }}
            </v-btn>
          </v-toolbar-items>
          <v-toolbar-items class="hidden-md-and-up">
            <v-menu bottom offset-y>
              <v-btn flat color="white" large slot="activator">&nbsp;<v-icon>menu</v-icon></v-btn>
              <v-list>
                <v-list-tile color="primary5areunion" v-for="(item,index) in menuItems" :key="index" :to='item.path'>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-toolbar-items>
        </v-toolbar>
      </v-flex>
    </v-layout>

    <v-layout row wrap fluid v-if="!micrositio5areunion && !admin">
      <v-flex xs12 sm12 md12 lg12 fluid>
        <v-toolbar flat fixed color="action">
          <v-toolbar-title class="white--text mx-auto hidden-sm-and-down body-1"> 
            REGÍSTRATE A LA 5A REUNIÓN ANUAL DEL COLEGIO MEXICANO PARA LA INVESTIGACIÓN DEL CÁNCER
            <v-btn class="primary" :to="{name: 'inscripcion' }">click aquí</v-btn>
          </v-toolbar-title>   
          <v-toolbar-title class="white--text hidden-md-and-up mx-auto"> 
            <v-spacer></v-spacer>
            <v-btn small class="primary" style="font-size:10px" :to="{name: 'inscripcion' }">REGÍSTRATE A LA 5A REUNIÓN ANUAL DEL C-MIC</v-btn>
            <v-spacer></v-spacer>
          </v-toolbar-title>          
        </v-toolbar>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 fluid>
        <v-toolbar flat dense fixed style="margin-top:56px" color="white">
          <v-toolbar-title class="white--text"> 
            <router-link to='/' tag='span' style='cursor: pointer' title="C-MIC COLEGIO MEXICANO PARA LA INVESTIGACIÓN DEL CÁNCER">
              <img src="http://c-mic.mx/img/C-MIC.png" width="90vw" alt="C-MIC COLEGIO MEXICANO PARA LA INVESTIGACIÓN DEL CÁNCER">
            </router-link>
          </v-toolbar-title>          
          <v-spacer class="hidden-md-and-up"></v-spacer>
          <v-toolbar-items class="hidden-md-and-up">
            <v-menu bottom offset-y>
              <v-btn flat color="primary" large slot="activator">&nbsp;<v-icon>menu</v-icon></v-btn>
              <v-list>
                <v-list-tile color="primary5areunion" v-for="(item,index) in menuItems" :key="index" :to='item.path'>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-toolbar-items>         
          <v-toolbar-items class="mx-auto hidden-sm-and-down">
            <v-btn
              v-if="typeof item.submenus === 'undefined'"
              color="primary"
              flat
              large
              v-for='item in menuItems'
              :key='item.title'
              :to='item.path'>
              {{ item.title }}
            </v-btn>
            <v-menu open-on-hover bottom offset-y v-else>
              <v-btn flat color="primary" large slot="activator" :to='item.path'>{{item.title}}</v-btn>
              <v-list>
                <v-list-tile color="primary" v-for="(s,index) in item.submenus" :key="index" :to="{name: s.path}">
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

    <v-footer height="auto" class="mt-0 py-2" v-if="micrositio5areunion" color="tertiary">
      <v-spacer></v-spacer>
      <img src="http://c-mic.mx/img/logos.png" style="max-width:30%">
      <v-spacer></v-spacer>
    </v-footer>

    <v-footer height="auto" class="mt-0" v-if="!micrositio5areunion && !admin">
      <v-card flat tile class="flex">
        <v-card-title class="tertiary white--text">
          <strong class="subheading">COLEGIO MEXICANO PARA LA INVESTIGACIÓN DEL CÁNCER</strong>
          <v-spacer></v-spacer>
          <!-- <a href="http://microscopia.c-mic.mx/"><img src="http://c-mic.mx/img/cima_a.png" width="90vw"></a>-->
          <v-btn
            icon
            dark
            class="mx-3"
            href="https://twitter.com/cmic_mex"
            target="_blank"
          >
            <v-icon size="24px">fa fa-twitter</v-icon>
          </v-btn>
          <v-btn
            icon
            dark
            class="mx-3"
            href="https://www.facebook.com/CMICancer/"
            target="_blank"
          >
            <v-icon size="24px">fa fa-facebook</v-icon>
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
                style="cursor: pointer"
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
export default {
  data () {
    return {
      sidebar: false,
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
    admin () {
      return /admin/.test(this.$route.path)
    },
    appTitle () {
      return this.$store.state.appTitle
    },
    isAdmin () {
      return this.$store.getters.isAdmin
    },
    menuItems () {
      if (this.micrositio5areunion) {
        return [
          { title: 'Inicio', path: '/5areunion' },
          { title: 'Invitación', path: '/5areunion/invitacion' },
          { title: 'Ponentes', path: '/5areunion/ponentes' },
          { title: 'Regístrate', path: '/5areunion/inscripcion' },
          { title: 'Sede', path: '/5areunion/sede' },
          { title: 'Hospedaje', path: '/5areunion/hospedaje' },
          { title: 'Contacto', path: '/5areunion/contacto' }
        ]
      } else if (this.admin) {
        return [
          { title: 'Inicio', path: '/admin/home' },
          { title: 'Estadísticas', path: '/admin/statics' },
          { title: 'Pagos', path: '/admin/payments' }
        ]
      } else {
        return [
          { title: 'Inicio', path: '/' },
          { title: 'Nosotros', path: '/Nosotros' },
          { title: 'Videos', path: '/Difusion' },
          /* { title: 'Convocatorias', path: '/Registro' }, */
          { title: 'Reuniones', path: '/Reuniones', submenus: [{ title: 'Convocatorias', path: 'convocatorias' }, { title: '5a Reunión Anual del C-MIC', path: '5areunion' }, { title: 'Próximos eventos', path: 'eventos' }] },
          { title: 'Miembros', path: '/Miembros', submenus: [{ title: 'Registro', path: 'registro' }, { title: 'Directorio', path: 'directorio' }, { title: 'Ingresar', path: 'ingresar' }, { title: 'Investigadores', path: 'investigadores' }, { title: 'Estudiantes', path: 'estudiantes' }] },
          { title: 'Contacto', path: '/contacto' }
        ]
      }
    }
  },
  methods: {
    adminSignOut () {
      this.$store.dispatch('adminSignOut')
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