<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class='text-xs-center' mt-5>
        <h1>Inicio</h1>
      </v-flex>
      <v-flex xs12 class='text-xs-center' mt-3>
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
            :headers='headers'
            :items='miembros'
            class='elevation-1'
            :pagination.sync="pagination"
            :search="search"
          >
            <template slot='items' slot-scope='props'>
              <td class="justify-center layout px-0">
                <v-btn icon class="mx-0" @click="editItem(props.item)">
                  <v-icon color="orange">edit</v-icon>
                </v-btn>
              </td>              
              <td>{{ props.item.membresia }}</td>
              <td>{{ props.item.fecha }}</td>
              <td>{{ props.item.campo }}</td>
              <td>{{ props.item.area }}</td>
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
              Your search for "{{ search }}" found no results.
            </v-alert>                   
          </v-data-table>
        </v-card>
        <v-dialog v-model="dialog" max-width="500px" @keydown.esc="dialog = false">
          <v-btn slot="activator" class="my-5">Agregar Nuevo Miembro</v-btn>
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
                    <v-text-field label="Campo" v-model="editedItem.campo"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Area" v-model="editedItem.area"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Tipo" v-model="editedItem.tipo"></v-text-field>
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
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click.native="save" disabled>Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>             
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { fb } from '../config/firebase'

let db = fb.database()
let miembrosRef = db.ref('miembros')

export default {
  name: 'Home',
  firebase: {
    miembros: miembrosRef
  },
  data () {
    return {
      dialog: false,
      pagination: {
        sortBy: 'membresia'
      },
      search: '',
      headers: [
        { text: 'Editar', value: 'editar', sortable: false },
        { text: 'Membresia', value: 'membresia' },
        { text: 'Fecha', value: 'fecha' },
        { text: 'Campo', value: 'campo' },
        { text: 'Area', value: 'area' },
        { text: 'Tipo', value: 'tipo' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Paterno', value: 'paterno' },
        { text: 'Materno', value: 'materno' },
        { text: 'Genero', value: 'genero' },
        { text: 'Grado', value: 'grado' },
        { text: 'RFC', value: 'rfc' },
        { text: 'CVU', value: 'cvu' },
        { text: 'SNI', value: 'sni' },
        { text: 'Nivel', value: 'nivel' },
        { text: 'Institucion', value: 'institucion' },
        { text: 'Direccion', value: 'direccion' },
        { text: 'Pais', value: 'pais' },
        { text: 'Entidad', value: 'entidad' },
        { text: 'Telefono', value: 'telefono' },
        { text: 'Celular', value: 'celular' },
        { text: 'Institucional', value: 'institucional' },
        { text: 'Personal', value: 'personal' }
      ],
      editedIndex: -1,
      editedItem: {
        membresia: '',
        fecha: '',
        campo: '',
        area: '',
        nombre: ''
      },
      defaultItem: {
        membresia: '',
        fecha: '',
        campo: '',
        area: '',
        nombre: ''
      }
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
    }
  },
  methods: {
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
        Object.assign(this.miembros[this.editedIndex], this.editedItem)
      } else {
        this.miembros.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style>
td {
  white-space: nowrap
}
</style>