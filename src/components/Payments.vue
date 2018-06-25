<template>
  <v-container fluid fill-height>
    <v-layout row wrap align-center justify-center style="margin-top:48px">
      <v-flex xs12 class='text-xs-center' my-3>
        <h1>Pagos</h1>
      </v-flex>
      <v-flex xs12 class='text-xs-center'>
        <v-card>
          <v-card-title>
            Pagos
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Buscar"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-card-title>   
          <v-data-table
            :headers='headers'
            :items='pagos'
            class='elevation-1'
            :search="search"
            hide-actions
          >
            <template slot='items' slot-scope='props'>
              <td>{{ props.item.create_time }}</td>
              <td>{{ props.item.codigo }}</td>
              <td>{{ props.item.membresia }}</td>
              <td>{{ props.item.nombre }}</td>
              <td>{{ props.item.paterno }}</td>
              <td>{{ props.item.materno }}</td>
              <td>{{ props.item.tipo }}</td>
              <td>{{ props.item.pagado1 }}</td>
              <td>{{ props.item.pagado2 }}</td>
              <td>$ {{ props.item.precio1 }}</td>
              <td>$ {{ props.item.precio2 }}</td>
              <td>$ {{ props.item.inscripcion }}</td>
              <td>$ {{ props.item.suma }}</td>
              <td>{{ props.item.forma }}</td>
              <td>{{ props.item.paypal }}</td>
            </template>
            <template slot="footer">
              <td colspan="7">
                <strong>TOTALES</strong>
              </td>
              <td>
                <strong>{{ pagados1 }}</strong>
              </td>
              <td>
                <strong>{{ pagados2 }}</strong>
              </td>                
              <td>
                <strong>$ {{ total1 }}</strong>
              </td>
              <td>
                <strong>$ {{ total2 }}</strong>
              </td>
              <td>
                <strong>$ {{ total }}</strong>
              </td>
              <td>
                <strong>$ {{ totales }}</strong>
              </td>
              <td colspan="2">
                &nbsp;
              </td>              
            </template>            
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              No hay registros que contengan "{{ search }}"
            </v-alert>                   
          </v-data-table>
        </v-card>
        <v-btn class="mt-5" color="success" :href="pagos_csv" :download="'CMIC-pagos-5areunion-' + hoy + '.csv'" target="_blank">Descargar archivo<v-icon right small>file_download</v-icon></v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { fb } from '../config/firebase'
// import axios from 'axios'

let db = fb.database()
let quintareunionRef = db.ref('quintareunion')

