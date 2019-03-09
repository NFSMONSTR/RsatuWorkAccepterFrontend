<template>
  <li class="nav-item">
    <router-link :to="{ name: link.link, params: link.params }" class="nav-link" exact-active-class="active" v-if="link.router">{{ link.name }}</router-link>
    <a class="nav-link" :href="link.link" v-if="!link.router">{{ link.name }}</a>
  </li>
</template>

<script>
export default {
  name: 'NavLink',
  props: ['link']
}
</script>

<style scoped>

</style>
