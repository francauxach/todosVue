<template>
    <div>
        <div>Msg: {{ msg }}</div>
    </div>
</template>
<style>

</style>
<script>
    export default{
      data () {
        return {
          msg: 'Todos aquí!'
        }
      },
      created () {
        console.log('Todos component!!')
        this.fetchData()
      },
      methods: {
        fetchData: function () {
          return this.fetchPage(1)
        },
        fetchPage: function (page) {
          this.$http.get('http://todos.dev:8000/api/v1/task?page=' + page).then((response) => {
            console.log(response)
          }, (response) => {
            console.log(response)
          })
        }
      }
    }
</script>
