<template>
  <div>
    <!--<v-toolbar flat color="white">
      <v-toolbar-title>My CRUD</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>-->
    <PopupDialog :open="delete_dialog" @yes="del_user(current)" @end="delete_dialog = false">Удалить документ?</PopupDialog>
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
        <td>{{ props.item.third_name }}</td>
        <td>{{ props.item.group }}</td>
        <td>{{ props.item.year }}</td>
        <td>{{ props.item.permission_level }}</td>
        <td class="justify-center layout px-0">
          <!--<v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>-->
          <v-icon
            small
            class="mr-4"
            @click="delete_dialog = true; current = props.item"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-alert type="info">Здесь пока никого нет :(</v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>

import PopupDialog from '@/components/PopupDialog'

export default {
  name: 'UsersList',
  components: {PopupDialog},
  props: ['id'],
  data: function () {
    return {
      headers: [
        { text: 'id', value: 'id' },
        { text: 'username', value: 'username' },
        { text: 'first_name', value: 'first_name' },
        { text: 'second_name', value: 'second_name' },
        { text: 'third_name', value: 'third_name' },
        { text: 'group', value: 'group' },
        { text: 'year', value: 'year' },
        { text: 'permission_level', value: 'permission_level' },
        { text: 'actions', value: '' }
      ],
      users: [
        {
          id: 0,
          username: 'No connection',
          first_name: 'No connection',
          second_name: 'No connection',
          third_name: 'No connection',
          group: null,
          year: 0,
          permission_level: 0
        }
      ],
      delete_dialog: false,
      current: undefined
    }
  },
  mounted () {
    this.$store.dispatch('GET_USERS', this.id).then((result) => {
      this.users = result.data.users
    })
  },
  methods: {
    del_user: function (user) {
      this.$store.dispatch('DELETE_USER', user.id).then((result) => {
        // todo use result
        const index = this.users.indexOf(user)
        this.users.splice(index, 1)
      })
    }
  }
}
</script>

<style scoped>
</style>
