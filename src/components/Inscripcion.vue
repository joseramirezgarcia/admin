<template>
  <v-container fluid fill-height style="background: url('http://c-mic.mx/img/5reunionanual.jpg')" class='fondo'>
    <v-layout justify-center style="margin-top:120px">
      <v-flex xs12 sm10 md10 lg10>
        <v-card class="elevation-24">
          <v-toolbar dark color="primary" class="my-5">
            <v-toolbar-title>Registro 5a Reunión Anual del Colegio Mexicano para la Investigación del Cáncer</v-toolbar-title>
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
                  <template slot="no-data">
                    <v-list-tile-content>
                      <v-btn color="primary" :to="{name: 'registro'}">Registrarse como nuevo miembro</v-btn>
                    </v-list-tile-content>
                  </template>                
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
                      <v-list-tile-content></v-list-tile-content>
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
                <v-container fluid grid-list-md>
                  <v-layout wrap row align-top fill-height>
                    <v-flex xs12 sm12 md6>
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
                                  <v-list-tile-content class="align-end">{{miembro.membresia}}</v-list-tile-content>
                                </v-list-tile>
                                <v-divider></v-divider>
                                <v-list-tile>
                                  <v-list-tile-content>Tipo de Membresía</v-list-tile-content>
                                  <v-list-tile-content class="align-end">{{miembro.tipo}}</v-list-tile-content>
                                </v-list-tile>
                                <v-divider></v-divider>
                                <v-list-tile avatar>
                                  <v-list-tile-action>
                                    <v-checkbox v-model="comidauno" color="primary"></v-checkbox>
                                  </v-list-tile-action>
                                  <v-list-tile-content>
                                    <v-list-tile-title>COMIDA MESA CON PONENTE 27 DE SEPTIEMBRE</v-list-tile-title>
                                    <v-list-tile-sub-title>$ {{costo}}</v-list-tile-sub-title>
                                  </v-list-tile-content>
                                </v-list-tile>
                                <v-divider></v-divider>
                                <v-list-tile avatar>
                                  <v-list-tile-action>
                                    <v-checkbox v-model="comidados" color="primary"></v-checkbox>
                                  </v-list-tile-action>
                                  <v-list-tile-content>
                                    <v-list-tile-title>COMIDA MESA CON PONENTE 28 DE SEPTIEMBRE</v-list-tile-title>
                                    <v-list-tile-sub-title>$ {{costo}}</v-list-tile-sub-title>
                                  </v-list-tile-content>
                                </v-list-tile>                                
                              </v-list>
                            </v-card>
                          </v-flex>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm12 md6>
                      <v-card class="elevation-12" height="100%">
                        <v-card-title class="justify-center">
                          <v-layout flex align-center justify-center class="headline mb-0 primary--text"><v-icon color="primary">monetization_on</v-icon> Detalles de pago</v-layout>                   
                        </v-card-title>
                        <v-card-text>
                          <v-flex v-if="miembro" class="text-xs-center">
                            <v-card v-if="miembro">
                              <v-card-title><h4>Registro 5a Reunión Anual:</h4></v-card-title>
                              <v-divider></v-divider>
                              <v-list dense>
                                <v-list-tile>
                                  <v-list-tile-content>COSTO {{miembro.tipo}}</v-list-tile-content>
                                  <v-list-tile-content class="align-end">${{amount}}</v-list-tile-content>
                                </v-list-tile>
                                <v-divider></v-divider>
                                <v-list-tile v-if="!comidauno && !comidados">
                                  <v-list-tile-content>SIN COMIDA CON PONENTE</v-list-tile-content>
                                  <v-list-tile-content class="align-end">$0</v-list-tile-content>
                                </v-list-tile>         
                                <v-divider v-if="!comidauno && !comidados"></v-divider>
                                <v-list-tile v-if="comidauno">
                                  <v-list-tile-content>COMIDA MESA CON PONENTE 27 DE SEPTIEMBRE</v-list-tile-content>
                                  <v-list-tile-content class="align-end">${{costo}}</v-list-tile-content>
                                </v-list-tile>         
                                <v-divider v-if="comidauno"></v-divider>
                                <v-list-tile v-if="comidados">
                                  <v-list-tile-content>COMIDA MESA CON PONENTE 28 DE SEPTIEMBRE</v-list-tile-content>
                                  <v-list-tile-content class="align-end">${{costo}}</v-list-tile-content>
                                </v-list-tile>         
                                <v-divider v-if="comidados"></v-divider>                                                                                       
                                <v-list-tile>
                                  <v-list-tile-content>TOTAL</v-list-tile-content>
                                  <v-list-tile-content class="align-end">${{total}}</v-list-tile-content>
                                </v-list-tile>                                
                              </v-list>
                            </v-card>
                          </v-flex>
                          <v-flex class="text-xs-center">
                            <v-container fluid fill-height>
                              <v-layout align-center justify-center>
                                <v-flex mt-4>
                                  <div id='paypal-button-container' ></div>
                                </v-flex>
                              </v-layout>
                            </v-container>                          
                          </v-flex>
                          <v-flex class="text-xs-center">
                             <v-alert outline color="primary" icon="info" v-model="incompleto">
                              Debe seleccionar un miembro
                            </v-alert>
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
        <v-dialog v-model="dialog" max-width="500px" @keydown.esc="dialog = false">
          <v-card>
            <v-card-text>
              <v-container grid-list-md>
                <v-flex v-if='success'>
                  <v-alert type="success" v-model="success">
                    Pago registrado correctamente. Su código de confirmación es {{codigo}}
                  </v-alert>
                </v-flex>
                <v-flex v-if='error'>
                  <v-alert type="error" v-model="error">
                    No se puede procesar el pago
                  </v-alert>
                </v-flex>            
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { fb } from '../config/firebase'
import paypal from 'paypal-checkout'
import { production } from '../config/paypal.js'
import axios from 'axios'

