<template>
    <div>
        <div v-show="!authorized">
            <md-button class="md-raised md-primary" @click="connect()">Connect</md-button>
        </div>
        <ul v-show="authorized">
            <li v-for="(todo, index) in todos">
                {{ todo.name }}
            </li>
        </ul>
    </div>
</template>
<style>

</style>
<script>
    var STORAGE_KEY = 'todosvue_token'

    export default{
      data () {
        return {
          todos: [],
          authorized: false
        }
      },
      created () {
        if (this.fetchToken()) {
          this.authorized = true
        } else {
          this.authorized = false
        }
        this.fetchData()
      },
      methods: {
        fetchData: function () {
          return this.fetchPage(1)
        },
        fetchPage: function (page) {
          this.$http.get('http://todos.dev:8000/api/v1/task?page=' + page).then((response) => {
            console.log(response.data)
            this.todos = response.data.data
          }, (response) => {
            window.sweetAlert('Oops...', 'Something went wrong!', 'error')
          })
        },
        connect: function () {
          console.log('Do connect here!')
        },
        fetchToken: function () {
          return window.localStorage.getItem(STORAGE_KEY)
        },
        saveToken: function (todos) {
          window.localStorage.setItem(STORAGE_KEY, this.token)
        }
      }
    }
</script>
