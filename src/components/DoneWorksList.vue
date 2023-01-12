<template>
  <div>
    <v-flex d-flex>
      <v-select
        :items="['Все', 'Оцененные', 'Без оценки']"
        :value="rated"
        hint="Работ на странице"
        solo
        class="ma-4"
        @input="changedRate"
      />
    </v-flex>
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
            <v-list-tile-avatar>
              <v-icon 
                v-if="item.commentId" 
                color="green">rate_review</v-icon>
            </v-list-tile-avatar>
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
      rated: 'Все',
    }
  },
  mounted () {
    this.load_works(1)
  },
  methods: {
    load_works(page) {
      this.loading = true
      let payload = {page: page, size: this.size}
      switch (this.rated) {
        case 'Оцененные':
          payload.rated = true
          break
        case 'Без оценки':
          payload.rated = false
          break
      }
      this.$store.dispatch('GET_DONE_WORKS', payload).then((result) => {
        this.doneWorks = result.data.data
        this.page = page
        this.count = result.data.count;
        this.loading = false;
      })
    },
    changedRate(rate) {
      this.rated = rate
      this.load_works(this.page)
    }
  }
}
</script>

<style scoped>

</style>
