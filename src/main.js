// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// Vue Material
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
Vue.use(VueMaterial)

// Axios
import Axios from 'axios'
window.axios = Axios
Vue.prototype.$http = window.axios

// QueryString
import querystring from 'querystring'
window.querystring = querystring

// Vue Router
import routes from './routes'

const router = new VueRouter({
  mode: 'history',
  routes // short for routes: routes
})

import VueRouter from 'vue-router'
Vue.use(VueRouter)

/* eslint-disable no-new */

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router
})
