<template>
  <v-container fluid grid-list-lg style="bacgroundColor=#FFFFFF">
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
            <v-btn flat color="secondary" class="elevation-6">Registrarse</v-btn>
            <v-btn flat color="secondary">Mas información</v-btn>
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
                      <v-btn small color="secondary" class="mx-0">Leer mas</v-btn>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-card class="elevation-6">
          <v-card-title primary-title>
            <v-layout fluid justify-center>
              <img
                width="50%"
                height="50%"
                :src="img"
              >
            </v-layout>
          </v-card-title>
          <v-card-title primary-title>
            <div>
              <div class="headline primary--text">ACERCA DE NOSOTROS</div>
            </div>
          </v-card-title>
          <v-card-text>
            El Colegio Mexicano para la Investigación del Cáncer® (C-MIC®) es una asociación civil, integrada por científicos reconocidos tanto a nivel nacional e internacional como líderes en el desarrollo de proyectos de investigación básica, clínica, traslacional, epidemiológica, farmacológica y social asociada al estudio del cáncer en sus diferentes manifestaciones y etapas.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" large class="elevation-6" @click.native="show = !show" v-if="!show">
              Leer mas
            </v-btn>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="show">
              <v-tabs
                centered
                slider-color="secondary"
                v-model="tab"
              >
                <v-tab
                  v-for="i in tabs"
                  :key="i"
                  :href="`#tab-${i.num}`"
                >
                  {{ i.nombre }}
                </v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab">
                <v-tab-item
                  v-for="i in tabs"
                  :key="i"
                  :id="`tab-${i}`"
                >
                  <v-card flat>
                    <v-card-text>{{i.texto}}</v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card-text>
          </v-slide-y-transition>
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
        tab: 'tab-1',
        tabs: [
          {num: 1, nombre: 'Historia', texto: 'El Colegio Mexicano para la Investigación del Cáncer® (C-MIC®) surge de la iniciativa de investigadores mexicanos para unificar los esfuerzos que se realizan en el desarrollo de proyectos en cáncer a nivel nacional. El 17 de junio de 2015 se llevó a cabo la primera reunión del C-MIC® en las instalaciones del Instituto Nacional de Cancerología, a la cual acudieron 45 investigadores, jefes de grupo, de distintas instituciones académicas. Actualmente, el C-MIC® cuenta con 744 miembros, entre investigadores, estudiantes y no académicos, y está presente en 17 estados de la República en diversas instituciones académicas de importancia nacional.'},
          {num: 2, nombre: 'Misión', texto: 'Promover la vinculación institucional y personal entre la comunidad científica que realiza investigación en cáncer a nivel nacional.'},
          {num: 3, nombre: 'Visión', texto: 'Ser la asociación que concentre a todos los actuales y futuros científicos interesados en el desarrollo de proyectos de investigación en cáncer, consolidándose como un referente a nivel nacional e internacional.'},
          {num: 4, nombre: 'Estrategias', texto: 'Establecer la vinculación institucional entre la comunidad científica que realiza investigación en cáncer a nivel nacional.Aumentar del alcance nacional del Colegio mediante la incorporación de nuevos institutos y centros de investigación.Fomentar la formación y especialización de recursos humanos para el desarrollo de investigación de alta calidad.Difundir la información generada a la sociedad mexicana mediante artículos de divulgación y spots informativos.Elaboración de manuales de métodos de investigación con el fin de homogenizar nuestra forma de trabajo y facilitar la interacción.'}
        ]
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
