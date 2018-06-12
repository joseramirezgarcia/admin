<template>
  <v-content>
    <v-flex xs12>
      <div class="text-xs-center" color="white" style="margin-top:104px">
        |
        <router-link class="primary--text" :to="{name: 'registro'}">Registro</router-link> | 
        <router-link class="primary--text" :to="{name: 'directorio'}">Directorio</router-link> | 
        <router-link class="primary--text" :to="{name: 'ingresar'}">Ingresar</router-link> | 
        <router-link class="primary--text" :to="{name: 'investigadores'}">Investigadores</router-link> | 
        <router-link class="primary--text" :to="{name: 'estudiantes'}">Estudiantes</router-link> | 
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