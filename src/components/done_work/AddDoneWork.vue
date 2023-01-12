<template>
  <v-card flat>
    <v-card-title 
      primary-title 
      class="title">Сдать лабораторную работу</v-card-title>
    <v-card-text>
      <form>
        <v-textarea
          v-model="doneWork.text"
          box
          label="Отчет о выполненной работе(markdown)"
          auto-grow
        />

        <v-expansion-panel class="mb-3">
          <v-expansion-panel-content>
            <template v-slot:header>
              <div>Превью</div>
            </template>
            <v-card>
              <v-card-text><vue-markdown :source="doneWork.text"/></v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <b v-if="doneWork.attachments.length>0">Прикрепленные файлы и ссылки:</b>
        <div v-if="doneWork.attachments.length>0">
          <v-chip
            v-for="(attachment, i) in doneWork.attachments"
            :key="i" 
            :close="!loading"
            @input="removeAttachment(attachment.id)">{{ attachment.name }}</v-chip>
        </div>

        <v-btn
          v-if="!loading"
          color="secondary"
          @click="attachmentDialog = true">Прикрепить файл</v-btn>

        <v-btn
          v-if="!loading"
          color="primary" 
          @click="submit">Сдать работу</v-btn>

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
  name: 'AddDoneWork',
  components: {
    AttachmentSelectDialog,
    VueMarkdown,
  },
  props: {
    workId: {
      type: Number,
      default: -1,
    }
  },
  data: function () {
    return {
      attachmentDialog: false,
      doneWork: {
        text: '',
        attachments: [],
      },
      loading: false,
    }
  },
  methods: {
    addAttachment: function (result) {
      if (this.doneWork.attachments.map(a => a.id).indexOf(result.id) === -1) {
        this.doneWork.attachments.push(result)
      }
    },
    removeAttachment: function (attachmentId) {
      this.doneWork.attachments = this.doneWork.attachments.filter((item) => {return item.id !== attachmentId});
    },
    submit: function () {
      this.loading = true;
      this.$store.dispatch('ADD_DONE_WORK', {workId: this.$props.workId, text: this.doneWork.text}).then((result) => {
        for (let attachment of this.doneWork.attachments) {
          this.$store.dispatch('CONNECT_ATTACHMENT', {connectionId: result.data.id, attachmentId: attachment.id, connectionType: 'DONEWORK'})
        }
        this.loading = false
        this.$router.push({ name: 'done_works' })
      })
    }
  }
}
</script>

<style scoped>

</style>
