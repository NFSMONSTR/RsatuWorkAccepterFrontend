<template>
  <v-container fluid>
    <v-layout>
      <ul class="list-group">
        <li class="list-group-item"><router-link :to="{ name: 'profile', params: { id: this.$store.getters.userId } }">Профиль текущего пользователя</router-link></li>
        <li class="list-group-item"><router-link :to="{ name: 'users_list'}">Список пользователей</router-link></li>
        <li class="list-group-item">Morbi leo risus</li>
        <li class="list-group-item">Porta ac consectetur ac</li>
        <li class="list-group-item">Vestibulum at eros</li>
      </ul>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'DevMenu'
}
</script>

<style scoped>
</style>
