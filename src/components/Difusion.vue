<template>
  <v-container>
    <v-layout column wrap>
      <v-flex xs12 sm10 offset-sm1 style="margin-top:104px">
        <h1 class="mb-5 display-2 primary--text text-xs-center">DIFUSIÓN</h1>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1 align-justify text-xs-center>
        <v-spacer></v-spacer>
          <v-btn v-for="(t,index) in tags" :key="index" color="primary" round :outline="activo!==t.tag" @click="activo=t.tag" class="caption tag">
            {{t.titulo}}
          </v-btn>
        <v-spacer></v-spacer>
      </v-flex>
    </v-layout>
    <v-layout row wrap grid-list-md mt-3>
      <v-flex xs12 sm3 v-for="(a,index) in difusion" :key="index" v-if="activo===a.tag"> 
        <vue-flashcard 
          v-if="a.tipo==='youtube'"
          headerFront=""
          :front="a.titulo" 
          footerFront=""
          textSizeFront="16px"
          colorTextFront="#005090"
          :headerBack="a.titulo"
          :back="a.descripcion" 
          :footerBack="'https://www.youtube.com/watch?v=' + a.id"
          textSizeBack="12px"
          colorBack="white"          
          colorTextBack="#005090"          
          :imgFront="'https://img.youtube.com/vi/'+a.id+'/hqdefault.jpg'"
          >
        </vue-flashcard>
        <vue-flashcard 
          v-else-if="a.tipo==='articulo'"
          headerFront=""
          :front="a.titulo" 
          footerFront=""
          textSizeFront="16px"
          colorTextFront="#005090"
          :headerBack="a.titulo"
          back="" 
          :footerBack="a.url"
          textSizeBack="12px"
          colorBack="white"          
          colorTextBack="#005090"          
          imgFront=""
          >
        </vue-flashcard>        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import vueFlashcard from 'vue-flashcard'
import { fb } from '../config/firebase'

let db = fb.database()
let difusionRef = db.ref('web/difusion')
let tagsRef = db.ref('web/tags')

export default {
  firebase: {
    difusion: difusionRef,
    tags: tagsRef
  },
  components: {
    vueFlashcard
  },
  data () {
    return {
      activo: 'difusion'
    }
  }
}
</script>

<style scoped>
  .tag {
    max-width:100%;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
