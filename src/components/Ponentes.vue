<template>
  <v-container>
    <v-layout column wrap>
      <v-flex xs12 sm12 style="margin-top:168px">
        <h1 class="mb-5 display-2 primary--text text-xs-center">PONENTES</h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap mt-3 grid-list-lg>
      <v-flex xs12 sm4 md4 lg4 v-for="(p,index) in ponentes" :key="index" mb-5 ms-2> 
        <figure class="snip1336 elevation-12">
          <img src="http://c-mic.mx/img/fondoponentes.jpg" alt="sample87" />
          <figcaption>
            <img :src="p.image" alt="profile-sample4" class="profile elevation-24" />
            <h2>{{p.title}}</h2>
            <!-- <p>{{p.text}}</p> -->
            <v-btn small outline color="primary" :href="'http://c-mic.mx/PDF/' + p.url" target="_blank">Pdf <v-icon color="primary" right small>file_download</v-icon></v-btn>
            <v-btn small color="primary" class="white--text" @click.native="abrirdialogo(p)">leer mas</v-btn>
          </figcaption>
        </figure>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" @keydown.esc="dialog = false" scrollable max-width="90%">
      <v-card>
        <v-card-title class="white--text fondo" style="background: url('http://c-mic.mx/img/fondoponentes.jpg')"><h2>{{nombre}}</h2></v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px; white-space: pre-line; text-align:justify">
          {{texto}}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="tertiary" flat @click.native="dialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>    
  </v-container>
</template>
      

<script>
import { fb } from '../config/firebase'

let db = fb.database()
let ponentesRef = db.ref('web/ponentes')

export default {
  firebase: {
    ponentes: ponentesRef
  },
  methods: {
    abrirdialogo (p) {
      this.nombre = p.title
      this.texto = p.text
      this.dialog = true
    }
  },
  data () {
    return {
      nombre: '',
      texto: '',
      dialog: false
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
.snip1336 {
  position: relative;
  float: left;
  overflow: hidden;
  margin: 5%;
  max-width: 100%;
  text-align: left;
  line-height: 1.4em;
  background-color: #ffffff;
}
.snip1336 * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
}
.snip1336 img {
  max-width: 100%;
  vertical-align: top;
  opacity: 0.85;
}
.snip1336 figcaption {
  width: 100%;
  background-color: #ffffff;
  padding: 25px;
  position: relative;
}
.snip1336 figcaption:before {
  position: absolute;
  content: '';
  bottom: 100%;
  left: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 55px 0 0 400px;
  border-color: transparent transparent transparent #ffffff;
}
.snip1336 .profile {
  border-radius: 50%;
  position: absolute;
  bottom: 100%;
  left: 10%;
  z-index: 1;
  max-width: 50%;
  opacity: 1;
  border: 6px solid transparent;
}
.snip1336 .profile:hover {
  transform: scale(1.3, 1.3);
}
.snip1336 .follow {
  margin-right: 4%;
  border-color: #2980b9;
  color: #2980b9;
}
.snip1336 h2 {
  margin: 0 0 5px;
  font-weight: 200;
  font-size:17px;
}
.snip1336 h2 span {
  display: block;
  font-size: 0.5em;
  color: #2980b9;
}
.snip1336 p {
  margin: 0 0 10px;
  font-size: 0.8em;
  letter-spacing: 1px;
  opacity: 0.8;
}
</style>
