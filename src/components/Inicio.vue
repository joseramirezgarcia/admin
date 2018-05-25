<template>
  <carousel :loop="true" :autoplay="true" :autoplayTimeout="3000" :autoplayHoverPause="true" :perPage="1" style="margin-top:104px">
    <slide v-for="(i,index) in carrusel" :key="index">
      <router-link :to="{name: i.url}" tag='span' class="enlace" v-if="i.tipo==='seccion'">
        <img :src="i.imagen" style="width:100%">
      </router-link>
      <a :href="i.url" target="_blank" v-else-if="i.tipo==='url'">
        <img :src="i.imagen" style="width:100%">
      </a>
      <img :src="i.imagen" style="width:100%" v-else>
    </slide>
  </carousel>
</template>

<script>
import { fb } from '../config/firebase'

let db = fb.database()
let carruselRef = db.ref('web/carrusel')

export default {
  name: 'Inicio',
  firebase: {
    carrusel: carruselRef
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
.enlace{
  cursor: pointer;
  width:100%;
  height:100%;
  display: block;
}
</style>
