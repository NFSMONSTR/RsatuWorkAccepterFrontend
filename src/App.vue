<template>
  <v-app id="app">
    <NavMenu v-if="$store.getters.isLoggedIn"/>
    <NavBar/>
    <v-content>
      <v-fade-transition mode="out-in">
        <router-view/>
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar'
import NavMenu from '@/components/NavMenu'

function updToken (self) {
  if ((self.$store.getters.isLoggedIn) && ((self.$store.getters.tokenLifetime - Math.floor(Date.now() / 1000) < 100) || (self.$store.getters.tokenLifetime === undefined))) {
    self.$store.dispatch('UPDATE_TOKEN').then(() => {
      if (!self.$store.getters.isLoggedIn) {
        self.$router.push({ name: 'login' })
      }
    })
  } else {
    if ((!self.$store.getters.isLoggedIn) && (!['login', 'register'].includes(self.$router.currentRoute.name))) {
      self.$router.push({name: 'login'})
    }
  }
}

export default {
  name: 'App',
  components: {NavMenu, NavBar},
  mounted () {
    let self = this
    updToken(self)
    setInterval(function () {
      updToken(self)
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
