<template>
  <div>
    <v-flex d-flex>
      <v-select
        :items="pages"
        :value="size"
        hint="Работ на странице"
        solo
        class="ma-4"
        @input="change_size"
      />
    </v-flex>
    <template v-if="loading">
      <div class="text-xs-center pt-2">
        <v-progress-circular :indeterminate="loading"/>
      </div>
    </template>
    <template v-if="!loading">
      <v-list three-line>
        <template v-for="(item, index) in works">

          <v-list-tile
            :key="index"
            :to="{ name: 'work', params: { id: item.id }}"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.subject }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>{{ item.short_description }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </template>
    <div class="text-xs-center pt-2">
      <v-pagination 
        :value="page" 
        :length="count" 
        v-model="page"
        @input="load_works"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorksList',
  data: function () {
    return {
      works: [
      ],
      size: 5,
      page: 1,
      count: -1,
      loading: true,
      pages: [
          1,5,10,20,50
      ]
    }
  },
  mounted () {
    this.load_works(1)
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
    change_size(size) {
      this.size = size;
      this.page = 1;
      this.load_works(1)
    }
  }
}
</script>

<style scoped>

</style>
