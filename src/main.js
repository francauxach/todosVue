// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// Vue Material
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
Vue.use(VueMaterial)

// Importar components
import Todos from 'components/Todos.vue'
import Tokens from 'components/Tokens.vue'

const routes = [
  { path: '/todos', component: Todos },
  { path: '/tokens', component: Tokens }
]

const router = new VueRouter({
  routes // short for routes: routes
})

// Vue Router
import VueRouter from 'vue-router'
Vue.use(VueRouter)

/* eslint-disable no-new */

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router
})
