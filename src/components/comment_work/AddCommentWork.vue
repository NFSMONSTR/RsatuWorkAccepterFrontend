<template>
  <v-card flat>
    <v-card-title 
      primary-title 
      class="title">Принять лабораторную работу</v-card-title>
    <v-card-text>
      <form>
        <v-flex d-flex>
          <v-select
            :items="['Отлично', 'Хорошо', 'Удовлетворительно', 'Не удовлетворительно']"
            :value="mark"
            label="Оценка"
            class="ma-1"
            @input="change_mark"
          />
        </v-flex>
        <v-textarea
          v-model="commentWork.text"
          box
          label="Комментарий к выполненной работе(markdown)"
          auto-grow
        />

        <v-expansion-panel class="mb-3">
          <v-expansion-panel-content>
            <template v-slot:header>
              <div>Превью</div>
            </template>
            <v-card>
              <v-card-text><vue-markdown :source="commentWork.text"/></v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <b v-if="commentWork.attachments.length>0">Прикрепленные файлы и ссылки:</b>
        <div v-if="commentWork.attachments.length>0">
          <v-chip
            v-for="(attachment, i) in commentWork.attachments"
            :key="i" 
            :close="!loading"
            @input="removeAttachment(attachment.id)">{{ attachment.name }}</v-chip>
        </div>

        <v-btn
          v-if="!loading"
          color="secondary"
          @click="attachmentDialog = true">Прикрепить файл</v-btn>
        <br>
        <v-btn
          v-if="!loading"
          color="primary" 
          @click="submit">Принять работу</v-btn>

        <div 
          v-if="loading" 
          class="text-xs-center pt-2">
          <v-progress-circular :indeterminate="loading"/>
        </div>
        
      </form>
    </v-card-text>
    <attachment-select-dialog
      :open="attachmentDialog"
      @end="attachmentDialog = false"
      @result="addAttachment"/>
  </v-card>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import AttachmentSelectDialog from "../dialogs/AttachmentSelectDialog.vue";

export default {
  name: 'AddCommentWork',
  components: {
    AttachmentSelectDialog,
    VueMarkdown,
  },
  props: {
    id: {
      type: Number,
      default: -1,
    }
  },
  data: function () {
    return {
      attachmentDialog: false,
      commentWork: {
        text: '',
        attachments: [],
      },
      mark: 'Отлично',
      loading: false,
    }
  },
  methods: {
    addAttachment: function (result) {
      if (this.commentWork.attachments.map(a => a.id).indexOf(result.id) === -1) {
        this.commentWork.attachments.push(result)
      }
    },
    removeAttachment: function (attachmentId) {
      this.commentWork.attachments = this.commentWork.attachments.filter((item) => {return item.id !== attachmentId});
    },
    change_mark: function (mark) {
      this.mark = mark
    },
    submit: function () {
      this.loading = true;
      switch (this.mark) {
        case 'Отлично':
          this.commentWork.mark = 'EXCELLENT'
          break;
        case 'Хорошо':
          this.commentWork.mark = 'GOOD'
          break;
        case 'Удовлетворительно':
          this.commentWork.mark = 'FAIR'
          break;
        case 'Не удовлетворительно':
          this.commentWork.mark = 'BAD'
          break;
      }
      this.$store.dispatch('ADD_COMMENT_WORK', {dworkId: this.$props.id, mark: this.commentWork.mark, text: this.commentWork.text}).then((result) => {
        for (let attachment of this.commentWork.attachments) {
          this.$store.dispatch('CONNECT_ATTACHMENT', {connectionId: result.data.id, attachmentId: attachment.id, connectionType: 'COMMENTWORK'})
        }
        this.loading = false
        this.$router.push({ name: 'done_work', params: { id: this.$props.id }})
      })
    }
  }
}
</script>

<style scoped>

</style>
