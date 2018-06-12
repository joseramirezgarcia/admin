<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs12 sm10 md9 lg8>
        <v-card class="elevation-24">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Actualización de datos</v-toolbar-title>
          </v-toolbar>
          <v-form v-model="formaMiembros" ref="formaMiembros">
            <v-card-title fill-height>
              <v-spacer></v-spacer>
              <div>
                <v-layout flex align-center justify-center class="headline mb-0 primary--text"><v-icon color="primary">account_circle</v-icon> Datos Generales</v-layout>
              </div>
            </v-card-title>
            <v-card-text>
              <v-flex>
                <v-text-field
                  name='membresia'
                  label='Membresia'
                  id='membresia'
                  type='text'
                  v-model='datos.membresia'
                  disabled
                  required></v-text-field>
              </v-flex>
              <v-flex>
                <v-radio-group v-model="datos.tipo" label="Tipo de miembro*" row :rules="reglas.tipo">
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
                  v-model='datos.nombre'
                  :rules="reglas.nombre"
                  required></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field
                  name='paterno'
                  label='Primer apellido'
                  id='paterno'
                  type='text'
                  v-model='datos.paterno'
                  :rules="[sinApellidos]"
                  ></v-text-field>
              </v-flex>
              <v-flex>
              <v-text-field
                  name='materno'
                  label='Segundo apellido'
                  id='materno'
                  type='text'
                  v-model='datos.materno'
                  :rules="[sinApellidos]"
                  ></v-text-field>
              </v-flex>
              <v-flex>
                <v-radio-group v-model="datos.genero" label="Género*" :rules="reglas.genero">
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
                    v-model="datos.nacimiento"
                    :rules="reglas.nacimiento"
                    readonly
                    required
                  ></v-text-field>
                  <v-date-picker
                    ref="picker"
                    v-model="datos.nacimiento"
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
                  v-model='datos.rfc'
                  :counter="13"
                  hint="Registro Federal de Contribuyentes"
                  persistent-hint
                  required></v-text-field>
              </v-flex>
              <v-flex>
                <v-select
                  :items="grados"
                  v-model="datos.grado"
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
                  v-model='datos.cvu'
                  :rules="[validarCVU]"
                  :counter="6"
                  hint="Otorgado por CONACyT"
                  persistent-hint
                  ></v-text-field>
              </v-flex>              
              <v-flex>
                <v-switch color="primary" label="Sistema nacional de investigadores (SNI)" v-model="datos.sni" hint="Otorgado por CONACyT" persistent-hint></v-switch>
              </v-flex>
              <v-flex v-if="datos.sni">
                <v-select
                  :items="niveles"
                  v-model="datos.nivel"
                  item-text="nivel"
                  item-value="nivel"
                  label="Nivel SNI"
                  :rules="[nivelSNI]"
                ></v-select>
              </v-flex>
              <v-flex v-if="datos.sni">
                <v-select
                  :items="areas"
                  v-model="datos.area"
                  item-text="area"
                  item-value="area"
                  label="Área SNI"
                  :rules="[areaSNI]"
                ></v-select>
              </v-flex>
              <v-flex>
                <v-select
                  :items="campos"
                  v-model="datos.campo"
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
                  v-model="datos.subcampo"
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
                {{datos.direccion}}
              </v-flex>
              <v-flex>
                {{datos.pais}}
              </v-flex>
              <v-flex>
                {{datos.entidad}}
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
                  v-model='datos.telefono'
                  :rules="[validarTelefono]"
                  ></v-text-field>
              </v-flex>                
              <v-flex>
                <v-text-field
                  name='celular'
                  label='Celular'
                  id='celular'
                  type='text'
                  v-model='datos.celular'
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
                  v-model='datos.institucional'
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
                  v-model='datos.personal'
                  :rules="[validarPersonal]"
                  required
                  ></v-text-field>
              </v-flex>   
            </v-card-text>   
          </v-form>
          <v-divider></v-divider> 
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="info" to='/miembros/informacion'>Cancelar</v-btn>
            <v-spacer></v-spacer>
            <v-btn color='success' type='submit' @click="actualizar" :disabled="!formaMiembros">Actualizar mis datos</v-btn>
            <v-spacer></v-spacer>
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
      <v-snackbar
        :timeout="1500"
        :bottom="true"
        v-model="snackbar"
        :color="'primary'"
      >
        {{ mensaje }}
        <v-btn flat color="white" @click.native="snackbar = false">Cerrar</v-btn>
      </v-snackbar>
      <v-btn
        dark
        fab
        fixed
        right
        top
        color="tertiary"
        title="Descargar archivo"
        @click='userSignOut'
      >
        Salir
      </v-btn>
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
    miembros: {
      source: miembrosRef,
      readyCallback: function () {
        this.llenarDatos()
      }
    },
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
      snackbar: false,
      mensaje: '',
      formaMiembros: false,
      datos: {
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
      dependencia: '',
      rfc: '',
      campo: '',
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
    watch_nombre () {
      return this.datos.nombre
    },
    watch_paterno () {
      return this.datos.paterno
    },
    watch_materno () {
      return this.datos.materno
    },
    watch_nacimiento () {
      return this.datos.nacimiento
    },
    watch_sni () {
      return this.datos.sni
    },
    watch_campo () {
      return this.datos.campo
    },
    watch_rfc () {
      return this.datos.rfc
    },
    error () {
      return this.$store.state.error
    },
    loading () {
      return this.$store.state.loading
    },
    sinApellidos () {
      return (this.datos.paterno || this.datos.materno)
      ? true
      : 'Es necesario completar por lo menos un apellido'
    },
    nivelSNI () {
      return (!this.datos.sni || (this.datos.sni && this.datos.nivel))
      ? true
      : 'Es necesario completar este campo'
    },
    areaSNI () {
      return (!this.datos.sni || (this.datos.sni && this.datos.area))
      ? true
      : 'Es necesario completar este campo'
    },
    filtrarCampo () {
      let opciones = this.subcampos
      return opciones.filter(o => o.campo === this.datos.campo)
    },
    filtrarEntidades () {
      let opciones = this.entidades
      let filtro = opciones.filter(o => o.pais === this.nuevaInstitucion.pais.iso)
      return filtro
    },
    validarRFC () {
      if (this.datos.rfc) {
        if (/^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{0,3})$/gi.test(this.datos.rfc)) {
          const existe = this.otrosmiembros.filter(m => m.rfc.toUpperCase() === this.datos.rfc.toUpperCase())
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
      if (this.datos.cvu) {
        if (/^\d{0,6}$/.test(this.datos.cvu)) {
          const existe = this.otrosmiembros.filter(m => m.cvu.toString() === this.datos.cvu.toString())
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
      if (this.datos.telefono) {
        if (this.datos.celular === this.datos.telefono) {
          return 'Ambos télefonos deben ser distintos'
        } else {
          const celular = this.otrosmiembros.filter(m => m.celular.toString() === this.datos.telefono.toString())
          if (celular.length > 0) {
            return 'Ese télefono ya se encuentra registrado'
          }
        }
      }
      return true
    },
    validarCelular () {
      if (this.datos.celular) {
        if (this.datos.celular === this.datos.telefono) {
          return 'Ambos télefonos deben ser distintos'
        } else {
          const celular = this.otrosmiembros.filter(m => m.celular.toString() === this.datos.celular.toString())
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
      if (this.datos.institucional) {
        if (this.datos.institucional === this.datos.personal) {
          return 'Ambos cuentas de correo deben ser distintas'
        } else {
          if (/^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.datos.institucional)) {
            const institucional = this.otrosmiembros.filter(m => m.institucional.toString() === this.datos.institucional.toString())
            const personal = this.otrosmiembros.filter(m => m.personal.toString() === this.datos.institucional.toString())
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
      if (this.datos.personal) {
        if (this.datos.institucional === this.datos.personal) {
          return 'Ambos cuentas de correo deben ser distintas'
        } else {
          if (/^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.datos.personal)) {
            const institucional = this.otrosmiembros.filter(m => m.institucional.toString() === this.datos.personal.toString())
            const personal = this.otrosmiembros.filter(m => m.personal.toString() === this.datos.personal.toString())
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
      return (this.datos.institucion && this.datos.institucion !== 'OTRA' && this.datos.direccion && this.datos.pais && this.datos.entidad)
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
    watch_nombre: function () {
      this.calcularRfc()
    },
    watch_paterno: function () {
      this.calcularRfc()
    },
    watch_materno: function () {
      this.calcularRfc()
    },
    watch_nacimiento: function () {
      this.calcularRfc()
    },
    watch_rfc: function () {
      this.rfc = ''
    },
    watch_sni: function () {
      if (!this.datos.sni) {
        this.datos.nivel = ''
        this.datos.area = ''
      }
    },
    watch_campo: function () {
      if (this.datos.campo !== this.campo) {
        this.datos.subcampo = ''
      } else {
        this.campo = ''
      }
    },
    dependencia: function () {
      if (this.dependencia === 'OTRA') {
        this.datos.institucion = ''
        this.datos.direccion = ''
        this.datos.pais = ''
        this.datos.entidad = ''
        this.dialog = true
      } else {
        let institucion = this.instituciones.filter(i => i.nombre === this.dependencia)
        if (institucion.length > 0) {
          this.datos.institucion = institucion[0].nombre
          this.datos.direccion = institucion[0].direccion
          this.datos.pais = institucion[0].pais
          this.datos.entidad = institucion[0].entidad
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
    userSignOut () {
      this.$store.dispatch('userSignOut')
    },
    llenarDatos () {
      let datos = this.miembros.filter(m => m.personal.toString() === fb.auth().currentUser.email.toString())
      // let datos = [this.miembros[Math.floor(Math.random() * this.miembros.length)]]
      // console.log(datos[0]['.key'])
      if (datos.length > 0) {
        for (let d in datos[0]) {
          this.datos[d] = datos[0][d]
        }
        if (this.datos.sni === 'SI') {
          this.datos.sni = true
        } else {
          this.datos.sni = false
        }
        this.campo = this.datos.campo
        this.dependencia = this.datos.institucion
        this.otrosmiembros = this.miembros
        let index = this.otrosmiembros.map(function (e) { return e['.key'] }).indexOf(this.datos['.key'])
        this.otrosmiembros.splice(index, 1)
        this.rfc = this.datos.rfc
      } else {
        this.userSignOut()
      }
    },
    save (date) {
      this.$refs.cal.save(date)
    },
    calcularRfc () {
      if (this.rfc === '') {
        const fecha = new RegExp(/\d{4}-\d{2}-\d{2}/)
        if (
          this.datos.paterno ||
          this.datos.materno ||
          this.datos.nombre ||
          fecha.test(this.datos.nacimiento)
        ) {
          let rfc = ''
          if (this.datos.paterno) {
            rfc += (this.datos.paterno.substring(0, 2) + 'XX').substring(0, 2)
          } else {
            rfc += 'XX'
          }
          if (this.datos.materno) {
            rfc += (this.datos.materno.substring(0, 1) + 'X').substring(0, 1)
          } else {
            rfc += 'X'
          }
          if (this.datos.nombre) {
            rfc += (this.datos.nombre.substring(0, 1) + 'X').substring(0, 1)
          } else {
            rfc += 'X'
          }
          if (fecha.test(this.datos.nacimiento)) {
            rfc += this.datos.nacimiento.substring(2, 4)
            rfc += this.datos.nacimiento.substring(5, 7)
            rfc += this.datos.nacimiento.substring(8, 10)
          } else {
            rfc += '000000'
          }
          var i = 'ÁÉÍÓÚÑ'.split('')
          var o = 'AEIOUN'.split('')
          var map = {}
          i.forEach(function (el, idx) { map[el] = o[idx] })
          this.datos.rfc = rfc.toUpperCase().replace(/[^A-Za-z0-9]/g, function (ch) { return map[ch] || ch })
        } else {
          this.datos.rfc = ''
        }
      } else {
        this.datos.rfc = this.rfc
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
      if (this.datos.dependencia === 'OTRA') {
        this.datos.dependencia = ''
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
    actualizar () {
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
        this.miembro.membresia = this.datos.membresia
        this.miembro.tipo = this.datos.tipo
        this.miembro.nombre = this.datos.nombre.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
        this.miembro.paterno = this.datos.paterno.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
        this.miembro.materno = this.datos.materno.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
        this.miembro.genero = this.datos.genero
        this.miembro.nacimiento = this.datos.nacimiento
        this.miembro.rfc = this.datos.rfc.toUpperCase().replace(/[^A-Za-z0-9]/g, function (ch) { return map[ch] || ch })
        this.miembro.grado = this.datos.grado
        this.miembro.cvu = this.datos.cvu
        this.miembro.sni = this.datos.sni ? 'SI' : 'NO'
        this.miembro.nivel = this.datos.nivel.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
        this.miembro.area = this.datos.area.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
        this.miembro.campo = this.datos.campo.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
        this.miembro.subcampo = this.datos.subcampo.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
        this.miembro.institucion = this.datos.institucion.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
        this.miembro.direccion = this.datos.direccion.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
        this.miembro.pais = this.datos.pais.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
        this.miembro.entidad = this.datos.entidad.toUpperCase().replace(/[^A-ZÑa-zñ]/g, function (ch) { return map[ch] || ch })
        this.miembro.telefono = this.datos.telefono
        this.miembro.celular = this.datos.celular
        this.miembro.personal = this.datos.personal.toLowerCase()
        this.miembro.institucional = this.datos.institucional.toLowerCase()
        this.miembro.activo = 'SI'
        this.miembro.fecha = this.datos.fecha || hoy
        // console.log(this.miembro)
        miembrosRef.child(this.datos['.key']).set(this.miembro)
        this.snackbar = true
        this.mensaje = 'Datos actualizados'
        let that = this
        setTimeout(function () { that.$router.push({ name: 'informacion' }) }, 1500)
        axios.get('http://c-mic.mx/jrg/index.php?registro=Actualizacion', {
          params: this.miembro
        })
      }
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
  },
  mounted () {
    this.$refs.formaMiembros.validate()
  }
}
</script>