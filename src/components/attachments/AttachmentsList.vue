<template>
  <div>
    <v-list three-line>
      <template v-for="(item, index) in attachments">

        <v-list-tile
          :key="index"
          @click="redirect(item.link)"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-layout row>
              <!--              <v-btn icon>-->
              <!--                <v-icon -->
              <!--                  color="grey lighten-0" -->
              <!--                  @click.stop="work_select_dialog = true; current = item.id">attach_file</v-icon>-->
              <!--              </v-btn>-->
              <!--              <v-spacer/>-->
              <v-btn icon>
                <v-icon 
                  color="red lighten-1" 
                  @click.stop="delete_dialog = true; current = item.id">delete_forever</v-icon>
              </v-btn>
            </v-layout>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
    <PopupDialog 
      :open="delete_dialog" 
      @yes="delete_attachment(current)" 
      @end="delete_dialog = false">Удалить документ?</PopupDialog>
    <works-select-dialog 
      :open="work_select_dialog" 
      @end="work_select_dialog = false" 
      @result="connect_to_work"/>
  </div>
</template>

<script>
import PopupDialog from '../dialogs/PopupDialog.vue'
import WorksSelectDialog from '../dialogs/WorksSelectDialog.vue'

export default {
  name: 'AttachmentsList',
  components: {WorksSelectDialog, PopupDialog},
  data: function () {
    return {
      delete_dialog: false,
      current: 0,
      work_select_dialog: false,
      attachments: [
        {
          id: 0,
          is_link: true,
          name: 'No connection',
          author: 0,
          link: 'No connection'
        }
      ]
    }
  },
  mounted () {
    this.load_attachments()
  },
  methods: {
    redirect: function (to) {
      window.location.href = to
    },
    delete_attachment: function (id) {
      this.$store.dispatch('DELETE_ATTACHMENT', id).then(() => {
        this.load_attachments()
      })
    },
    load_attachments: function () {
      this.$store.dispatch('GET_ATTACHMENTS').then((result) => {
        this.attachments = result.data
      })
    },
    connect_to_work: function (workId) {
      this.$store.dispatch('CONNECT_ATTACHMENT_TO_WORK', { attachmentId: this.current, connectionId: workId, connectionType: 'WORK' }).then()
    }
  }
}
</script>

<style scoped>

</style>
