<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap style="margin-top:120px">
      <v-flex xs12 class='text-xs-center'>
        <h1 class="my-3 display-2 primary--text text-xs-center">CONTACTO</h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-toolbar dark color="primary5areunion" style="margin-top:46px" my-3>
          <v-toolbar-title>Logística C-MIC</v-toolbar-title>
        </v-toolbar>
        <v-card class="elevation-12">
            <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">Roberto Sánchez Jaramillo</h3>
                <div><a href="mailto:reuniones@c-mic.mx">reuniones@c-mic.mx</a></div>
            </div>
            </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-toolbar dark color="primary5areunion" style="margin-top:46px" my-3>
          <v-toolbar-title>Meeting Planner</v-toolbar-title>
        </v-toolbar>
        <v-card class="elevation-12">
            <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">Mikeldi Representaciones</h3>
                <div><a href="mailto:mikeldirepresentaciones@gmail.com">mikeldirepresentaciones@gmail.com</a></div>
                <div><a href="www.mikeldirepresentaciones.com.mx">www.mikeldirepresentaciones.com.mx</a></div>
            </div>
            </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
