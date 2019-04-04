<template>
  <v-dialog v-model="open" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="$emit('end')">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Выберите работу</v-toolbar-title>
      </v-toolbar>
      <v-list three-line>
        <template v-for="(item, index) in works">

          <v-list-tile
            :key="index"
            @click.stop="$emit('result',item.id); $emit('end')"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ item.subject }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.name }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>{{ item.short_description }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'WorksSelectDialog',
  props: ['open'],
  data: function () {
    return {
      works: [
        {
          id: 0,
          name: 'No connection',
          short_description: 'No connection',
          description: 'No connection',
          subject: 'No connection',
          author: 0,
          attachments: [],
          done_works: []
        }
      ]
    }
  },
  watch: {
    open: function (val) {
      if (val) {
        this.$store.dispatch('GET_WORKS').then((result) => {
          this.works = result.data.works
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
