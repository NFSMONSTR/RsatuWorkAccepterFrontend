<template>
  <div>
    <PopupDialog
      :open="delete_dialog"
      @yes="del_group(current)"
      @end="delete_dialog = false">Удалить группу?</PopupDialog>
    <v-form>
      <v-container>
        <v-layout>
          <v-flex>
            <v-text-field
              v-model="new_group_form.name"
              label="Название группы"
              required
            />
          </v-flex>
          <v-btn
            class="mt-3"
            color="primary"
            @click="add_group"
          >
            Добавить
          </v-btn>
        </v-layout>
      </v-container>
    </v-form>
    <v-alert
      v-model="alert"
      :type="alert_type"
      dismissible
    >
      {{ alert_text }}
    </v-alert>
    <v-form>
      <v-container>
        <v-layout>
          <v-flex>
            <v-text-field
              v-model="groupName"
              label="Название группы"
              required
            />
          </v-flex>
          <v-btn
            class="mt-3"
            color="success"
            @click="load_named_groups"
          >
            {{ " Найти " }}
          </v-btn>
        </v-layout>
      </v-container>
    </v-form>
    <v-data-table
      :headers="headers"
      :items="groups"
      :loading="loading"
      :hide-actions="true"
      no-data-text="Групп нет"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.works }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-4"
            @click="delete_dialog = true; current = props.item"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>

import PopupDialog from '../dialogs/PopupDialog.vue'

export default {
  name: 'GroupsList',
  components: {PopupDialog},
  data: function () {
    return {
      headers: [
        { text: 'id', value: 'id' },
        { text: 'Название', value: 'name' },
        { text: 'Доступные работы', value: 'works' },
        { text: 'Действия', value: ''}
      ],
      groups: [],
      loading: true,
      delete_dialog: false,
      current: undefined,
      alert: false,
      alert_text: '',
      alert_type: 'success',
      new_group_form: {
        name: '',
      },
      groupName: ''
    }
  },

  mounted () {
    this.load_groups();
  },
  methods: {
    del_group: function (group) {
      this.$store.dispatch('DELETE_GROUP', group.id).then(() => {
        this.load_groups()
      })
    },
    add_group: function () {
      if (this.new_group_form.name.length>0) {
        this.$store.dispatch('ADD_GROUP', {name: this.new_group_form.name}).then((result) => {
          if ([200, 201].includes(result.status)) {
            this.new_group_form.name = ''
            this.load_groups()
          } else {
            this.alert = true
            this.alert_type = 'error'
            this.alert_text = 'При добавлении группы произошла ошибка'
          }
        })
      }
    },
    load_groups: function () {
      this.loading = true;
      this.$store.dispatch('GET_GROUPS').then((result) => {
        this.groups = result.data
        this.loading = false;
      })
    },
    load_named_groups: function () {
      this.loading = true;
      this.$store.dispatch('GET_GROUPS', {name: this.groupName}).then((result) => {
        this.groups = result.data
        this.loading = false;
      })
    }
  },
}
</script>

<style scoped>
</style>
