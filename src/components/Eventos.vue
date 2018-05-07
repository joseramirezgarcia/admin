<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class='text-xs-center'>
        <h1 class="mb-5 display-2 primary--text text-xs-center">PRÓXIMOS EVENTOS</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="elevation-12 my-3">
            <v-card-media :src="evento0" height="200px">
            </v-card-media>
            <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">5a Reunión Anual del Colegio Mexicano para la Investigación del Cáncer</h3>
                <div>26-29 Septiembre 2018</div>
                <div>Teatro del CCU</div>
            </div>
            </v-card-title>
            <v-card-actions>
            <v-btn flat color="secondary" :to="{name: '5areunion'}" target="_blank">Información</v-btn>
            </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="elevation-12 my-3">
            <v-card-media :src="evento1" height="200px">
            </v-card-media>
            <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">4ta Edición #Yo Corro VS El Cancer</h3>
                <div>17 JUN 2018 07:00 HRS</div>
                <div>Monterrey, NL. Palacio Municipal</div>
            </div>
            </v-card-title>
            <v-card-actions>
            <v-btn flat color="secondary" href="http://c-mic.mx/PDF/carrera018.pdf" target="_blank">Información</v-btn>
            </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="elevation-12 my-3">
            <v-card-media :src="evento2" height="200px">
            </v-card-media>
            <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">4o CONGRESO NACIONAL DE INVESTIGACIÓN CLÍNICA</h3>
                <div>Mayo 15 y 17, 2018</div>
                <div>Ciudad de México</div>
            </div>
            </v-card-title>
            <v-card-actions>
            <v-btn flat color="secondary" href="http://c-mic.mx/PDF/4oCongreso.pdf" target="_blank">Información</v-btn>
            <v-btn flat color="secondary" href="http://c-mic.mx/PDF/Agenda_4oCongreso.pdf" target="_blank">Agenda</v-btn>
            </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import evento0 from '../assets/5reunionanual.jpg'
import evento1 from '../assets/evento1.jpg'
import evento2 from '../assets/evento2.jpg'

export default {
  data () {
    return {
      evento0: evento0,
      evento1: evento1,
      evento2: evento2
    }
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
