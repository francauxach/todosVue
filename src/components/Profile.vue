<template>
    <md-card md-with-hover>
        <md-card-header>
            <md-avatar>
                <img :src="avatar" :alt="name">
            </md-avatar>

            <div class="md-title">{{ name }}</div>
            <div class="md-subhead">{{ email }}</div>
        </md-card-header>

        <md-card-content>
            <md-spinner :md-size="150" md-indeterminate  class="md-accent" v-show="connecting" ></md-spinner>
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
        avatar: 'https://s.gravatar.com/avatar/' + '9ac3cccb8d8700f242bb89a5d31bc4040' + '?s=80', // Ficar aquí el hash de l'email
        id: null,
        name: null,
        email: null,
        createdAt: null,
        updatedAt: null,
        connecting: true
      }
    },
    computed: {
      avatarHash: function () {
        return '9ac3cccb8d8700f242bb89a5d31bc4040' // S'ha de fer un md5 del email
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
          this.id = response.data.id
          this.name = response.data.name
          this.email = response.data.email
          this.createdAt = response.data.created_at
          this.updatedAt = response.data.updated_at
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