<template>
  <v-container fluid>
    <v-layout row wrap align-center justify-center style="margin-top:48px">
      <v-flex xs12 class='text-xs-center' my-3>
        <h1>Estadísticas</h1>
      </v-flex>
      <v-flex xs12 sm8 class='text-xs-center' mb-5>
        <v-tabs
          color="grey"
          fixed-tabs
          show-arrows
          prev-icon="chevron_left"
          next-icon="chevron_right"
        >
          <v-tabs-slider color="black"></v-tabs-slider>
          <v-tab
            class="white--text"
            key="1"
            href="#tab-1"
          >
            Instituciones
          </v-tab>
          <v-tab
            class="white--text"
            key="2"
            href="#tab-2"
          >
            Géneros
          </v-tab>
          <v-tab
            class="white--text"
            key="3"
            href="#tab-3"
          >
            Entidades
          </v-tab>
          <v-tab
            class="white--text"
            key="4"
            href="#tab-4"
          >
            Grados Académicos
          </v-tab>
          <v-tab
            class="white--text"
            key="5"
            href="#tab-5"
          >
            Tipos de Miembro
          </v-tab>
          <v-tabs-items>
            <v-tab-item
              key="1"
              id="tab-1"
            >
              <v-btn
                small
                dark
                fab
                fixed
                right
                bottom
                color="success"
                :href="instituciones_csv"
                :download="'CMIC-instituciones-' + hoy + '.csv'"
                title="Descargar archivo"
              >
                <v-icon>file_download</v-icon>
              </v-btn>
              <v-data-table
                :headers="headers_ins"
                :items="instituciones"
                hide-actions
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">{{ props.item.institucion }}</td>
                  <td class="text-xs-left">{{ props.item.total }}</td>
                </template>
                <template slot="footer">
                  <td class="text-xs-left"><strong>TOTAL</strong></td>
                  <td class="text-xs-left">{{ miembros.length }}</td> 
                </template>
              </v-data-table>
            </v-tab-item>
            <v-tab-item
              key="2"
              id="tab-2"
            >
              <v-btn
                small
                dark
                fab
                fixed
                right
                bottom
                color="success"
                :href="generos_csv"
                :download="'CMIC-generos-' + hoy + '.csv'"
                title="Descargar archivo"
              >
                <v-icon>file_download</v-icon>
              </v-btn>                        
              <v-data-table
                :headers="headers_gen"
                :items="generos"
                hide-actions
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">{{ props.item.genero }}</td>
                  <td class="text-xs-left">{{ props.item.total }}</td>
                </template>
                <template slot="footer">
                  <td class="text-xs-left"><strong>TOTAL</strong></td>
                  <td class="text-xs-left">{{ miembros.length }}</td> 
                </template>
              </v-data-table>
            </v-tab-item>
            <v-tab-item
              key="3"
              id="tab-3"
            >
              <v-btn
                small
                dark
                fab
                fixed
                right
                bottom
                color="success"
                :href="entidades_csv"
                :download="'CMIC-entidades-' + hoy + '.csv'"
                title="Descargar archivo"
              >  
                <v-icon>file_download</v-icon>
              </v-btn>                            
              <v-data-table
                :headers="headers_ent"
                :items="entidades"
                hide-actions
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">{{ props.item.entidad }}</td>
                  <td class="text-xs-left">{{ props.item.total }}</td>
                </template>
                <template slot="footer">
                  <td class="text-xs-left"><strong>TOTAL</strong></td>
                  <td class="text-xs-left">{{ miembros.length }}</td> 
                </template>
              </v-data-table>
            </v-tab-item>
            <v-tab-item
              key="4"
              id="tab-4"
            >
              <v-btn
                small
                dark
                fab
                fixed
                right
                bottom
                color="success"
                :href="grados_csv"
                :download="'CMIC-grados-' + hoy + '.csv'"
                title="Descargar archivo"
              >
                <v-icon>file_download</v-icon>
              </v-btn>  
              <v-data-table
                :headers="headers_gra"
                :items="grados"
                hide-actions
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">{{ props.item.grado }}</td>
                  <td class="text-xs-left">{{ props.item.total }}</td>
                </template>
                <template slot="footer">
                  <td class="text-xs-left"><strong>TOTAL</strong></td>
                  <td class="text-xs-left">{{ miembros.length }}</td> 
                </template>
              </v-data-table>
            </v-tab-item>
            <v-tab-item
              key="5"
              id="tab-5"
            >
              <v-btn
                small
                dark
                fab
                fixed
                right
                bottom
                color="success"
                :href="tipos_csv"
                :download="'CMIC-tipos-' + hoy + '.csv'"
                title="Descargar archivo"
              >      
                <v-icon>file_download</v-icon>
              </v-btn>  
              <v-data-table
                :headers="headers_tip"
                :items="tipos"
                hide-actions
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">{{ props.item.tipo }}</td>
                  <td class="text-xs-left">{{ props.item.total }}</td>
                </template>
                <template slot="footer">
                  <td class="text-xs-left"><strong>TOTAL</strong></td>
                  <td class="text-xs-left">{{ miembros.length }}</td> 
                </template>
              </v-data-table>
            </v-tab-item>
          </v-tabs-items>    
        </v-tabs>      
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { fb } from '../config/firebase'

let db = fb.database()
let miembrosRef = db.ref('miembros')

