<template>
  <v-list three-line>
    <template v-for="(item, index) in attachments">

      <v-list-tile
        :key="index"
        :href="item.link"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'AttachmentsList',
  data: function () {
    return {
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
    this.$store.dispatch('GET_ATTACHMENTS').then((result) => {
      this.attachments = result.data.attachments
      console.log(result.data)
    })
  }
}
</script>

<style scoped>

</style>
