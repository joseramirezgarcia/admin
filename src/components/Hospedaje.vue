<template>
  <v-container fluid fill-height>
    <v-layout row wrap justify-center style="margin-top:120px">
      <v-flex xs10 sm10 md10 lg10>
        <h1 class="my-5 display-2 primary5areunion--text text-xs-center">SEDE</h1>
        <v-card class="elevation-6">
          <v-card-media height="300px">
            <img src="http://c-mic.mx/img/hilton.jpg" style="max-width:100%; max-height:100%">
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
          <slide style="background: url('http://c-mic.mx/img/hotel1.jpg'); height:40vw" class='fondo'>
          </slide>
          <slide style="background: url('http://c-mic.mx/img/hotel2.jpg')" class='fondo'>
          </slide>
          <slide style="background: url('http://c-mic.mx/img/hotel3.jpg')" class='fondo'>
          </slide>
          <slide style="background: url('http://c-mic.mx/img/hotel4.jpg')" class='fondo'>
          </slide>
          <slide style="background: url('http://c-mic.mx/img/hotel5.jpg')" class='fondo'>
          </slide>
          <slide style="background: url('http://c-mic.mx/img/hotel6.jpg')" class='fondo'>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fondo{
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: cover !important;
}
</style>
