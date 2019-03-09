<template>
  <div id="app">
    <NavBar brand="Принималка лаб" :links="links"></NavBar>
    <main role="main" class="px-4">
      <transition>
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
export default {
  name: 'App',
  components: {NavBar},
  data: function () {
    return {
      links: [
        { id: 0, name: 'Лабораторные работы', link: 'HelloWorld', router: true }
        /*
        { id: 1, name: 'Home', link: 'MainContainer', router: true, params: { header: 'test' } },
        { id: 2, name: 'test', link: 'https://google.com', router: false },
        { id: 3, name: 'hello', link: 'HelloWorld', router: true },
        { id: 4, name: 'cont', link: 'MainContainer', router: true, params: { header: 'test' } }
        */
      ]
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
