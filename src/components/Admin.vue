<template>
  <v-list>
    <v-list-tile
      :to="{ name: 'users_list' }"
    >
      <v-list-tile-content>
        <v-list-tile-title>Список пользователей</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  name: 'Admin'
}
</script>

<style scoped>

</style>
