<template>
  <v-navigation-drawer
    fixed
    v-model="drawer"
    clipped
    app
  >

    <v-toolbar flat class="transparent">
      <v-list class="pa-0">

        <v-list-tile avatar @click.stop="$router.push({ name: 'profile', params: { id: $store.getters.userId } })">
          <v-list-tile-avatar>
            <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ this.$store.getters.user.first_name }} {{ this.$store.getters.user.second_name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile :to="{name: 'works_list'}">
        <v-list-tile-action>
          <v-icon>assignment</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Доступные лабораторные работы</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <!-- if admin -->
    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile :to="{name: 'admin'}">
        <v-list-tile-action>
          <v-icon>gavel</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Админ панель</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavMenu',
  props: ['drawer']
}
</script>

<style scoped>
</style>
