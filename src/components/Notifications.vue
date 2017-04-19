<template>
  <div id="notifications">
    <h1>Received notifications: </h1>
    <md-card v-for="(notification, index) in notifications">
      <md-card-header>
        <div class="md-title">{{notification.user.name}}</div>
      </md-card-header>
      <md-card-content>{{notification.message}}</md-card-content>
    </md-card>
  </div>
</template>
<style>
</style>
<script>
  import todosVue from '../todosVue'
  import notificationsService from '../services/notifications'
  export default{
    props: {
      notifications: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        notifications: []
      }
    },
    created () {
      notificationsService.enable()
      this.fetchNotifications()
      console.log(this.$route.params)
      if (this.$route.params) {
        this.notifications = this.$route.params
      }
    },
    methods: {
      fetchNotifications: function () {
        this.$http.get(todosVue.GET_MESSAGES_URL).then((response) => {
          console.log(response)
          this.notifications = response.data
        }, (errors) => {
          console.log(errors)
        })
      }
    }
  }
</script>
