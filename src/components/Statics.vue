<template>
  <v-container fluid fill-height>
    <v-layout row wrap align-center justify-center style="margin-top:48px">
      <v-flex xs12 class='text-xs-center'>
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
              <v-toolbar dense>
                <v-spacer class="hidden-sm-and-down"></v-spacer>
                <v-toolbar-items>
                  <download-excel
                    class   = "btn"
                    style   = "cursor:pointer"
                    :data   = "instituciones"
                    :fields = "json_fields_ins"
                    name    = "CMIC-instituciones.xls">
                    XLS<v-icon right small>file_download</v-icon>
                  </download-excel>
                  <v-btn color="success" :href="instituciones_csv" download="CMIC-instituciones.csv" target="_blank">CSV<v-icon right small>file_download</v-icon></v-btn>
                </v-toolbar-items>
              </v-toolbar>
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
              <v-toolbar dense>
                <v-spacer class="hidden-sm-and-down"></v-spacer>
                <v-toolbar-items>
                  <download-excel
                    class   = "btn"
                    style   = "cursor:pointer"
                    :data   = "generos"
                    :fields = "json_fields_gen"
                    name    = "CMIC-generos.xls">
                    XLS<v-icon right small>file_download</v-icon>
                  </download-excel>
                  <v-btn color="success" :href="generos_csv" download="CMIC-generos.csv" target="_blank">CSV<v-icon right small>file_download</v-icon></v-btn>
                </v-toolbar-items>
              </v-toolbar>            
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
              <v-toolbar dense>
                <v-spacer class="hidden-sm-and-down"></v-spacer>
                <v-toolbar-items>
                  <download-excel
                    class   = "btn"
                    style   = "cursor:pointer"
                    :data   = "entidades"
                    :fields = "json_fields_ent"
                    name    = "CMIC-entidades.xls">
                    XLS<v-icon right small>file_download</v-icon>
                  </download-excel>
                  <v-btn color="success" :href="entidades_csv" download="CMIC-entidades.csv" target="_blank">CSV<v-icon right small>file_download</v-icon></v-btn>
                </v-toolbar-items>
              </v-toolbar>                
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
              <v-toolbar dense>
                <v-spacer class="hidden-sm-and-down"></v-spacer>
                <v-toolbar-items>
                  <download-excel
                    class   = "btn"
                    style   = "cursor:pointer"
                    :data   = "grados"
                    :fields = "json_fields_gra"
                    name    = "CMIC-grados.xls">
                    XLS<v-icon right small>file_download</v-icon>
                  </download-excel>
                  <v-btn color="success" :href="grados_csv" download="CMIC-grados.csv" target="_blank">CSV<v-icon right small>file_download</v-icon></v-btn>
                </v-toolbar-items>
              </v-toolbar>  
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
              <v-toolbar dense>
                <v-spacer class="hidden-sm-and-down"></v-spacer>
                <v-toolbar-items>
                  <download-excel
                    class   = "btn"
                    style   = "cursor:pointer"
                    :data   = "tipos"
                    :fields = "json_fields_tip"
                    name    = "CMIC-tipos.xls">
                    xls<v-icon right small>file_download</v-icon>
                  </download-excel>
                  <v-btn color="success" :href="tipos_csv" download="CMIC-tipos.csv" target="_blank">CSV<v-icon right small>file_download</v-icon></v-btn>
                </v-toolbar-items>
              </v-toolbar>  
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
    miembros: miembrosRef
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
  mounted () {
    for (let m in this.miembros) {
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
  },
  methods: {
    convertArrayOfObjectsToCSV (args) {
      var result, ctr, keys, columnDelimiter, lineDelimiter, data
      data = args.data || null
      if (data == null || !data.length) {
        return null
      }
      columnDelimiter = args.columnDelimiter || ','
      lineDelimiter = args.lineDelimiter || '\n'
      keys = Object.keys(data[0])
      result = ''
      result += keys.join(columnDelimiter)
      result += lineDelimiter
      data.forEach(function (item) {
        ctr = 0
        keys.forEach(function (key) {
          if (ctr > 0) result += columnDelimiter
          result += '"' + item[key].toString().replace(/"/g, '""') + '"'
          ctr++
        })
        result += lineDelimiter
      })
      return result
    },
    downloadCSV (datos) {
      var data
      var csv = this.convertArrayOfObjectsToCSV({
        data: datos
      })
      if (csv == null) return
      if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + escape(csv)
      }
      data = csv
      return data
    }
  },
  computed: {
    instituciones_csv () {
      return this.downloadCSV(this.instituciones)
    },
    generos_csv () {
      return this.downloadCSV(this.generos)
    },
    entidades_csv () {
      return this.downloadCSV(this.entidades)
    },
    grados_csv () {
      return this.downloadCSV(this.grados)
    },
    tipos_csv () {
      return this.downloadCSV(this.tipos)
    }
  }
}
</script>
