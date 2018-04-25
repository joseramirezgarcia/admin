<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex v-if='!success'>
        <div id='paypal-button-container'></div>
      </v-flex>
      <v-flex v-if='success'>
        <v-chip color="green" text-color="white" dismissible v-model="success">
          Pago registrado correctamente
        </v-chip>
      </v-flex>
      <v-flex v-if='error'>
        <v-chip color="red" text-color="white" dismissible v-model="error">
          No se puede procesar el pago
        </v-chip>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import paypal from 'paypal-checkout'
import { fb } from '../config/firebase'

let db = fb.database()
let quintaReunionRef = db.ref('quintareunion')

export default {
  name: 'PayPal',
  props: ['amount', 'nombre', 'paterno', 'materno', 'membresia', 'tipo'],
  data () {
    return {
      error: false,
      success: false
    }
  },
  mounted () {
    let client = {
      sandbox: 'AehjVTag2zBXbu-6HK902owwP2wjzH8umcHrSAgC7PrInKVxzU8vNW5HU99oEzPm59j-08uMSvQh1rEh'
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
      // console.log(data)
      // console.log(actions)
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
            tipo: that.tipo
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
  }
}
</script>