<template>
  <!--<div class="container text-left" @submit.prevent="register">
    <div class="bg-dark" style="padding:55px;margin:56px;margin-left:25%;margin-bottom:0px;margin-right:25%;margin-top:16%;padding-left:5%;padding-right:5%;">
      <form style="padding:0px;padding-top:0;margin-right:0;margin-left:0;" method="post">
        <fieldset style="padding:0;">
          <legend class="text-white">Регистрация</legend>
          <alerts ref="alerts"></alerts>
          <small class="form-text text-white-50">Логин</small>
          <input class="form-control"
                 type="text"
                 name="username"
                 v-model="username"
                 required
                 minlength="4"
                 maxlength="256"
          >
          <small class="form-text text-white-50">Имя</small>
          <input class="form-control"
                 type="text"
                 name="name"
                 v-model="name"
                 required
                 minlength="1"
          >
          <small class="form-text text-white-50">Фамилия</small>
          <input class="form-control"
                 type="text"
                 name="name"
                 v-model="s_name"
                 required
                 minlength="1"
          >
          <small class="form-text text-white-50">Пароль</small>
          <input class="form-control border-light"
                 type="password"
                 name="password"
                 v-model="password"
                 required
                 minlength="6"

          >
          <button class="btn btn-light btn-block btn-sm" type="submit" style="margin:3px;margin-top:13px;">
            Зарегестрироваться
          </button>
        </fieldset>
      </form>
    </div>
  </div>-->
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Регистрация</v-toolbar-title>
            </v-toolbar>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-card-text>
                <v-alert
                  :value="error_message !== ''"
                  type="error"
                >
                  {{ error_message }}
                </v-alert>

                <v-text-field
                  v-model="username"
                  :rules="loginRules"
                  label="Логин"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="name"
                  :rules="rules"
                  label="Имя"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="s_name"
                  :rules="rules"
                  label="Фамилия"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                  :rules="passwordRules"
                  :type="showPassword ? 'text' : 'password'"
                  label="Пароль"
                  class="input-group--focused"
                  @click:append="showPassword = !showPassword"
                  required
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  block
                  :disabled="!valid"
                  color="success"
                  @click="validate"
                >
                  Зарегестрироваться
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import Alerts from './Alerts'
export default {
  name: 'Register',
  components: {Alerts},
  data: function () {
    return {
      valid: true,
      showPassword: false,
      username: '',
      name: '',
      s_name: '',
      password: '',
      error_message: '',
      rules: [
        v => !!v || 'Это поле обязательно'
      ],
      loginRules: [
        v => !!v || 'Это поле обязательно',
        v => (v && v.length >= 4) || 'Минимальная длина - 4 символа'
      ],
      passwordRules: [
        v => !!v || 'Это поле обязательно',
        v => (v && v.length >= 6) || 'Минимальная длина - 6 символов'
      ]
    }
  },
  methods: {
    register: function () {
      this.$store.dispatch('REGISTER', {
        username: this.username,
        first_name: this.name,
        second_name: this.s_name,
        password: this.password
      }).then((result) => {
        if (result.status === 201) {
          this.error_message = ''
          this.$router.push('login')
        } else {
          let message = 'Неизвестная ошибка'
          if (result.data.title === 'Validation error') {
            if (result.data.description.includes('username')) {
              message = 'Минимальная длина логина - 4 символа'
            } else if (result.data.description.includes('password')) {
              message = 'Минимальная длина пароля - 6 символов'
            } else if (result.data.description.includes('first_name')) {
              message = 'Поле "Имя" не должно быть пустым'
            } else if (result.data.description.includes('second_name')) {
              message = 'Поля "Фамилия" не должно быть пустым'
            }
          } else if (result.data.title === 'This user already exists') {
            message = 'Этот логин занят'
          }
          this.error_message = message
        }
      })
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.register()
      }
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
