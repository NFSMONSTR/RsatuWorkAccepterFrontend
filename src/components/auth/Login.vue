<template>
  <v-content>
    <v-container 
      fluid 
      fill-height>
      <v-layout 
        align-center 
        justify-center>
        <v-flex 
          xs12 
          sm8 
          md4>
          <v-card class="elevation-12">
            <v-toolbar 
              dark 
              color="primary">
              <v-toolbar-title>Вход</v-toolbar-title>
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
                  :rules="rules"
                  label="Логин"
                  required
                  prepend-icon="person"
                />

                <v-text-field
                  v-model="password"
                  :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                  :rules="rules"
                  :type="showPassword ? 'text' : 'password'"
                  label="Пароль"
                  class="input-group--focused"
                  required
                  prepend-icon="lock"
                  @click:append="showPassword = !showPassword"
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn
                  :disabled="!valid"
                  block
                  color="success"
                  @click="validate"
                >
                  Войти
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
export default {
  name: 'Login',
  data: function () {
    return {
      valid: true,
      username: '',
      showPassword: false,
      password: '',
      error_message: '',
      rules: [
        v => !!v || 'Это поле обязательно'
      ]
    }
  },
  methods: {
    login () {
      this.$store.dispatch('LOGIN', {'username': this.username, 'password': this.password}).then(() => {
        this.error_message = ''
        this.$router.push('/')
      }).catch((error) => {
        console.error(error)
        this.error_message = 'Неправильный логин или пароль'
      })
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.login()
      }
    }
  }
}
</script>

<style scoped>
div {
  border-radius: 5px;
}
</style>
