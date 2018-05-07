<template>
  <v-container fluid fill-height grid-list-lg>
    <v-layout row style="margin-top:120px">
      <v-flex xs12 mt-5>
        <h1 class="mb-5 display-2 primary--text text-xs-center">PONENTES</h1>
        <vue-accordion :items="items" :styles="styles" style="max-width:100%; height:350px"></vue-accordion>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import fondo from '../assets/banner2.jpg'
import img1 from '../assets/ponente1.png'
import img2 from '../assets/ponente2.png'
import img3 from '../assets/ponente3.png'
import img4 from '../assets/ponente4.png'
import img5 from '../assets/ponente5.png'
import img6 from '../assets/ponente6.png'
import img7 from '../assets/ponente7.png'
import img8 from '../assets/ponente8.png'
import img9 from '../assets/ponente9.png'

export default {
  data () {
    return {
      image: fondo,
      items: [
        {
          title: 'Amado J. Zurita-Saavedra',
          text: 'La Investigación del Dr. Zurita tiene el objetivo de mejorar la detección del cáncer de próstata y su metástasis a hueso, para finalmente prevenir la metástasis, un evento que contribuye a la letalidad de la enfermedad. Un reto clínico es predecir que paciente desarrollarán una enfermedad metastásica y quienes no. Esta información podría guiar a los clínicos en un tratamiento más agresivo para los pacientes con potencial metastásico. Cadherina-11 es una proteína que ha sido identificada como un posible candidato de adhesión celular necesaria para la metástasis a hueso.\n\nEl Dr. Zurita evaluará el uso de la cuantificación de Cadherina-11 en células de cáncer de próstata como un marcador predictivo para metástasis a hueso. Además, determinara si la detección de los niveles de expresión de Cadherina-11 en células circulantes de tumor (células que se han separado del tumor y se encuentran en la sangre) podrían proveer a los oncólogos con un ensayo no invasivo para la predicción del potencial metastásico. Una meta a largo plazo es usar a Cadherina-11 como un blanco terapéutico para prevenir la metástasis de cáncer de próstata a hueso.',
          url: '#',
          image: img1
        },
        {
          title: 'Adrián Puello Guerrero',
          text: 'El Dr. Adrián Puello, originario de República Dominicana, realizó sus estudios de medicina en la Universidad Autónoma de Santo Domingo. Posteriormente, realizó una maestría en Epidemiología en la Universidad Victor Segalen en Burdeos, Francia.\n\nFue investigador de la Universidad de Michigan y es un especialista en Salud Pública en República Dominicana donde desarrollo un plan nacional de estadística en la salud. Fue jefe de departamento de Epidemiología en el Hospital General de la Plaza de la Salud, además perteneció a la Organización Pan Americana de la Salud como consultor en farmacovigilancia.\n\nActualmente, es Director de Investigación en el Instituto Nacional del Cáncer, además profesor de Epidemiología y Bioestadística en la Universidad Autónoma de Santo Domingo.',
          url: '#',
          image: img2
        },
        {
          title: 'Jaime de la Garza Salazar',
          text: 'El primer mexicano en ganar el Distinguished Achievement Award de la Sociedad Americana de Oncología Clínica, es egresado de la Facultad de Medicina de la Universidad Autónoma de Nuevo León. Jaime de la Garza Salazar, oncólogo de profesión, fue reconocido por su trabajo en el campo de la medicina por esta organización internacional que premia a investigadores, defensores de pacientes y líderes de la comunidad oncológica a nivel mundial que han contribuido significativamente al campo de la atención del cáncer.\n\nEx-Director General del Instituto Nacional de Cancerología en México, fue el primero en dar tratamiento con 5-FU (Fluorouracilo) en un caso (con respuesta completa) de cáncer de mama.',
          url: '#',
          image: img3
        },
        {
          title: 'William C. Earnshaw',
          text: 'Eilliam C. Earnshaw completó su Ph.D. con Jonathan King en el MIT en 1977. Concluyo su formación posdoctoral en Cambridge con Aaron Klug y Ron Laskey y Geneva con Ulrich Laemmli y continuó con su formación por 13 años en la Facultad de Medicina Johns Hopkins en el Departamento de Biología Celular y Anatomía de Tom Pollard. En 1996 se trasladó a Edimburgo como Investigador principal del programa “Wellcome Trust” como parte de la iniciativa para llevar la investigación moderna de biología celular a Edimburgo. Él mantiene está posición actualmente.\n\nEl objetivo principal de Bill Earnshaw a lo largo de su carrera ha sido comprender cómo los cromosomas se compactan y se segregan cuando las células se dividen. Comenzó estudiando el empaquetamiento de ADN en bacteriófagos, pero luego pasó al estudio de los cromosomas mitóticos en células de vertebrados. Los descubrimientos del Laboratorio de Earnshaw han llevado a avances fundamentales en el estudio de la estructura y función del cinetocoro y en el estudio de la ejecución apoptótica. El descubrimiento del laboratorio de las chromosomal passenger proteins y su papel en el control integrado de los eventos cromosómicos y citoesqueléticos durante la mitosis desencadenó una de las áreas más activas de la investigación sobre la mitosis.',
          url: '#',
          image: img4
        },
        {
          title: 'Ronald A. DePinho',
          text: 'Ronald A. DePinho, fue el cuarto presidente del MD Anderson Cancer Center de la Universidad de Texas en Houston y es reconocido internacionalmente por su investigación básica y traslacional en cáncer, envejecimiento y trastornos degenerativos asociados con la edad. Fue incluido en la Academia Nacional de Ciencias de Estados Unidos en 2012. \n\nAntes de unirse al MD Anderson, pasó 14 años en el Instituto de Cáncer Dana-Farber y la Facultad de Medicina de Harvard Boston. Allí, fue director fundador del Instituto Belfer de Ciencias  Aplicadas al Cancer en Dana-Farber y fue profesor en el Departamento de Medicina (genética) en Harvard y profesor de investigación de la Sociedad Americana del Cáncer. Anteriormente, ocupó numerosos cargos docentes durante 10 años en la Escuela de Medicina Albert Einstein en Nueva York.\n\nSu laboratorio estudia los procesos moleculares y biológicos que rigen el desarrollo del cáncer, la base del envejecimiento y las enfermedades degenerativas y el mantenimiento de las células madre normales y cancerosas. Han producido una serie de descubrimientos que conducen a mejores métodos de detección temprana del cáncer, una mejor atención del paciente con cáncer y un nuevo desarrollo de fármacos contra el cáncer. El rango de su investigación incluye el desarrollo de fármacos y biomarcadores contra el cáncer, el descubrimiento de genes del cáncer, la biología de células madre y el desarrollo de modelos de ratones diseñados genéticamente para estudiar el cáncer en humanos.',
          url: '#',
          image: img5
        },
        {
          title: 'Douglas Yee',
          text: 'El Dr. Yee ocupa el Dirección de John H. Kersey en Investigación del Cáncer. Anteriormente fue co-líder del Programa de Cáncer de Mujeres. Fue nombrado Director del Centro Masónico del Cáncer de la Universidad de Minnesota en 2007. El Dr. Yee recibió su MD en 1981 de la Universidad de Chicago. Realizó su formación en medicina interna y fue Jefe Médico Residente de la Universidad de Carolina del Norte. Su formación en oncología médica se completo en el Instituto Nacional del Cáncer en Bethesda, Maryland. Antes de llegar a Minnesota, ocupó cargos docentes en el Centro Médico de la Universidad de Georgetown y en el Centro de Ciencias de la Salud de la Universidad de Texas en San Antonio.\n\nSu laboratorio está interesado en comprender la contribución de la acción del factor de crecimiento similar a la insulina (IGF) al fenotipo maligno del cáncer de mama. Han demostrado que el IGF-I puede estimular el crecimiento celular, mejorar la supervivencia y estimular la motilidad y la adhesión. La activación de sustratos específicos, el receptor de insulina sustrato-1 (IRS-1) y el IRS-2 están asociados con la proliferación celular o la motilidad celular. Un enfoque principal de su laboratorio es dilucidar las señales de estas dos proteínas adaptadoras que explican el fenotipo observado. En el cáncer de mama, el desarrollo de terapias diseñadas para dirigirse a moléculas reguladoras de crecimiento específicas ha demostrado ser notablemente exitosas en la clínica. Dado que los IGF regulan varios fenotipos importantes de cáncer de mama, el segundo enfoque de su laboratorio es desarrollar estrategias anti-IGF que tengan potencial como terapias contra el cáncer.\n\nSu objetivo a largo plazo es mejorar el tratamiento del cáncer de mama mediante la comprensión y la orientación de los componentes clave del sistema IGFx.',
          url: '#',
          image: img6
        },
        {
          title: 'David Potter',
          text: 'El Dr. David Potter, originario de Estados Unidos, realizó sus estudios de licenciatura en biología en M.I.T., el Dr. Potter recibió su título de médico y doctorado de la Universidad Johns Hopkins. Se formó en Medicina Interna en el Centro Médico de la Universidad de Stanford y en Hematología y Oncología en el Centro Médico Tufts-New England. Finalmente, realizó estudios posdoctorales en el Centro para la Investigación del Cáncer del M.I.T. en el laboratorio del Dr. Phillip Sharp. \n\nSus estudios buscan determinar si las epoxigenasas son objetivos terapéuticos contra el cáncer. Su hipótesis es que la activación de la epoxigenasa promueve la progresión del cáncer de mama promoviendo la fosforilación de Akt y la supervivencia de las células cancerígenas. Con base en sus observaciones, se realizaron las siguientes preguntas: ¿Cuáles son los mecanismos moleculares por los cuales las epoxigenasas causan desregulación del crecimiento en el cáncer de mama? ¿Aumentan las epoxigenasas las actividades transformadoras de los oncogenes en el carcinoma mamario? ¿Las vías de epoxigenasa requieren actividad de Hsp90 para la supervivencia de células cancerosas? La lipidómica dirigida se usará para analizar regio- y estereoisómeros EET. Estos estudios promoverán un mayor desarrollo de las epoxigenasas como objetivos para la terapéutica del cáncer de mama. \n\nHa recibido diversas distinciones tanto por su investigación como por su participación en la formación de estudiantes entre los que destacan el premio Walther por su investigación en cáncer y el Distinción en Enseñanza por la Universidad de Tufts.',
          url: '#',
          image: img7
        },
        {
          title: 'Antonio de Maio',
          text: 'l Dr. Antonio De Maio es profesor y miembro del Programa de Posgrado en Ciencias Biomédicas (BMS) en la Universidad de California en San Diego. Graduado de la Universidad Central de Venezuela en Caracas, el Dr. Antonio De Maio recibió su doctorado del Instituto de Ciencias Weizmann en Rehovot, Israel. El Dr. Antonio De Maio se unió a la facultad de la Facultad de Medicina de UC San Diego en enero de 2006.\n\nAntes, fue Profesor Asociado y Director de Investigación de la División de Cirugía Pediátrica de la Universidad Johns Hopkins. Mientras estuvo en Hopkins, el Dr. De Maio dirigió el Comité para la Reclutamiento de Minorías Poco Representadas para Programas de Posgrado y el Programa de Educación de Investigación Post-Bachillerato (PREP).\n\nEn UC San Diego, el Dr. De Maio continúa siendo muy activo en el aumento de la diversidad estudiantil en la escuela de posgrado y medicina. \n\nEl laboratorio Antonio De Maio está investigando las bases moleculares y genéticas de la respuesta a la lesión. El laboratorio Antonio De Maio descubrió que la respuesta a las lesiones está modulada por varios factores de confusión, incluidos los antecedentes genéticos, el sexo, la edad, la dieta y el medio ambiente. El principal factor asociado con la morbilidad y la mortalidad es una respuesta inflamatoria abrumadora. El grupo Antonio De Maio está utilizando la genética del ratón para identificar genes que regulan el proceso inflamatorio como posibles dianas terapéuticas. Además, el laboratorio Antonio De Maio está estudiando el papel de las proteínas de choque térmico en la regulación de la respuesta inflamatoria.',
          url: '#',
          image: img8
        },
        {
          title: 'Hugo Alberto Barrera Saldaña',
          text: 'rofesor de la Facultad de Medicina de la UANL hasta 2017 y actualmente profesor de medicina de precisión en el Sistema de Salud (TecSalud) del Tecnológico de Monterrey. Cursó la carrera de Biólogo (y materias extracurriculares de química, genética y microbiología para devenir Bioquímico), el doctorado en Biomedicina por la Universidad de Texas (UT) en Houston y realizó una estancia posdoctoral en la U. Louis Pasteur de Estrasburgo, Francia. Especialista en Conversión de Tecnología a Capital por la UT en Austin e ITESM y Diplomado en Investigación Clínica y en Innovación Tecnológica. Miembro del SNI desde su fundación (1984) y desde 1996 en su máximo Nivel (3). Fundador en la UANL de unidades de investigación (ULIEG, UDM y UBM) y posgrados, la carrera de Biotecnología Genómica y del Centro de Transferencia de Tecnología; en el IPN, del Centro y el posgrado en Biotecnología Genómica.',
          url: '#',
          image: img9
        }
      ],
      styles: {
        p: {
          textTransform: 'uppercase',
          fontSize: '11px',
          maxWidth: '90%',
          whiteSpace: 'pre-wrap',
          maxHeight: '80%',
          position: 'absolute',
          textAlign: 'justify'
        }
      }
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
</style>
