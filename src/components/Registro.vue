<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs12 sm10 md9 lg8>
        <v-card class="elevation-24">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registro de nuevos miembros CMIC</v-toolbar-title>
          </v-toolbar>
          <v-form  v-model="valid" ref="form" lazy-validation>
            <v-card-title fill-height>
              <v-spacer></v-spacer>
              <div>
                <v-layout flex align-center justify-center class="headline mb-0 primary--text"><v-icon color="primary">account_circle</v-icon> Datos Generales</v-layout>
              </div>
            </v-card-title>
            <v-card-text>
              <v-flex>
                <v-radio-group v-model="tipo" label="Tipo de miembro*" row :rules="reglas.tipo">
                  <v-radio label="Estudiante" value="ESTUDIANTE" color="primary"></v-radio>
                  <v-radio label="Investigador" value="INVESTIGADOR" color="primary"></v-radio>
                  <v-radio label="No Académico" value="NO ACADÉMICO" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex>
                <v-text-field
                  name='nombre'
                  label='Nombre'
                  id='nombre'
                  type='text'
                  v-model='nombre'
                  :rules="reglas.nombre"
                  required></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field
                  name='paterno'
                  label='Primer apellido'
                  id='paterno'
                  type='text'
                  v-model='paterno'
                  :rules="[sinApellidos]"
                  ></v-text-field>
              </v-flex>
              <v-flex>
              <v-text-field
                  name='materno'
                  label='Segundo apellido'
                  id='materno'
                  type='text'
                  v-model='materno'
                  :rules="[sinApellidos]"
                  ></v-text-field>
              </v-flex>
              <v-flex>
                <v-radio-group v-model="genero" label="Género*" :rules="reglas.genero">
                  <v-radio label="Femenino" value="FEMENINO" color="primary"></v-radio>
                  <v-radio label="Masculino" value="MASCULINO" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>                  
              <v-flex>
                <v-menu
                  ref="cal"
                  lazy
                  :close-on-content-click="false"
                  v-model="cal"
                  transition="scale-transition"
                  offset-y
                  full-width
                  :nudge-right="40"
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    label="Fecha de nacimiento"
                    v-model="nacimiento"
                    :rules="reglas.nacimiento"
                    readonly
                    required
                  ></v-text-field>
                  <v-date-picker
                    ref="picker"
                    v-model="nacimiento"
                    @change="save"
                    :min="inicio"
                    :max="fin"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex>
                <v-text-field
                  name='rfc'
                  label='RFC'
                  id='rfc'
                  type='text'
                  :rules="reglas.rfc"
                  v-model='rfc'
                  :counter="13"
                  hint="Registro Federal de Contribuyentes"
                  persistent-hint
                  required></v-text-field>
              </v-flex>
              <v-flex>
                <v-select
                  :items="grados"
                  v-model="grado"
                  :rules="reglas.grado"
                  label="Grado académico"
                  required
                ></v-select>
              </v-flex>              
            </v-card-text>    
            <v-divider></v-divider>
            <v-card-title primary-title>
              <v-spacer></v-spacer>
              <div>
                <v-layout flex align-center justify-center class="headline mb-0 primary--text"><v-icon color="primary">bookmark</v-icon> Investigación</v-layout>
              </div>
            </v-card-title>            
            <v-card-text>
              <v-flex>
                <v-text-field
                  name='cvu'
                  label='Currículum vitae único (CVU)'
                  id='cvu'
                  type='text'
                  v-model='cvu'
                  :rules="reglas.cvu"
                  :counter="6"
                  hint="Otorgado por CONACyT"
                  persistent-hint
                  ></v-text-field>
              </v-flex>              
              <v-flex>
                <v-switch color="primary" label="Sistema nacional de investigadores (SNI)" v-model="sni" hint="Otorgado por CONACyT" persistent-hint></v-switch>
              </v-flex>
              <v-flex v-if="sni">
                <v-select
                  :items="niveles"
                  v-model="nivel"
                  label="Nivel SNI"
                  :rules="[nivelSNI]"
                ></v-select>
              </v-flex>
              <v-flex v-if="sni">
                <v-select
                  :items="areas"
                  v-model="area"
                  label="Área SNI"
                  :rules="[areaSNI]"
                ></v-select>
              </v-flex>
              <v-flex>
                <v-select
                  :items="campos"
                  v-model="campo"
                  label="Campo de conocimiento"
                  :rules="reglas.campo"
                  required
                ></v-select>
              </v-flex>
              <v-flex>
                <v-select
                  :items="filtrarCampo"
                  v-model="subcampo"
                  :label="subcampo.text"
                  item-text="subcampo"
                  item-value="subcampo"
                  :rules="reglas.subcampo"
                  required
                ></v-select>
              </v-flex>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-title primary-title>
              <v-spacer></v-spacer>
              <div>
                <v-layout flex align-center justify-center class="headline mb-0 primary--text"><v-icon color="primary">account_balance</v-icon> Institución</v-layout>
              </div>
            </v-card-title>            
            <v-card-text>
              <v-flex>
                <v-select
                  :items="instituciones"
                  v-model="institucion"
                  label="Institución"
                  item-text="nombre"
                  return-object
                  :rules="reglas.institucion"
                  required
                ></v-select>
              </v-flex>
              <v-flex>
                {{institucion.direccion}}
              </v-flex>
              <v-flex>
                {{institucion.pais}}
              </v-flex>
              <v-flex>
                {{institucion.estado}}
              </v-flex>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-title primary-title>
              <v-spacer></v-spacer>
              <div>
                <h3 class="headline mb-0"><v-icon>contact_phone</v-icon> Contacto</h3>
              </div>
            </v-card-title>            
            <v-card-text>
              <v-flex>
                <v-text-field
                  name='telefono'
                  label='Télefono'
                  id='telefono'
                  type='text'
                  v-model='telefono'
                  ></v-text-field>
              </v-flex>                
              <v-flex>
                <v-text-field
                  name='celular'
                  label='Celular'
                  id='celular'
                  type='text'
                  v-model='celular'
                  required
                  ></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field
                  name='institucional'
                  label='Correo electrónico institucional'
                  id='institucional'
                  type='text'
                  v-model='institucional'
                  hint="Solo en caso de que se trate de un correo oficial de la institución de adscripción"
                  persistent-hint
                  ></v-text-field>
              </v-flex>              
              <v-flex>
                <v-text-field
                  name='personal'
                  label='Correo electrónico Personal'
                  id='personal'
                  type='text'
                  v-model='personal'
                  required
                  ></v-text-field>
              </v-flex>   
            </v-card-text>            
          </v-form>
          <v-card-actions>
            <v-flex class='text-xs-center' my-3>
              <v-btn color='success' type='submit' @click="registrar" large>Enviar mis datos</v-btn>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { fb } from '../config/firebase'

let db = fb.database()
let miembrosRef = db.ref('miembros')

