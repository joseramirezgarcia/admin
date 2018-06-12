<template>
  <v-container fluid fill-height mt-5>
    <v-layout align-top justify-center>
      <v-flex xs12 sm10 md5>
        <v-tabs
          v-model="active"
          color="primary"
          dark
          fixed-tabs
          grow
          class="elevation-12"
          my-5
        >
          <v-tab ripple :key="0">
            Entrar
          </v-tab>
          <v-tab ripple :key="1">
            Obtener Contraseña
          </v-tab>          
          <v-tab-item :key="0">
            <v-card class="elevation-24">
              <v-card-text>
                <v-form>
                  <v-layout column>
                    <v-flex>
                      <v-alert type='error' dismissible v-model='alert'>
                        {{ error }}
                      </v-alert>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        name='email'
                        label='Email'
                        id='email'
                        type='email'
                        v-model='email'
                        required></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        name='password'
                        label='Password'
                        id='password'
                        type='password'
                        v-model='password'
                        @keyup.enter="userSignIn"
                        required></v-text-field>
                        <span class='caption'>Si no tiene contraseña puede obtenerla <v-btn small color="primary" flat @click.native='next'>aqui</v-btn></span>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-flex class='text-xs-center' my-3>
                  <v-btn color='primary' type='submit' @click='userSignIn'>Ingresar</v-btn>
                </v-flex>
              </v-card-actions>
            </v-card>
          </v-tab-item>
          <v-tab-item :key="1">
            <v-card class="elevation-24">
              <v-card-text>
                <v-layout column>
                  <v-flex>
                    <v-alert type='success' dismissible v-model='msg'>
                      {{ mensaje }}
                    </v-alert>
                  </v-flex>
                  <v-flex>
                    <v-form ref="formaMiembros">
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
                    </v-form>
                  </v-flex>
                  <v-flex v-if="miembro">
                    <v-card>
                      <v-card-title><h4>{{miembro.nombre}} {{miembro.paterno}} {{miembro.materno}}</h4></v-card-title>
                      <v-divider></v-divider>
                      <v-list dense>
                        <v-list-tile>
                          <v-list-tile-content>Número de Membresía</v-list-tile-content>
                          <v-list-tile-content class="align-end">{{miembro.membresia}}</v-list-tile-content>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile v-if="miembro.institucional">
                          <v-list-tile-content>Correo electrónico institucional</v-list-tile-content>
                          <v-list-tile-content class="align-end">{{miembro.institucional}}</v-list-tile-content>
                        </v-list-tile>
                        <v-divider v-if="miembro.institucional"></v-divider>
                        <v-list-tile v-if="miembro.personal">
                          <v-list-tile-content>Correo electrónico personal</v-list-tile-content>
                          <v-list-tile-content class="align-end">{{miembro.personal}}</v-list-tile-content>
                        </v-list-tile>                          
                      </v-list>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-flex class='text-xs-center' my-3>
                  <v-btn color='primary' type='submit' @click='userSend' v-if="miembro">Enviar contraseña</v-btn>
                </v-flex>
              </v-card-actions>
            </v-card>
          </v-tab-item>          
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { fb } from '../config/firebase'
import axios from 'axios'

let db = fb.database()
let miembrosRef = db.ref('miembros')

export default {
  firebase: {
    miembros: miembrosRef
  },
  data () {
    return {
      active: null,
      email: '',
      password: '',
      alert: false,
      miembro: null,
      msg: false,
      mensaje: ''
    }
  },
  methods: {
    next () {
      const active = parseInt(this.active)
      this.active = (active < 1 ? active + 1 : 0).toString()
    },
    userSignIn () {
      this.$store.dispatch('userSignIn', {
        email: this.email,
        password: this.password
      })
    },
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
    generar () {
      var text = ''
      var possible = 'ABDEHMNRTabdemnqrt34789'
      for (var i = 0; i < 8; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      return text
    },
    userSend () {
      let that = this
      fb.auth().fetchProvidersForEmail(this.miembro.personal).then(function (i) {
        if (i.length) {
          fb.auth().sendPasswordResetEmail(that.miembro.personal)
          that.msg = true
          that.mensaje = 'La contraseña ha sido enviada a su correo electrónico'
          setTimeout(function () {
            that.msg = false
            that.mensaje = ''
          }, 4444)
          that.$refs.formaMiembros.reset()
        } else {
          let clave = that.generar()
          fb.auth().createUserWithEmailAndPassword(that.miembro.personal, clave)
          that.msg = true
          that.mensaje = 'La contraseña ha sido enviada a su correo electrónico'
          setTimeout(function () {
            that.msg = false
            that.mensaje = ''
          }, 4444)
          let notificacion = that.miembro
          notificacion.clave = clave
          axios.get('http://c-mic.mx/jrg/index.php?registro=Clave', {
            params: notificacion
          })
          notificacion = []
          that.$refs.formaMiembros.reset()
        }
      })
    }
  },
  computed: {
    error () {
      return this.$store.state.error
    },
    loading () {
      return this.$store.state.loading
    }
  },
  watch: {
    error (value) {
      if (value) {
        this.alert = true
      }
    },
    alert (value) {
      if (!value) {
        this.$store.commit('setError', null)
      }
    }
  },
  mounted () {
    this.$store.dispatch('userSignOut')
  }
}
</script>
