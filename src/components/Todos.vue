<template>
    <div>
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
                        <md-table-cell md-numeric>{{ index+1 }}</md-table-cell>
                        <md-table-cell>{{ todo.name }}</md-table-cell>
                        <md-table-cell md-numeric>{{ todo.priority }}</md-table-cell>
                        <md-table-cell>
                            <md-switch v-model="todo.done" id="done" name="done" class="md-primary"></md-switch>
                        </md-table-cell>
                        <md-table-cell>
                            <md-button class="md-raised md-primary">
                                <md-icon>edit</md-icon>
                            </md-button>
                            <md-button class="md-raised md-accent">
                                <md-icon>delete</md-icon>
                            </md-button>
                        </md-table-cell>
                    </md-table-row>
                </md-table-body>
            </md-table>
            <md-table-pagination
                    :md-size=perPage
                    :md-total=total
                    :md-page=page
                    md-label="Rows"
                    md-separator="of"
                    :md-page-options="[5, 15, 25, 50]"
                    @pagination="fetchPage(page)">
            </md-table-pagination>
        </md-table-card>
    </div>
</template>
<style>

</style>
<script>
    var API_URL = 'http://todos.dev:8000/api/v1/task'
    export default{
      data () {
        return {
          todos: [],
          token: null,
          from: 0,
          to: 0,
          total: 0,
          perPage: 0,
          page: 0
        }
      },
      created () {
        var that = this
        setTimeout(function () {
          that.fetchData()
        }, 500)
      },
      methods: {
        fetchData: function () {
          return this.fetchPage(1)
        },
        fetchPage: function (page) {
          this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token
          this.$http.get(API_URL + '?page=' + page).then((response) => {
            // console.log(response.data)
            this.todos = response.data.data
            this.from = response.data.from
            this.to = response.data.to
            this.total = response.data.total
            this.perPage = response.data.per_page
            this.page = response.data.current_page
          }, (response) => {
            // TODO only if HTTP response code is 401
            // this.authorized = false
          })
        },
        checkChanged: function (isChecked) {
          console.log(isChecked)
        }
      }
    }
</script>