export default {
  data () {
    return {
      valid: true,
      miembro: {
        membresia: '',
        tipo: '',
        nombre: '',
        paterno: '',
        materno: '',
        genero: '',
        nacimiento: '',
        rfc: '',
        grado: '',
        cvu: '',
        sni: '',
        nivel: '',
        area: '',
        campo: '',
        subcampo: '',
        institucion: '',
        telefono: '',
        celular: '',
        personal: '',
        institucional: '',
        fecha: ''
      },
      tipo: null,
      nombre: '',
      paterno: '',
      materno: '',
      genero: null,
      nacimiento: null,
      rfc: '',
      grado: '',
      cvu: '',
      sni: false,
      nivel: '',
      area: '',
      campo: '',
      subcampo: '',
      institucion: '',
      telefono: '',
      celular: '',
      personal: '',
      institucional: '',
      inicio: '',
      fin: '',
      cal: false,
      alert: false,
      grados: [
        'NO GRADUADO',
        'LICENCIATURA',
        'MAESTRIA',
        'DOCTORADO',
        'POSTDOCTORADO'
      ],
      niveles: [
        'CANDIDATO',
        'I',
        'II',
        'III'
      ],
      areas: [
        'BIOLOGÍA',
        'BIOLOGÍA MOLECULAR',
        'BIOLOGÍA Y QUÍMICA',
        'CARCINOGÉNESIS EXPERIMENTAL',
        'HUMANIDADES Y CIENCIAS DE LA CONDUCTA',
        'INFECTOLOGÍA Y CANCER',
        'MEDICINA Y CIENCIAS DE LA SALUD',
        'QUÍMICO BIÓLOGA'
      ],
      campos: [
        'LOGICA',
        'MATEMATICAS',
        'ASTRONOMIA Y ASTROFISICA',
        'FISICA',
        'QUIMICA',
        'CIENCIAS DE LA VIDA',
        'CIENCIAS DE LA TIERRA Y DEL ESPACIO',
        'CIENCIAS AGRARIAS',
        'CIENCIAS MEDICAS',
        'CIENCIAS TECNOLOGICAS',
        'ANTROPOLOGIA',
        'DEMOGRAFIA',
        'CIENCIAS ECONOMICAS',
        'GEOGRAFIA',
        'HISTORIA',
        'CIENCIAS JURIDICAS Y DERECHO',
        'LINGUISTICA',
        'PEDAGOGIA',
        'CIENCIA POLITICA',
        'PSICOLOGIA',
        'CIENCIAS DE LAS ARTES Y LAS LETRAS',
        'SOCIOLOGIA',
        'ETICA',
        'FILOSOFIA'
      ],
      subcampos: [
        {campo: 'ANTROPOLOGIA', subcampo: 'ANTROPOLOGIA CULTURAL'},
        {campo: 'ANTROPOLOGIA', subcampo: 'ANTROPOLOGIA SOCIAL'},
        {campo: 'ANTROPOLOGIA', subcampo: 'ETNOGRAFIA Y ETNOLOGIA'},
        {campo: 'ANTROPOLOGIA', subcampo: 'OTRAS ESPECIALIDADES ANTROPOLOGICAS'},
        {campo: 'ASTRONOMIA Y ASTROFISICA', subcampo: 'ASTRONOMIA OPTICA'},
        {campo: 'ASTRONOMIA Y ASTROFISICA', subcampo: 'COSMOLOGIA Y COSMOGONIA'},
        {campo: 'ASTRONOMIA Y ASTROFISICA', subcampo: 'MEDIO INTERPLANETARIO'},
        {campo: 'ASTRONOMIA Y ASTROFISICA', subcampo: 'OTRAS ESPECIALIDADES ASTRONOMICAS'},
        {campo: 'ASTRONOMIA Y ASTROFISICA', subcampo: 'PLANETOLOGIA'},
        {campo: 'ASTRONOMIA Y ASTROFISICA', subcampo: 'RADIOASTRONOMIA'},
        {campo: 'ASTRONOMIA Y ASTROFISICA', subcampo: 'SISTEMA SOLAR'},
        {campo: 'CIENCIA POLITICA', subcampo: 'ADMINISTRACION PUBLICA'},
        {campo: 'CIENCIA POLITICA', subcampo: 'CIENCIAS POLITICAS '},
        {campo: 'CIENCIA POLITICA', subcampo: 'IDEOLOGIAS POLITICAS'},
        {campo: 'CIENCIA POLITICA', subcampo: 'INSTITUCIONES POLITICAS'},
        {campo: 'CIENCIA POLITICA', subcampo: 'OPINION PUBLICA '},
        {campo: 'CIENCIA POLITICA', subcampo: 'OTRAS ESPECIALIDADES POLITICAS'},
        {campo: 'CIENCIA POLITICA', subcampo: 'RELACIONES INTERNACIONALES '},
        {campo: 'CIENCIA POLITICA', subcampo: 'SISTEMAS POLITICOS'},
        {campo: 'CIENCIA POLITICA', subcampo: 'SOCIOLOGIA POLITICA'},
        {campo: 'CIENCIA POLITICA', subcampo: 'TEORIA POLITICA'},
        {campo: 'CIENCIA POLITICA', subcampo: 'VIDA POLITICA'},
        {campo: 'CIENCIAS AGRARIAS', subcampo: 'AGRONOMIA'},
        {campo: 'CIENCIAS AGRARIAS', subcampo: 'AGROQUIMICA'},
        {campo: 'CIENCIAS AGRARIAS', subcampo: 'CIENCIA FORESTAL '},
        {campo: 'CIENCIAS AGRARIAS', subcampo: 'CIENCIAS VETERINARIAS '},
        {campo: 'CIENCIAS AGRARIAS', subcampo: 'FITOPATOLOGIA '},
        {campo: 'CIENCIAS AGRARIAS', subcampo: 'HORTICULTURA'},
        {campo: 'CIENCIAS AGRARIAS', subcampo: 'INGENIERIA AGRICOLA'},
        {campo: 'CIENCIAS AGRARIAS', subcampo: 'OTRAS ESPECIALIDADES AGRARIAS'},
        {campo: 'CIENCIAS AGRARIAS', subcampo: 'PECES Y FAUNA SILVESTRE '},
        {campo: 'CIENCIAS AGRARIAS', subcampo: 'PRODUCCION ANIMAL'},
        {campo: 'CIENCIAS DE LA TIERRA Y DEL ESPACIO', subcampo: 'CIENCIAS DE LA ATMOSFERA'},
        {campo: 'CIENCIAS DE LA TIERRA Y DEL ESPACIO', subcampo: 'CLIMATOLOGIA'},
        {campo: 'CIENCIAS DE LA TIERRA Y DEL ESPACIO', subcampo: 'GEODESIA'},
        {campo: 'CIENCIAS DE LA TIERRA Y DEL ESPACIO', subcampo: 'GEOFISICA'},
        {campo: 'CIENCIAS DE LA TIERRA Y DEL ESPACIO', subcampo: 'GEOGRAFIA '},
        {campo: 'CIENCIAS DE LA TIERRA Y DEL ESPACIO', subcampo: 'GEOLOGIA'},
        {campo: 'CIENCIAS DE LA TIERRA Y DEL ESPACIO', subcampo: 'GEOQUIMICA'},
        {campo: 'CIENCIAS DE LA TIERRA Y DEL ESPACIO', subcampo: 'HIDROLOGIA'},
        {campo: 'CIENCIAS DE LA TIERRA Y DEL ESPACIO', subcampo: 'METEOROLOGIA '},
        {campo: 'CIENCIAS DE LA TIERRA Y DEL ESPACIO', subcampo: 'OCEANOGRAFIA'},
        {campo: 'CIENCIAS DE LA VIDA', subcampo: 'ANTROPOLOGIA '},
        {campo: 'CIENCIAS DE LA VIDA', subcampo: 'BIOFISICA'},
        {campo: 'CIENCIAS DE LA VIDA', subcampo: 'BIOLOGIA ANIMAL '},
        {campo: 'CIENCIAS DE LA VIDA', subcampo: 'BIOLOGIA CELULAR'},
        {campo: 'CIENCIAS DE LA VIDA', subcampo: 'BIOLOGIA DE INSECTOS '},
        {campo: 'CIENCIAS DE LA VIDA', subcampo: 'BIOLOGIA HUMANA '},
        {campo: 'CIENCIAS DE LA VIDA', subcampo: 'BIOLOGIA MOLECULAR '},
        {campo: 'CIENCIAS DE LA VIDA', subcampo: 'BIOLOGIA VEGETAL '},
        {campo: 'CIENCIAS DE LA VIDA', subcampo: 'BIOMATEMATICAS'},
        {campo: 'CIENCIAS DE LA VIDA', subcampo: 'BIOMETRIA'},
        {campo: 'CIENCIAS DE LA VIDA', subcampo: 'BIOQUIMICA'},
        {campo: 'CIENCIAS DE LA VIDA', subcampo: 'ETOLOGIA'},
        {campo: 'CIENCIAS DE LA VIDA', subcampo: 'FISIOLOGIA HUMANA '},
        {campo: 'CIENCIAS DE LA VIDA', subcampo: 'GENETICA '},
        {campo: 'CIENCIAS DE LA VIDA', subcampo: 'INMUNOLOGIA '},
        {campo: 'CIENCIAS DE LA VIDA', subcampo: 'MICROBIOLOGIA '},
        {campo: 'CIENCIAS DE LA VIDA', subcampo: 'NEUROCIENCIAS'},
        {campo: 'CIENCIAS DE LA VIDA', subcampo: 'PALEONTOLOGIA'},
        {campo: 'CIENCIAS DE LA VIDA', subcampo: 'RADIOBIOLOGIA'},
        {campo: 'CIENCIAS DE LA VIDA', subcampo: 'SIMBIOSIS'},
        {campo: 'CIENCIAS DE LA VIDA', subcampo: 'VIROLOGIA'},
        {campo: 'CIENCIAS DE LAS ARTES Y LAS LETRAS', subcampo: 'ARQUITECTURA'},
        {campo: 'CIENCIAS DE LAS ARTES Y LAS LETRAS', subcampo: 'OTRAS ESPECIALIDADES ARTISTICAS'},
        {campo: 'CIENCIAS DE LAS ARTES Y LAS LETRAS', subcampo: 'TEORIA, ANALISIS Y CRITICA DE LAS BELLAS ARTES'},
        {campo: 'CIENCIAS DE LAS ARTES Y LAS LETRAS', subcampo: 'TEORIA, ANALISIS Y CRITICA LITERARIAS'},
        {campo: 'CIENCIAS ECONOMICAS', subcampo: 'ACTIVIDAD ECONOMICA'},
        {campo: 'CIENCIAS ECONOMICAS', subcampo: 'CONTABILIDAD ECONOMICA'},
        {campo: 'CIENCIAS ECONOMICAS', subcampo: 'ECONOMETRIA'},
        {campo: 'CIENCIAS ECONOMICAS', subcampo: 'ECONOMIA GENERAL'},
        {campo: 'CIENCIAS ECONOMICAS', subcampo: 'ECONOMIA INTERNACIONAL'},
        {campo: 'CIENCIAS ECONOMICAS', subcampo: 'ECONOMIA SECTORIAL'},
        {campo: 'CIENCIAS ECONOMICAS', subcampo: 'ECONOMICA DEL CAMBIO TECNOLOGICO '},
        {campo: 'CIENCIAS ECONOMICAS', subcampo: 'ORGANIZACION INDUSTRIAL Y POLITICAS GUBERNAMENTALES'},
        {campo: 'CIENCIAS ECONOMICAS', subcampo: 'ORGANIZACION Y DIRECCION DE EMPRESAS '},
        {campo: 'CIENCIAS ECONOMICAS', subcampo: 'POLITICA FISCAL Y HACIENDA PUBLICA NACIONALES'},
        {campo: 'CIENCIAS ECONOMICAS', subcampo: 'SISTEMAS ECONOMICOS'},
        {campo: 'CIENCIAS ECONOMICAS', subcampo: 'TEORIA ECONOMICA'},
        {campo: 'CIENCIAS JURIDICAS Y DERECHO', subcampo: 'DERECHO CANONICO '},
        {campo: 'CIENCIAS JURIDICAS Y DERECHO', subcampo: 'DERECHO INTERNACIONAL'},
        {campo: 'CIENCIAS JURIDICAS Y DERECHO', subcampo: 'ORGANIZACION JURIDICA'},
        {campo: 'CIENCIAS JURIDICAS Y DERECHO', subcampo: 'OTRAS ESPECIALIDADES JURIDICAS'},
        {campo: 'CIENCIAS JURIDICAS Y DERECHO', subcampo: 'TEORIA Y METODOS GENERALES'},
        {campo: 'CIENCIAS MEDICAS', subcampo: 'CIENCIAS CLINICAS'},
        {campo: 'CIENCIAS MEDICAS', subcampo: 'CIRUGIA'},
        {campo: 'CIENCIAS MEDICAS', subcampo: 'DIGESTION'},
        {campo: 'CIENCIAS MEDICAS', subcampo: 'EPIDEMIOLOGIA '},
        {campo: 'CIENCIAS MEDICAS', subcampo: 'FARMACODINAMICA'},
        {campo: 'CIENCIAS MEDICAS', subcampo: 'FARMACOLOGIA '},
        {campo: 'CIENCIAS MEDICAS', subcampo: 'MEDICINA DEL TRABAJO'},
        {campo: 'CIENCIAS MEDICAS', subcampo: 'MEDICINA FORENSE '},
        {campo: 'CIENCIAS MEDICAS', subcampo: 'MEDICINA INTERNA'},
        {campo: 'CIENCIAS MEDICAS', subcampo: 'MEDICINA PREVENTIVA'},
        {campo: 'CIENCIAS MEDICAS', subcampo: 'OTRAS ESPECIALIDADES MEDICAS'},
        {campo: 'CIENCIAS MEDICAS', subcampo: 'PATOLOGIA'},
        {campo: 'CIENCIAS MEDICAS', subcampo: 'SALUD PUBLICA'},
        {campo: 'CIENCIAS MEDICAS', subcampo: 'TOXICOLOGIA'},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'INGENIERIA Y TECNOLOGIA AERONAUTICAS'},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'INGENIERIA Y TECNOLOGIA DEL MEDIO AMBIENTE'},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'INGENIERIA Y TECNOLOGIA ELECTRICAS'},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'INGENIERIA Y TECNOLOGIA QUIMICAS '},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'PLANIFICACION URBANA'},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'PROCESOS TECNOLOGICOS'},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA BIOQUIMICA '},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA DE LA CONSTRUCCION '},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA DE LA INSTRUMENTACION'},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA DE LAS TELECOMUNICACIONES'},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA DE LOS ALIMENTOS '},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA DE LOS FERROCARRILES '},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA DE LOS ORDENADORES '},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA DE LOS SISTEMAS DE TRANSPORTE'},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA DE MATERIALES'},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA DE PRODUCTOS METALICOS'},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA DE VEHICULOS DE MOTOR'},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA DEL CARBON Y DEL PETROLEO '},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA DEL ESPACIO'},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA E INGENIERIA MECANICAS'},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA ELECTRONICA '},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA ENERGETICA '},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA INDUSTRIAL '},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA MEDICA '},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA METALURGICA'},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA MINERA '},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA NAVAL'},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA NUCLEAR '},
        {campo: 'CIENCIAS TECNOLOGICAS', subcampo: 'TECNOLOGIA TEXTIL'},
        {campo: 'DEMOGRAFIA', subcampo: 'CARACTERISTICAS DE LA POBLACION'},
        {campo: 'DEMOGRAFIA', subcampo: 'DEMOGRAFIA GENERAL'},
        {campo: 'DEMOGRAFIA', subcampo: 'DEMOGRAFIA GEOGRAFICA'},
        {campo: 'DEMOGRAFIA', subcampo: 'DEMOGRAFIA HISTORICA'},
        {campo: 'DEMOGRAFIA', subcampo: 'FERTILIDAD'},
        {campo: 'DEMOGRAFIA', subcampo: 'MORTALIDAD'},
        {campo: 'ETICA', subcampo: 'ETICA CLASICA'},
        {campo: 'ETICA', subcampo: 'ETICA DE GRUPO'},
        {campo: 'ETICA', subcampo: 'ETICA DE INDIVIDUOS'},
        {campo: 'ETICA', subcampo: 'LA ETICA EN PERSPECTIVA'},
        {campo: 'ETICA', subcampo: 'OTRAS ESPECIALIDADES RELACIONADAS CON LA ETICA'},
        {campo: 'FILOSOFIA', subcampo: 'ANTROPOLOGIA FILOSOFICA'},
        {campo: 'FILOSOFIA', subcampo: 'DOCTRINAS FILOSOFICAS'},
        {campo: 'FILOSOFIA', subcampo: 'FILOSOFIA DE LA CIENCIA'},
        {campo: 'FILOSOFIA', subcampo: 'FILOSOFIA DE LA NATURALEZA'},
        {campo: 'FILOSOFIA', subcampo: 'FILOSOFIA DEL CONOCIMIENTO'},
        {campo: 'FILOSOFIA', subcampo: 'FILOSOFIA GENERAL'},
        {campo: 'FILOSOFIA', subcampo: 'FILOSOFIA SOCIAL'},
        {campo: 'FILOSOFIA', subcampo: 'OTRAS ESPECIALIDADES FILOSOFICAS'},
        {campo: 'FILOSOFIA', subcampo: 'SISTEMAS FILOSOFICOS'},
        {campo: 'FISICA', subcampo: 'ACUSTICA'},
        {campo: 'FISICA', subcampo: 'ELECTROMAGNETISMO'},
        {campo: 'FISICA', subcampo: 'ELECTRONICA'},
        {campo: 'FISICA', subcampo: 'FISICA ALTAS ENERGIAS'},
        {campo: 'FISICA', subcampo: 'FISICA ATOMICA Y NUCLEAR'},
        {campo: 'FISICA', subcampo: 'FISICA DE FLUIDOS'},
        {campo: 'FISICA', subcampo: 'FISICA DEL ESTADO SOLIDO'},
        {campo: 'FISICA', subcampo: 'FISICA MOLECULAR'},
        {campo: 'FISICA', subcampo: 'FISICA TEORICA'},
        {campo: 'FISICA', subcampo: 'MECANICA'},
        {campo: 'FISICA', subcampo: 'NUCLEONICA'},
        {campo: 'FISICA', subcampo: 'OPTICA '},
        {campo: 'FISICA', subcampo: 'OTRAS ESPECIALIDADES FISICAS'},
        {campo: 'FISICA', subcampo: 'QUIMICA FISICA'},
        {campo: 'FISICA', subcampo: 'TERMODINAMICA'},
        {campo: 'FISICA', subcampo: 'UNIDADES Y CONSTANTES'},
        {campo: 'GEOGRAFIA', subcampo: 'GEOGRAFIA ECONOMICA'},
        {campo: 'GEOGRAFIA', subcampo: 'GEOGRAFIA HISTORICA'},
        {campo: 'GEOGRAFIA', subcampo: 'GEOGRAFIA HUMANA '},
        {campo: 'GEOGRAFIA', subcampo: 'GEOGRAFIA REGIONAL'},
        {campo: 'GEOGRAFIA', subcampo: 'OTRAS ESPECIALIDADES GEOGRAFICAS'},
        {campo: 'HISTORIA', subcampo: 'BIOGRAFIAS'},
        {campo: 'HISTORIA', subcampo: 'CIENCIAS AUXILIARES DE LA HISTORIA'},
        {campo: 'HISTORIA', subcampo: 'HISTORIA DE PAISES'},
        {campo: 'HISTORIA', subcampo: 'HISTORIA GENERAL'},
        {campo: 'HISTORIA', subcampo: 'HISTORIA POR EPOCAS'},
        {campo: 'HISTORIA', subcampo: 'HISTORIAS POR ESPECIALIDADES'},
        {campo: 'HISTORIA', subcampo: 'OTRAS ESPECIALIDADES HISTORIAS'},
        {campo: 'LINGUISTICA', subcampo: 'GEOGRAFIA LINGÜISTICA'},
        {campo: 'LINGUISTICA', subcampo: 'LINGÜISTICA APLICADA'},
        {campo: 'LINGUISTICA', subcampo: 'LINGÜISTICA DIACRONICA'},
        {campo: 'LINGUISTICA', subcampo: 'LINGÜISTICA SINCRONICA'},
        {campo: 'LINGUISTICA', subcampo: 'OTRAS ESPECIALIDADES LINGÜISTICAS'},
        {campo: 'LINGUISTICA', subcampo: 'TEORIA LINGÜISTICA'},
        {campo: 'LOGICA', subcampo: 'APLICACIONES DE LA LOGICA'},
        {campo: 'LOGICA', subcampo: 'LOGICA DEDUCTIVA'},
        {campo: 'LOGICA', subcampo: 'LOGICA GENERAL'},
        {campo: 'LOGICA', subcampo: 'LOGICA INDUCTIVA'},
        {campo: 'LOGICA', subcampo: 'METODOLOGIA'},
        {campo: 'MATEMATICAS', subcampo: 'ALGEBRA'},
        {campo: 'MATEMATICAS', subcampo: 'ANALISIS NUMERICO'},
        {campo: 'MATEMATICAS', subcampo: 'ANALISIS Y ANALISIS FUNCIONAL'},
        {campo: 'MATEMATICAS', subcampo: 'CIENCIA DE LOS ORDENADORES'},
        {campo: 'MATEMATICAS', subcampo: 'ESTADISTICA'},
        {campo: 'MATEMATICAS', subcampo: 'GEOMETRIA'},
        {campo: 'MATEMATICAS', subcampo: 'INVESTIGACION OPERATIVA'},
        {campo: 'MATEMATICAS', subcampo: 'OTRAS ESPECIALIDADES MATEMATICAS'},
        {campo: 'MATEMATICAS', subcampo: 'PROBABILIDAD'},
        {campo: 'MATEMATICAS', subcampo: 'TEORIA DE NUMEROS'},
        {campo: 'MATEMATICAS', subcampo: 'TOPOLOGIA'},
        {campo: 'PEDAGOGIA', subcampo: 'ORGANIZACION Y PLANIFICACION DE LA EDUCACION'},
        {campo: 'PEDAGOGIA', subcampo: 'OTRAS ESPECIALIDADES'},
        {campo: 'PEDAGOGIA', subcampo: 'PREPARACION Y EMPLEO DE PROFESORES'},
        {campo: 'PEDAGOGIA', subcampo: 'TEORIA Y METODOS EDUCATIVOS'},
        {campo: 'PSICOLOGIA', subcampo: 'ASESORAMIENTO Y ORIENTACION '},
        {campo: 'PSICOLOGIA', subcampo: 'ESTUDIO PSICOLOGICO DE TEMAS SOCIALES'},
        {campo: 'PSICOLOGIA', subcampo: 'EVALUACION Y DIAGNOSTICO EN PSICOLOGIA'},
        {campo: 'PSICOLOGIA', subcampo: 'OTRAS ESPECIALIDADES PSICOLOGICAS'},
        {campo: 'PSICOLOGIA', subcampo: 'PARAPSICOLOGIA'},
        {campo: 'PSICOLOGIA', subcampo: 'PERSONALIDAD'},
        {campo: 'PSICOLOGIA', subcampo: 'PSICOFARMACOLOGIA '},
        {campo: 'PSICOLOGIA', subcampo: 'PSICOLOGIA DE LA VEJEZ (VER .)'},
        {campo: 'PSICOLOGIA', subcampo: 'PSICOLOGIA DEL NIÑO Y DEL ADOLESCENTE'},
        {campo: 'PSICOLOGIA', subcampo: 'PSICOLOGIA EXPERIMENTAL'},
        {campo: 'PSICOLOGIA', subcampo: 'PSICOLOGIA GENERAL'},
        {campo: 'PSICOLOGIA', subcampo: 'PSICOLOGIA INDUSTRIAL'},
        {campo: 'PSICOLOGIA', subcampo: 'PSICOLOGIA SOCIAL '},
        {campo: 'PSICOLOGIA', subcampo: 'PSICOPEDAGOGIA'},
        {campo: 'QUIMICA', subcampo: 'BIOQUIMICA'},
        {campo: 'QUIMICA', subcampo: 'QUIMICA AMBIENTAL'},
        {campo: 'QUIMICA', subcampo: 'QUIMICA ANALITICA'},
        {campo: 'QUIMICA', subcampo: 'QUIMICA FARMACEUTICA'},
        {campo: 'QUIMICA', subcampo: 'QUIMICA FISICA'},
        {campo: 'QUIMICA', subcampo: 'QUIMICA INORGANICA '},
        {campo: 'QUIMICA', subcampo: 'QUIMICA MACROMOLECULAR'},
        {campo: 'QUIMICA', subcampo: 'QUIMICA NUCLEAR'},
        {campo: 'QUIMICA', subcampo: 'QUIMICA ORGANICA'},
        {campo: 'SOCIOLOGIA', subcampo: 'CAMBIO Y DESARROLLO SOCIAL'},
        {campo: 'SOCIOLOGIA', subcampo: 'COMUNICACIONES SOCIALES'},
        {campo: 'SOCIOLOGIA', subcampo: 'GRUPOS SOCIALES'},
        {campo: 'SOCIOLOGIA', subcampo: 'OTRAS ESPECIALIDADES SOCIOLOGICAS'},
        {campo: 'SOCIOLOGIA', subcampo: 'PROBLEMAS INTERNACIONALES '},
        {campo: 'SOCIOLOGIA', subcampo: 'PROBLEMAS SOCIALES'},
        {campo: 'SOCIOLOGIA', subcampo: 'SOCIOLOGIA CULTURAL'},
        {campo: 'SOCIOLOGIA', subcampo: 'SOCIOLOGIA DE LOS ASENTAMIENTOS HUMANOS'},
        {campo: 'SOCIOLOGIA', subcampo: 'SOCIOLOGIA DEL TRABAJO'},
        {campo: 'SOCIOLOGIA', subcampo: 'SOCIOLOGIA EXPERIMENTAL'},
        {campo: 'SOCIOLOGIA', subcampo: 'SOCIOLOGIA GENERAL'},
        {campo: 'SOCIOLOGIA', subcampo: 'SOCIOLOGIA MATEMATICA'}
      ],
      instituciones: [
        {nombre: 'ABRAXAS', direccion: 'DONATO GUERRA N° 9, COL TIZAPAN', pais: 'MÉXICO', estado: 'NUEVO LEON', bandera: 'MX', bd: true},
        {nombre: 'BENEMERITA UNIVERSIDAD AUTONOMA DE PUEBLA', direccion: 'CALLE 4 SUR 104, CENTRO, 5013 HEROICA PUEBLA DE ZARAGOZA, PUE', pais: 'MÉXICO', estado: 'PUEBLA', bandera: 'MX', bd: true},
        {nombre: 'BIOTECH DEL NORTE', direccion: 'AV. VASCONCELOS N° 150 OTE. 66220, SAN PEDRO GARZA, NL', pais: 'MÉXICO', estado: 'NUEVO LEON', bandera: 'MX', bd: true},
        {nombre: 'CENTRO DE INVESTIGACION BIOMEDICA DE ORIENTE. INSTITUTO MEXICANO DEL SEGURO SOCIAL', direccion: 'CARRETERA FEDERAL ATLIXCO METEPEC KM. 4.5, COL. CENTRO, ATLIXCO, C.P. 74360', pais: 'MÉXICO', estado: 'PUEBLA', bandera: 'MX', bd: true},
        {nombre: 'CENTRO DE INVESTIGACION CIENTIFICA Y EDUCACION SUPERIOR DE ENSENADA', direccion: 'CARR. ENSENADA, TIJANA, N° 3918, ZONA PLAYITAS, CP 22680', pais: 'MÉXICO', estado: 'BAJA CALIFORNIA', bandera: 'MX', bd: true},
        {nombre: 'CENTRO DE INVESTIGACION DE INGENIERIA GENETICA-BIOTECNOLOGICA', direccion: 'CUERNAVACA', pais: 'MÉXICO', estado: 'MORELOS', bandera: 'MX', bd: true},
        {nombre: 'CENTRO DE INVESTIGACION Y DE ESTUDIOS AVANZADOS. INSTITUTO POLITECNICO NACIONAL', direccion: 'AV. INSTITUTO POLITECNICO NACIONAL 2508, COL. SAN PEDRO ZACATENCO, CP 073660 ', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'CENTRO DE ONCOLOGIA PERSONALIZADA / CENTRO DE INVESTIGACION ONCOLOGICA', direccion: 'AV JUAN ESCUTIA 1680, CHAPULTEPEC, CULIACAN, SIN, C.P.80040', pais: 'MÉXICO', estado: 'SINALOA', bandera: 'MX', bd: true},
        {nombre: 'CENTRO INTERDISCIPLINARIO DE CIENCAS DE LA SALUD', direccion: 'CARRETERA XOCHIMILCO-OAXTEPEC KM 39.5, MILPA ALTA', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'CENTRO INVESTIGACION DE ENFERMEDADES INFECCIOSAS', direccion: 'CALZADA DE TLALPAN N° 4502, CP 14080', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'CENTRO MEDICO NACIONAL SIGLO XXI. INSTITUTO MEXICANO DEL SEGURO SOCIAL', direccion: 'CUAUHTECMOC 330 CP 06725', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'CENTRO UNIVERSITARIO DE CIENCIAS DE LA SALUD', direccion: 'SIERRA MOJADA 950, COL. INDEPENDENCIA, GUADALAJARA, C.P. 44340', pais: 'MÉXICO', estado: 'JALISCO', bandera: 'MX', bd: true},
        {nombre: 'CLINICA ONCOSALUD', direccion: 'Av. Guardia Civil 571, San Borja 15036', pais: 'PERÚ', estado: 'LIMA', bandera: 'PE', bd: true},
        {nombre: 'COLEGIO ALEMAN ALEXANDER VON HUMBOLDT', direccion: 'PRADO NORTE N° 559, CP 11000, CIUDAD DE MEXICO', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'ESCUELA SUPERIOR DE MEDICINA. INSTITUTO POLITECNICO NACIONAL', direccion: 'PLAN DE SAN LUIS,  COL. CASCO SANTO TOMAS, DEL. MIGUEL HIDALGO, CIUDAD DE MEXICO , C.P. 11340 ', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'FACULTAD DE CIENCIAS QUIMICO BIOLOGICAS. UNIVERSIDAD AUTONOMA DE GUERRERO', direccion: 'LAZARO CARDENAS, COL. EL CENTENARIO, CHILPANCINGO DE LOS BRAVO', pais: 'MÉXICO', estado: 'GUERRERO', bandera: 'MX', bd: true},
        {nombre: 'FACULTAD DE ESTUDIOS SUPERIORES IZTACALA. UNIVERSIDAD NACIONAL AUTONOMA DE MEXICO', direccion: 'AV DE LOS BARRIOS 1, COL. LOS REYES IXTACALA, TLALNEPANTLA, C.P. 54090', pais: 'MÉXICO', estado: 'ESTADO DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'FACULTAD DE ESTUDIOS SUPERIORES ZARAGOZA. UNIVERSIDAD NACIONAL AUTONOMA DE MEXICO', direccion: 'CALZADA I. ZARAGOZA 09230, CIUDAD DE MEXICO', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'HOSPITAL CENTRAL SUR DE ALTA ESPECIALIDAD. PETROLEOS MEXICANOS', direccion: 'ANILLO PERIFERICO 4091, FUENTES DEL PEDREGAL, DEL. TLALPAN, C.P. 14140', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'HOSPITAL DE ONCOLOGIA CENTRO MEDICO NACIONAL SIGLO XXI. INSTITUTO MEXICANO DEL SEGURO SOCIAL', direccion: 'CUAUHTECMOC 330, COL.  DOCTORES, CIUDAD DE MEXICO, C.P. 06725', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'HOSPITAL GEA GONZALEZ', direccion: 'CALZADA DE TLALPAN N° 4800, CP 14080. CIUDAD DE MEX.', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'HOSPITAL GENERAL DE ZONA 30. INSTITUTO MEXICANO DEL SEGURO SOCIAL', direccion: 'PLUTARCO ELIAS CALLES 473, COL. SANTA ANITA, DEL. IZTACALCO', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'HOSPITAL GENERAL DR RAYMUNDO ABARCA ALARCON', direccion: 'AV. GUERRERO 45, COL. CENTRO, CHILPANCINGO, C.P. 39000', pais: 'MÉXICO', estado: 'GUERRERO', bandera: 'MX', bd: true},
        {nombre: 'HOSPITAL INFANTIL DE MEXICO FEDERICO GOMEZ', direccion: 'CALLE SUR 169, 2404, CP 08000 IZTACALCO', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'HOSPITAL JOSE MARIA CABRAL Y BAEZ', direccion: 'Av Franco Bido, Santiago De Los Caballeros 51000', pais: 'REPÚBLICA DOMINICANA', estado: 'SANTO DOMINGO', bandera: 'DO', bd: true},
        {nombre: 'HOSPITAL JUAREZ DE MEXICO', direccion: 'AV. INSTITUTO POLITECNICO NACIONAL 5160, COL. MAGDALENA DE LAS SALINAS, CP 07760', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'HOSPITAL REGIONAL DE ALTA ESPECIALIDAD BAJIO', direccion: 'BLVD. MILENIO 130, COL. SAN CARLOS LA ROCHA, LEON', pais: 'MÉXICO', estado: 'GUANAJUATO', bandera: 'MX', bd: true},
        {nombre: 'HOSPITAL REGIONAL DE ALTA ESPECIALIDAD CIUDAD SALUD', direccion: 'CARR. TAPACHULA - PUERTO MADERO KM. 15 +200, TAPACHULA', pais: 'MÉXICO', estado: 'CHIAPAS', bandera: 'MX', bd: true},
        {nombre: 'INSTITUTO NACIONAL DE CANCEROLOGIA', direccion: 'SAN FERNANDO NO. 22, COL. SECCION XVI, DEL. TLALPAN, C.P. 14080', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'INSTITUTO NACIONAL DE CIENCIAS MEDICAS Y NUTRICION SALVADOR ZUBIRAN', direccion: 'VASCO DE QUIROGA 15, SECCION XVI, DEL. TLALPAN, C.P. 14080', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'INSTITUTO NACIONAL DE ENFERMEDADES RESPIRATORIAS', direccion: 'CALZADA DE TLALPAN 4502, COL. SECCION XVI, DEL. TLALPAN, C.P. 14080', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'INSTITUTO NACIONAL DE INVESTIGACIONES NUCLEARES', direccion: 'CARRETERA MEXICO TOLUCA - LA MARQUESA, OCOYOACAN, C.P. 52750', pais: 'MÉXICO', estado: 'ESTADO DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'INSTITUTO NACIONAL DE MEDICINA GENOMICA', direccion: 'PERIFERICO SUR 4809, COL. ARENAL TEPEPAN, CIUDAD DE MEXICO, C.P. 14610', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'INSTITUTO NACIONAL DE NEUROLOGIA', direccion: 'INSURGENTES SUR 3877, COL. LA FAMA, DELEG. TLALPAN', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'INSTITUTO NACIONAL DE PEDIATRIA', direccion: 'AV. INSURGENTES SUR 3700 C, COL. INSURGENTES CUICUILCO, DEL. COYOACAN, C.P. 04530', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'INSTITUTO NACIONAL DE SALUD PUBLICA', direccion: 'AV. UNIVERSIDAD 655, COL. SANTA MARIA AHUACATITLAN, CUERNAVACA, C.P. 62100', pais: 'MÉXICO', estado: 'MORELOS', bandera: 'MX', bd: true},
        {nombre: 'INSTITUTO NACIONAL DEL CANCER ROSA EMILIA SANCHEZ PEREZ DE TAVAREZ', direccion: 'Ave. Dr. Bernardo Correa y Cidrón Esq. Rafael Augusto Sanchéz Ravelo Zona Universitaria', pais: 'REPÚBLICA DOMINICANA', estado: 'SANTO DOMINGO', bandera: 'DO', bd: true},
        {nombre: 'INSTITUTO TECNOLOGICO DE MONTERREY', direccion: 'CALLE DEL PUENTE 222, COL. EJIDOS DE HUIPULCO, DEL. TLALPAN, C.P. 14380', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'INVESTIGACION CLINICA A LA SALUD DE CORDOBA S.C.', direccion: '32 NUM. 3219, DOS CAMINOS, CORDOBA', pais: 'MÉXICO', estado: 'VERACRUZ', bandera: 'MX', bd: true},
        {nombre: 'JOHNS HOPKINS UNIVERSITY SCHOOL OF MEDICINE', direccion: '550 NORTH BROADWAY, SUITE 1103, BALTIMORE', pais: 'ESTADOS UNIDOS', estado: 'MARYLAND', bandera: 'US', bd: true},
        {nombre: 'LABORATORIOS COLUMBIA SA DE CV', direccion: 'CALZADA DEL HUESO 670, COL. GRANJAS COAPA, CP 14307', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'MD ANDERSON CANCER CENTER', direccion: '1515 HOLCOMBE BLVD, HOUSTON', pais: 'ESTADOS UNIDOS', estado: 'TEXAS', bandera: 'US', bd: true},
        {nombre: 'PPD MEXICO', direccion: 'INSURGENTES SUR 730, NAPOLES, 03100', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'SALUD DE TLAXCALA - SECRETARIA DE SALUD EN EL ESTADO DE TLAXCALA', direccion: 'AVENIDA IGNACIO PICAZO NORTE 25, DE TLAPACOYA, CENTRO, 90800 CHIAUTEMPAN', pais: 'MÉXICO', estado: 'TLAXCALA', bandera: 'MX', bd: true},
        {nombre: 'TECNOLOGICO DE MONTERREY, MONTERREY', direccion: 'AV. EUGENIO GARZA SADA 2501 SUR, TECNOLOGICO, C.P. 64849', pais: 'MÉXICO', estado: 'NUEVO LEON', bandera: 'MX', bd: true},
        {nombre: 'UC SAN DIEGO – MOORES CANCER CENTER', direccion: 'Health Sciences Dr, La Jolla', pais: 'ESTADOS UNIDOS', estado: 'CALIFORNIA', bandera: 'US', bd: true},
        {nombre: 'UNIDAD MEDICA DE ALTA ESPECIALIDAD 71, IMSS', direccion: 'BLVD REVOLUCION Y CALLE 27 S/N, TORREON JARDIN, CP. 27000', pais: 'MÉXICO', estado: 'COAHUILA', bandera: 'MX', bd: true},
        {nombre: 'UNIVERSIDAD AUTONOMA DE AGUASCALIENTES', direccion: 'AV. UNIVERSIDAD N° 940 CIUDAD UNIVERSITARIA, AGUASALIENTES, C.P. 20131', pais: 'MÉXICO', estado: 'AGUASCALIENTES', bandera: 'MX', bd: true},
        {nombre: 'UNIVERSIDAD AUTONOMA DE BAJA CALIFORNIA', direccion: 'AV ALVARO OBREGON, COL. NUEVA, MEXICALI, CP 21100', pais: 'MÉXICO', estado: 'BAJA CALIFORNIA', bandera: 'MX', bd: true},
        {nombre: 'UNIVERSIDAD AUTONOMA DE QUERETARO', direccion: 'CERRO DE LAS CAMPANAS, CENTRO UNIVERSITARIO, C.P. 76010', pais: 'MÉXICO', estado: 'QUERETARO', bandera: 'MX', bd: true},
        {nombre: 'UNIVERSIDAD AUTONOMA DE SANTO DOMINGO', direccion: 'Av. Dr. Bernardo Correa y Cidrón', pais: 'REPÚBLICA DOMINICANA', estado: 'SANTO DOMINGO', bandera: 'DO', bd: true},
        {nombre: 'UNIVERSIDAD AUTONOMA DE YUCATAN', direccion: 'CALLE 60 491A, CENTRO, MERIA, C.P. 97000', pais: 'MÉXICO', estado: 'YUCATÁN', bandera: 'MX', bd: true},
        {nombre: 'UNIVERSIDAD AUTONOMA DEL ESTADO DE HIDALGO', direccion: 'CARRETERA PACHUCA - ACTOPAN KM 4.5 CAMPO DE TIRO 42039, PACHUCA DE SOTO', pais: 'MÉXICO', estado: 'HIDALGO', bandera: 'MX', bd: true},
        {nombre: 'UNIVERSIDAD AUTONOMA METROPOLITANA IZTAPALAPA', direccion: 'AV. SAN RAFAEL ATLIXCO 186, COL.VICENTINA, DEL. IZTAPALAPA, C.P.09340', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'UNIVERSIDAD AUTONOMA METROPOLITANA XOCHIMILCO', direccion: 'CALZADA DEL HUESO 1100, COL. VILLA QUIETUD, DEL. COYOACAN, C.P. 04960', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'UNIVERSIDAD DE GUADALAJARA', direccion: 'SIERRA MOJADA 950, COL INDEPENDENCIA, GUADALAJARA', pais: 'MÉXICO', estado: 'JALISCO', bandera: 'MX', bd: true},
        {nombre: 'UNIVERSIDAD DE GUANAJUATO', direccion: 'LASCUARAN DE RETANA N° 5, CENTRO CP 36000, GUANAJUATO', pais: 'MÉXICO', estado: 'GUANAJUATO', bandera: 'MX', bd: true},
        {nombre: 'UNIVERSIDAD DE MONTERREY', direccion: 'AV. MORONES PRIETO 4500, 66236 SAN PEDRO GARZA NL', pais: 'MÉXICO', estado: 'NUEVO LEON', bandera: 'MX', bd: true},
        {nombre: 'UNIVERSIDAD DE SONORA', direccion: 'BLVD. LUIS ENCINAS Y ROSALES S/N, COL. CENTRO. HERMOSILLO', pais: 'MÉXICO', estado: 'SONORA', bandera: 'MX', bd: true},
        {nombre: 'UNIVERSIDAD JUAREZ AUTONOMA DE TABASCO', direccion: 'AV. UNIVERSIDAD S/N, COL MAGISTERIAL, VILLAHERMOSA', pais: 'MÉXICO', estado: 'TABASCO', bandera: 'MX', bd: true},
        {nombre: 'UNIVERSIDAD NACIONAL AUTONOMA DE MEXICO', direccion: 'AV. UNIVERSIDAD 3000, CIUDAD UNIVERSITARIA, DEL. COYOACAN, C.P. 04510', pais: 'MÉXICO', estado: 'CIUDAD DE MEXICO', bandera: 'MX', bd: true},
        {nombre: 'UNIVERSIDAD OLMECA', direccion: 'CARR. VILLAHERMOSA-MACUSPANA KM 14, DOS MONTES, VILLAHERMOSA, C.P. 86280', pais: 'MÉXICO', estado: 'TABASCO', bandera: 'MX', bd: true},
        {nombre: 'UNIVERSIDAD POPULAR AUTONOMA DEL ESTADO DE PUEBLA', direccion: 'CALLE 21 SUR 1103, BARRIO DE SANTIAGO, 72410', pais: 'MÉXICO', estado: 'PUEBLA', bandera: 'MX', bd: true},
        {nombre: 'UNIVERSIDAD VERACRUZANA XALAPA', direccion: 'ZAMORA 25, COL. CENTRO, XALAPA-ENRIQUEZ, C.P. 91000', pais: 'MÉXICO', estado: 'VERACRUZ', bandera: 'MX', bd: true},
        {nombre: 'UNIVERSITY OF MINNESOTA', direccion: '424 SE HARVARD ST, MINNEAPOLIS', pais: 'ESTADOS UNIDOS', estado: 'MINNESOTA', bandera: 'US', bd: true},
        {nombre: 'VITAGENESIS SA DE CV', direccion: 'BLVD. PUERTA DEL SOL 1005, COLINAS DE SAN JEMO 3O SECTOR, MONTERREY', pais: 'MÉXICO', estado: 'NUEVO LEON', bandera: 'MX', bd: true},
        {nombre: 'YALE SCHOOL OF MEDICINE', direccion: '333 CEDAR ST, NEW HAVEN', pais: 'ESTADOS UNIDOS', estado: 'CONNECTICUT', bandera: 'US', bd: true},
        {nombre: 'OTRA', direccion: '', pais: '', estado: '', bandera: '', bd: true}
      ],
      reglas: {
        tipo: [
          v => !!v || 'Es necesario definir una opción'
        ],
        nombre: [
          v => !!v || 'Es necesario completar este campo'
        ],
        genero: [
          v => !!v || 'Es necesario completar este campo'
        ],
        nacimiento: [
          v => !!v || 'Es necesario completar este campo',
          v => /\d{4}-\d{2}-\d{2}/.test(v) || 'Es necesario completar este campo con una fecha válida'
        ],
        rfc: [
          v => !!v || 'Es necesario completar este campo',
          v => /^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{0,3})$/i.test(v) || 'Es necesario completar este campo con un RFC válido'
        ],
        grado: [
          v => !!v || 'Es necesario completar este campo'
        ],
        cvu: [
          v => /^\d{0,6}$/.test(v) || 'Es necesario completar este campo con número de CVU válido'
        ],
        campo: [
          v => !!v || 'Es necesario completar este campo'
        ],
        subcampo: [
          v => !!v || 'Es necesario completar este campo'
        ],
        institucion: [
          v => !!v || 'Es necesario completar este campo'
        ]
      }
    }
  },
  computed: {
    error () {
      return this.$store.state.error
    },
    loading () {
      return this.$store.state.loading
    },
    sinApellidos () {
      return (this.paterno || this.materno)
      ? true
      : 'Es necesario completar por lo menos un apellido'
    },
    nivelSNI () {
      return (!this.sni || (this.sni && this.nivel))
      ? true
      : 'Es necesario completar este campo'
    },
    areaSNI () {
      return (!this.sni || (this.sni && this.area))
      ? true
      : 'Es necesario completar este campo'
    },
    filtrarCampo () {
      let opciones = this.subcampos
      return opciones.filter(o => o.campo === this.campo)
    }
  },
  watch: {
    error (value) {
      if (value) {
        this.alert = true
      }
    },
    alert (value) {
      if (!value) {
        this.$store.commit('setError', null)
      }
    },
    cal (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    nombre: function () {
      this.calcularRfc()
    },
    paterno: function () {
      this.calcularRfc()
    },
    materno: function () {
      this.calcularRfc()
    },
    nacimiento: function () {
      this.calcularRfc()
    },
    sni: function () {
      if (!this.sni) {
        this.nivel = ''
        this.area = ''
      }
    },
    campo: function () {
      this.subcampo = ''
    }
  },
  methods: {
    save (date) {
      this.$refs.cal.save(date)
    },
    calcularRfc () {
      const fecha = new RegExp(/\d{4}-\d{2}-\d{2}/)
      if (
        this.paterno ||
        this.materno ||
        this.nombre ||
        fecha.test(this.nacimiento)
      ) {
        let rfc = ''
        if (this.paterno) {
          rfc += (this.paterno.substring(0, 2) + 'XX').substring(0, 2)
        } else {
          rfc += 'XX'
        }
        if (this.materno) {
          rfc += (this.materno.substring(0, 1) + 'X').substring(0, 1)
        } else {
          rfc += 'X'
        }
        if (this.nombre) {
          rfc += (this.nombre.substring(0, 1) + 'X').substring(0, 1)
        } else {
          rfc += 'X'
        }
        if (fecha.test(this.nacimiento)) {
          rfc += this.nacimiento.substring(2, 4)
          rfc += this.nacimiento.substring(5, 7)
          rfc += this.nacimiento.substring(8, 10)
        } else {
          rfc += '000000'
        }
        var i = 'ÁÉÍÓÚÑ'.split('')
        var o = 'AEIOUN'.split('')
        var map = {}
        i.forEach(function (el, idx) { map[el] = o[idx] })
        this.rfc = rfc.toUpperCase().replace(/[^A-Za-z0-9]/g, function (ch) { return map[ch] || ch })
      } else {
        this.rfc = ''
      }
    },
    registrar () {
      this.$refs.form.validate()
      var i = 'ÁÉÍÓÚÑ'.split('')
      var o = 'AEIOUN'.split('')
      var map = {}
      i.forEach(function (el, idx) { map[el] = o[idx] })
      var today = new Date()
      var dd = today.getDate()
      var mm = today.getMonth() + 1
      var yyyy = today.getFullYear()
      if (dd < 10) {
        dd = '0' + dd
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      const hoy = yyyy + '-' + mm + '-' + dd
      let self = this
      miembrosRef.limitToLast(1).on('child_added', function (childSnapshot) {
        const snap = childSnapshot.val()
        self.miembro.membresia = (snap.membresia + 1).toString()
      })
      this.miembro.tipo = this.tipo
      this.miembro.nombre = this.nombre.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
      this.miembro.paterno = this.paterno.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
      this.miembro.materno = this.materno.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
      this.miembro.genero = this.genero
      this.miembro.nacimiento = this.nacimiento
      this.miembro.rfc = this.rfc.toUpperCase().replace(/[^A-Za-z0-9]/g, function (ch) { return map[ch] || ch })
      this.miembro.grado = this.grado
      this.miembro.cvu = this.cvu
      this.miembro.sni = this.sni
      this.miembro.nivel = this.nivel
      this.miembro.area = this.area
      this.miembro.campo = this.campo
      this.miembro.subcampo = this.subcampo
      this.miembro.institucion = this.institucion.nombre
      this.miembro.telefono = this.telefono
      this.miembro.celular = this.celular
      this.miembro.personal = this.personal
      this.miembro.institucional = this.institucional
      this.miembro.fecha = hoy
      console.log(this.miembro)
      // miembrosRef.push(this.miembro)
    }
  },
  created () {
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear()
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    this.inicio = yyyy - 99 + '-' + mm + '-' + dd
    this.fin = yyyy - 15 + '-' + mm + '-' + dd
  }
}
</script>