let db = fb.database()
let miembrosRef = db.ref('miembros')
let quintaReunionRef = db.ref('quintareunion')
let preciosRef = db.ref('precios')

export default {
  firebase: {
    miembros: miembrosRef,
    quintareunion: {
      source: quintaReunionRef,
      readyCallback: function () {
        this.excluirMiembros()
      }
    },
    precios: preciosRef
  },
  data () {
    return {
      miembro: null,
      amount: 0,
      boton: false,
      sincomida: true,
      comidauno: false,
      comidados: false,
      costo: 300,
      total: 0,
      incompleto: false,
      error: false,
      success: false,
      dialog: false,
      codigo: ''
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
    },
    calcularTotal () {
      this.total = this.amount
      if (this.comidauno === true) {
        this.total = this.total + this.costo
      }
      if (this.comidados === true) {
        this.total = this.total + this.costo
      }
    },
    excluirMiembros () {
      let that = this
      let arr = []
      this.miembros.filter(function (item) {
        let exist = false
        for (var i = 0; i < that.quintareunion.length; i++) {
          if (that.quintareunion[i].membresia.toString() === item.membresia.toString()) {
            exist = true
          }
        }
        if (!exist && item.activo.toString() === 'SI') {
          arr.push(item)
        }
      })
      this.miembros = arr
    },
    generarCodigo () {
      this.codigo = ''
      if (this.success) {
        let hoy = Math.round(new Date() / 1000 / 60).toString()
        let comida = 0
        if (this.comidauno && this.comidados) {
          comida = 3
        } else {
          if (this.comidauno) {
            comida = 1
          }
          if (this.comidados) {
            comida = 2
          }
        }
        this.codigo = hoy.slice(0, Math.round(hoy.length / 2)) + this.miembro.nombre.charAt(0) + this.miembro.paterno.charAt(0) + comida + this.miembro.materno.charAt(0) + '-' + hoy.slice(Math.round(hoy.length / 2), hoy.length)
      }
    }
  },
  watch: {
    miembro: function () {
      if (this.miembro !== null) {
        this.incompleto = false
        this.amount = this.precios.filter(p => p.tipo === 'INVESTIGADOR')[0].precio
        if (this.miembro.tipo === 'ESTUDIANTE') {
          this.amount = this.precios.filter(p => p.tipo === 'ESTUDIANTE')[0].precio
        }
        this.generarCodigo()
      }
    },
    amount: function () {
      this.calcularTotal()
    },
    comidauno: function () {
      this.calcularTotal()
    },
    comidados: function () {
      this.calcularTotal()
    },
    dialog: function () {
      if (!this.dialog) {
        this.$refs.formaMiembros.reset()
      }
    }
  },
  mounted () {
    let client = {
      sandbox: 'AQZvt9JFyOGEBK1HkM_MZBOBA9uw_cL9Aze6ERzD92moxDIvRU7mK5g6LbIC8Ok3yPSiEfnGBerv5XcZ',
      production: production
    }
    let payment = (data, actions) => {
      let detalles = []
      detalles.push({
        quantity: 1,
        name: 'COSTO ' + this.miembro.tipo,
        price: this.amount,
        currency: 'MXN',
        description: 'Inscripción a la 5a Reunión Anual del C-MIC'
      })
      if (this.comidauno || this.comidados) {
        if (this.comidauno) {
          detalles.push({
            quantity: 1,
            name: 'SEP27',
            price: this.costo,
            currency: 'MXN',
            description: 'Comida mesa con ponente 27 de Septiembre'
          })
        }
        if (this.comidados) {
          detalles.push({
            quantity: 1,
            name: 'SEP28',
            price: this.costo,
            currency: 'MXN',
            description: 'Comida mesa con ponente 28 de Septiembre'
          })
        }
      } else {
        detalles.push({
          quantity: 1,
          name: 'SIN COMIDA',
          price: 0,
          currency: 'MXN',
          description: 'Sin comida con ponente'
        })
      }
      // Make a call to the REST api to create the payment
      return actions.payment.create({
        payment: {
          transactions: [
            {
              amount: { total: this.total, currency: 'MXN' },
              item_list: {
                items: detalles
              }
            }
          ]
        }
      })
    }
    let that = this
    let onAuthorize = (data, actions) => {
      data = {
        paymentID: data.paymentID,
        payerID: data.payerID,
        amount: this.total
      }
      // console.log(data)
      // console.log(actions)
      return actions.payment.execute().then(function (payment) {
        // console.log(payment)
        if (payment.state === 'approved') {
          that.success = true
          that.generarCodigo()
          let miembro = {
            forma: 'PayPal',
            nombre: that.miembro.nombre,
            paterno: that.miembro.paterno,
            materno: that.miembro.materno,
            membresia: that.miembro.membresia,
            tipo: that.miembro.tipo,
            institucional: that.miembro.institucional,
            personal: that.miembro.personal,
            grado: that.miembro.grado,
            genero: that.miembro.genero,
            comidauno: that.comidauno,
            comidados: that.comidados,
            total: that.total,
            codigo: that.codigo
          }
          // console.log(miembro)
          // console.log(payment)
          /* let respuesta = []
          respuesta = Object.assign(payment, miembro) */
          let respuesta = {}
          for (let attrname in miembro) { respuesta[attrname] = miembro[attrname] }
          for (let attrname in payment) { respuesta[attrname] = payment[attrname] }
          quintaReunionRef.push(respuesta)
          axios.get('http://c-mic.mx/jrg/index.php?registro=Pago', {
            params: respuesta
          })
          // console.log(respuesta)
        } else {
          that.error = true
        }
        that.$refs.formaMiembros.reset()
        that.dialog = true
      })
    }
    let onClick = () => {
      if (that.miembro) {
        that.incompleto = false
      } else {
        that.incompleto = true
      }
    }
    paypal.Button.render(
      {
        env: 'production', // sandbox | production
        commit: true,
        client,
        onClick,
        payment,
        onAuthorize
      },
      '#paypal-button-container'
    )
  }
}
</script>
<style scoped>
.fondo{
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: cover !important;
}
.list__tile__action, .list__tile__avatar {
  min-width: 36px;
}
.list__tile__sub-title, .list__tile__title {
  white-space: nowrap;
  overflow: visible;
}
.list__tile--disabled {
  opacity: 1!important;
  pointer-events: all;
}
</style>