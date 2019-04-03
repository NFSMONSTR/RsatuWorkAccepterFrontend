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
      </v-layout>

      <b>Описание работы:</b>
      <p>
        {{ work.description }}
      </p>

      <b v-if="work.attachments.length>0">Прикрепленные файлы и ссылки:</b>
      <v-list v-if="work.attachments.length>0">
        <v-list-tile v-for="attachment in work.attachments" :key="attachment.id">
          <v-list-tile-content>
            <v-btn v-if="attachment.is_link" :href="attachment.link">{{ attachment.name }}</v-btn>
            <v-btn v-else :href="attachment.link">{{ attachment.name }}</v-btn>
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
      CDN_URL
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
