<!-- <template>
    <div>
        <div @click="isToggle=!isToggle" v-bind:style="{backgroundColor: colorFront, color: colorTextFront}" v-show="!isToggle" class="animated flipInX flashcard">
            <div class="card-header" style="padding-bottom: 15px;"> {{headerFront}} </div>
            <div class="card-content center">
                <p v-bind:style="{fontSize: textSizeFront}">{{front}}</p>
                <img v-if="imgDefault!=''" :src="imgDefault" width="100%" v-on:mouseover="preview=true" v-on:mouseleave="preview=false">
            </div>
            <div class="card-footer">{{footerFront}}</div>
        </div>
        <div @click="isToggle=!isToggle" v-bind:style="{backgroundColor: colorBack, color: colorTextBack}" v-show="isToggle" class="animated flipInX flashcard">
            <div class="card-header" style="padding-bottom: 15px;"> {{headerBack}}</div>
            <div class="card-content center">
                <p v-bind:style="{fontSize: textSizeBack}">{{back}}</p>
                <img v-if="imgBack!=''" :src="imgBack" width="200" height="200">
            </div>
            <div class="card-footer"><v-btn color="primary" :href="footerBack" target="_blank"><v-icon>{{/youtube/.test(footerBack) ? 'play_arrow' : 'picture_as_pdf'
}}</v-icon></v-btn></div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
      mouseOver: function () {
        this.preview = true
        console.log('in')
      },
      mouseLeave: function () {
        this.preview = false
        console.log('out')
      }      
    },
    watch: {
      preview: function () {
        if (this.preview) {
          let that = this
          this.interval = setInterval(function () { 
            that.num++
            if (that.num > 3) {
              that.num = 0
            }
            that.imgDefault = that.imgDefault.replace(/\/[a-z0-9]+\.jpg/, '/' + that.num + '.jpg')
          }, 777);
        } else {
          clearInterval(this.interval);
          this.imgDefault = this.imgFront
          this.num = 0
        }
      }
    },
    mounted () {
      this.imgDefault = this.imgFront
    },
    data() {
        return {
            preview: false,
            isToggle: false,
            num: 0,
            interval: '',
            imgDefault: ''
        }
    }, props: {
        imgFront: {
            type: String,
            default: ''
        },
        imgBack: {
            type: String,
            default: ''
        },
        front: {
            type: String,
            default: ''
        },
        back: {
            type: String,
            default: ''
        },
        textSizeFront: {
            type: String,
            default: '2em'
        },
        textSizeBack: {
            type: String,
            default: '2em'
        },
        colorTextFront: {
            type: String,
            default: 'black'
        },
        colorTextBack: {
            type: String,
            default: 'white'
        },
        colorFront: {
            type: String,
            default: 'white'
        },
        colorBack: {
            type: String,
            default: '#2ecc71'
        },
        headerFront: {
            type: String,
            default: 'Do you know?'
        },
        headerBack: {
            type: String,
            default: 'Answer'
        },
        footerFront: {
            type: String,
            default: 'Click to show Back'
        },
        footerBack: {
            type: String,
            default: 'Click to show Front'
        }


    }
}
</script>
<style scoped>
.center {
    text-align: center;
}

.flashcard {
    cursor: pointer;
    border-radius: 10px;
    margin: 20px;
    padding: 25px;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.4);
    text-align: center;
}

.flashcard:hover {
    box-shadow: 0 0px 25px rgba(0, 0, 0, 0.8);
}

.animated {
    animation-duration: 1s;
    animation-fill-mode: both;
}

@keyframes flipInX {
    from {
        transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        animation-timing-function: ease-in;
        opacity: 0;
    }
    40% {
        transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
        animation-timing-function: ease-in;
    }
    60% {
        transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
        opacity: 1;
    }
    80% {
        transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    }
    to {
        transform: perspective(400px);
    }
}

.flipInX {
    backface-visibility: visible !important;
    animation-name: flipInX;
}
</style>
-->