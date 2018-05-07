<template>
  <carousel :loop="true" :autoplay="true" :autoplayTimeout="3000" :autoplayHoverPause="true" :perPage="1" style="margin-top:168px">
    <slide :style="{ 'background': 'url(\'' + banner1 + '\') ' }" class='fondo' style="height:50vw">
      <router-link :to="{name: '5areunion'}" tag='span' class="enlace"></router-link>
    </slide>
    <slide :style="{ 'background': 'url(\'' + banner2 + '\') ' }" class='fondo'>
      <router-link :to="{name: 'ponentes'}" tag='span' class="enlace"></router-link>
    </slide>
    <slide :style="{ 'background': 'url(\'' + banner3 + '\') ' }" class='fondo'>
    </slide>    
  </carousel>
</template>

<script>
import imagen1 from '../assets/banner1.jpg'
import imagen2 from '../assets/banner2.jpg'
import imagen3 from '../assets/banner3.jpg'

export default {
  data () {
    return {
      banner1: imagen1,
      banner2: imagen2,
      banner3: imagen3,
      items: [
        {
          src: imagen1
        },
        {
          src: imagen2
        },
        {
          src: imagen3
        }
      ]
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
