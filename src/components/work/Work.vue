<template>
  <v-card 
    flat 
    class="d-flex">
    <v-card-text>
      <v-layout 
        align-center 
        mb-3>
        <!--<v-avatar color="grey" class="mr-3" size="48"></v-avatar>-->
        <v-container 
          fluid 
          style="padding-left:0">
          <v-layout row>
            <strong class="title">{{ work.name }} - {{ work.subject }}</strong>
          </v-layout>
          <v-layout row>
            {{ work.author.first_name + ' ' + work.author.second_name }}
          </v-layout>
        </v-container>

        <v-btn 
          icon 
          @click="play_work">
          <v-icon color="green lighten-1">play_arrow</v-icon>
        </v-btn>

        <v-btn
          v-if="work.author.id === $store.getters.userId || $store.getters.user.permission_level >= 10"
          icon
          @click="edit_work">
          <v-icon color="green lighten-1">edit</v-icon>
        </v-btn>

        <v-dialog
          v-if="work.author.id === $store.getters.userId || $store.getters.user.permission_level >= 10"
          v-model="delete_dialog"
          width="500"
        >
          <template v-slot:activator="{ on }">
            <v-btn 
              icon 
              v-on="on">
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

            <v-divider/>

            <v-card-actions>
              <v-spacer/>
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

      <p v-if="work.markup===0"><vue-markdown :source="work.description"/></p>
      <p v-else><vue-mathjax :formula="work.description"/></p>

      <b v-if="work.attachments.length>0">Прикрепленные файлы и ссылки:</b>
      <v-list v-if="work.attachments.length>0">
        <v-list-tile 
          v-for="(attachment, i) in work.attachments" 
          :key="i">
          <v-list-tile-content>
            <v-btn :href="attachment.link">{{ attachment.name }}</v-btn>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <br v-if="fullGroups && fullGroups.length>0">
      <b v-if="fullGroups && fullGroups.length>0">Доступно группам:</b>
      <div v-if="fullGroups && fullGroups.length>0">
        <v-chip
          v-for="(group, i) in fullGroups"
          :key="i">{{ group.name }}</v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>

import {CDN_URL} from '../../util/api'
import VueMarkdown from 'vue-markdown'
import VueMathjax from '../util/VueMathjax.vue'

export default {
  name: 'Work',
  components: {
    VueMarkdown,
    VueMathjax
  },
  props: {id: {type: Number, default: 0}},
  data: function () {
    return {
      work: {
        id: 0,
        name: 'No connection',
        short_description: 'No connection',
        description: 'No connection',
        subject: 'No connection',
        author: 0,
        markup: 0,
        attachments: [],
        done_works: [],
        groups: [],
      },
      CDN_URL,
      delete_dialog: false,
      fullGroups: []
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
      this.load_groups()
    })
  },
  methods: {
    delete_work: function () {
      this.$store.dispatch('DELETE_WORK', this.work.id).then(() => {
        this.$router.push({name: 'works_list'})
      })
    },
    play_work: function () {
      this.$router.push({name: 'do_work', params: {workId: this.work.id}})
    },
    edit_work: function () {
      this.$router.push({name: 'work_edit', params: {workId: this.work.id}})
    },
    load_groups: function () {
      this.fullGroups = []
      for (let groupId of this.work.groups) {
        this.$store.dispatch('GET_GROUP', groupId).then((result) => {
          if (result.status === 200) {
            this.fullGroups.push(result.data)
          }
        })
      }
    },
  },
}
</script>

<style scoped>

</style>
