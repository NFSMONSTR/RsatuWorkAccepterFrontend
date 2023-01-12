<template>
  <v-card flat>
    <v-card-title 
      primary-title 
      class="title">Добавить работу</v-card-title>
    <v-card-text>
      <form>

        <v-text-field
          v-model="work.name"
          label="Название работы"
          required
        />

        <v-text-field
          v-model="work.subject"
          label="Предмет"
          required
        />

        <v-text-field
          v-model="work.short_description"
          label="Краткое описание"
          required
        />

        Тип разметки описания:
        <v-radio-group 
          v-model="work.markup" 
          required>
          <v-radio
            :value="0"
            label="Markdown"
          />
          <v-radio
            :value="1"
            label="MathML, TeX, ASCIIMath (MathJax)"
          />
        </v-radio-group>

        <v-textarea
          v-model="work.description"
          box
          label="Описание работы"
          auto-grow
        />

        <v-expansion-panel>
          <v-expansion-panel-content>
            <template v-slot:header>
              <div>Превью описания</div>
            </template>
            <v-card>
              <v-card-text v-if="work.markup===0"><vue-markdown :source="work.description"/></v-card-text>
              <v-card-text v-else><vue-mathjax :formula="work.description"/></v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <br>
        <b v-if="attachments.length>0">Прикрепленные файлы и ссылки:</b>
        <div v-if="attachments.length>0">
          <v-chip
            v-for="(attachment, i) in attachments"
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
          @click="submit">Добавить работу</v-btn>

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
import VueMathjax from '@/components/VueMathjax'
import AttachmentSelectDialog from "./dialogs/AttachmentSelectDialog.vue";

export default {
  name: 'AddWork',
  components: {
    AttachmentSelectDialog,
    VueMarkdown,
    VueMathjax
  },
  data: function () {
    return {
      work: {
        name: '',
        subject: '',
        short_description: '',
        markup: 0,
        description: '',
        semestr: 1
      },
      attachments: [],
      groups: [],
      loading: false,
      attachmentDialog: false,
      groupDialog: false,
    }
  },
  methods: {
    addAttachment: function (result) {
      if (this.attachments.map(a => a.id).indexOf(result.id) === -1) {
        this.attachments.push(result)
      }
    },
    removeAttachment: function (attachmentId) {
      this.attachments = this.attachments.filter((item) => {return item.id !== attachmentId});
    },
    submit: function () {
      this.loading = true;
      this.$store.dispatch('ADD_WORK', this.work).then((result) => {
        for (let attachment of this.doneWork.attachments) {
          this.$store.dispatch('CONNECT_ATTACHMENT', {connectionId: result.data.id, attachmentId: attachment.id, connectionType: 'WORK'})
        }
        this.loading = false;
        this.$router.push({ name: 'works_list' })
      })
    }
  }
}
</script>

<style scoped>

</style>
