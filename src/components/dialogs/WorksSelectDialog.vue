<template>
  <v-dialog 
    v-model="open" 
    fullscreen 
    hide-overlay 
    transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar 
        dark 
        color="primary">
        <v-btn 
          icon 
          dark 
          @click="$emit('end')">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Выберите работу</v-toolbar-title>
      </v-toolbar>
      <div class="text-xs-center pt-2">
        <v-progress-circular 
          v-if="loading" 
          :indeterminate="loading" 
          class="align-self-center ma-5"/>
      </div>
      <v-list 
        v-if="!loading" 
        three-line>
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
      <div class="text-xs-center pt-2">
        <v-pagination
          :value="page"
          :length="count"
          v-model="page"
          @input="load_works"
        />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'WorksSelectDialog',
  props: {
    open: {
      type: Boolean,
      default: false,
    }
  },
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
      ],
      size: 5,
      page: 1,
      count: -1,
      loading: true,
    }
  },
  watch: {
    open: function (val) {
      if (val) {
        this.load_works(1)
      }
    }
  },
  methods: {
    load_works(page) {
      this.loading = true
      this.$store.dispatch('GET_WORKS', {page: page, size: this.size}).then((result) => {
        this.works = result.data.data
        this.page = page
        this.count = result.data.count;
        this.loading = false;
      })
    },
  },
}
</script>

<style scoped>

</style>
