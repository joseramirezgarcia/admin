<template>
  <carousel :loop="true" :autoplay="true" :autoplayTimeout="3000" :autoplayHoverPause="true" :perPage="1" style="margin-top:104px">
    <slide>
      <img :src="banner3" style="width:100%">
    </slide>
    <slide>
      <router-link :to="{name: '5areunion'}" tag='span' class="enlace">
        <img :src="banner1" style="width:100%">
      </router-link>
    </slide>
    <slide>
      <router-link :to="{name: 'ponentes'}" tag='span' class="enlace">
        <img :src="banner2" style="width:100%">
      </router-link>
    </slide>
    <slide>
      <a href="http://c-mic.mx/PDF/APEIC4oCongreso.pdf" target="_blank">
        <img :src="banner5" style="width:100%">
      </a>
    </slide>
    <slide>
      <a href="http://c-mic.mx/PDF/SeminarioMedicinaPrecision.pdf" target="_blank">
        <img :src="banner6" style="width:100%">
      </a>
    </slide>    
    <slide>
      <a href="http://c-mic.mx/PDF/TallerBioinformatica.pdf" target="_blank">
        <img :src="banner4" style="width:100%">
      </a>
    </slide>
  </carousel>
</template>

<script>
import imagen1 from '../assets/banner01.jpg'
import imagen2 from '../assets/banner02.jpg'
import imagen3 from '../assets/banner03.jpg'
import imagen4 from '../assets/banner04.jpg'
import imagen5 from '../assets/banner05.jpg'
import imagen6 from '../assets/banner06.jpg'

export default {
  data () {
    return {
      banner1: imagen1,
      banner2: imagen2,
      banner3: imagen3,
      banner4: imagen4,
      banner5: imagen5,
      banner6: imagen6
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
.enlace{
  cursor: pointer;
  width:100%;
  height:100%;
  display: block;
}
</style>
