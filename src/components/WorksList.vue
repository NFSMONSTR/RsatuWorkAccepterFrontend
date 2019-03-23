<template>
  <v-list three-line>
    <template v-for="(item, index) in works">

      <v-list-tile
        :key="index"
        @click="false"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{ item.subject }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.name }}</v-list-tile-sub-title>
          <v-list-tile-sub-title>{{ item.short_description }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'WorksList',
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
  mounted () {
    this.$store.dispatch('GET_WORKS').then((result) => {
      this.works = result.data.works
    })
  }
}
</script>

<style scoped>

</style>
