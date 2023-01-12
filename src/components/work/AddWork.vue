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
        <br v-if="groups.length>0">
        <b v-if="groups.length>0">Доступно группам:</b>
        <div v-if="groups.length>0">
          <v-chip
            v-for="(group, i) in groups"
            :key="i"
            :close="!loading"
            @input="removeGroup(group.id)">{{ group.name }}</v-chip>
        </div>
        <v-btn
          v-if="!loading"
          color="secondary"
          @click="groupDialog = true">Добавить группу</v-btn>
        <br>
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
    <group-select-dialog
      :open="groupDialog"
      @end="groupDialog = false"
      @result="addGroup"/>
  </v-card>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import VueMathjax from '../util/VueMathjax.vue'
import AttachmentSelectDialog from "../dialogs/AttachmentSelectDialog.vue";
import GroupSelectDialog from "../dialogs/GroupSelectDialog.vue";

export default {
  name: 'AddWork',
  components: {
    GroupSelectDialog,
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
    addGroup: function (result) {
      if (this.groups.map(g => g.id).indexOf(result.id) === -1) {
        this.groups.push(result)
      }
    },
    removeGroup: function (groupId) {
      this.groups = this.groups.filter((item) => {return item.id !== groupId});
    },
    submit: function () {
      this.loading = true;
      this.$store.dispatch('ADD_WORK', this.work).then((result) => {
        for (let attachment of this.attachments) {
          this.$store.dispatch('CONNECT_ATTACHMENT', {connectionId: result.data.id, attachmentId: attachment.id, connectionType: 'WORK'})
        }
        for (let group of this.groups) {
          this.$store.dispatch('CONNECT_WORK_GROUP', {workId: result.data.id, groupId: group.id})
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