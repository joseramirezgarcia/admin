<template>
  <v-container fluid fill-height style="background: url('http://c-mic.mx/img/fondo.jpg')" class='fondo'>
    <v-layout justify-center>
      <v-flex xs12 sm10 md9 lg8>
        <v-card class="elevation-24">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registro de nuevos miembros CMIC</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <div style="text-align:justify">
              <h2>¿Qué beneficios obtiene al ser miembro del Colegio?</h2>
              <ul class="mx-3">
                <li>Pertenecer a una comunidad científica que realiza investigación en cáncer a
                nivel nacional y con proyección internacional.</li>
                <li>Ser invitado al Congreso anual, lo que te permite establecer una relación
                directa con ponentes internacionales. Los mejores investigadores a nivel
                internacional estarán ahí para compartir sus últimos avances científicos.</li>
                <li>Participar de reuniones para estudiantes una vez al mes, donde un investigador
                reconocido expone un tema de interés y después hay un encuentro para hacer
                networking con otros estudiantes.</li>
                <li>Tener acceso a convocatorias exclusivas para estudios en el extranjero.</li>
                <li>Dar a conocer tu trabajo a través de artículos de divulgación y presencia en
                medios.</li>
              </ul>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-form v-model="formaMiembros" ref="formaMiembros">
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
                  :rules="[validarRFC]"
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
                  item-text="grado"
                  item-value="grado"
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
                  :rules="[validarCVU]"
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
                  item-text="nivel"
                  item-value="nivel"
                  label="Nivel SNI"
                  :rules="[nivelSNI]"
                ></v-select>
              </v-flex>
              <v-flex v-if="sni">
                <v-select
                  :items="areas"
                  v-model="area"
                  item-text="area"
                  item-value="area"
                  label="Área SNI"
                  :rules="[areaSNI]"
                ></v-select>
              </v-flex>
              <v-flex>
                <v-select
                  :items="campos"
                  v-model="campo"
                  item-text="campo"
                  item-value="campo"
                  label="Campo de conocimiento"
                  :rules="reglas.campo"
                  required
                ></v-select>
              </v-flex>
              <v-flex>
                <v-select
                  :items="filtrarCampo"
                  v-model="subcampo"
                  label="Área de conocimiento"
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
              <v-alert type="success" dismissible v-model="alertInstitucion">
                Institución agregada correctamente
              </v-alert>
              <v-flex>
                <v-select
                  :items="institucionesOrdenadas"
                  v-model="dependencia"
                  label="Institución"
                  return-object
                  :rules="[validarInstitucion]"
                  required
                ></v-select>
              </v-flex>
              <v-flex>
                {{direccion}}
              </v-flex>
              <v-flex>
                {{pais}}
              </v-flex>
              <v-flex>
                {{entidad}}
              </v-flex>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-title primary-title>
              <v-spacer></v-spacer>
              <div>
                <v-layout flex align-center justify-center class="headline mb-0 primary--text"><v-icon color="primary">phone_android</v-icon> Contacto</v-layout>
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
                  :rules="[validarTelefono]"
                  ></v-text-field>
              </v-flex>                
              <v-flex>
                <v-text-field
                  name='celular'
                  label='Celular'
                  id='celular'
                  type='text'
                  v-model='celular'
                  :rules="[validarCelular]"
                  required
                  ></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field
                  name='institucional'
                  label='Correo electrónico institucional'
                  id='institucional'
                  type='email'
                  v-model='institucional'
                  :rules="[validarInstitucional]"
                  hint="Solo en caso de que se trate de un correo oficial de la institución de adscripción"
                  persistent-hint
                  ></v-text-field>
              </v-flex>              
              <v-flex>
                <v-text-field
                  name='personal'
                  label='Correo electrónico Personal'
                  id='personal'
                  type='email'
                  v-model='personal'
                  :rules="[validarPersonal]"
                  required
                  ></v-text-field>
              </v-flex>   
            </v-card-text>   
            <v-divider></v-divider>         
            <v-card-text>   
              <v-flex class='text-xs-center' my-3>
                <v-checkbox
                  :rules="reglas.privacidad"
                  v-model="privacidad"
                  required
                >
                  <span slot="label">Acepto los términos del <a href='http://c-mic.mx/PDF/AvisoPrivacidad.pdf' target='_blank'>Aviso de Privacidad</a></span>
                </v-checkbox>
              </v-flex>
            </v-card-text>   
          </v-form>
          <v-card-actions>
            <v-flex class='text-xs-center' my-3>
              <v-btn color='success' type='submit' @click="registrar" large :disabled="!formaMiembros">Enviar mis datos</v-btn>
            </v-flex>
          </v-card-actions>
        </v-card>
        <v-dialog v-model="dialog" max-width="500px" @keydown.esc="dialog = false">
          <v-card>
            <v-card-title>
              <span class="headline">Agregar Nueva Institución</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-form v-model="formaNuevaInstitucion" ref="formaNuevaInstitucion">
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                      <v-text-field label="Nombre" v-model="nuevaInstitucion.nombre" :rules="[validarNuevaInstitucion]" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field label="Dirección" v-model="nuevaInstitucion.direccion" :rules="reglas.nuevaInstitucion.direccion" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-select
                        :items="paises"
                        v-model="paistmp"
                        label="Pais"
                        item-text="nombre"
                        return-object
                        :rules="reglas.nuevaInstitucion.pais"
                        autocomplete
                        :filter="filtrarPaises"
                        required
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md6 v-if="hayEntidades">
                      <v-select
                        :items="filtrarEntidades"
                        v-model="nuevaInstitucion.entidad"
                        label="Entidad"
                        item-text="entidad"
                        return-object
                        :rules="[validarEntidad]"
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md6 v-if="!hayEntidades">
                      <v-text-field label="Otra entidad" v-model="nuevaInstitucion.otraEntidad" :rules="[validarOtraEntidad]"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="cerrarDialogo">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click.native="agregarInstitucion" :disabled="!formaNuevaInstitucion">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { fb } from '../config/firebase'
