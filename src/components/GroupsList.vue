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
              label="Название группы"
              required
            />
          </v-flex>
          <v-btn
            class="mt-3"
            color="primary"
          >
            Добавить
          </v-btn>
        </v-layout>
      </v-container>
    </v-form>
    <v-form>
      <v-container>
        <v-layout>
          <v-flex>
            <v-text-field
              label="Название группы"
              required
            />
          </v-flex>
          <v-btn
            class="mt-3"
            color="success"
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
      <template v-slot:no-data>
        <v-alert type="info">Групп нет</v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>

import PopupDialog from '@/components/PopupDialog'

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
      groups: [
      ],
      loading: true,
      delete_dialog: false,
      current: undefined
    }
  },

  mounted () {
    this.load_groups();
  },
  methods: {
    del_group: (group) => {
      this.$store.dispatch('DELETE_GROUP', group.id).then((result) => {
        // todo use result
        const index = this.groups.indexOf(group)
        this.groups.splice(index, 1)
      })
    },
    load_groups: function () {
      this.loading = true;
      this.$store.dispatch('GET_GROUPS').then((result) => {
        this.groups = result.data
        this.loading = false;
      })
    }
  },
}
</script>

<style scoped>
</style>
