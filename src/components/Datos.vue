<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs12 sm10 md9 lg8>
        <v-btn @click='userSignOut'>
          Salir
        </v-btn>
      </v-flex>
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
      datos: null
    }
  },
  methods: {
    userSignOut () {
      this.$store.dispatch('userSignOut')
    },
    llenarDatos () {
      this.datos = this.miembros.filter(m => m.personal.toString() === fb.auth().currentUser.email.toString())
      console.log(this.datos)
      if (this.datos.length > 0) {
        console.log(this.datos)
      } else {
        this.userSignOut()
      }
    }
  }
}
</script>