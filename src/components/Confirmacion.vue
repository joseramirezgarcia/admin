<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md10>
        <v-card class="elevation-24">
          <v-card-text>
            Sus datos han sido registrados correctamente.
            <pre>{{datos}}</pre>
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
<style>
.content--wrap {
  background: url('../assets/fondo.jpg') no-repeat center center;
  background-size: cover;
}
</style>