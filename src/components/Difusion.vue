<template>
  <v-layout>
    <v-flex xs12 sm10 offset-sm1 style="margin-top:168px">
      <h1 class="mb-5 display-2 primary--text text-xs-center">DIFUSIÓN</h1>
        <v-expansion-panel>
          <v-expansion-panel-content v-for="(i,index) in items" :key="index">
            <div slot="header">{{i.titulo}}</div>
            <v-card>
              <v-card-text>
                <v-container fluid grid-list-lg>
                  <v-layout row wrap>
                    <v-flex xs12 sm4 col v-for="(a,index) in i.archivos" :key="index" v-if="typeof a.url === 'undefined'">
                      <a :href="'https://www.youtube.com/watch?v='+a.id" target="_blank"><img :src="'https://img.youtube.com/vi/'+a.id+'/hqdefault.jpg'" width="100%"></a>
                    </v-flex>
                    <v-flex xs12 sm4 col v-for="(a,index) in i.archivos" :key="index" v-else>
                      <v-btn
                        color="primary"
                        class="white--text"
                        :href="a.url"
                        target="_blank"
                      >
                        <v-icon>picture_as_pdf</v-icon>
                      </v-btn>
                    </v-flex>              
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {titulo: 'Difusión', archivos: [{id: 'o9DKaM7bDDE'}, {id: 'h9uxJ_R_hMo'}, {id: 'la7MsD1Nm3g'}, {id: 'UPicPxEMLLI'}, {id: 'G4ZOdiaVVAc'}, {id: '8-BwfwPtwg8'}, {id: 'IzaPaDmOtyk'}, {id: 'RHP-Ns_55DI'}, {id: '0WETKqg6DS8'}, {id: 'biC6dNPf9NE'}]},
          {titulo: '4a Reunión Anual', archivos: [{id: '87pos9jw068'}, {id: 'l0-867pb_N4'}, {id: '8scBcmIkhVk'}, {id: 'kntmjUg-dKY'}, {id: 'sfAUNZUX6JI'}, {id: 'HqZ9IdnqfDc'}]},
          {titulo: 'Taller "Cancer Research in the Media"', archivos: [{id: '7nwbqv_7sXw'}]},
          {titulo: 'Rompiendo Mitos', archivos: [{id: 'OQvl9Ulo0Y8'}, {id: '6K2_ceLiolU'}, {id: 'jpgtgEcsoI8'}, {id: 'TT84ndH7XWE'}, {id: 'MvWwfw2z7Z0'}]},
          {titulo: 'Artículos', archivos: [{url: 'http://c-mic.mx/PDF/MitoRealidad.pdf'}]}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
