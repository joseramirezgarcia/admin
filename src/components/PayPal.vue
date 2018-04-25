<template>
<div>
<div id='paypal-button-container'></div>
<div v-if='success' class='alert alert-success'>
  <strong>Correcto!</strong> Pago registrado correctamente
</div>
<div v-if='error' class='alert alert-danger'>
  <strong>Error!</strong> Algo salió mal
</div>
</div>
</template>
<script>
import paypal from 'paypal-checkout'

export default {
  name: 'PayPal',
  props: ['amount'],
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
      console.log(data)
      console.log(actions)
      return actions.payment.execute().then(function () {
        window.alert('Payment Complete!')
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