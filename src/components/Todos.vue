<template>
    <vue-pull-refresh :on-refresh="onRefresh" :config="configRefresher">
      <md-spinner :md-size="150" md-indeterminate  class="md-accent" v-show="connecting" ></md-spinner>
      <md-table-card v-show="!connecting">
          <md-toolbar>
              <h1 class="md-title">Tasques</h1>
              <md-button class="md-icon-button">
                  <md-icon>filter_list</md-icon>
              </md-button>

              <md-button class="md-icon-button">
                  <md-icon>search</md-icon>
              </md-button>
          </md-toolbar>
          <md-table md-sort="id" md-sort-type="desc">
            <md-table-header>
                <md-table-row>
                    <md-table-head md-sort-by="id" md-numeric md-tooltip="The id of the task.">#</md-table-head>
                    <md-table-head md-sort-by="name" md-tooltip="The name of the task.">Name</md-table-head>
                    <md-table-head md-sort-by="priority" md-numeric md-tooltip="The priority for task">Priority</md-table-head>
                    <md-table-head md-tooltip="Task is done?">Done</md-table-head>
                    <md-table-head>Actions</md-table-head>
                </md-table-row>
            </md-table-header>

            <md-table-body>
                <md-table-row v-for="(todo, index) in todos" :key="index">
                    <md-table-cell md-numeric>{{ index +1 }}</md-table-cell>
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

      <md-snackbar md-position="bottom center" ref="connectionError" md-duration="4000">
          <span>Connection error. Please reconnect using connect button!.</span>
      </md-snackbar>

    </vue-pull-refresh>
</template>
<style>

</style>
<script>
    import todosVue from '../todosVue'
    import VuePullRefresh from 'vue-pull-refresh'
    export default{
      components: {
        'vue-pull-refresh': VuePullRefresh
      },
      data () {
        return {
          todos: [],
          connecting: true,
          from: 0,
          to: 0,
          total: 0,
          perPage: 0,
          page: 0,
          configRefresher: {
            errorLabel: 'An error has occured!',
            startLabel: 'Swipe to refresh',
            readyLabel: 'Release to refresh',
            loadingLabel: 'Refreshing...'
          }
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
          this.$http.get(todosVue.API_TASK_URL + '?page=' + page).then((response) => {
            this.connecting = false
            this.todos = response.data.data
            this.from = response.data.from
            this.to = response.data.to
            this.total = response.data.total
            this.perPage = response.data.per_page
            this.page = response.data.current_page
          }, (errors) => {
            this.connecting = false
            this.showConnectionError()
          })
        },
        showConnectionError () {
          this.$refs.connectionError.open()
        },
        onPagination: function () {
          console.log('pagination todo!')
        },
        onRefresh: function () {
          this.connecting = true
          return new Promise(function (resolve, reject) {
            setTimeout(function () {
              resolve()
            }, 1000)
          }).then(() => {
            this.fetchData()
          })
        }
      }
    }
</script>