import axios from 'axios'

let db = fb.database()
let miembrosRef = db.ref('miembros')
let gradosRef = db.ref('grados')
let paisesRef = db.ref('paises')
let entidadesRef = db.ref('entidades')
let nivelesRef = db.ref('niveles')
let areasRef = db.ref('areas')
let camposRef = db.ref('campos')
let subcamposRef = db.ref('subcampos')
let institucionesRef = db.ref('instituciones')

export default {
  firebase: {
    miembros: miembrosRef,
    paises: paisesRef,
    entidades: entidadesRef,
    grados: gradosRef,
    niveles: nivelesRef,
    areas: areasRef,
    campos: camposRef,
    subcampos: subcamposRef,
    instituciones: {
      source: institucionesRef,
      readyCallback: function () {
        this.ordenarInstituciones()
      }
    }
  },
  data () {
    return {
      formaMiembros: false,
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
        direccion: '',
        pais: '',
        entidad: '',
        telefono: '',
        celular: '',
        personal: '',
        institucional: '',
        fecha: '',
        activo: ''
      },
      institucionesOrdenadas: [],
      formaNuevaInstitucion: false,
      alertInstitucion: false,
      paistmp: '',
      hayEntidades: false,
      dialog: false,
      nuevaInstitucion: {
        nombre: '',
        direccion: '',
        pais: '',
        entidad: '',
        otraEntidad: ''
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
      dependencia: '',
      institucion: '',
      direccion: '',
      pais: '',
      entidad: '',
      telefono: '',
      celular: '',
      personal: '',
      institucional: '',
      privacidad: false,
      inicio: '',
      fin: '',
      cal: false,
      alert: false,
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
        grado: [
          v => !!v || 'Es necesario completar este campo'
        ],
        campo: [
          v => !!v || 'Es necesario completar este campo'
        ],
        subcampo: [
          v => !!v || 'Es necesario completar este campo'
        ],
        privacidad: [
          v => !!v || 'Es necesario aceptar los términos'
        ],
        nuevaInstitucion: {
          direccion: [
            v => !!v || 'Es necesario completar este campo'
          ],
          pais: [
            v => !!v || 'Es necesario completar este campo'
          ]
        }
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
    },
    filtrarEntidades () {
      let opciones = this.entidades
      let filtro = opciones.filter(o => o.pais === this.nuevaInstitucion.pais.iso)
      return filtro
    },
    validarRFC () {
      if (this.rfc) {
        if (/^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{0,3})$/gi.test(this.rfc)) {
          const existe = this.miembros.filter(m => m.rfc.toUpperCase() === this.rfc.toUpperCase())
          if (existe.length > 0) {
            return 'Ese RFC ya se encuentra registrado'
          }
        } else {
          return 'Es necesario completar este campo con un RFC válido'
        }
      } else {
        return 'Es necesario completar este campo'
      }
      return true
    },
    validarCVU () {
      if (this.cvu) {
        if (/^\d{0,6}$/.test(this.cvu)) {
          const existe = this.miembros.filter(m => m.cvu.toString() === this.cvu.toString())
          if (existe.length > 0) {
            return 'Ese CVU ya se encuentra registrado'
          }
        } else {
          return 'Es necesario completar este campo con un CVU válido'
        }
      }
      return true
    },
    validarNuevaInstitucion () {
      if (this.nuevaInstitucion.nombre) {
        const existe = this.instituciones.filter(i => i.nombre.toUpperCase() === this.nuevaInstitucion.nombre.toUpperCase())
        if (existe.length > 0) {
          return 'Esa institución ya se encuentra registrada'
        }
      } else {
        return 'Es necesario completar este campo'
      }
      return true
    },
    validarTelefono () {
      if (this.telefono) {
        if (this.celular === this.telefono) {
          return 'Ambos télefonos deben ser distintos'
        } else {
          const celular = this.miembros.filter(m => m.celular.toString() === this.telefono.toString())
          if (celular.length > 0) {
            return 'Ese télefono ya se encuentra registrado'
          }
        }
      }
      return true
    },
    validarCelular () {
      if (this.celular) {
        if (this.celular === this.telefono) {
          return 'Ambos télefonos deben ser distintos'
        } else {
          const celular = this.miembros.filter(m => m.celular.toString() === this.celular.toString())
          if (celular.length > 0) {
            return 'Ese télefono ya se encuentra registrado'
          }
        }
      } else {
        return 'Es necesario completar este campo'
      }
      return true
    },
    validarInstitucional () {
      if (this.institucional) {
        if (this.institucional === this.personal) {
          return 'Ambos cuentas de correo deben ser distintas'
        } else {
          if (/^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.institucional)) {
            const institucional = this.miembros.filter(m => m.institucional.toString() === this.institucional.toString())
            const personal = this.miembros.filter(m => m.personal.toString() === this.institucional.toString())
            if (institucional.length > 0 || personal.length > 0) {
              return 'Esa cuenta de correo ya se encuentra registrada'
            }
          } else {
            return 'Es necesario completar este campo con una cuenta de correo válido'
          }
        }
      }
      return true
    },
    validarPersonal () {
      if (this.personal) {
        if (this.institucional === this.personal) {
          return 'Ambos cuentas de correo deben ser distintas'
        } else {
          if (/^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.personal)) {
            const institucional = this.miembros.filter(m => m.institucional.toString() === this.personal.toString())
            const personal = this.miembros.filter(m => m.personal.toString() === this.personal.toString())
            if (institucional.length > 0 || personal.length > 0) {
              return 'Esa cuenta de correo ya se encuentra registrada'
            }
          } else {
            return 'Es necesario completar este campo con una cuenta de correo válido'
          }
        }
      } else {
        return 'Es necesario completar este campo'
      }
      return true
    },
    validarInstitucion () {
      return (this.institucion && this.institucion !== 'OTRA' && this.direccion && this.pais && this.entidad)
      ? true
      : 'Es necesario completar este campo'
    },
    validarEntidad () {
      return (!this.hayEntidades || (this.hayEntidades && this.nuevaInstitucion.entidad))
      ? true
      : 'Es necesario completar este campo'
    },
    validarOtraEntidad () {
      return (this.hayEntidades || (!this.hayEntidades && this.nuevaInstitucion.otraEntidad))
      ? true
      : 'Es necesario completar este campo'
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
    },
    dependencia: function () {
      if (this.dependencia === 'OTRA') {
        this.institucion = ''
        this.direccion = ''
        this.pais = ''
        this.entidad = ''
        this.dialog = true
      } else {
        let institucion = this.instituciones.filter(i => i.nombre === this.dependencia)
        if (institucion.length > 0) {
          this.institucion = institucion[0].nombre
          this.direccion = institucion[0].direccion
          this.pais = institucion[0].pais
          this.entidad = institucion[0].entidad
        }
      }
    },
    paistmp: function () {
      this.nuevaInstitucion.pais = this.paistmp
      this.nuevaInstitucion.otraEntidad = ''
      this.nuevaInstitucion.entidad = ''
      let opciones = this.entidades
      let filtro = opciones.filter(o => o.pais === this.nuevaInstitucion.pais.iso)
      if (filtro.length > 0) {
        this.hayEntidades = true
      } else {
        this.hayEntidades = false
      }
    },
    instituciones: function () {
      this.ordenarInstituciones()
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
    filtrarPaises (item, queryText, itemText) {
      const hasValue = val => val != null ? val : ''
      const text = hasValue(item.nombre)
      const query = hasValue(queryText)
      var i = 'áéíóú'.split('')
      var o = 'aeiou'.split('')
      var map = {}
      i.forEach(function (el, idx) { map[el] = o[idx] })
      return text.toString()
        .toLowerCase()
        .replace(/[^A-Za-z0-9]/g, function (ch) { return map[ch] || ch })
        .indexOf(query.toString().toLowerCase().replace(/[^A-Za-z0-9]/g, function (ch) { return map[ch] || ch })) > -1
    },
    cerrarDialogo () {
      this.dialog = false
      this.nuevaInstitucion.direccion = ''
      this.nuevaInstitucion.entidad = ''
      this.nuevaInstitucion.nombre = ''
      this.nuevaInstitucion.otraEntidad = ''
      this.paistmp = ''
      if (this.dependencia === 'OTRA') {
        this.dependencia = ''
      }
    },
    agregarInstitucion () {
      if (this.formaNuevaInstitucion) {
        var institucion = {
          nombre: '',
          direccion: '',
          pais: '',
          entidad: '',
          iso: '',
          bd: false
        }
        var i = 'ÁÉÍÓÚ'.split('')
        var o = 'AEIOU'.split('')
        var map = {}
        i.forEach(function (el, idx) { map[el] = o[idx] })
        institucion.nombre = this.nuevaInstitucion.nombre.toUpperCase().replace(/[^A-ZÑa-zñ0-9]/g, function (ch) { return map[ch] || ch })
        institucion.direccion = this.nuevaInstitucion.direccion.toUpperCase().replace(/[^A-ZÑa-zñ0-9]/g, function (ch) { return map[ch] || ch })
        institucion.pais = this.nuevaInstitucion.pais.nombre.toUpperCase().replace(/[^A-ZÑa-zñ0-9]/g, function (ch) { return map[ch] || ch })
        if (this.hayEntidades) {
          institucion.entidad = this.nuevaInstitucion.entidad.entidad.toUpperCase().replace(/[^A-ZÑa-zñ0-9]/g, function (ch) { return map[ch] || ch })
        } else {
          institucion.entidad = this.nuevaInstitucion.otraEntidad.toUpperCase().replace(/[^A-ZÑa-zñ0-9]/g, function (ch) { return map[ch] || ch })
        }
        institucion.iso = this.nuevaInstitucion.pais.iso.toUpperCase().replace(/[^A-ZÑa-zñ0-9]/g, function (ch) { return map[ch] || ch })
        institucionesRef.push(institucion)
        this.alertInstitucion = true
        setTimeout(function () { this.alertInstitucion = false }, 4444)
        this.ordenarInstituciones()
        this.dependencia = institucion.nombre
        this.cerrarDialogo()
      }
    },
    ordenarInstituciones () {
      function compare (a, b) {
        if (a.nombre === 'OTRA') {
          return 1
        }
        if (b.nombre === 'OTRA') {
          return -1
        }
        if (a.nombre < b.nombre) {
          return -1
        }
        if (a.nombre > b.nombre) {
          return 1
        }
        return 0
      }
      // this.institucionesOrdenadas = this.instituciones.sort(compare)
      for (let i of this.instituciones.sort(compare)) {
        this.institucionesOrdenadas.push(i.nombre)
      }
      // console.log(this.institucionesOrdenadas)
    },
    registrar () {
      if (this.$refs.formaMiembros.validate()) {
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
          self.miembro.membresia = (parseInt(snap.membresia) + 1).toString()
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
        this.miembro.sni = this.sni ? 'SI' : 'NO'
        this.miembro.nivel = this.nivel.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
        this.miembro.area = this.area.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
        this.miembro.campo = this.campo.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
        this.miembro.subcampo = this.subcampo.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
        this.miembro.institucion = this.institucion.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
        this.miembro.direccion = this.direccion.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
        this.miembro.pais = this.pais.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
        this.miembro.entidad = this.entidad.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
        this.miembro.telefono = this.telefono
        this.miembro.celular = this.celular
        this.miembro.personal = this.personal.toLowerCase()
        this.miembro.institucional = this.institucional.toLowerCase()
        this.miembro.activo = 'NO'
        this.miembro.fecha = hoy
        // console.log(this.miembro)
        let res = miembrosRef.push(this.miembro)
        this.info(res.key)
        self.$router.push({ name: 'confirmacion', params: { miembro: res.key } })
      }
    },
    info (key) {
      miembrosRef.child(key).on('value', function (snapshot) {
        // console.log(snapshot.val())
        if (snapshot.exists()) {
          axios.get('http://c-mic.mx/jrg/index.php?registro=Miembro', {
            params: snapshot.val()
          })
          .then(function (response) {
            // console.log(response)
          })
        }
      })
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
<style scoped>
.fondo{
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: cover !important;
}
</style>