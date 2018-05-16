<template>
  <v-container fluid v-if="inicio5areunion">
    <v-layout justify-center align-center style="margin-top:5vh;">
      <v-flex xs12 sm12 md12 class="text-sm-center">
        <img src="http://c-mic.mx/img/banner01.jpg" style="max-width:100%" class="mx-auto">
      </v-flex>
    </v-layout>
  </v-container>
  <v-content v-else>
    <router-view></router-view>
  </v-content>
</template>

<script>
export default {
  computed: {
    inicio5areunion () {
      return this.$route.path === '/5areunion'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fondo{
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: cover !important;
}
</style>
