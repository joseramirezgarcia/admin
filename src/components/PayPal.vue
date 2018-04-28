<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex v-if='!success' mt-4>
        <div id='paypal-button-container'></div>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" max-width="500px" @keydown.esc="dialog = false">
      <v-card>
        <v-card-title>
          <span class="headline">Agregar Nueva Institución</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-flex v-if='success'>
              <v-alert type="success" dismissible v-model="success">
                Pago registrado correctamente
              </v-alert>
            </v-flex>
            <v-flex v-if='error'>
              <v-alert type="error" dismissible v-model="error">
                No se puede procesar el pago
              </v-alert>
            </v-flex>            
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import paypal from 'paypal-checkout'
import { fb } from '../config/firebase'

let db = fb.database()
let quintaReunionRef = db.ref('quintareunion')

export default {
  name: 'PayPal',
  props: ['amount', 'nombre', 'paterno', 'materno', 'membresia', 'tipo', 'comidauno', 'comidados'],
  data () {
    return {
      error: false,
      success: false,
      dialog: false
    }
  },
  mounted () {
    let client = {
      sandbox: 'AQZvt9JFyOGEBK1HkM_MZBOBA9uw_cL9Aze6ERzD92moxDIvRU7mK5g6LbIC8Ok3yPSiEfnGBerv5XcZ',
      production: ''
    }
    let payment = (data, actions) => {
      // Make a call to the REST api to create the payment
      return actions.payment.create({
        payment: {
          transactions: [
            {
              amount: { total: this.amount, currency: 'MXN' }
            }
          ]
        }
      })
    }
    let onAuthorize = (data, actions) => {
      data = {
        paymentID: data.paymentID,
        payerID: data.payerID,
        amount: this.amount
      }
      console.log(data)
      console.log(actions)
      let that = this
      return actions.payment.execute().then(function (payment) {
        // console.log(payment)
        if (payment.state === 'approved') {
          that.success = true
          let miembro = {
            nombre: that.nombre,
            paterno: that.paterno,
            materno: that.materno,
            membresia: that.membresia,
            tipo: that.tipo,
            comidauno: that.comidauno,
            comidados: that.comidados,
            total: that.amount
          }
          // console.log(miembro)
          // console.log(payment)
          let respuesta = []
          respuesta = Object.assign(payment, miembro)
          quintaReunionRef.push(respuesta)
          console.log(respuesta)
        } else {
          that.error = true
        }
      })
    }
    paypal.Button.render(
      {
        env: 'sandbox', // sandbox | production
        commit: true,
        client,
        payment,
        onAuthorize
      },
      '#paypal-button-container'
    )
    console.log(paypal.Button)
  },
  watch: {
    dialog () {
      if (!this.dialog) {
        this.$parent.$refs.formaMiembros.reset()
      }
    }
  }
}
</script>