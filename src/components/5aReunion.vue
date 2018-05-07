<template>
  <v-content>
    <v-layout v-if="inicio5areunion" style="height:100vh">
      <v-flex :style="{ 'background': 'url(\'' + image + '\') ' }" class='fondo'></v-flex>
    </v-layout>
    <router-view v-else></router-view>
  </v-content>
</template>

<script>
import fondo from '../assets/5reunionanual.jpg'

export default {
  data () {
    return {
      image: fondo
    }
  },
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
