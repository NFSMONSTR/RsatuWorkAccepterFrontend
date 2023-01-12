<template>
  <div>
    <template v-if="loading">
      <div class="text-xs-center pt-2">
        <v-progress-circular :indeterminate="loading"/>
      </div>
    </template>
    <template v-if="!loading">
      <v-list three-line>
        <template v-for="(item, index) in doneWorks">

          <v-list-tile
            :key="index"
            :to="{ name: 'done_work', params: { id: item.id }}"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ item.work ? item.work.name : "" }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.text }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </template>
    <div class="text-xs-center pt-2">
      <v-pagination 
        :value="page" 
        :length="count" 
        v-model:="page"
        @input="load_works"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoneWorksList',
  data: function () {
    return {
      doneWorks: [
      ],
      size: 5,
      page: 10,
      count: -1,
      loading: true,
    }
  },
  mounted () {
    this.load_works(1)
  },
  methods: {
    load_works(page) {
      this.loading = true
      this.$store.dispatch('GET_DONE_WORKS', {page: page, size: this.size}).then((result) => {
        this.doneWorks = result.data.data
        this.page = page
        this.count = result.data.count;
        this.loading = false;
      })
    },
  }
}
</script>

<style scoped>

</style>
