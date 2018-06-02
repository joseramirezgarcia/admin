<template>
  <v-container fluid style="bacgroundColor=#FFFFFF">
    <v-layout row id="nosotros" style="margin-top:104px">
      <v-flex xs12 sm8 offset-sm2 v-if="datos">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark>
            <v-spacer></v-spacer>            
            <v-toolbar-title style="font-size:100%">{{datos.nombre}} {{datos.paterno}} {{datos.materno}}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-list two-line>
            <template v-for="(campo, titulo, index) in campos">
              <v-list-tile :key="index + 'tile'" v-if="datos[campo] !== ''">
                <v-list-tile-content>
                  <v-list-tile-sub-title>
                    {{titulo}}
                  </v-list-tile-sub-title>
                  <v-list-tile-title v-if="campo === 'institucional' || campo === 'personal'">
                    <a class="primary--text" :href="'mailto:' + datos[campo]">{{datos[campo]}}</a>
                  </v-list-tile-title>
                  <v-list-tile-title v-else>
                    {{datos[campo]}}
                    {{datos.count}}
                  </v-list-tile-title>                  
                </v-list-tile-content>
              </v-list-tile>
              <v-divider :key="index + 'divider'" v-if="datos[campo] !== '' && campo !== 'personal'"></v-divider>              
            </template>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 sm8 offset-sm2 v-else>
        <h2 style="text-align:center" class="primary--text">Datos no encontrados</h2>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { fb } from '../config/firebase'

let db = fb.database()
export default {
  data () {
    return {
      datos: null,
      campos: {
        'Membresia': 'membresia',
        'Fecha': 'fecha',
        'Campo de conocimiento': 'campo',
        'Area de conocimiento': 'subcampo',
        'Tipo de miembro': 'tipo',
        'Género': 'genero',
        'Grado académico': 'grado',
        'RFC': 'rfc',
        'CVU': 'cvu',
        'Pertenece al SNI': 'sni',
        'Nivel SNI': 'nivel',
        'Area SNI': 'area',
        'Institución': 'institucion',
        'Dirección de la institición': 'direccion',
        'País': 'pais',
        'Entidad': 'entidad',
        'Teléfono': 'telefono',
        'Celular': 'celular',
        'Correo electrónico institucional': 'institucional',
        'Correo electrónico personal': 'personal'
      }
    }
  },
  props: ['membresia'],
  created () {
    let self = this
    db.ref('miembros/' + this.membresia).on('value', function (snapshot) {
      self.datos = snapshot.val()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #c41949;
}
</style>
