<template>
  <div class="phone-viewport">

    <md-toolbar>
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title">Todos</h2>
    </md-toolbar>

    <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <h3 class="md-title">Todos</h3>
        </div>
      </md-toolbar>

      <md-list>
        <md-list-item @click="toggleLeftSidenav">
          <md-icon>view_list</md-icon>
          <router-link exact to="/todos" style="color: white">Todos</router-link>
        </md-list-item>

        <md-list-item @click="toggleLeftSidenav">
          <md-icon>verified_user</md-icon>
          <router-link exact to="/tokens" style="color: white">Tokens</router-link>
        </md-list-item>

        <md-list-item @click="toggleLeftSidenav">
          <md-icon>face</md-icon>
          <router-link exact to="/profile" style="color: white">Profile</router-link>
        </md-list-item>

        <md-list-item @click="toggleLeftSidenav">
          <md-icon>info_outline</md-icon>
          <router-link exact to="/device" style="color: white">Device Info</router-link>
        </md-list-item>

        <md-list-item @click="toggleLeftSidenav">
          <md-icon>build</md-icon>
          <router-link exact to="/cordova" style="color: white">Cordova</router-link>
        </md-list-item>

        <md-list-item @click="toggleLeftSidenav">
          <md-icon>exit_to_app</md-icon>
          <router-link exact to="/login" style="color: white">Login/Logout</router-link>
        </md-list-item>

        <md-list-item>
          <md-avatar>
            <img src="https://placeimg.com/40/40/people/5" alt="People">
          </md-avatar>

          <span>Abbey Christansen</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
        </md-list-item>
      </md-list>

    </md-sidenav>

    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      device: window.cord
    }
  },
  created () {
    console.log(window.location.href)
    this.initialize()
  },
  methods: {
    toggleLeftSidenav () {
      this.$refs.leftSidenav.toggle()
    },
    open (ref) {
      console.log('Opened: ' + ref)
    },
    close (ref) {
      console.log('Closed: ' + ref)
    },
    initialize: function () {
      console.log('initialize')
      this.bindEvents()
    },
    bindEvents: function () {
      document.addEventListener('deviceready', this.onDeviceReady, false)
    },
    onDeviceReady: function () {
      this.logDeviceInfo()
//      this.receivedEvent('deviceready')
    },
//    receivedEvent: function (id) {
//      console.log('Received Event: ' + id)
//    },
    logDeviceInfo: function () {
      console.log(window.device)
    }
  }
}
</script>

<style>
a {
  color: inherit;
  text-decoration: none;
}

router-link {
  color: white;
}
</style>
