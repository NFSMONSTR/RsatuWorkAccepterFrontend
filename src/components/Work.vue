<template>
  <v-card flat>
    <v-card-text>
      <v-layout align-center mb-3>
        <v-avatar color="grey" class="mr-3" size="48"></v-avatar>
        <v-container fluid>
          <v-layout row>
              <strong class="title">{{ work.name }} - {{ work.subject }}</strong>
          </v-layout>
          <v-layout row>
              {{ work.author.first_name + ' ' + work.author.second_name }}
          </v-layout>
        </v-container>

        <v-btn icon v-if="work.author.id === $store.getters.userId">
          <v-icon color="green lighten-1">edit</v-icon>
        </v-btn>

        <v-dialog
          v-model="delete_dialog"
          width="500"
          v-if="work.author.id === $store.getters.userId"
        >
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon color="red lighten-1">delete_forever</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title
              class="headline lighten-1"
            >
              Удаление работы
            </v-card-title>

            <v-card-text>
              Данное действие нельзя отменить. Удалить работу?
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="delete_dialog = false"
              >
                Нет
              </v-btn>
              <v-btn
                color="error"
                flat
                @click="delete_dialog = false; delete_work()"
              >
                Да
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <b>Описание работы:</b>
      <p>
        {{ work.description }}
      </p>

      <b v-if="work.attachments.length>0">Прикрепленные файлы и ссылки:</b>
      <v-list v-if="work.attachments.length>0">
        <v-list-tile v-for="(attachment, i) in work.attachments" :key="i">
          <v-list-tile-content>
            <v-btn :href="attachment.link">{{ attachment.name }}</v-btn>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>

import {CDN_URL} from '@/util/api'

export default {
  name: 'Work',
  props: ['id'],
  methods: {
    delete_work: function () {
      this.$store.dispatch('DELETE_WORK', this.work.id).then((result) => {
        this.$router.push({ name: 'works_list' })
      })
    }
  },
  data: function () {
    return {
      work: {
        id: 0,
        name: 'No connection',
        short_description: 'No connection',
        description: 'No connection',
        subject: 'No connection',
        author: 0,
        attachments: [],
        done_works: []
      },
      CDN_URL,
      delete_dialog: false
    }
  },
  mounted () {
    this.$store.dispatch('GET_WORK', this.id).then((result) => {
      this.work = result.data
      this.$store.dispatch('GET_USER_INFO', this.work.author).then((result) => {
        this.work.author = result.data
      })
      this.$store.dispatch('GET_ATTACHMENTS_BY_LIST', this.work.attachments).then((result) => {
        this.work.attachments = result
      })
    })
  }
}
</script>

<style scoped>

</style>
