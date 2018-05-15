<template>
  <v-container fluid>
    <v-layout row wrap>
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
            :rows-per-page-items="[10,25,50,100,{'text':'Todos','value':-1}]"
            rows-per-page-text="Miembros por página: "
            :headers='headers'
            :items='miembros'
            class='elevation-1'
            :pagination.sync="pagination"
            :search="search"
          >
            <template slot='items' slot-scope='props'>
              <td>{{ props.item.membresia }}</td>
              <td>{{ props.item.nombre }}</td>
              <td>{{ props.item.paterno }}</td>
              <td>{{ props.item.materno }}</td>
              <td>{{ props.item.tipo }}</td>
              <td>{{ props.item.grado }}</td>
              <td>{{ props.item.institucion }}</td>
              <td>{{ props.item.telefono === '' ? props.item.celular : props.item.telefono }}</td>
              <td>{{ props.item.institucional === '' ? props.item.personal : props.item.institucional }}</td>
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
        { text: 'Apellido paterno', value: 'paterno' },
        { text: 'Apellido materno', value: 'materno' },
        { text: 'Tipo', value: 'tipo' },
        { text: 'Grado', value: 'grado' },
        { text: 'Institucion', value: 'institucion' },
        { text: 'Telefono', value: 'telefono' },
        { text: 'E-mail', value: 'email' }
      ]
    }
  }
}
</script>

<style scoped>
table.table thead th {
  padding: 0px 1% !important;
}
table.table tbody td {
  text-align:left !important;
  padding: 0px 1% !important;
  white-space: nowrap !important;
}
</style>