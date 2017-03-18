<template>
  <vue-pull-refresh :on-refresh="onRefresh" :config="configRefresher">
    <md-spinner :md-size="150" md-indeterminate  class="md-accent" v-show="connecting" ></md-spinner>
    <md-card md-with-hover v-show="!connecting">
      <md-card-header>
        <md-avatar>
          <img :src="avatar" alt="Franc Auxach Cortés">
        </md-avatar>

        <div class="md-title">{{ id }} {{ name }}</div>
        <div class="md-subhead">{{ email }}</div>
      </md-card-header>

      <md-card-content>
        <form novalidate @submit.stop.prevent="submit">
          <md-input-container>
            <label>Name</label>
            <md-input v-model="name" placeholder="Put your name here" ></md-input>
          </md-input-container>

          <md-input-container>
            <label>Email</label>
            <md-input v-model="email" placeholder="Put your email here"></md-input>
          </md-input-container>

          <md-input-container>
            <label>Created At</label>
            <md-input v-model="createdAt" placeholder="Date here"></md-input>
          </md-input-container>

          <md-input-container>
            <label>Updated At</label>
            <md-input v-model="updatedAt" placeholder="Date here"></md-input>
          </md-input-container>
        </form>
      </md-card-content>

      <md-card-actions>
        <md-button>Edit</md-button>
        <md-button>Delete</md-button>
      </md-card-actions>
      <md-snackbar md-position="bottom center" ref="connectionError" md-duration="4000">
        <span>Connection error. Please reconnect using connect button!.</span>
      </md-snackbar>
    </md-card>
  </vue-pull-refresh>
</template>
<style>
</style>
<script>
  import todosVue from '../todosVue'
  import gravatar from 'gravatar'
  import VuePullRefresh from 'vue-pull-refresh'
  export default {
    components: {
      'vue-pull-refresh': VuePullRefresh
    },
    data () {
      return {
        avatar: '',
        id: null,
        name: null,
        email: null,
        createdAt: null,
        updatedAt: null,
        connecting: true,
        configRefresher: {
          errorLabel: 'An error has occured!',
          startLabel: 'Swipe to refresh',
          readyLabel: 'Release to refresh',
          loadingLabel: 'Refreshing...'
        }
      }
    },
    computed: {
    },
    created () {
      this.fetchUserProfile()
    },
    methods: {
      fetchUserProfile: function () {
        this.$http.get(todosVue.API_PROFILE_URL).then((response) => {
          this.connecting = false
          this.id = response.data.id
          this.name = response.data.name
          this.email = response.data.email
          this.createdAt = response.data.created_at
          this.updatedAt = response.data.updated_at
          this.avatar = this.avatarUrl()
        }, (errors) => {
          this.connecting = false
          this.showConnectionError()
        })
      },
      showConnectionError () {
        this.$refs.connectionError.open()
      },
      avatarUrl: function () {
        return 'http:' + gravatar.url(this.email)
      },
      onRefresh: function () {
        this.connecting = true
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve()
          }, 1000)
        }).then(() => {
          this.fetchUserProfile()
        })
      }
    }
  }
</script>
