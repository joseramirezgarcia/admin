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
                  v-model="miembro"
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
                <v-container grid-list-xl>
                  <v-layout wrap row align-top fill-height>
                    <v-flex xs12 md6>
                      <v-card class="elevation-12" height="100%">
                        <v-card-title class="justify-center">
                          <v-layout flex align-center justify-center class="headline mb-0 primary--text"><v-icon color="primary">account_circle</v-icon> Datos Generales</v-layout>
                        </v-card-title>
                        <v-card-text>
                          <v-flex>
                            <v-card v-if="miembro">
                              <v-card-title><h4>{{miembro.nombre}} {{miembro.paterno}} {{miembro.materno}}</h4></v-card-title>
                              <v-divider></v-divider>
                              <v-list dense>
                                <v-list-tile>
                                  <v-list-tile-content>Número de Membresía</v-list-tile-content>
                                  <v-list-tile-content class="align-end">{{this.miembro.membresia}}</v-list-tile-content>
                                </v-list-tile>
                                <v-divider></v-divider>
                                <v-list-tile>
                                  <v-list-tile-content>Tipo de Membresía</v-list-tile-content>
                                  <v-list-tile-content class="align-end">{{this.miembro.tipo}}</v-list-tile-content>
                                </v-list-tile>                                
                              </v-list>
                            </v-card>
                          </v-flex>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-card class="elevation-12" height="100%">
                        <v-card-title class="justify-center">
                          <v-layout flex align-center justify-center class="headline mb-0 primary--text"><v-icon color="primary">monetization_on</v-icon> Detalles de pago</v-layout>                   
                        </v-card-title>
                        <v-card-text>
                          <v-flex v-if="miembro" class="text-xs-center">
                            <v-card  v-if="miembro">
                              <v-card-title><h4>5ta Reunión Anual del C-MIC:</h4></v-card-title>
                              <v-divider></v-divider>
                              <v-list dense>
                                <v-list-tile>
                                  <v-list-tile-content>COSTO {{miembro.tipo}}</v-list-tile-content>
                                  <v-list-tile-content class="align-end">$ {{this.amount}} </v-list-tile-content>
                                </v-list-tile>
                                <v-divider></v-divider>
                                <v-list-tile>
                                </v-list-tile>
                                <v-list-tile>
                                  <v-container fluid fill-height>
                                    <v-layout align-center justify-center class="py-3">
                                      <paypal :amount="amount"></paypal>      
                                    </v-layout>
                                  </v-container>
                                </v-list-tile>                                
                              </v-list>
                            </v-card>
                          </v-flex>
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
import PayPal from './PayPal'

let db = fb.database()
let miembrosRef = db.ref('miembros')
export default {
  firebase: {
    miembros: miembrosRef
  },
  data () {
    return {
      miembro: null,
      amount: 700,
      boton: false
    }
  },
  components: {
    'paypal': PayPal
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
  },
  watch: {
    miembro: function () {
      if (this.miembro !== null) {
        this.amount = 900
        if (this.miembro.tipo === 'ESTUDIANTE') {
          this.amount = 700
        }
      }
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