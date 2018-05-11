<template>
  <v-content>
    <v-flex xs12>
      <div class="text-xs-center" color="white" style="margin-top:104px">
        |
        <router-link class="primary--text" :to="{name: 'convocatorias'}">Convocatorias</router-link> | 
        <router-link class="primary--text" :to="{name: 'eventos'}">Próximos eventos</router-link> | 
      </div>
    </v-flex>
    <router-view></router-view>
  </v-content>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #c41949;
}
</style>
