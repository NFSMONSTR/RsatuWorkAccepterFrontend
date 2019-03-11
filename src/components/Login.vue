<template>
  <div class="container text-left" @submit.prevent="login">
    <div class="bg-dark" style="padding:55px;margin:56px;margin-left:25%;margin-bottom:0px;margin-right:25%;margin-top:16%;padding-left:5%;padding-right:5%;">
      <form style="padding:0px;padding-top:0;margin-right:0;margin-left:0;" method="post">
        <fieldset style="padding:0;">
          <legend class="text-white">Вход</legend>
          <alerts ref="alerts"></alerts>
          <small class="form-text text-white-50">Логин:</small>
          <input class="form-control"
                 type="text"
                 name="username"
                 v-model="username"
                 required
          >
          <small class="form-text text-white-50">Пароль:</small>
          <input class="form-control border-light"
                 type="password"
                 name="password"
                 v-model="password"
                 required
          >
          <button class="btn btn-light btn-block btn-sm" type="submit" style="margin:3px;margin-top:13px;">
            Войти
          </button>
      </form>
    </div>
  </div>
</template>

<script>
import Alerts from './Alerts'
export default {
  name: 'Login',
  components: {Alerts},
  data: function () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      this.$store.dispatch('LOGIN', { 'username': this.username, 'password': this.password }).then(() => {
        this.$router.push('/')
      }).catch((error) => {
        console.error(error)
        this.$refs.alerts.push_message_danger('Неправильный логин или пароль')
      })
    }
  }
}
</script>

<style scoped>
  .form-control:focus {
    border-color: #ffffff;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 255, 255, 0.6);
  }
  .btn.btn-light.btn-block.btn-sm {
    border-radius:15px;
  }

  div {
    border-radius:5px;
  }

  .btn.btn-dark.btn-block.btn-sm {
    border-radius:15px;
  }

</style>
