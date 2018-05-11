<template>
  <v-content>
    <v-layout wrap v-if="inicio5areunion">
      <v-flex xs12 sm12 mb-5 class="align-start" style="margin-top:56px">
        <img :src="image" style="max-width:100%">
      </v-flex>
    </v-layout>
    <router-view v-else></router-view>
  </v-content>
</template>

<script>
import fondo from '../assets/banner01.jpg'

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
