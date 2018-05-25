<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class='text-xs-center'>
        <h1 class="mb-5 display-2 primary--text text-xs-center">PRÓXIMOS EVENTOS</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 v-for="(e,index) in eventos" :key="index">
        <v-card class="elevation-12 my-3">
            <v-card-media :src="e.imagen" height="200px">
            </v-card-media>
            <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">{{e.titulo}}</h3>
                <div>{{e.fecha}}</div>
                <div>{{e.lugar}}</div>
            </div>
            </v-card-title>
            <v-card-actions>
              <template v-for="(b,indice) in e.links">
                <v-btn flat color="secondary" :to="{name: b.url}" target="_blank" :key="indice" v-if="b.tipo==='seccion'">{{b.titulo}}</v-btn>
                <v-btn flat color="secondary" :href="b.url" target="_blank" :key="indice" v-if="b.tipo==='url'">{{b.titulo}}</v-btn>
              </template>
            </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { fb } from '../config/firebase'

let db = fb.database()
let eventosRef = db.ref('web/eventos')

export default {
  name: 'Inicio',
  firebase: {
    eventos: eventosRef
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.card__media >>> .card__media__background {
  background-position: top center !important;
}
</style>
