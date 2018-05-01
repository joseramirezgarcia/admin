<template>
  <v-container fluid>
    <v-layout row wrap my-5>
      <v-flex xs12 class='text-xs-center'>
        <h1 class="mb-5 display-2 primary--text text-xs-center">DIRECTORIO</h1>
        <v-card>
          <v-card-title>
            Directorio
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
              <td>{{ props.item.membresia }}</td>
              <td>{{ props.item.nombre }} {{ props.item.paterno }} {{ props.item.materno }}</td>
              <td>{{ props.item.institucion }}</td>
            </template>
            <template slot="pageText" slot-scope="props">
              Miembros {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              "{{ search }}" No devuelve ningun resultado
            </v-alert>                   
          </v-data-table>
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
  name: 'Home',
  firebase: {
    miembros: miembrosRef
  },
  data () {
    return {
      pagination: {
        sortBy: 'membresia'
      },
      search: '',
      headers: [
        { text: 'Membresia', value: 'membresia' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Institucion', value: 'institucion' }
      ]
    }
  }
}
</script>

<style>
td {
  white-space: nowrap
}
</style>