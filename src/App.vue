<template>
  <v-app id="app">
    <NavMenu v-if="$store.getters.isLoggedIn"></NavMenu>
    <NavBar></NavBar>
    <v-content>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar'
import NavMenu from '@/components/NavMenu'
export default {
  name: 'App',
  components: {NavMenu, NavBar},
  mounted: function () {
    let self = this
    if ((self.$store.getters.isLoggedIn) && (self.$store.getters.tokenLifetime - Math.floor(Date.now() / 1000) < 100)) {
      self.$store.dispatch('UPDATE_TOKEN').then()
    }
    setInterval(function () {
      if ((self.$store.getters.isLoggedIn) && (self.$store.getters.tokenLifetime - Math.floor(Date.now() / 1000) < 100)) {
        self.$store.dispatch('UPDATE_TOKEN').then()
      }
    }, 1000 * 60 * 60)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
