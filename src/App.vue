<template>
  <v-app id="app">
    <NavBar></NavBar>
    <main role="main" class="p-4">
      <transition>
        <router-view></router-view>
      </transition>
    </main>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar'
export default {
  name: 'App',
  components: {NavBar},
  data: function () {
    return {
      links: () => {
        if (this.$store.getters.isLoggedIn) {
          return [
            { id: 0, name: 'Лабораторные работы', link: '/', router: true }
            /*
            { id: 1, name: 'Home', link: 'MainContainer', router: true, params: { header: 'test' } },
            { id: 2, name: 'test', link: 'https://google.com', router: false },
            { id: 3, name: 'hello', link: 'HelloWorld', router: true },
            { id: 4, name: 'cont', link: 'MainContainer', router: true, params: { header: 'test' } }
            */
          ]
        } else {
          return []
        }
      }
    }
  },
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
