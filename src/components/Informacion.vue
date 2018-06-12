<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2 v-if="datos">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark>
            <v-spacer></v-spacer>            
            <v-toolbar-title style="font-size:100%">{{datos.nombre}} {{datos.paterno}} {{datos.materno}}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-list two-line>
            <template v-for="(campo, titulo, index) in campos">
              <v-list-tile :key="index + 'tile'" v-if="datos[campo] !== ''">
                <v-list-tile-content>
                  <v-list-tile-sub-title>
                    {{titulo}}
                  </v-list-tile-sub-title>
                  <v-list-tile-title v-if="campo === 'institucional' || campo === 'personal'">
                    <a class="primary--text" :href="'mailto:' + datos[campo]">{{datos[campo]}}</a>
                  </v-list-tile-title>
                  <v-list-tile-title v-else>
                    {{datos[campo]}}
                  </v-list-tile-title>                  
                </v-list-tile-content>
              </v-list-tile>
              <v-divider :key="index + 'divider'" v-if="datos[campo] !== ''"></v-divider>              
            </template>
          </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="info" to='/miembros/datos'>Actualizar datos</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="info" @click.native="enviar">Cambiar contraseña</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm8 offset-sm2 v-else>
        <h2 style="text-align:center" class="primary--text">Datos no encontrados</h2>
      </v-flex>
      <v-btn
        dark
        fab
        fixed
        right
        top
        color="tertiary"
        title="Descargar archivo"
        @click='userSignOut'
      >
        Salir
      </v-btn>
      <v-snackbar
        :timeout="1500"
        :bottom="true"
        v-model="snackbar"
        :color="'primary'"
      >
        {{ mensaje }}
        <v-btn flat color="white" @click.native="snackbar = false">Cerrar</v-btn>
      </v-snackbar>
    </v-layout>
  </v-container>
</template>

<script>
import { fb } from '../config/firebase'

let db = fb.database()
let miembrosRef = db.ref('miembros')
export default {
  firebase: {
    miembros: {
      source: miembrosRef,
      readyCallback: function () {
        this.llenarDatos()
      }
    }
  },
  data () {
    return {
      snackbar: false,
      mensaje: '',
      datos: null,
      campos: {
        'Membresia': 'membresia',
        'Fecha': 'fecha',
        'Tipo de miembro': 'tipo',
        'Género': 'genero',
        'Grado académico': 'grado',
        'RFC': 'rfc',
        'CVU': 'cvu',
        'Pertenece al SNI': 'sni',
        'Nivel SNI': 'nivel',
        'Area SNI': 'area',
        'Campo de conocimiento': 'campo',
        'Area de conocimiento': 'subcampo',
        'Institución': 'institucion',
        'Dirección de la institición': 'direccion',
        'País': 'pais',
        'Entidad': 'entidad',
        'Teléfono': 'telefono',
        'Celular': 'celular',
        'Correo electrónico institucional': 'institucional',
        'Correo electrónico personal': 'personal'
      }
    }
  },
  methods: {
    userSignOut () {
      this.$store.dispatch('userSignOut')
    },
    llenarDatos () {
      let datos = this.miembros.filter(m => m.personal.toString() === fb.auth().currentUser.email.toString())
      if (datos.length > 0) {
        this.datos = datos[0]
      } else {
        this.userSignOut()
      }
    },
    enviar () {
      this.snackbar = true
      this.mensaje = 'Datos enviados a su correo electrónico'
      fb.auth().sendPasswordResetEmail(fb.auth().currentUser.email.toString())
      let that = this
      setTimeout(function () { that.userSignOut() }, 1500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #c41949;
}
</style>
