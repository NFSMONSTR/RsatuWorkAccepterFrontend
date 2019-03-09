<template>
  <transition name="fade">
    <div class="alert" :class="'alert-'+alert_type" role="alert" v-if="alive">
      <slot></slot>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="alive = !alive">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    alert_type: {
      default: 'info'
    }
  },
  data: function () {
    return {
      alive: true// see lower
    }
  }
  // this is not very correct way of deleting, but here it will be more comfortable
  // see https://stackoverflow.com/questions/40181133/delete-a-vue-child-component
  // and https://stackoverflow.com/questions/40445125/how-can-component-delete-itself-in-vue-2-0
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
