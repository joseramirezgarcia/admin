<template>
  <carousel :loop="true" :autoplay="true" :autoplayTimeout="3000" :autoplayHoverPause="true" :perPage="1" style="margin-top:104px">
    <slide>
      <img src="http://c-mic.mx/img/banner03.jpg" style="width:100%">
    </slide>
    <slide>
      <router-link :to="{name: '5areunion'}" tag='span' class="enlace">
        <img src="http://c-mic.mx/img/banner01.jpg" style="width:100%">
      </router-link>
    </slide>
    <slide>
      <router-link :to="{name: 'ponentes'}" tag='span' class="enlace">
        <img src="http://c-mic.mx/img/banner02.jpg" style="width:100%">
      </router-link>
    </slide>
    <slide>
      <a href="http://c-mic.mx/PDF/SeminarioMedicinaPrecision.pdf" target="_blank">
        <img src="http://c-mic.mx/img/banner06.jpg" style="width:100%">
      </a>
    </slide>    
    <slide>
      <a href="http://c-mic.mx/PDF/TallerBioinformatica.pdf" target="_blank">
        <img src="http://c-mic.mx/img/banner04.jpg" style="width:100%">
      </a>
    </slide>
  </carousel>
</template>

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
