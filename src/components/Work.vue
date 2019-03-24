<template>
  <v-card flat>
    <v-card-text>
      <v-layout align-center mb-3>
        <v-avatar color="grey" class="mr-3"></v-avatar>
        <v-container fluid>
          <v-layout row>
              <strong class="title">{{ work.name }} - {{ work.subject }}</strong>
          </v-layout>
          <v-layout row>
              {{ work.author.first_name + ' ' + work.author.second_name }}
          </v-layout>
        </v-container>
      </v-layout>

      <b>Описание работы:</b>
      <p>
        {{ work.description }}
      </p>

      <b v-if="work.attachments.length>0">Прикрепленные файлы:</b>
      <v-list v-if="work.attachments.length>0">
        <v-list-tile>
          <v-list-tile-content>
            <v-btn>dasdas</v-btn>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-btn>dasdas</v-btn>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Work',
  props: ['id'],
  data: function () {
    return {
      work: {
        id: 0,
        name: 'No connection',
        short_description: 'No connection',
        description: 'No connection',
        subject: 'No connection',
        author: 0,
        attachments: [],
        done_works: []
      }
    }
  },
  mounted () {
    this.$store.dispatch('GET_WORK', this.id).then((result) => {
      this.work = result.data
      this.$store.dispatch('GET_USER_INFO', this.work.id).then((result) => {
        this.work.author = result.data
      })
    })
  }
}
</script>

<style scoped>

</style>
