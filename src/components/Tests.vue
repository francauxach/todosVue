<template>
  <md-list>
    <md-subheader>Delay</md-subheader>
    <md-list-item>
      <div class="test" id="with-delay" @touchend="countTouch(true)" @click="countClick(true)">With delay</div>
      <div class="test" id="without-delay" @touchend="countTouch(false)" @click="countClick(false)">Without Delay</div>
      <!--<md-button class="md-raised md-primary" id="with-delay">With delay</md-button>-->
      <!--<md-button class="md-raised md-primary" id="without-delay">Without delay</md-button>-->
    </md-list-item>
    <md-list-item>
      <p v-show="delayHasTried">This message has been displayed after {{ delayTime }}ms.</p>
      <md-divider class="md-inset"></md-divider>
    </md-list-item>
    <md-subheader>Vibration</md-subheader>
    <md-list-item>
      <md-button class="md-raised md-primary" @click.native="tryVibration">Try vibration</md-button>
    </md-list-item>
  </md-list>
  <md-snackbar md-position="bottom center" ref="alertVibrateNotSupported" md-duration="4000">
    <span>Vibrate not supported for that device!</span>
  </md-snackbar>
</template>
<style>
  .test { margin: 1em auto; width: 6em; line-height: 4em; border: 1px solid black; text-align: center; }
</style>
<script>
  export default{
    data () {
      return {
        delayHasTried: null,
        delayTime: null,
        teTime: null,
        cTime: null
      }
    },
    created () {
      window.FastClick.attach(document.getElementById('without-delay'))
    },
    methods: {
      tryVibration: function () {
        if (navigator.vibrate) {
          navigator.vibrate(2000)
        } else {
          this.openDialog('alertVibrateNotSupported')
        }
      },
      openDialog: function (ref) {
        this.$refs[ref].open()
      },
      countTouch: function (hasDelay) {
        this.delayHasTried = true
        this.teTime = Date.now()
        if (!hasDelay) {
          this.delayTime = this.cTime - this.teTime
        }
      },
      countClick: function (hasDelay) {
        this.delayHasTried = true
        this.cTime = Date.now()
        if (hasDelay) {
          this.delayTime = this.cTime - this.teTime
        }
      }
    }
  }
</script>
