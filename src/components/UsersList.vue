<template>
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">username</th>
          <th scope="col">first_name</th>
          <th scope="col">second_name</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.username }}</td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.second_name }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersList',
  props: ['id'],
  data: function () {
    return {
      users: [
        {
          id: 0,
          username: 'No connection',
          first_name: 'No connection',
          second_name: 'No connection'
        }
      ]
    }
  },
  mounted () {
    this.$store.dispatch('GET_USERS', this.id).then((result) => {
      this.users = result.data.users
    })
  }
}
</script>

<style scoped>

</style>
