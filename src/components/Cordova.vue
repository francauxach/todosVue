<template>
    <div>
        Cordova TEMPLATE
    </div>
</template>
<style>

</style>
<script>
export default {
  created () {
    document.addEventListener('deviceready', this.onDeviceReady, false)
  },
  beforeDestroy () {
    document.removeEventListener('deviceready', this.onBeforeDestroy, false)
  },
  methods: {
    onDeviceReady () {
      console.log('device ready!')
    },
    onBeforeDestroy () {
      console.log('EventListener for deviceready removed!')
    }
  }
}
</script>
