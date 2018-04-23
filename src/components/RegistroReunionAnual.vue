<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs12 sm10 md10 lg10>
        <v-card class="elevation-24">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registro 5ta Reunión Anual</v-toolbar-title>
          </v-toolbar>
          <v-form ref="formaMiembros">
            <v-card-text fill-height>
              <v-flex>
                <v-select
                  label="Buscar por nombre, número de membresía o correo electrónico"
                  :items="miembros"
                  v-model="busqueda"
                  item-text="nombre"
                  return-object
                  chips
                  autocomplete
                  :filter="filtrarMiembros"
                >
                  <template slot="selection" slot-scope="data">
                    <v-chip
                      close
                      @input="$refs.formaMiembros.reset()"
                      :selected="data.selected"
                      class="chip--select-multi"
                      :key="JSON.stringify(data.item)"
                    >
                      <v-avatar>
                        <v-icon color="primary">account_circle</v-icon>
                      </v-avatar>
                      {{ data.item.nombre }} {{ data.item.paterno }} {{ data.item.materno }}
                    </v-chip>
                  </template>
                  <template slot="item" slot-scope="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-avatar>
                        <v-icon color="primary" medium>account_circle</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.nombre + ' ' + data.item.paterno + ' ' + data.item.materno"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="data.item.membresia"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-select>
              </v-flex>
              <v-flex fill-height>
                <v-container grid-list-xl>
                  <v-layout wrap row align-top>
                    <v-flex xs12 md6>
                      <v-card class="elevation-12" fill-height>
                        <v-card-text class="text-xs-center">
                          <v-icon x-large class="blue--text text--lighten-2">account_circle</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                          <div class="headline text-xs-center">Miembro</div>
                        </v-card-title>
                        <v-card-text>
                          {{busqueda}} 
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-card class="elevation-12" fill-height>
                        <v-card-text class="text-xs-center">
                          <v-icon x-large class="blue--text text--lighten-2">list</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                          <div class="headline">Pago</div>
                        </v-card-title>
                        <v-card-text>
                          Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                          Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-card-text>
          </v-form>
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
  firebase: {
    miembros: miembrosRef
  },
  data () {
    return {
      busqueda: []
    }
  },
  methods: {
    filtrarMiembros (item, queryText, itemText) {
      const hasValue = val => val != null ? val : ''
      const text = hasValue(item.nombre + ' ' + item.paterno + ' ' + item.materno + ' ' + item.membresia + ' ' + item.personal + ' ' + item.institucional)
      const query = hasValue(queryText)
      var i = 'ÁÉÍÓÚáéíóú'.split('')
      var o = 'AEIOUaeiou'.split('')
      var map = {}
      i.forEach(function (el, idx) { map[el] = o[idx] })
      return text.toString()
        .toLowerCase()
        .replace(/[^A-Za-z0-9]/g, function (ch) { return map[ch] || ch })
        .indexOf(query.toString().toLowerCase().replace(/[^A-Za-z0-9]/g, function (ch) { return map[ch] || ch })) > -1
    }
  }
}
</script>
<style>
 .content--wrap {
  background: url('../assets/5reunionanual.jpg') no-repeat center center;
  background-size: cover;
}
</style>