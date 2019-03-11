<template>
  <nav class="navbar navbar-dark navbar-expand-lg bg-dark flex-md-nowrap p-0 shadow">
    <router-link to="/" class="navbar-brand col-sm-3 col-md-2 mr-0">{{ brand }}</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <nav-link v-for="link in links" :key="link.id" :link="link"></nav-link>
        <!--<li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>-->
      </ul>
      <!--
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>-->
      <ul class="navbar-nav">
        <nav-link v-if="!this.$store.state.isLoggedIn" :link="{ name: 'Войти', link: 'login', router: true}"></nav-link>
        <nav-link v-if="!this.$store.state.isLoggedIn" :link="{ name: 'Зарегестрироваться', link: 'register', router: true}"></nav-link>
        <li v-else class="nav-item"><a class="nav-link" style="cursor: pointer" @click="logout">Выйти</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import NavLink from './NavLink'
// import {AUTH_LOGOUT} from '@/store/actions/auth'
export default {
  name: 'NavBar',
  components: {NavLink},
  props: ['brand', 'links'],
  methods: {
    logout: function () {
      this.$store.dispatch('LOGOUT').then(() => {
        this.$router.next('login')
      })
    }
  }
}
</script>

<style scoped>
  .navbar-brand {
    padding-top: .75rem;
    padding-bottom: .75rem;
    font-size: 1rem;
    background-color: rgba(0, 0, 0, .25);
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
  }
</style>
