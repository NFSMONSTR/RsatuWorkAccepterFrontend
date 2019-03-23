<template>
  <v-data-table
    :headers="headers"
    :items="users"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>{{ props.item.id }}</td>
      <td>{{ props.item.username }}</td>
      <td>{{ props.item.first_name }}</td>
      <td>{{ props.item.second_name }}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'UsersList',
  props: ['id'],
  data: function () {
    return {
      headers: [
        { text: 'id', value: 'id' },
        { text: 'username', value: 'username' },
        { text: 'first_name', value: 'first_name' },
        { text: 'second_name', value: 'second_name' }
      ],
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
