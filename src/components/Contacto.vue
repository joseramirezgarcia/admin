<template>
  <v-container fluid>
    <v-layout row wrap style="margin-top:104px">
      <v-flex xs12 md8 offset-md2>
        <v-form v-model="formaMensaje" ref="formaMensaje">
          <v-card class="elevation-12">
            <v-toolbar color="primary white--text">
              <v-toolbar-title>Contacto</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-icon color="white" medium @click="enviar" :disabled="!formaMensaje" title='enviar' style="cursor: pointer">send</v-icon>
            </v-toolbar>
            <v-container fluid class="px-3">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-alert type="success" v-model="success">
                    Su mensaje fue enviado correctamente
                  </v-alert>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Nombre"
                    v-model="nombre"
                    :rules="[(v) => !!v || 'Es necesario completar este campo']"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Correo electrónico"
                    v-model="email"
                    :rules=" [
                              (v) => !!v || 'Es necesario completar este campo',
                              (v) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(v) || 'Es necesario completar este campo con una dirección de correo electrónica válida'
                            ]"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                      label="Mensaje"
                      v-model="mensaje"
                      multi-line
                      single-line
                      :rules="[(v) => !!v || 'Es necesario completar este campo']"
                    ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { fb } from '../config/firebase'

let db = fb.database()
let mensajesRef = db.ref('mensajes')

export default {
  data () {
    return {
      nombre: '',
      email: '',
      mensaje: '',
      formaMensaje: false,
      success: false
    }
  },
  methods: {
    enviar () {
      if (this.$refs.formaMensaje.validate()) {
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
        let mensaje = {
          nombre: this.nombre,
          email: this.email,
          mensaje: this.mensaje,
          fecha: hoy
        }
        mensajesRef.push(mensaje)
        this.$refs.formaMensaje.reset()
        this.success = true
      }
    }
  },
  watch: {
    success () {
      if (this.success) {
        let that = this
        setTimeout(function () { that.success = false }, 3333)
      }
    }
  }
}
</script>
