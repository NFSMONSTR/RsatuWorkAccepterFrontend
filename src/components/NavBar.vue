<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-toolbar dark color="primary">
    <v-toolbar-title>Система сдачи лабораторных работ</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Logged in toolbar -->
    <v-toolbar-items v-if="this.$store.getters.isLoggedIn">
      <!--<v-btn flat>Link One</v-btn>-->
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat fab v-on="on">
            <v-avatar :tile="true" :size="40">
              <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile @click="logout">
            <v-list-tile-title>Выйти</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>

    <!-- Logged out toolbar -->
    <v-toolbar-items v-else>
      <v-btn flat to="login" exact>Войти</v-btn>
      <v-btn flat to="register" exact>Зарегестрироваться</v-btn>
    </v-toolbar-items>

  </v-toolbar>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    logout: function () {
      this.$store.dispatch('LOGOUT').then(() => {
        this.$router.push('login')
      })
    }
  }
}
</script>

<style scoped>
  .v-btn--router {
    text-decoration: none;
  }
</style>
