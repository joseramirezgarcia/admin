<template>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="i in items" :key="i">
      <div slot="header">{{i.titulo}}</div>
      <v-card>
        <v-card-text>
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex xs12 sm4 col>
                <iframe width="100%" src="https://www.youtube.com/embed/o9DKaM7bDDE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
              </v-flex>
              <v-flex xs12 sm4 col>
                <iframe width="100%" src="https://www.youtube.com/embed/o9DKaM7bDDE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
              </v-flex>
              <v-flex xs12 sm4 col>
                <iframe width="100%" src="https://www.youtube.com/embed/o9DKaM7bDDE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {titulo: 'Difusión'},
          {titulo: '4a Reunión Anual'},
          {titulo: 'Taller "Cancer Research in the Media"'},
          {titulo: 'Rompiendo Mitos'},
          {titulo: 'Artículos'},
        ]
      }
    }
  }
</script>

<style scoped>

</style>
