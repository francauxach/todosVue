<template>
    <md-card md-with-hover>
        <md-card-header>
            <md-avatar>
                <img :src="avatar" :alt="name">
            </md-avatar>

            <div class="md-title">{{ name }}</div>
            <div class="md-subhead">Profile</div>
        </md-card-header>

        <md-card-content>
            <md-spinner :md-size="150" md-indeterminate  class="md-accent" v-show="connecting" ></md-spinner>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.
        </md-card-content>

        <md-card-actions>
            <md-button>Edit</md-button>
            <md-button>Delete</md-button>
        </md-card-actions>
    </md-card>
</template>
<style>
</style>
<script>
  var API_PROFILE_URL = 'http://todos.dev:8000/api/v1/user'
  var STORAGE_KEY = 'todosvue_token'
  export default {
    data () {
      return {
        avatar: 'https://s.gravatar.com/avatar/9ac3cccb8d8700f242bb89a5d31bc404?s=80',
        name: 'Franc Auxach Cortés',
        connecting: true
      }
    },
    created () {
      console.log('Component profile created!')
      this.fetchUserProfile()
    },
    methods: {
      fetchUserProfile: function () {
        this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem(STORAGE_KEY)
        this.$http.get(API_PROFILE_URL).then((response) => {
          this.connecting = false
          console.log(response.data)
        }, (response) => {
          this.showConnectionError()
        })
      },
      showConnectionError () {
        this.$refs.connectionError.open()
      }
    }
  }
</script>
