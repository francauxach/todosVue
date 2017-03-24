<template>
  <div class="phone-viewport">

    <md-toolbar>
      <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title">Todos</h2>
    </md-toolbar>

    <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')" md-swipeable>
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <h3 class="md-title">Todos</h3>
        </div>
      </md-toolbar>

      <md-list>
        <md-list-item @click.native="toggleLeftSidenav">
          <md-icon>view_list</md-icon>
          <router-link exact to="/todos" class="md-button" :class="`md-theme-${$material.currentTheme}`" style="color: white; text-align:left">Todos</router-link>
        </md-list-item>

        <md-list-item @click.native="toggleLeftSidenav">
          <md-icon>verified_user</md-icon>
          <router-link exact to="/tokens" class="md-button" :class="`md-theme-${$material.currentTheme}`" style="color: white; text-align:left">Tokens</router-link>
        </md-list-item>

        <md-list-item @click.native="toggleLeftSidenav">
          <md-icon>face</md-icon>
          <router-link exact to="/profile" class="md-button" :class="`md-theme-${$material.currentTheme}`" style="color: white; text-align:left">Profile</router-link>
        </md-list-item>

        <md-list-item @click.native="toggleLeftSidenav">
          <md-icon>info_outline</md-icon>
          <router-link exact to="/device" class="md-button" :class="`md-theme-${$material.currentTheme}`" style="color: white; text-align:left">Device Info</router-link>
        </md-list-item>

        <md-list-item @click.native="toggleLeftSidenav">
          <md-icon>build</md-icon>
          <router-link exact to="/cordova" class="md-button" :class="`md-theme-${$material.currentTheme}`" style="color: white; text-align:left">Cordova</router-link>
        </md-list-item>

        <md-list-item @click.native="toggleLeftSidenav">
          <md-icon>exit_to_app</md-icon>
          <router-link exact to="/login" class="md-button" :class="`md-theme-${$material.currentTheme}`" style="color: white; text-align:left">Login/Logout</router-link>
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
import notifications from './services/notifications'

export default {
  name: 'app',
  data () {
    return {
      device: window.cord
    }
  },
  created () {
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
      document.addEventListener('deviceready', this.onDeviceReady, false)
    },
    onDeviceReady () {
      console.log('Working on platform: ' + window.device.platform)
      notifications.enable()
    }
  }
}
</script>

<style>
a {
  color: inherit;
  text-decoration: none;
}
</style>
