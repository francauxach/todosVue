<template>
  <div>
    <p v-show="noLocations">No locations added yet...</p>
    <md-list class="custom-list md-triple-line">
      <md-list-item v-for="location in locations">
        <div class="md-list-text-container">
          <span>{{ location.owner }}</span>
          <span>{{ location.name }}</span>
          <p>{{ location.coords }}</p>
        </div>
        <md-divider class="md-inset"></md-divider>
      </md-list-item>
    </md-list>
    <md-button class="md-fab md-fab-bottom-right" id="fab" @click.native="initAddLocation">
      <md-icon>add</md-icon>
    </md-button>
    <md-dialog md-open-from="#fab" md-close-to="#fab" ref="dialogAddLocation">
      <md-dialog-title>Place the info for the new location</md-dialog-title>

      <md-dialog-content>
        <form>
          <md-input-container>
            <label>Owner</label>
            <md-input
              v-model="newLocation.owner">
            </md-input>
          </md-input-container>
          <md-input-container>
            <label>Name</label>
            <md-input
              v-model="newLocation.name"
              maxlength=30
              required=true>
            </md-input>
          </md-input-container>
          <md-input-container>
            <label>Coords</label>
            <md-input
              v-model="newLocation.coords"
              disabled=true>
            </md-input>
          </md-input-container>
        </form>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('dialogAddLocation')">Cancel</md-button>
        <md-button class="md-primary" @click.native="addLocation">Create</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-snackbar md-position="bottom center" ref="geolocationAPIError" md-duration="4000">
      <span>Geolocation API not supported!</span>
    </md-snackbar>
  </div>
</template>
<style>
</style>
<script>
  import todosVue from '../todosVue'
  export default{
    data () {
      return {
        noLocations: true,
        newLocation: {
          owner: '',
          name: '',
          coords: ''
        },
        locations: []
      }
    },
    created () {
      this.fetchLocations()
      this.fetchOwner()
    },
    methods: {
      fetchLocations: function () {
        if (window.localStorage.getItem('locations') != null) {
          this.locations = JSON.parse(window.localStorage.getItem('locations'))
          this.noLocations = false
        }
      },
      initAddLocation: function () {
        this.getLocation()
        this.openDialog('dialogAddLocation')
      },
      openDialog: function (ref) {
        this.$refs[ref].open()
      },
      closeDialog: function (ref) {
        this.newLocation.name = ''
        this.$refs[ref].close()
      },
      fetchOwner: function () {
        this.$http.get(todosVue.API_PROFILE_URL).then((response) => {
          this.newLocation.owner = response.data.name
        }, (errors) => {
          this.newLocation.owner = ''
        })
      },
      getLocation: function () {
        if (!navigator.geolocation) {
          this.openDialog('geolocationAPIError')
          return
        }
        let locations = this
        navigator.geolocation.getCurrentPosition(
          function (position) {
            locations.newLocation.coords = position.coords.latitude + ',' + position.coords.longitude
          },
          function () {
            console.log('Error getting location')
          })
        return false
      },
      addLocation: function () {
        this.locations.push(this.newLocation)
        window.localStorage.setItem('locations', JSON.stringify(this.locations))
        this.newLocation.name = ''
        this.noLocations = false
        this.closeDialog('dialogAddLocation')
      }
    }
  }
</script>
