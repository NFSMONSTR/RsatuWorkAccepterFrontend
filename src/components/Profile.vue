<template>
  <v-card flat>
    <v-card-text>
      <v-layout align-center mb-3>
        <v-avatar class="mr-3" size="48" tile="false"><img src="https://vuetifyjs.com/apple-touch-icon-180x180.png"></v-avatar>
        <v-container fluid>
          <v-layout row>
            <strong class="title">{{ user.first_name }} {{ user.second_name }}</strong>
          </v-layout>
          <v-layout row>
            {{ user.username }}
          </v-layout>
        </v-container>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Profile',
  props: ['id'],
  data: function () {
    return {
      user: {
        id: 0,
        username: 'No connection',
        first_name: 'No connection',
        second_name: 'No connection'
      }
    }
  },
  mounted () {
    this.$store.dispatch('GET_USER_INFO', this.id).then((result) => {
      this.user = result.data
    })
  }
}
</script>

<style scoped>
</style>