export default {
  name: 'Home',
  firebase: {
    pagos: {
      source: quintareunionRef,
      readyCallback: function () {
        this.formatearPagos()
      }
    }
  },
  data () {
    return {
      dialog: false,
      search: '',
      pagados1: 0,
      pagados2: 0,
      total1: '0.00',
      total2: '0.00',
      total: '0.00',
      totales: '0.00',
      headers: [
        { text: 'Fecha de pago', value: 'create_time' },
        { text: 'Codigo', value: 'codigo' },
        { text: 'Membresia', value: 'membresia' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Paterno', value: 'paterno' },
        { text: 'Materno', value: 'materno' },
        { text: 'Tipo', value: 'tipo' },
        { text: 'Asistencia comida 27 SEP', value: 'pagado1' },
        { text: 'Asistencia comida 28 SEP', value: 'pagado2' },
        { text: 'Pago comida 27 SEP', value: 'precio1' },
        { text: 'Pago comida 28 SEP', value: 'precio2' },
        { text: 'Pago inscripción', value: 'inscripcion' },
        { text: 'Pago total', value: 'suma' },
        { text: 'Forma de pago', value: 'forma' },
        { text: 'Confirmación PayPal', value: 'paypal' }
      ],
      json_fields: {
        'Fecha de pago': 'create_time',
        'Código': 'codigo',
        'Membresia': 'membresia',
        'Nombre': 'nombre',
        'Paterno': 'paterno',
        'Materno': 'materno',
        'Tipo': 'tipo',
        'Asistencia comida 27 SEP': 'pagado1',
        'Asistencia Comida 28 SEP': 'pagado2',
        'Pago comida 27 SEP': 'precio1',
        'Pago comida 28 SEP': 'precio2',
        'Pago inscripción': 'inscripcion',
        'Pago total': 'suma',
        'Forma de pago': 'forma',
        'Confirmación PayPal': 'paypal'
      },
      json_meta: [
        [
          {
            'key': 'charset',
            'value': 'utf-8'
          }
        ]
      ]
    }
  },
  computed: {
    pagos_csv () {
      var pagosytotales = [ ...this.pagos ].map(item => ({...item}))
      pagosytotales.push({
        'create_time': '',
        'codigo': '',
        'membresia': '',
        'nombre': '',
        'paterno': '',
        'materno': '',
        'tipo': 'TOTALES',
        'pagado1': this.pagados1,
        'precio1': this.total1,
        'pagado2': this.pagados2,
        'precio2': this.total2,
        'inscripcion': this.total,
        'suma': this.totales,
        'forma': '',
        'paypal': ''
      })
      return this.downloadCSV(pagosytotales, this.headers)
    },
    hoy () {
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
      return hoy
    }
  },
  methods: {
    formatearPagos () {
      for (let p in this.pagos) {
        let date = new Date(this.pagos[p].create_time)
        date.setHours(date.getHours())
        this.pagos[p].create_time = date.getFullYear().toString() + '-' + ('0' + (date.getMonth() + 1).toString()).slice(-2) + '-' + ('0' + date.getDate().toString()).slice(-2) + ' ' + ('0' + date.getHours().toString()).slice(-2) + ':' + ('0' + date.getMinutes().toString()).slice(-2)
        let comidauno = this.pagos[p].transactions[0].item_list.items.filter(i => i.name === 'SEP27')
        let digito = this.pagos[p].codigo.replace(/[0-9]{4}[A-Z]{1,2}|[A-Z]{1}-[0-9]{4}/g, '')
        let c1 = {'pagado': 'NO', 'precio': '0.00'}
        if (digito === '1' || digito === '3') {
          if (this.pagos[p].comidauno !== true || comidauno.length < 1) {
            console.log(this.pagos[p]['.key'] + ' - ' + this.pagos[p].comidauno + ' - ' + comidauno.length + ' - ' + digito)
          } else {
            c1 = {'pagado': 'SI', 'precio': '300.00'}
            this.pagados1 = this.pagados1 + 1
          }
        } else {
          if (this.pagos[p].comidauno === true || comidauno.length > 0) {
            console.log(this.pagos[p]['.key'] + ' - ' + this.pagos[p].comidauno + ' - ' + comidauno.length + ' - ' + digito)
          }
        }
        this.pagos[p].pagado1 = c1.pagado
        this.pagos[p].precio1 = c1.precio
        let comidados = this.pagos[p].transactions[0].item_list.items.filter(i => i.name === 'SEP28')
        let c2 = {'pagado': 'NO', 'precio': '0.00'}
        if (digito === '2' || digito === '3') {
          if (this.pagos[p].comidados !== true || comidados.length < 1) {
            console.log(this.pagos[p]['.key'] + ' - ' + this.pagos[p].comidados + ' - ' + comidados.length + ' - ' + digito)
          } else {
            c2 = {'pagado': 'SI', 'precio': '300.00'}
            this.pagados2 = this.pagados2 + 1
          }
        } else {
          if (this.pagos[p].comidados === true || comidados.length > 0) {
            console.log(this.pagos[p]['.key'] + ' - ' + this.pagos[p].comidados + ' - ' + comidados.length + ' - ' + digito)
          }
        }
        this.pagos[p].pagado2 = c2.pagado
        this.pagos[p].precio2 = c2.precio
        this.pagos[p].suma = this.pagos[p].total
        this.pagos[p].inscripcion = this.pagos[p].transactions[0].item_list.items.filter(i => /COSTO/.test(i.name))[0].price
        if (parseInt(this.pagos[p].inscripcion) + parseInt(this.pagos[p].precio1) + parseInt(this.pagos[p].precio2) !== parseInt(this.pagos[p].total)) {
          console.log(this.pagos[p].inscripcion + ' - ' + this.pagos[p].precio1 + ' - ' + this.pagos[p].precio2 + ' - ' + this.pagos[p].total)
        }
        this.pagos[p].paypal = this.pagos[p].transactions[0].related_resources[0].sale.id
        this.total1 = (parseInt(this.total1) + parseInt(c1.precio)).toString() + '.00'
        this.total2 = (parseInt(this.total2) + parseInt(c2.precio)).toString() + '.00'
        this.total = (parseInt(this.total) + parseInt(this.pagos[p].inscripcion)).toString() + '.00'
        this.totales = (parseInt(this.totales) + parseInt(this.pagos[p].suma)).toString() + '.00'
      }
    },
    convertArrayOfObjectsToCSV (args) {
      var result, ctr, keys, columnDelimiter, lineDelimiter, data, head
      data = args.data || null
      if (data == null || !data.length) {
        return null
      }
      head = args.head || Object.keys(data[0])
      columnDelimiter = args.columnDelimiter || ','
      lineDelimiter = args.lineDelimiter || '\n'
      keys = head
      result = ''
      ctr = 0
      keys.forEach(function (key) {
        if (key.text !== 'Editar') {
          if (ctr > 0) result += columnDelimiter
          result += key.text
          ctr++
        }
      })
      result += lineDelimiter
      data.forEach(function (item) {
        ctr = 0
        keys.forEach(function (key) {
          if (item[key.value] !== undefined) {
            if (ctr > 0) result += columnDelimiter
            result += '"' + item[key.value].toString().replace(/"/g, '""') + '"'
            ctr++
          }
        })
        result += lineDelimiter
      })
      return result
    },
    downloadCSV (datos, encabezado) {
      var data
      var csv = this.convertArrayOfObjectsToCSV({
        data: datos,
        head: encabezado
      })
      if (csv == null) return
      if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + escape(csv)
      }
      data = csv
      return data
    }
  }
}
</script>

<style>
td {
  white-space: nowrap
}
</style>