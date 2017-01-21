<template>
    <div>
        <div v-show="!authorized">
            <md-button class="md-raised md-primary" @click="connect()">Connect</md-button>
        </div>
        <div v-show="authorized">
            <md-button class="md-raised md-primary" @click="logout()">Logout</md-button>
        </div>

        <md-table-card>
            <md-toolbar>
                <h1 class="md-title">Tasques</h1>
            </md-toolbar>
            <md-table md-sort="id" v-show="authorized">
                <md-table-header>
                    <md-table-row>
                        <md-table-head md-sort-by="id" md-numeric>#</md-table-head>
                        <md-table-head md-sort-by="task" md-tooltip="The name of the task.">Task</md-table-head>
                        <md-table-head md-sort-by="priority" md-numeric>Priority</md-table-head>
                        <md-table-head>Done</md-table-head>
                        <md-table-head>Actions</md-table-head>
                    </md-table-row>
                </md-table-header>

                <md-table-body>
                    <md-table-row v-for="(todo, index) in todos" :key="index">
                        <md-table-cell md-numeric>{{ todo.id }}</md-table-cell>
                        <md-table-cell>{{ todo.name }}</md-table-cell>
                        <md-table-cell md-numeric>{{ todo.priority }}</md-table-cell>
                        <md-table-cell>{{ todo.done }}</md-table-cell>
                        <md-table-cell></md-table-cell>
                    </md-table-row>
                </md-table-body>
            </md-table>
        </md-table-card>
    </div>
</template>
<style>

</style>
<script>
    var STORAGE_KEY = 'todosvue_token'
    var AUTH_CLIENT_ID = '2'
    var AUTH_REDIRECT_URI = 'http://localhost:8088/todos'

    export default{
      data () {
        return {
          todos: [],
          authorized: false,
          token: null
        }
      },
      created () {
        var token = this.extractToken(document.location.hash)
        if (token) {
          this.saveToken(token)
        }
        if (this.token == null) {
          this.token = this.fetchToken()
        }
        if (this.token) {
          this.authorized = true
          this.fetchData()
        } else {
          this.authorized = false
        }
      },
      methods: {
        fetchData: function () {
          return this.fetchPage(1)
        },
        fetchPage: function (page) {
          console.log(this.token)
          this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token
          this.$http.get('http://todos.dev:8000/api/v1/task?page=' + page).then((response) => {
            // console.log(response.data)
            this.todos = response.data.data
          }, (response) => {
            window.sweetAlert('Oops...', 'Something went wrong!', 'error')
            // TODO only if HTTP response code is 401
            // this.authorized = false
          })
        },
        connect: function () {
          query = {
            client_id: AUTH_CLIENT_ID,
            redirect_uri: AUTH_REDIRECT_URI,
            response_type: 'token',
            scope: ''
          }
          var query = window.querystring.stringify(query)
          window.location.replace('http://todos.dev:8000/oauth/authorize?' + query)
        },
        fetchToken: function () {
          return window.localStorage.getItem(STORAGE_KEY)
        },
        saveToken: function (token) {
          window.localStorage.setItem(STORAGE_KEY, token)
        },
        extractToken: function (hash) {
          var match = hash.match(/access_token=(\w+)/)
          return !!match && match[1]
        },
        logout: function () {
          window.localStorage.removeItem(STORAGE_KEY)
          this.authorized = false
        }
      }
    }
</script>
