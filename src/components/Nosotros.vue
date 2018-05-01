<template>
  <v-container fluid grid-list-lg style="bacgroundColor=#FFFFFF">
    <v-layout row id="nosotros" my-5>
      <v-flex xs12>
        <h1 class="mb-5 display-2 primary--text text-xs-center">NOSOTROS</h1>
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
              <div class="headline primary--text">Acerca de nosotros</div>
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
            <v-card-text v-if="show">
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
                  :id="`tab-${i.num}`"
                >
                  <v-card flat>
                    <v-card-text v-if="typeof i.texto !== 'object'">{{i.texto}}</v-card-text>
                    <v-card-text v-else>
                      <ul class="mx-5">
                        <li v-for="l in i.texto" :key="l">
                          {{l.texto}}
                        </li>
                      </ul>
                    </v-card-text>
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
  import logo from '../assets/C-MIC.png'

  export default {
    data () {
      return {
        img: logo,
        show: false,
        tab: 'tab-1',
        tabs: [
          {num: 1, nombre: 'Historia', texto: 'El Colegio Mexicano para la Investigación del Cáncer® (C-MIC®) surge de la iniciativa de investigadores mexicanos para unificar los esfuerzos que se realizan en el desarrollo de proyectos en cáncer a nivel nacional. El 17 de junio de 2015 se llevó a cabo la primera reunión del C-MIC® en las instalaciones del Instituto Nacional de Cancerología, a la cual acudieron 45 investigadores, jefes de grupo, de distintas instituciones académicas. Actualmente, el C-MIC® cuenta con 744 miembros, entre investigadores, estudiantes y no académicos, y está presente en 17 estados de la República en diversas instituciones académicas de importancia nacional.'},
          {num: 2, nombre: 'Misión', texto: 'Promover la vinculación institucional y personal entre la comunidad científica que realiza investigación en cáncer a nivel nacional.'},
          {num: 3, nombre: 'Visión', texto: 'Ser la asociación que concentre a todos los actuales y futuros científicos interesados en el desarrollo de proyectos de investigación en cáncer, consolidándose como un referente a nivel nacional e internacional.'},
          {num: 4, nombre: 'Estrategias', texto: [{texto: 'Establecer la vinculación institucional entre la comunidad científica que realiza investigación en cáncer a nivel nacional.'}, {texto: 'Aumentar del alcance nacional del Colegio mediante la incorporación de nuevos institutos y centros de investigación.'}, {texto: 'Fomentar la formación y especialización de recursos humanos para el desarrollo de investigación de alta calidad.'}, {texto: 'Difundir la información generada a la sociedad mexicana mediante artículos de divulgación y spots informativos.'}, {texto: 'Elaboración de manuales de métodos de investigación con el fin de homogenizar nuestra forma de trabajo y facilitar la interacción.'}]}
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
.fondologo{
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: cover !important;
}
</style>
