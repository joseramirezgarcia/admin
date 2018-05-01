<template>
  <v-container fluid grid-list-lg my-3>
    <v-layout wrap row align-top fill-height>
      <v-flex xs12 sm6> 
        <v-card class="elevation-6" height="100%">
          <v-card-media :src="image" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">5a Reunión Anual del Colegio Mexicano para la Investigación del Cáncer</h3>
              <span class="grey--text">26-29 septiembre 2018</span><br>
              <div>{{card_text}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn :to="{name: 'inscripcion'}" flat color="secondary" class="elevation-6">Registrarse</v-btn>
            <v-btn :to="{name: '5areunion'}" flat color="secondary">Mas información</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-toolbar dark color="secondary">
          <v-toolbar-title class="white--text mx-auto">Ponentes confirmados para la 5a reunión anual</v-toolbar-title>
        </v-toolbar>
        <v-carousel class="elevation-6" height="100%">
          <v-carousel-item v-for="(item,i) in items" :key="i" class="fondo">
            <v-card class="white--text fondo" height="100%"  :style="{ 'background': 'url(\'' + image + '\') ' }" fondo>
              <v-container fluid>
                <v-layout wrap row align-top px-5>
                  <v-flex xs12>
                    <div>
                      <v-layout fluid justify-center>
                        <img
                          class="elevation-24 thumbnail"
                          :src="item.src"
                          width="50%"
                          height="50%"
                          contain
                        >
                      </v-layout>
                      <h2 class="headline text-xs-center my-2">{{item.nombre}}</h2>
                      <div class="text-xs-justify">{{item.texto}}</div>
                      <v-divider></v-divider>
                      <v-btn small color="secondary" class="mx-0" :to="{name: '5areunion'}">Leer mas</v-btn>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-top fill-height mb-5>
      <v-flex xs12 sm12>
        <v-toolbar dark color="primary">
          <v-toolbar-title class="white--text mx-auto">¿Qué beneficios obtiene al ser miembro del Colegio?</v-toolbar-title>
        </v-toolbar>
        <v-card class="elevation-6" height="100%">
          <v-card-text>
            <ul class="mx-3">
              <li v-for="(b,index) in beneficios" :key="index">
                {{b.beneficio}}
              </li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn :to="{name: 'registro'}" large color="primary" class="elevation-6">Registrarse</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import fondo from '../assets/5reunionanual.jpg'
  import logo from '../assets/C-MIC.png'

  export default {
    data () {
      return {
        image: fondo,
        img: logo,
        show: false,
        card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.',
        items: [
          {
            src: 'http://5a-reunion.c-mic.mx/images/2018/04/26/armandozurita.png',
            nombre: 'Amado J. Zurita-Saavedra',
            texto: 'La Investigación del Dr. Zurita tiene el objetivo de mejorar la detección del cáncer de próstata y su metástasis a hueso, para finalmente prevenir la metástasis, un evento que contribuye a la letalidad de la enfermedad.'
          },
          {
            src: 'http://5a-reunion.c-mic.mx/images/2018/04/26/adrianpuello.png',
            nombre: 'Adrián Puello Guerrero',
            texto: 'El Dr. Adrián Puello, originario de República Dominicana, realizó sus estudios de medicina en la Universidad Autónoma de Santo Domingo. Posteriormente, realizó una maestría en Epidemiología en la Universidad Victor Segalen en Burdeos, Francia.'
          },
          {
            src: 'http://5a-reunion.c-mic.mx/images/2018/04/26/jaimedelagarza.png',
            nombre: 'Jaime de la Garza Salazar',
            texto: 'El primer mexicano en ganar el Distinguished Achievement Award de la Sociedad Americana de Oncología Clínica, es egresado de la Facultad de Medicina de la Universidad Autónoma de Nuevo León.'
          },
          {
            src: 'http://5a-reunion.c-mic.mx/images/2018/04/26/williamearnshaw.png',
            nombre: 'William C. Earnshaw',
            texto: 'William C. Earnshaw completó su Ph.D. con Jonathan King en el MIT en 1977. Concluyo su formación posdoctoral en Cambridge con Aaron Klug y Ron Laskey y Geneva con Ulrich Laemmli y continuó con su formación por 13 años en la Facultad de Medicina Johns Hopkins en el Departamento de Biología Celular y Anatomía de Tom Pollard.'
          }
        ],
        beneficios: [
          {beneficio: 'Pertenecer a una comunidad científica que realiza investigación en cáncer a nivel nacional y con proyección internacional.'},
          {beneficio: 'Ser invitado al Congreso anual, lo que te permite establecer una relación directa con ponentes internacionales. Los mejores investigadores a nivel internacional estarán ahí para compartir sus últimos avances científicos.'},
          {beneficio: 'Participar de reuniones para estudiantes una vez al mes, donde un investigador reconocido expone un tema de interés y después hay un encuentro para hacer networking con otros estudiantes.'},
          {beneficio: 'Tener acceso a convocatorias exclusivas para estudios en el extranjero.'},
          {beneficio: 'Dar a conocer tu trabajo a través de artículos de divulgación y presencia en medios.'}
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.fondo{
  background-repeat: no-repeat !important;
  background-position: right top !important;
  background-size: inherit !important;
}
.fondologo{
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: cover !important;
}
.thumbnail {
  display: inline-block;
  max-width: 100%; /* only this one important */
  max-height: 50%;
  margin-bottom: 1rem;
  border: solid 3px #fefefe;
  border-radius: 10px;
  box-shadow: 0 0 0 1px rgba(10, 10, 10, 0.2);
  line-height: 0; }
</style>
