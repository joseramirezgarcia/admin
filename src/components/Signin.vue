<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-24">
            <v-toolbar dark color="primary">
              <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
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
                      required></v-text-field>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      alert: false
    }
  },
  methods: {
    userSignIn () {
      this.$store.dispatch('userSignIn', {
        email: this.email,
        password: this.password
      })
    }
  },
  computed: {
    appTitle () {
      return this.$store.state.appTitle
    },
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
  }
}
</script>