<template>
  <v-card flat>
    <v-card-text>
      <v-layout align-center mb-3>
        <v-badge
          color="cyan"
          right
          class="mr-3"
          overlap
        >
          <template v-slot:badge>
            <v-icon @click="avatar_select_dialog = true" style="cursor: pointer" color="white">autorenew</v-icon>
          </template>
          <v-avatar size="48" :tile="false"><img :src="$store.getters.userAvatarUrl(user.id)" alt="avatar"></v-avatar>
        </v-badge>
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
    <avatar-dialog :open="avatar_select_dialog" @end="avatar_select_dialog = false" @update="$router.go($router.currentRoute)"></avatar-dialog>
  </v-card>
</template>

<script>
import AvatarDialog from '@/components/AvatarDialog'
export default {
  name: 'Profile',
  components: {AvatarDialog},
  props: ['id'],
  data: function () {
    return {
      user: {
        id: 0,
        username: 'No connection',
        first_name: 'No connection',
        second_name: 'No connection'
      },
      avatar_select_dialog: false
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
