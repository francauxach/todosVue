<template>
  <vue-pull-refresh :on-refresh="onRefresh" :config="configRefresher">
    <md-spinner :md-size="150" md-indeterminate  class="md-accent" v-show="connecting" ></md-spinner>
    <md-card md-with-hover v-show="!connecting">
      <md-card-header>
        <md-avatar @click.native="changePicture">
          <img :src="avatar" alt="Franc Auxach Cortés">
        </md-avatar>

        <div class="md-title">{{ id }} {{ name }}</div>
        <div class="md-subhead">{{ email }}</div>
        <span>(Click avatar to change it)</span>
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
            <label>Contact number</label>
            <md-input v-model="contact" placeholder="Put your contact number here"></md-input>
            <md-button class="md-icon-button md-dense" @click.native="initAddContact">
              <md-icon>add</md-icon>
            </md-button>
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
      <md-snackbar md-position="bottom center" ref="contactsAPIError" md-duration="4000">
        <span>Contacts API not supported!</span>
      </md-snackbar>
      <md-snackbar md-position="bottom center" ref="cameraAPIError" md-duration="4000">
        <span>Camera API not supported!</span>
      </md-snackbar>
      <md-dialog-alert
        md-content="Contact number can't be null and must have at least 9 numbers."
        md-ok-text="OK"
        ref="alertNullContactNumber">
      </md-dialog-alert>
      <md-dialog-confirm
        md-title="Add contact number"
        md-content="Are you sure you want to add this contact number to your contact list?"
        md-ok-text="Yes"
        md-cancel-text="No"
        @close="onCloseSureToAddContactNumber"
        ref="confirmAddContactNumber">
      </md-dialog-confirm>
      <md-snackbar md-position="bottom center" ref="alertSuccessAddContact" md-duration="4000">
        <span>Your contact number {{ contact }} was added correctly for {{ name.split(' ' )[0] }} {{ name.split(' ' )[1] }}</span>
      </md-snackbar>
      <md-snackbar md-position="bottom center" ref="alertSuccessChangePicture" md-duration="4000">
        <span>Your avatar was changed successfully!</span>
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
        contact: null,
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
          this.contact = response.data.contact_number
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
      },
      initAddContact: function () {
        if (this.email == null || this.email.length < 9) {
          this.openDialog('alertNullContactNumber')
        } else {
          this.openDialog('confirmAddContactNumber')
        }
      },
      openDialog: function (ref) {
        this.$refs[ref].open()
      },
      onCloseSureToAddContactNumber: function (type) {
        if (type === 'ok') this.addContact()
      },
      addContact: function () {
        if (!navigator.contacts) {
          this.showContactsAPIError()
          return
        }
        var contact = navigator.contacts.create()
        var splittedName = this.name.split(' ')
        contact.name = {givenName: splittedName[0], familyName: splittedName[1]}
        var phoneNumbers = []
        phoneNumbers[0] = new window.ContactField('mobile', this.contact, true)
        contact.phoneNumbers = phoneNumbers
        contact.save()
        this.openDialog('alertSuccessAddContact')
        return false
      },
      showContactsAPIError: function () {
        this.$refs.contactsAPIError.open()
      },
      changePicture: function () {
        if (!navigator.camera) {
          this.showCameraAPIError()
          return
        }
        var options = {
          quality: 50,
          destinationType: window.Camera.DestinationType.DATA_URL,
          sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Album
          encodingType: 0     // 0=JPG 1=PNG
        }

        var profile = this
        navigator.camera.getPicture(
          function (imgData) {
            profile.avatar = 'data:image/jpeg;base64,' + imgData
            profile.openDialog('alertSuccessChangePicture')
          },
          function () {
            console.log('Error taking picture', 'Error')
          }, options)

        return false
      },
      showCameraAPIError: function () {
        this.$refs.cameraAPIError.open()
      }
    }
  }
</script>
