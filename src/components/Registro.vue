<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs12 sm10 md10>
        <v-card class="elevation-24">
          <form @submit.prevent='userSignIn'>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Registro de nuevos miembros CMIC</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-layout column>
                  <v-toolbar>
                    <v-spacer></v-spacer>
                    <v-toolbar-title><v-icon medium>face</v-icon> Datos Generales</v-toolbar-title>
                  </v-toolbar>
                  <v-flex>
                    <v-alert type='error' dismissible v-model='alert'>
                      {{ error }}
                    </v-alert>
                  </v-flex>
                  <v-flex>
                    <v-radio-group v-model="tipo" label="Tipo de miembro" row>
                      <v-radio label="Estudiante" value="ESTUDIANTE" ></v-radio>
                      <v-radio label="Investigador" value="INVESTIGADOR"></v-radio>
                      <v-radio label="No Académico" value="NO ACADÉMICO"></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      name='nombre'
                      label='Nombre'
                      id='nombre'
                      type='text'
                      v-model='nombre'
                      required></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      name='paterno'
                      label='Primer apellido'
                      id='paterno'
                      type='text'
                      v-model='paterno'
                      required></v-text-field>
                  </v-flex>
                  <v-flex>
                  <v-text-field
                      name='materno'
                      label='Segundo apellido'
                      id='materno'
                      type='text'
                      v-model='materno'></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-radio-group v-model="genero" row  label="Género">
                      <v-radio label="Femenino" value="FEMENINO" ></v-radio>
                      <v-radio label="Masculino" value="MASCULINO"></v-radio>
                    </v-radio-group>
                  </v-flex>                  
                  <v-flex>
                    <v-menu
                      ref="cal"
                      lazy
                      :close-on-content-click="false"
                      v-model="cal"
                      transition="scale-transition"
                      offset-y
                      full-width
                      :nudge-right="40"
                      min-width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        label="Fecha de nacimiento"
                        v-model="nacimiento"
                        readonly
                        required
                      ></v-text-field>
                      <v-date-picker
                        ref="picker"
                        v-model="nacimiento"
                        @change="save"
                        min="1950-01-01"
                        :max="new Date().toISOString().substr(0, 10)"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      name='rfc'
                      label='RFC'
                      id='rfc'
                      type='text'
                      v-model='rfc'
                      required></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-select
                      :items="grados"
                      v-model="grado"
                      label="Grado académico"
                      single-line
                      required
                    ></v-select>
                  </v-flex>
                  <v-toolbar>
                    <v-spacer></v-spacer>
                    <v-toolbar-title><v-icon medium>bookmark</v-icon> Investigación</v-toolbar-title>
                  </v-toolbar>                  
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-flex class='text-xs-center' my-3>
                <v-btn color='success' type='submit'>Enviar mis datos</v-btn>
              </v-flex>
            </v-card-actions>
          </form>
        </v-card>
        {{$data}}
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      tipo: null,
      nombre: '',
      paterno: '',
      materno: '',
      genero: null,
      nacimiento: null,
      cal: false,
      rfc: '',
      grado: '',
      alert: false,
      grados: [
        {text: 'NO GRADUADO'},
        {text: 'LICENCIATURA'},
        {text: 'MAESTRIA'},
        {text: 'DOCTORADO'},
        {text: 'POSTDOCTORADO'}
      ]
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
    },
    cal (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    save (date) {
      this.$refs.cal.save(date)
    }
  }
}
</script>