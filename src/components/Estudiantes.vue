<template>
  <v-layout>
    <v-flex xs12 sm10 offset-sm1 mb-5>
      <h1 class="mb-5 display-2 primary--text text-xs-center">ESTUDIANTES</h1>
      <v-card class="elevation-12">
        <v-card-media :src="imagen" height="200px">
        </v-card-media>
        <v-card-text>
          <div>
            <p>Uno de los principales objetivos del C-MIC® es identificar y concentrar la oferta educativa actual para formar futuros científicos en el área, tanto de pre-grado como de posgrado asociados a la investigación del cáncer.</p>
            <p>Se considera un estudiante miembro del C-MIC® a todas aquellas personas que se encuentren inscritas en algún programa de licenciatura, o posgrado y que desarrollen un proyecto enfocado a la generación de conocimientos para el estudio del cáncer.</p>
            <p>El Colegio diseñará actividades académicas de especialización, así como la orientación y financiamiento para que los estudiantes desempeñen un papel fundamental en establecer colaboraciones, a través de la participación en congresos y estancias en laboratorios nacionales y extranjeros, que realizan investigación en cáncer.</p>
            <p>Por lo tanto, la figura del estudiante dentro del C-MIC® es de fundamental importancia para que éste sea identificado como un referente a nivel nacional y mundial.</p>
            <h3 class="headline">Objetivos Generales</h3>
            <p>Generar una red de estudiantes que realicen investigación enfocada al entendimiento, prevención, diagnóstico y tratamiento del cáncer dentro de los distintos centros especializados del país.</p>
            <h3 class="headline">Objetivos Particulares</h3>
            <ul class="mx-3">
              <li>Buscar fuentes de financiamientos para los alumnos que realicen trabajos en investigación en cáncer.</li>
              <li>Identificar y concentrar la oferta educativa actual para formar futuros científicos en el área, tanto de pre-grado como de posgrado asociados a la investigación del cáncer.</li>
              <li>Realizar reuniones que permitan la interacción científica y social entre los estudiantes del colegio.</li>
            </ul>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import estudiantes from '../assets/estudiantes.jpg'

export default {
  data () {
    return {
      imagen: estudiantes
    }
  }
}
</script>

<style scoped>
  p, li {
    text-align: justify;
  }
</style>