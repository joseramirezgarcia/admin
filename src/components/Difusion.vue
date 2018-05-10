<template>
  <v-container>
    <v-layout column wrap>
      <v-flex xs12 sm10 offset-sm1 style="margin-top:168px">
        <h1 class="mb-5 display-2 primary--text text-xs-center">DIFUSIÓN</h1>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1 align-justify text-xs-center>
        <v-spacer></v-spacer>
          <v-btn v-for="(i,index) in items" :key="index" color="primary" round :outline="activo!==i.tag" @click="activo=i.tag" class="caption tag">
            {{i.titulo}}
          </v-btn>
        <v-spacer></v-spacer>
      </v-flex>
    </v-layout>
    <v-layout row wrap grid-list-md mt-3>
      <v-flex xs12 sm3 v-for="(a,index) in detalles" :key="index" v-if="activo===a.tag"> 
        <vue-flashcard 
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
      </v-flex>
      <template v-for="i in items">
        <v-flex xs12 sm3 v-for="(a,index) in i.archivos" :key="index" v-if="activo===a.tag"> 
          <vue-flashcard 
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
      </template>
    </v-layout>
  </v-container>
</template>

<script>
  import vueFlashcard from 'vue-flashcard'
  // import axios from 'axios'

  export default {
    components: {
      vueFlashcard
    },
    mounted () {
      /* let that = this
      for (let i of this.items) {
        for (let a of i.archivos) {
          axios.get('https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=' + a.id + '&key=AIzaSyDEtHVnX-1c8J0M1zWSGP2WtrnJCiC9E1Y')
          .then(response => {
            let info = response.data.items[0].snippet
            let todo = {id: a.id, tag: i.tag, titulo: info.title, descripcion: info.description}
            that.detalles.push(todo)
          })
        }
      } */
      this.detalles = [
        {
          'id': 'biC6dNPf9NE',
          'tag': 'difusion',
          'titulo': 'M. en C. Marel Quezada',
          'descripcion': 'Marel Quezada es estudiante de Doctorado, realiza su investigación en el INCan y es miembro del Colegio. \n\nMusic by Trent Reznor & Atticus Ross'
        },
        {
          'id': '8-BwfwPtwg8',
          'tag': 'difusion',
          'titulo': 'Dra. Jessica E. Salazar Campos',
          'descripcion': 'La Dra. Jessica es ginecologa oncologa del INCan, conoce su día a día y lo que piensa de la importancia de tener especialistas en cáncer de la mujer. \n\nMusica de Explosions In The Sky'
        },
        {
          'id': '0WETKqg6DS8',
          'tag': 'difusion',
          'titulo': 'Dr. Mariano Martínez',
          'descripcion': 'El Dr. Mariano comenta su interés de pertenecer al Colegio para la difusión de su trabajo y la necesidad de la colaboración de distintos laboratorios para hacerle frente al cáncer.'
        },
        {
          'id': 'o9DKaM7bDDE',
          'tag': 'difusion',
          'titulo': 'Dr. Abelardo Meneses, Director General del INCan',
          'descripcion': 'El Dr. Abelardo Meneses habla del C-MIC y de la importancia de tener una asociación como esta en nuestro país para hacerle frente al cáncer. ¡El cáncer hoy un reto, mañana será nuestra historia de éxito, la investigación construye el futuro!'
        },
        {
          'id': 'G4ZOdiaVVAc',
          'tag': 'difusion',
          'titulo': 'QBP. Karen G. de la Cruz',
          'descripcion': 'Karen, miembro del C-MIC, habla de la importancia de la investigación básica que realiza, para poder encontrar un agente antitumoral.'
        },
        {
          'id': 'UPicPxEMLLI',
          'tag': 'difusion',
          'titulo': 'M. en C. Leslie Olmedo',
          'descripcion': 'Leslie, miembro del Colegio, habla del esfuerzo del C-MIC para el apoyo a los estudiantes y la investigación en cáncer en nuestro país para mejorar la calidad de vida de los mexicanos.'
        },
        {
          'id': 'la7MsD1Nm3g',
          'tag': 'difusion',
          'titulo': 'Dr. Eduardo Lazcano Ponce',
          'descripcion': 'El Dr. Lazcano habla del objetivo principal del Colegio y su contribución en mejorar la salud de los mexicanos, así como el tema de prevención en cáncer.'
        },
        {
          'id': 'h9uxJ_R_hMo',
          'tag': 'difusion',
          'titulo': 'La investigación construye el futuro. ¡Únete a este esfuerzo!',
          'descripcion': 'Conoce al Colegio Mexicano para la Investigación del Cáncer, un esfuerzo para mejorar la calidad de vida de los pacientes con cáncer.'
        },
        {
          'id': 'IzaPaDmOtyk',
          'tag': 'difusion',
          'titulo': 'Dra. Marcela Lizano Soberón',
          'descripcion': 'Los invitamos a que conozcan a la Dra. Marcela Lizano, investigadora del INCan y miembro del Colegio, su investigación, su pensamiento sobre la ciencia, del C-MIC y el futuro de la investigación. ¡La Investigación construye el futuro!'
        },
        {
          'id': 'RHP-Ns_55DI',
          'tag': 'difusion',
          'titulo': 'Adela D. Galván',
          'descripcion': 'Adela Galván, egresada de Medicina, habla de su experiencia como miembro del C-MIC y de la importancia de la investigación para entender, tratar y curar el cáncer. ¡La investigación construye el futuro!'
        },
        {
          'id': '7nwbqv_7sXw',
          'tag': 'tallercancer',
          'titulo': 'Taller \'Cancer Research in the Media\'',
          'descripcion': 'El pasado 8 y 9 de noviembre se llevó a cabo el Taller \'Cancer Research in the Media\' organizado por el INCan y el C-MIC, el cual consistió en un encuentro entre investigadores y periodistas con la finalidad de generar un puente entre estos, para poder llevarle a la gente la mejor información acerca de esta enfermedad. Los invitamos a ver el video memoria del evento para que se enteren de más detalles. \n¡La investigación construye el futuro!'
        },
        {
          'id': '8scBcmIkhVk',
          'tag': '4areunionanual',
          'titulo': 'Video Semblanza de la 4a Reunión Anual del Colegio Mexicano para la Investigación del Cáncer',
          'descripcion': ''
        },
        {
          'id': '87pos9jw068',
          'tag': '4areunionanual',
          'titulo': 'Invitación a la 4ª Reunión Anual del C-MIC por parte del Dr. Xavier Soberón',
          'descripcion': 'Información general sobre la 4ª Reunión: http://c-mic.mx\n\nRegístrate a la 4ª Reunión aquí: http://c-mic.mx/registro-4a-reunion-anual/'
        },
        {
          'id': 'l0-867pb_N4',
          'tag': '4areunionanual',
          'titulo': 'Apertura de la 4a Reunión del Colegio Mexicano para la Investigación del Cáncer',
          'descripcion': ''
        },
        {
          'id': 'kntmjUg-dKY',
          'tag': '4areunionanual',
          'titulo': 'Debate \'Prioridades de Investigación de Cáncer en México\' (Parte 1)',
          'descripcion': 'En la pasada 4a Reunión Anual del C-MIC, se llevó a cabo una mesa de debate formada por expertos de distintas áreas para hablar sobre las \'Prioridades de Investigación de Cáncer en México\'. En este debate se analizó la situación, prioridades, retos y propuestas para hacerle frente al cáncer.'
        },
        {
          'id': 'OQvl9Ulo0Y8',
          'tag': 'rompiendomito',
          'titulo': 'ROMPIENDO MITOS \'Contaminación del aire\'',
          'descripcion': 'Campaña Rompiendo Mitos\nCápsula \'Contaminación del aire\'\nGuión: Investigadores y miembros del CMIC'
        },
        {
          'id': 'sfAUNZUX6JI',
          'tag': '4areunionanual',
          'titulo': 'Dr. Cristian Tomasetti en la 4ª Reunión Anual del C-MIC',
          'descripcion': 'Los invitamos a ver la plática que dio el Dr. Cristian Tomasetti titulada \'The Etiology of Mutations in Cancer and Their Role in Cancer Causation\', en la 4a Reunión del C-MIC. \nEsperemos disfruten esta gran conferencia y la compartan.\n¡La investigación construye el futuro!'
        },
        {
          'id': 'jpgtgEcsoI8',
          'tag': 'rompiendomito',
          'titulo': 'ROMPIENDO MITOS Carne Procesada\'',
          'descripcion': 'Campaña Rompiendo Mitos\nCápsula \'Carne Procesada\'\nGuión: Investigadores y miembros del CMIC'
        },
        {
          'id': 'HqZ9IdnqfDc',
          'tag': '4areunionanual',
          'titulo': 'Dr. David A. Potter en la 4ª Reunión Anual del C-MIC',
          'descripcion': ''
        },
        {
          'id': '6K2_ceLiolU',
          'tag': 'rompiendomito',
          'titulo': 'Rompiendo Mitos: Próstata',
          'descripcion': ''
        },
        {
          'id': 'MvWwfw2z7Z0',
          'tag': 'rompiendomito',
          'titulo': 'Rompiendo Mitos: Súper Alimentos',
          'descripcion': ''
        },
        {
          'id': 'TT84ndH7XWE',
          'tag': 'rompiendomito',
          'titulo': 'ROMPIENDO MITOS \'Campos Electromagnéticos\'',
          'descripcion': 'Campaña Rompiendo Mitos\nCápsula \'Campos Electromagnéticos\'\nGuión: Investigadores y miembros del CMIC'
        },
        {
          'id': 'uQ_-3IXsX74',
          'tag': '4areunionanual',
          'titulo': 'Dra. Razelle Kurzrock en la 4ª Reunión Anual del C-MIC',
          'descripcion': ''
        },
        {
          'id': 'SRArG4BVOr0',
          'tag': '4areunionanual',
          'titulo': 'Dr. Carlos Vallejos en la 4ª Reunión Anual del C-MIC',
          'descripcion': ''
        },
        {
          'id': 'X9DrDWVWX6c',
          'tag': '4areunionanual',
          'titulo': 'Dra. Helen Piwnica-Worms en la 4ª Reunión Anual del C-MIC',
          'descripcion': ''
        },
        {
          'id': '-6ZRIfoCbk0',
          'tag': '4areunionanual',
          'titulo': 'Dr. Ethan Dmitrovsky en la 4ª Reunión Anual del C-MIC',
          'descripcion': ''
        },
        {
          'id': '7xeLtssF8h0',
          'tag': '4areunionanual',
          'titulo': 'Dr. Adrian Puello en la 4ª Reunión Anual del C-MIC',
          'descripcion': ''
        },
        {
          'id': 'jf3hzvVeMLg',
          'tag': '4areunionanual',
          'titulo': 'Dr. Ernest Hawk en la 4ª Reunión Anual del C-MIC',
          'descripcion': ''
        },
        {
          'id': 'tdT0laaed6A',
          'tag': '4areunionanual',
          'titulo': 'Dr. George Wilding en la 4ª Reunión Anual del C-MIC',
          'descripcion': ''
        },
        {
          'id': 'KME4cUX3rAc',
          'tag': '4areunionanual',
          'titulo': 'Dr. Fabian Galindo en la 4ª Reunión Anual del C-MIC',
          'descripcion': ''
        },
        {
          'id': 'U6XBpsGd_I4',
          'tag': '4areunionanual',
          'titulo': 'Dr. Hilario Mata en la 4ª Reunión Anual del C-MIC',
          'descripcion': ''
        },
        {
          'id': 'wVAbAyCqyuU',
          'tag': '4areunionanual',
          'titulo': 'Dr. Kurt Schalper en la 4ª Reunión Anual del C-MIC',
          'descripcion': ''
        }
      ]
      // console.log(this.detalles)
    },
    data () {
      return {
        activo: 'difusion',
        detalles: [],
        items: [
          {
            titulo: 'Difusión',
            tag: 'difusion',
            archivos: []
          },
          {
            titulo: '4a Reunión Anual',
            tag: '4areunionanual',
            archivos: []
          },
          {
            titulo: 'Taller "Cancer Research in the Media"',
            tag: 'tallercancer',
            archivos: []
          },
          {
            titulo: 'Rompiendo Mitos',
            tag: 'rompiendomito',
            archivos: []
          },
          {
            titulo: 'Artículos',
            tag: 'articulos',
            archivos: [
              {url: 'http://c-mic.mx/PDF/MitoRealidad.pdf', tag: 'articulos', titulo: 'MITO REALIDAD: El grafeno sirve para curar el cáncer'}
            ]
          }
        ]
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
