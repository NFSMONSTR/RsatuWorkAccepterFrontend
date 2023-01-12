<template>
  <v-card 
    flat 
    class="d-flex">
    <v-card-text v-if="!loading">
      <v-layout 
        align-center 
        mb-3>
        <v-container
          fluid
          style="padding-left:0">
          <v-layout row>
            <strong class="title">{{ "Результат выполнения лабораторной работы: " + doneWork.work.name }} - {{ doneWork.work.subject }}</strong>
          </v-layout>
          <v-layout row>
            {{ doneWork.author.first_name + ' ' + doneWork.author.second_name }}
          </v-layout>
        </v-container>
      </v-layout>

      <b>Описание работы:</b>
      <vue-markdown :source="doneWork.text"/>

      <b v-if="doneWork.attachments.length>0">Прикрепленные файлы и ссылки:</b>
      <v-list v-if="doneWork.attachments.length>0">
        <v-list-tile 
          v-for="(attachment, i) in doneWork.attachments"
          :key="i">
          <v-list-tile-content>
            <v-btn :href="attachment.link">{{ attachment.name }}</v-btn>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>

import {CDN_URL} from '../../util/api'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'DoneWork',
  components: {
    VueMarkdown,
  },
  props: {
    id: {
      type: Number,
      default: -1
    }
  },
  data: function () {
    return {
      loading: true,
      doneWork: {
        id: 0,
        text: "",
        authorId: 0,
        author: undefined,
        attachments: [],
        work: {
          name: "",
          subject: "",
        }
      },
      CDN_URL,
      delete_dialog: false
    }
  },
  mounted () {
    this.loading = true;
    this.$store.dispatch('GET_DONE_WORK', this.id).then((result) => {
      this.doneWork = result.data
      if (!this.doneWork.work) {
        this.doneWork.work = {
          name: "",
          subject: "",
        }
      }
      this.$store.dispatch('GET_USER_INFO', this.doneWork.authorId).then((result) => {
        this.doneWork.author = result.data
        this.$store.dispatch('GET_ATTACHMENTS_BY_LIST', this.doneWork.attachments).then((result) => {
          this.doneWork.attachments = result
          this.loading = false;
        })
      })
    })
  },
  methods: {
  },
}
</script>

<style scoped>

</style>
