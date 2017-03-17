<template>
    <md-card md-with-hover>
        <md-card-header>
            <div class="md-title">Device info</div>
        </md-card-header>

        <md-card-content>
          <form novalidate>
            <md-input-container>
              <label>Available:</label>
              <md-input v-model="device.available" readonly></md-input>
            </md-input-container>

            <md-input-container>
              <label>Cordova version:</label>
              <md-input v-model="device.cordova" readonly></md-input>
            </md-input-container>

            <md-input-container>
              <label>Is a virtual machine?</label>
              <md-input v-model="device.isVirtual" readonly></md-input>
            </md-input-container>

            <md-input-container>
              <label>Manufacturer:</label>
              <md-input v-model="device.manufacturer" readonly></md-input>
            </md-input-container>

            <md-input-container>
              <label>Model:</label>
              <md-input v-model="device.model" readonly></md-input>
            </md-input-container>

            <md-input-container>
              <label>Platform:</label>
              <md-input v-model="device.platform" readonly></md-input>
            </md-input-container>

            <md-input-container>
              <label>Serial</label>
              <md-input v-model="device.serial" readonly></md-input>
            </md-input-container>

            <md-input-container>
              <label>UUID</label>
              <md-input v-model="device.uuid" readonly></md-input>
            </md-input-container>

          </form>
            </md-list>

        </md-card-content>
    </md-card>
</template>
<style>
</style>
<script>
  export default {
    data () {
      return {
        device: []
      }
    },
    created () {
      document.addEventListener('deviceready', this.onDeviceReady, false)
    },
    beforeDestroy () {
      document.removeEventListener('deviceready', this.onBeforeDestroy, false)
    },
    methods: {
      onDeviceReady () {
//        console.log(window.device)
        this.device = window.device
      },
      onBeforeDestroy () {
        console.log('EventListener for deviceready removed!')
      }
    }
  }
</script>
