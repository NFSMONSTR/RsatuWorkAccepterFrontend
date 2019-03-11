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
        <tr>
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
  name: 'Profile',
  props: ['id'],
  data: function () {
    return {
      user: {
        id: 0,
        username: 'No connection',
        first_name: 'No connection',
        second_name: 'No connection'
      }
    }
  },
  mounted () {
    this.$store.dispatch('GET_USER_INFO', this.id).then((result) => {
      this.user = result.data
    })
  }
}
</script>

<style scoped>

</style>
