<template>
  <v-container fluid fill-height>
    <v-layout justify-center style="margin-top:120px">
      <v-flex xs12 justify-center>
        <h1 class="my-5 display-2 primary5areunion--text text-xs-center">MAPA DE UBICACIÓN</h1>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.997045442057!2d-98.24302908585446!3d19.01985185867918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc742407551ef%3A0x93dc3db3e62b8694!2sComplejo+Cultural+Universitario+BUAP!5e0!3m2!1ses!2smx!4v1525501419811" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen class="mx-auto"></iframe>
        <h1 class="ma-5 display-2 primary5areunion--text text-xs-center">MAPA DEL LUGAR</h1>
        <img :src="mapa" width="100%">
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import mapa from '../assets/mapa.png'

export default {
  data () {
    return {
      mapa: mapa
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
