<template>
  <v-container fluid fill-height>
    <v-layout row wrap justify-center style="margin-top:120px">
      <v-flex xs10 sm10 md10 lg10>
        <h1 class="my-5 display-2 primary5areunion--text text-xs-center">SEDE</h1>
        <v-card class="elevation-6">
          <v-card-media height="300px">
            <img :src="image" style="max-width:100%; max-height:100%">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Hilton Garden Inn Puebla Angelópolis</h3>
              <div>Blvd Atlixcayotl 2528 Reserva Territorial Atilxcayotl, <br>San Andres Cholula, Puebla, 72830, Mexico</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm10 md10 lg10>
        <carousel :loop="true" :autoplay="true" :autoplayTimeout="3000" :autoplayHoverPause="true" :perPage="1">
          <slide :style="{ 'background': 'url(\'' + hotel1 + '\') ' }" class='fondo' style="height:40vw">
          </slide>
          <slide :style="{ 'background': 'url(\'' + hotel2 + '\') ' }" class='fondo'>
          </slide>
          <slide :style="{ 'background': 'url(\'' + hotel3 + '\') ' }" class='fondo'>
          </slide>
          <slide :style="{ 'background': 'url(\'' + hotel4 + '\') ' }" class='fondo'>
          </slide>
          <slide :style="{ 'background': 'url(\'' + hotel5 + '\') ' }" class='fondo'>
          </slide>
          <slide :style="{ 'background': 'url(\'' + hotel6 + '\') ' }" class='fondo'>
          </slide>                                  
        </carousel>
      </v-flex>
      <v-flex xs12 sm10 md10 lg10 mb-5>
        <h1 class="mb-5 display-2 primary5areunion--text text-xs-center">MAPA DE UBICACIÓN</h1>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.997045442057!2d-98.24302908585446!3d19.01985185867918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc742407551ef%3A0x93dc3db3e62b8694!2sComplejo+Cultural+Universitario+BUAP!5e0!3m2!1ses!2smx!4v1525501419811" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen class="mx-auto"></iframe>
      </v-flex>      
    </v-layout>
  </v-container>
</template>

<script>
import fondo from '../assets/hilton.jpg'
import imagen1 from '../assets/hotel1.jpg'
import imagen2 from '../assets/hotel2.jpg'
import imagen3 from '../assets/hotel3.jpg'
import imagen4 from '../assets/hotel4.jpg'
import imagen5 from '../assets/hotel5.jpg'
import imagen6 from '../assets/hotel6.jpg'

export default {
  data () {
    return {
      hotel1: imagen1,
      hotel2: imagen2,
      hotel3: imagen3,
      hotel4: imagen4,
      hotel5: imagen5,
      hotel6: imagen6,
      image: fondo
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
