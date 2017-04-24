<script>
  export default{
    created () {
      document.addEventListener('deviceready', this.onDeviceReady, false)
    },
    methods: {
      onDeviceReady () {
        console.log('hola')
        navigator.notification.confirm(
          'Are you sure you want to close the application?',
          this.onConfirmQuit,
          'Close',
          'OK,Cancel'
        )
      },
      onConfirmQuit (button) {
        if (button === 1) {
          navigator.app.exitApp()
        }
      }
    }
  }
</script>