export default {
  name: 'Statics',
  firebase: {
    miembros: {
      source: miembrosRef,
      readyCallback: function () {
        this.llenarDatos()
      }
    }
  },
  data () {
    return {
      instituciones: [],
      headers_ins: [
        { text: 'Institución', value: 'institucion' },
        { text: 'Total', value: 'total' }
      ],
      json_fields_ins: {
        'Institución': 'institucion',
        'Total': 'total'
      },
      generos: [],
      headers_gen: [
        { text: 'Género', value: 'genero' },
        { text: 'Total', value: 'total' }
      ],
      json_fields_gen: {
        'Género': 'genero',
        'Total': 'total'
      },
      entidades: [],
      headers_ent: [
        { text: 'Entidad', value: 'entidad' },
        { text: 'Total', value: 'total' }
      ],
      json_fields_ent: {
        'Entidad': 'entidad',
        'Total': 'total'
      },
      grados: [],
      headers_gra: [
        { text: 'Grado Académico', value: 'grado' },
        { text: 'Total', value: 'total' }
      ],
      json_fields_gra: {
        'Grado académico': 'grado',
        'Total': 'total'
      },
      tipos: [],
      headers_tip: [
        { text: 'Tipo de miembro', value: 'tipo' },
        { text: 'Total', value: 'total' }
      ],
      json_fields_tip: {
        'Tipo de miembro': 'tipo',
        'Total': 'total'
      }
    }
  },
  methods: {
    convertArrayOfObjectsToCSV (args) {
      var result, ctr, keys, columnDelimiter, lineDelimiter, data, head
      data = args.data || null
      if (data == null || !data.length) {
        return null
      }
      head = args.head || Object.keys(data[0])
      columnDelimiter = args.columnDelimiter || ','
      lineDelimiter = args.lineDelimiter || '\n'
      keys = head
      result = ''
      ctr = 0
      keys.forEach(function (key) {
        if (ctr > 0) result += columnDelimiter
        result += key.text
        ctr++
      })
      result += lineDelimiter
      data.forEach(function (item) {
        ctr = 0
        keys.forEach(function (key) {
          if (item[key.value] !== undefined) {
            if (ctr > 0) result += columnDelimiter
            result += '"' + item[key.value].toString().replace(/"/g, '""') + '"'
            ctr++
          }
        })
        result += lineDelimiter
      })
      return result
    },
    downloadCSV (datos, encabezado) {
      var data
      var csv = this.convertArrayOfObjectsToCSV({
        data: datos,
        head: encabezado
      })
      if (csv == null) return
      if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + escape(csv)
      }
      data = csv
      return data
    },
    llenarDatos () {
      for (let m in this.miembros) {
        if (this.miembros[m].activo.toString() === 'SI') {
          if (this.instituciones.filter(i => i.institucion.toString() === this.miembros[m].institucion.toString()).length > 0) {
            let index = this.instituciones.findIndex(obj => obj.institucion.toString() === this.miembros[m].institucion.toString())
            this.instituciones[index].total = this.instituciones[index].total + 1
          } else {
            this.instituciones.push({institucion: this.miembros[m].institucion, total: 1})
          }
          if (this.generos.filter(i => i.genero.toString() === this.miembros[m].genero.toString()).length > 0) {
            let index = this.generos.findIndex(obj => obj.genero.toString() === this.miembros[m].genero.toString())
            this.generos[index].total = this.generos[index].total + 1
          } else {
            this.generos.push({genero: this.miembros[m].genero, total: 1})
          }
          if (this.entidades.filter(i => i.entidad.toString() === this.miembros[m].entidad.toString()).length > 0) {
            let index = this.entidades.findIndex(obj => obj.entidad.toString() === this.miembros[m].entidad.toString())
            this.entidades[index].total = this.entidades[index].total + 1
          } else {
            this.entidades.push({entidad: this.miembros[m].entidad, total: 1})
          }
          if (this.grados.filter(i => i.grado.toString() === this.miembros[m].grado.toString()).length > 0) {
            let index = this.grados.findIndex(obj => obj.grado.toString() === this.miembros[m].grado.toString())
            this.grados[index].total = this.grados[index].total + 1
          } else {
            this.grados.push({grado: this.miembros[m].grado, total: 1})
          }
          if (this.tipos.filter(i => i.tipo.toString() === this.miembros[m].tipo.toString()).length > 0) {
            let index = this.tipos.findIndex(obj => obj.tipo.toString() === this.miembros[m].tipo.toString())
            this.tipos[index].total = this.tipos[index].total + 1
          } else {
            this.tipos.push({tipo: this.miembros[m].tipo, total: 1})
          }
        }
      }
    }
  },
  computed: {
    instituciones_csv () {
      return this.downloadCSV(this.instituciones, this.headers_ins)
    },
    generos_csv () {
      return this.downloadCSV(this.generos, this.headers_gen)
    },
    entidades_csv () {
      return this.downloadCSV(this.entidades, this.headers_ent)
    },
    grados_csv () {
      return this.downloadCSV(this.grados, this.headers_gra)
    },
    tipos_csv () {
      return this.downloadCSV(this.tipos, this.headers_tip)
    },
    hoy () {
      var today = new Date()
      var dd = today.getDate()
      var mm = today.getMonth() + 1
      var yyyy = today.getFullYear()
      if (dd < 10) {
        dd = '0' + dd
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      const hoy = yyyy + '-' + mm + '-' + dd
      return hoy
    }
  }
}
</script>
