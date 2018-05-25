<template>
  <v-container fluid fill-height>
    <v-layout row wrap align-center justify-center style="margin-top:48px">
      <v-flex xs12 class='text-xs-center' my-3>
        <h1>Inicio</h1>
      </v-flex>
      <v-flex xs12 class='text-xs-center'>
        <v-card>
          <v-card-title>
            Miembros
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Buscar"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-card-title>   
          <v-data-table
            :rows-per-page-items="[10,25,50,100,{'text':'Todos','value':-1}]"
            rows-per-page-text="Miembros por página: "
            :headers='headers'
            :items='miembros'
            class='elevation-1'
            :pagination.sync="pagination"
            :search="search"
          >
            <template slot='items' slot-scope='props'>
              <td class="justify-center layout px-0">
                <v-btn icon class="mx-0" @click="editItem(props.item)" title="Editar">
                  <v-icon color="orange">edit</v-icon>
                </v-btn>
                <v-btn icon class="mx-0" @click="activar(props.item)" title="Activo" v-if="props.item.activo === 'SI'">
                  <v-icon color="green">verified_user</v-icon>
                </v-btn>
                <v-btn icon class="mx-0" @click="activar(props.item)" title="Inactivo" v-else>
                  <v-icon color="red">error</v-icon>
                </v-btn>                                
              </td>              
              <td>{{ props.item.membresia }}</td>
              <td>{{ props.item.fecha }}</td>
              <td>{{ props.item.activo }}</td>
              <td>{{ props.item.campo }}</td>
              <td>{{ props.item.subcampo }}</td>
              <td>{{ props.item.tipo }}</td>            
              <td>{{ props.item.nombre }}</td>
              <td>{{ props.item.paterno }}</td>
              <td>{{ props.item.materno }}</td>
              <td>{{ props.item.genero }}</td>
              <td>{{ props.item.grado }}</td>
              <td>{{ props.item.rfc }}</td>
              <td>{{ props.item.cvu }}</td>
              <td>{{ props.item.sni }}</td>
              <td>{{ props.item.nivel }}</td>
              <td>{{ props.item.area }}</td>
              <td>{{ props.item.institucion }}</td>
              <td>{{ props.item.direccion }}</td>
              <td>{{ props.item.pais }}</td>
              <td>{{ props.item.entidad }}</td>
              <td>{{ props.item.telefono }}</td>
              <td>{{ props.item.celular }}</td>
              <td>{{ props.item.institucional }}</td>
              <td>{{ props.item.personal }}</td>  
            </template>
            <template slot="pageText" slot-scope="props">
              Miembros {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              No hay registros que contengan "{{ search }}"
            </v-alert>                   
          </v-data-table>
        </v-card>
        <v-btn class="mt-5" color="success" :href="miembros_csv" :download="'CMIC-miembros-' + hoy + '.csv'" target="_blank">Descargar archivo<v-icon right small>file_download</v-icon></v-btn>
        <v-dialog v-model="dialog" max-width="90vw" @keydown.esc="dialog = false">
          <v-btn slot="activator" color="info" class="mt-5">Agregar Nuevo Miembro <v-icon right small>person_add</v-icon></v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Membresia" v-model="editedItem.membresia"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Fecha" v-model="editedItem.fecha"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Activo" v-model="editedItem.activo"></v-text-field>
                  </v-flex>                  
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Campo de conocimiento" v-model="editedItem.campo"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Area de conocmiento" v-model="editedItem.subcampo"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Tipo de miembro" v-model="editedItem.tipo"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Nombre" v-model="editedItem.nombre"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Paterno" v-model="editedItem.paterno"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Materno" v-model="editedItem.materno"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Género" v-model="editedItem.genero"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Grado Académico" v-model="editedItem.grado"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="RFC" v-model="editedItem.rfc"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="CVU" v-model="editedItem.cvu"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Pertenece al SNI" v-model="editedItem.sni"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Nivel SNI" v-model="editedItem.nivel"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Área SNI" v-model="editedItem.area"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Institución" v-model="editedItem.institucion"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Dirección" v-model="editedItem.direccion"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="País" v-model="editedItem.pais"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Entidad" v-model="editedItem.entidad"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Télefono" v-model="editedItem.telefono"></v-text-field>
                  </v-flex>                  
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Celular" v-model="editedItem.celular"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Correo electrónico institucional" v-model="editedItem.institucional"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Correo electrónico Personal" v-model="editedItem.personal"></v-text-field>
                  </v-flex>                  
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" outline @click.native="close">Cancelar<v-icon right>close</v-icon></v-btn>
              <v-btn color="blue darken-1" outline @click.native="save">Guardar<v-icon right>save</v-icon></v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>             
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { fb } from '../config/firebase'
// import axios from 'axios'

let db = fb.database()
let miembrosRef = db.ref('miembros')
let bienvenidasRef = db.ref('bienvenidas')

export default {
  name: 'Home',
  firebase: {
    miembros: miembrosRef,
    bienvenidas: bienvenidasRef
  },
  data () {
    return {
      dialog: false,
      pagination: {
        sortBy: 'membresia',
        descending: true
      },
      search: '',
      headers: [
        { text: 'Editar', value: 'editar', sortable: false },
        { text: 'Membresia', value: 'membresia' },
        { text: 'Fecha', value: 'fecha' },
        { text: 'Activo', value: 'activo' },
        { text: 'Campo de conocimiento', value: 'campo' },
        { text: 'Area de conocimiento', value: 'subcampo' },
        { text: 'Tipo de miembro', value: 'tipo' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Paterno', value: 'paterno' },
        { text: 'Materno', value: 'materno' },
        { text: 'Genero', value: 'genero' },
        { text: 'Grado academico', value: 'grado' },
        { text: 'RFC', value: 'rfc' },
        { text: 'CVU', value: 'cvu' },
        { text: 'Pertenece al SNI', value: 'sni' },
        { text: 'Nivel SNI', value: 'nivel' },
        { text: 'Area SNI', value: 'area' },
        { text: 'Institucion', value: 'institucion' },
        { text: 'Direccion de la institucion', value: 'direccion' },
        { text: 'Pais', value: 'pais' },
        { text: 'Entidad', value: 'entidad' },
        { text: 'Telefono', value: 'telefono' },
        { text: 'Celular', value: 'celular' },
        { text: 'Correo electronico institucional', value: 'institucional' },
        { text: 'Correo electronico personal', value: 'personal' }
      ],
      editedIndex: -1,
      editedItem: {
        membresia: '',
        fecha: '',
        campo: '',
        subcampo: '',
        tipo: '',
        nombre: '',
        paterno: '',
        materno: '',
        genero: '',
        grado: '',
        rfc: '',
        cvu: '',
        sni: '',
        nivel: '',
        area: '',
        institucion: '',
        direccion: '',
        pais: '',
        entidad: '',
        telefono: '',
        celular: '',
        institucional: '',
        personal: ''
      },
      defaultItem: {
        membresia: '',
        fecha: '',
        campo: '',
        subcampo: '',
        tipo: '',
        nombre: '',
        paterno: '',
        materno: '',
        genero: '',
        grado: '',
        rfc: '',
        cvu: '',
        sni: '',
        nivel: '',
        area: '',
        institucion: '',
        direccion: '',
        pais: '',
        entidad: '',
        telefono: '',
        celular: '',
        institucional: '',
        personal: ''
      },
      json_fields: {
        'Membresia': 'membresia',
        'Fecha': 'fecha',
        'Campo de conocimiento': 'campo',
        'Area de conocimiento': 'subcampo',
        'Tipo de miembro': 'tipo',
        'Nombre': 'nombre',
        'Paterno': 'paterno',
        'Materno': 'materno',
        'Genero': 'genero',
        'Grado academico': 'grado',
        'RFC': 'rfc',
        'CVU': 'cvu',
        'Pertenece al SNI': 'sni',
        'Nivel SNI': 'nivel',
        'Area SNI': 'area',
        'Institucion': 'institucion',
        'Direccion de la institicion': 'direccion',
        'Pais': 'pais',
        'Entidad': 'entidad',
        'Telefono': 'telefono',
        'Celular': 'celular',
        'Correo electronico institucional': 'institucional',
        'Correo electronico personal': 'personal'
      },
      json_meta: [
        [
          {
            'key': 'charset',
            'value': 'utf-8'
          }
        ]
      ]
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nuevo Miembro' : 'Editar Miembro ' + this.miembros[this.editedIndex].membresia
    },
    miembros_csv () {
      return this.downloadCSV(this.miembros, this.headers)
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
  },
  methods: {
    activar (item) {
      let activo = item.activo.toString() === 'NO' ? 'SI' : 'NO'
      miembrosRef.child(item['.key']).update({ activo: activo })
      /* if (item.activo.toString() === 'NO') {
        if (this.bienvenidas.filter(o => o.membresia === item.membresia).length < 1) {
          bienvenidasRef.push({membresia: item.membresia})
          axios.get('http://c-mic.mx/jrg/index.php?registro=Bienvenida', {
            params: item
          })
        }
      } */
    },
    editItem (item) {
      this.editedIndex = this.miembros.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        let upd = []
        Object.assign(upd, this.editedItem)
        delete upd['.key']
        miembrosRef.child(this.editedItem['.key']).set(upd)
        upd = []
      } else {
        miembrosRef.push(this.editedItem)
      }
      this.close()
    },
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
        if (key.text !== 'Editar') {
          if (ctr > 0) result += columnDelimiter
          result += key.text
          ctr++
        }
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
    }
  }
}
</script>

<style>
td {
  white-space: nowrap
}
</style>