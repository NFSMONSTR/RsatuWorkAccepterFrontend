<template>
  <div>
    <template v-if="loading">
      <div class="text-xs-center pt-2">
        <v-progress-circular :indeterminate="loading"/>
      </div>
    </template>
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
          <v-btn
            v-if="$store.getters.user.permission_level >= 5 && !doneWork.commentId"
            icon
            @click="accept_work">
            <v-icon color="green lighten-1">rate_review</v-icon>
          </v-btn>
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
    <v-card
      flat
      class="d-flex">
      <v-card-text v-if="comment">
        <v-layout
          align-center
          mb-3>
          <v-container
            fluid
            style="padding-left:0">
            <v-layout row>
              <strong class="title mt-2">{{ "Результат проверки: " }}</strong>
              <v-chip
                :color="comment.markColor"
                text-color="white">{{ comment.mark }}</v-chip>
            </v-layout>
            <v-layout 
              row 
              class="mt-2"/>
            <vue-markdown :source="comment.text"/>
          </v-container>
        </v-layout>

        <b v-if="comment.attachments.length>0">Прикрепленные файлы и ссылки:</b>
        <v-list v-if="comment.attachments.length>0">
          <v-list-tile
            v-for="(attachment, i) in comment.attachments"
            :key="i">
            <v-list-tile-content>
              <v-btn :href="attachment.link">{{ attachment.name }}</v-btn>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
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
      commentLoading: true,
      doneWork: {
        id: 0,
        text: "",
        authorId: 0,
        author: undefined,
        attachments: [],
        work: {
          name: "",
          subject: "",
        },
        commentId: null,
      },
      comment: null,
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
        this.loading = false;
        this.$store.dispatch('GET_ATTACHMENTS_BY_LIST', this.doneWork.attachments).then((result) => {
          this.doneWork.attachments = result
        })
        if (this.doneWork.commentId) {
          this.$store.dispatch('GET_COMMENT_WORK', this.doneWork.commentId).then((result) => {
            if (result.status === 200) {
              let comment = result.data
              comment.markColor = 'gray'
              switch (comment.mark) {
                case 'EXCELLENT':
                  comment.mark = 'Отлично'
                  comment.markColor = '#0d8f32'
                  break;
                case 'GOOD':
                  comment.mark = 'Хорошо'
                  comment.markColor = '#0d8f32'
                  break;
                case 'FAIR':
                  comment.mark = 'Удовлетворительно'
                  comment.markColor = '#c4d417'
                  break;
                case 'BAD':
                  comment.mark = 'Не удовлетворительно'
                  comment.markColor = '#b32414'
                  break;
              }
              this.comment = comment
              this.$store.dispatch('GET_ATTACHMENTS_BY_LIST', comment.attachments).then((result) => {
                this.comment.attachments = result
              })
            }
          })
        }
      })
    })
  },
  methods: {
    accept_work: function () {
      this.$router.push({ name: 'comment_work', params: { id: this.$props.id }})
    },
  },
}
</script>

<style scoped>

</style>
