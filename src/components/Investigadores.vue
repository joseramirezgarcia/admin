<template>
  <v-container fluid>
    <v-layout wrap row align-top>
      <v-flex xs12>
        <h1 class="mb-5 display-2 primary--text text-xs-center">INVESTIGADORES</h1>
        <v-toolbar dark color="primary">
          <v-toolbar-title class="white--text mx-auto">Contamos con investigadores en las siguientes entidades</v-toolbar-title>
        </v-toolbar>
        <v-card class="elevation-6">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs6>
                <geo-chart 
                  :data="chartData" 
                  :colors="['#194e91', '#194e91']"
                  :library="{
                    region: 'MX', 
                    resolution: 'provinces', 
                    /*tooltip: {
                      pointFormat: ': <b>{capital}</b>'
                    }*/
                  }"
                  label="Investigadores"
                  >
                </geo-chart>
              </v-flex>
              <v-flex xs6>
                <v-list dense>
                  <v-list-tile v-for="e in estados" :key="e" dense>
                    <v-list-tile-content>{{e}}</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-top fill-height my-5>
      <v-flex xs12 sm12>
        <v-toolbar dark color="tertiary">
          <v-toolbar-title class="white--text mx-auto">Composición de los miembros del C-MIC</v-toolbar-title>
        </v-toolbar>
        <v-card class="elevation-6">
          <v-card-text>
            <pie-chart :data="generos" :colors="['#194e91', '#009CDE']"></pie-chart>
            <pie-chart :data="grados" :colors="['#194e91', '#009CDE', '#bebebe' ]"></pie-chart>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>    
  </v-container>
</template>

<script>
import { fb } from '../config/firebase'

let db = fb.database()
let miembrosRef = db.ref('miembros')

export default {
  name: 'Investigadores',
  firebase: {
    miembros: {
      source: miembrosRef,
      readyCallback: function () {
        this.obtenerDatos()
      }
    }
  },
  data () {
    return {
      estados: [],
      chartData: [],
      hombres: 0,
      mujeres: 0,
      maestria: 0,
      doctorado: 0,
      otro: 0,
      generos: [],
      grados: []
    }
  },
  methods: {
    obtenerDatos () {
      for (let m of this.miembros) {
        if (m.tipo === 'INVESTIGADOR') {
          if (m.pais === 'MEXICO' && this.estados.filter(e => e === m.entidad).length < 1) {
            let entidad = m.entidad
            if (entidad === 'CIUDAD DE MEXICO') {
              entidad = 'DISTRITO FEDERAL'
            } else if (entidad === 'ESTADO DE MEXICO') {
              entidad = 'ESTADO DE MÉXICO'
            } else if (entidad === 'NUEVO LEON') {
              entidad = 'NUEVO LEÓN'
            } else if (entidad === 'YUCATAN') {
              entidad = 'YUCATÁN'
            }
            this.estados.push(m.entidad)
            let numero = this.miembros.filter(n => n.entidad === m.entidad).length
            this.chartData.push([entidad, numero])
          }
          if (m.genero === 'MASCULINO') {
            this.hombres++
          } else {
            this.mujeres++
          }
          if (m.grado === 'MAESTRIA') {
            this.maestria++
          } else if (m.grado === 'DOCTORADO') {
            this.doctorado++
          } else {
            this.otro++
          }
        }
      }
      this.generos.push(['Hombres', this.hombres])
      this.generos.push(['Mujeres', this.mujeres])
      this.grados.push(['Maestros en ciencias', this.maestria])
      this.grados.push(['Doctores en ciencias', this.doctorado])
      this.grados.push(['Otros grados académicos', this.otro])
      this.estados.sort()
    }
  }
}
</script>
