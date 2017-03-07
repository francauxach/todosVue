// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import VueRouter from 'vue-router'
import Axios from 'axios'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons/iconfont/material-icons.css'
import querystring from 'querystring'

import auth from './services/auth'
import router from './services/router'

// QueryString
window.querystring = querystring

// Axios
window.axios = Axios
Vue.prototype.$http = window.axios

window.axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest'
}

if (auth.loggedIn()) {
  window.axios.defaults.headers.common = {
    'Authorization': auth.getAuthHeader()
  }
}

Vue.use(VueMaterial)
Vue.use(VueRouter)

// Vue Material Themes
Vue.material.registerTheme('custom', {
  primary: {
    color: 'teal',
    hue: '500'
  },
  accent: {
    color: 'blue-grey',
    hue: '800'
  },
  warn: {
    color: 'orange',
    hue: 'A700'
  },
  background: {
    color: 'orange',
    hue: '100'
  }
})

// Apply theme
Vue.material.setCurrentTheme('custom')

/* eslint-disable no-new */

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router
})
