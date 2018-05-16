<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class='text-xs-center'>
        <h1 class="mb-5 display-2 primary--text text-xs-center">PRÓXIMOS EVENTOS</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="elevation-12 my-3">
            <v-card-media src="http://c-mic.mx/img/5reunionanual.jpg" height="200px">
            </v-card-media>
            <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">5a Reunión Anual del Colegio Mexicano para la Investigación del Cáncer</h3>
                <div>26 - 29 Septiembre 2018</div>
                <div>Teatro del CCU, BUAP, Puebla</div>
            </div>
            </v-card-title>
            <v-card-actions>
            <v-btn flat color="secondary" :to="{name: '5areunion'}" target="_blank">Información</v-btn>
            </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="elevation-12 my-3">
            <v-card-media src="http://c-mic.mx/img/evento2.jpg" height="200px">
            </v-card-media>
            <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">4o CONGRESO NACIONAL DE INVESTIGACIÓN CLÍNICA</h3>
                <div>15 - 17 Mayo 2018</div>
                <div>Auditorio Instituto Nacional de Cancerología, CDMX</div>
                <div>Hotel Radisson Perisur, CDMX</div>
            </div>
            </v-card-title>
            <v-card-actions>
            <v-btn flat color="secondary" href="http://c-mic.mx/PDF/4oCongreso.pdf" target="_blank">Información</v-btn>
            <v-btn flat color="secondary" href="http://c-mic.mx/PDF/Agenda_4oCongreso.pdf" target="_blank">Agenda</v-btn>
            </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="elevation-12 my-3">
            <v-card-media src="http://c-mic.mx/img/evento3.jpg" height="200px">
            </v-card-media>
            <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">Seminario Medicina de Precisión en el Siglo XXI</h3>
                <div>21 - 22 Mayo 2018</div>
                <div>Donceles 104, Centro histórico, CDMX</div>
            </div>
            </v-card-title>
            <v-card-actions>
            <v-btn flat color="secondary" href="http://c-mic.mx/PDF/SeminarioMedicinaPrecision.pdf" target="_blank">Información</v-btn>
            </v-card-actions>
        </v-card>
      </v-flex>      
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="elevation-12 my-3">
            <v-card-media src="http://c-mic.mx/img/banner04.jpg" height="200px">
            </v-card-media>
            <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">Workshop Practices in Bioinformatics and Systems Biology</h3>
                <div>23 - 24 Mayo 2018</div>
                <div>Laboratorio de Matemática Aplicada y Cómputo de Alto Rendimiento (Cinvestav)</div>
                <div>Estado de México</div>
            </div>
            </v-card-title>
            <v-card-actions>
            <v-btn flat color="secondary" href="http://c-mic.mx/PDF/TallerBioinformatica.pdf" target="_blank">Información</v-btn>
            </v-card-actions>
        </v-card>
      </v-flex>      
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="elevation-12 my-3">
            <v-card-media src="http://c-mic.mx/img/evento1.jpg" height="200px">
            </v-card-media>
            <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">4ta Edición #Yo Corro VS El Cancer</h3>
                <div>17 Junio 2018</div>
                <div>Palacio Municipal Monterrey, NL.</div>
            </div>
            </v-card-title>
            <v-card-actions>
            <v-btn flat color="secondary" href="http://c-mic.mx/PDF/carrera018.pdf" target="_blank">Información</v-btn>
            </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

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
