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
    <PopupDialog
      :open="delete_dialog"
      @yes="del_user(current)"
      @end="delete_dialog = false">Удалить пользователя?</PopupDialog>
    <v-data-table
      :headers="headers"
      :items="users"
      :loading="loading"
      :hide-actions="true"
      :items-per-page="10"
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.username }}</td>
        <td>{{ props.item.first_name }}</td>
        <td>{{ props.item.second_name }}</td>
        <td>{{ props.item.third_name }}</td>
        <td>{{ props.item.group ? props.item.group.name : '-' }}</td>
        <td>{{ props.item.year }}</td>
        <td>{{ props.item.role }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="group_select_dialog = true; current = props.item"
          >
            group_add
          </v-icon>
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
    <div class="text-xs-center pt-2">
      <v-pagination
        v-model="page"
        :length="count"
        :value="page"
        @input="load_users"/>
    </div>
    <group-select-dialog
      :open="group_select_dialog"
      @result="add_to_group"
      @end="group_select_dialog = false"/>
  </div>
</template>

<script>

import PopupDialog from '../dialogs/PopupDialog.vue'
import GroupSelectDialog from "../dialogs/GroupSelectDialog.vue";

export default {
  name: 'UsersList',
  components: {GroupSelectDialog, PopupDialog},
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
        { text: 'role', value: 'role' },
        { text: 'actions', value: '' }
      ],
      users: [
      ],
      loading: true,
      pagination: {
        page: 1,
        rowsPerPage: 10,
      },
      size: 10,
      page: 1,
      count: -1,
      delete_dialog: false,
      current: undefined,
      group_select_dialog: false,
    }
  },

  mounted () {
    this.load_users(1);
  },
  methods: {
    del_user: function (user) {
      this.$store.dispatch('DELETE_USER', user.id).then(() => {
        // const index = this.users.indexOf(user)
        // this.users.splice(index, 1)
        this.load_users(this.page)
      })
    },
    add_to_group: function (group) {
      this.$store.dispatch('ADD_USER_TO_GROUP', {userId: this.current.id, groupId: group.id}).then(() => {
        this.load_users(this.page)
      })
    },
    load_users: function (page) {
      this.loading = true;
      this.$store.dispatch('GET_USERS', {page: page, size: this.pagination.rowsPerPage}).then((result) => {
        this.users = result.data.data
        //this.pagination = {page: result.data.page, rowsPerPage: result.data.size, count: result.data.count}
        this.count = result.data.count;
        this.loading = false;
      })
    }
  },
}
</script>

<style scoped>
</style>
