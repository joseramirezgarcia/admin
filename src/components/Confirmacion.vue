<template>
  <v-container fluid fill-height style="background: url('http://c-mic.mx/img/fondo.jpg')" class='fondo'>
    <v-layout justify-center style="margin-top:280px">
      <v-flex xs12 sm10 md10>
        <v-card class="elevation-24">
          <v-card-text>
            <v-flex class="text-xs-center">
              Sus datos han sido registrados correctamente.
            </v-flex>
            <v-flex class="text-xs-center">
              <v-btn small style="font-size:10px" color="primary" to='/'>Volver al sitio web del C-MIC</v-btn>
            </v-flex>
            <v-flex class="text-xs-center">
              <v-btn small style="font-size:10px" color="primary" :to="{name: 'inscripcion'}">Registrarse en la 5a Reunión Anual</v-btn>
            </v-flex>            
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { fb } from '../config/firebase'

let db = fb.database()
export default {
  data () {
    return {
      datos: []
    }
  },
  props: ['miembro'],
  created () {
    let self = this
    db.ref('miembros/' + this.miembro).on('value', function (snapshot) {
      self.datos.push(snapshot.val())
    })
  }
}
</script>
<style scoped>
.fondo{
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: cover !important;
}
</style>