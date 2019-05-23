<template>
  <div>
  <v-card flat>
    <v-card-title primary-title class="title">Добавить пользователя</v-card-title>
    <v-card-text>
      <v-alert
        v-model="alert"
        dismissible
        :type="alert_type"
      >
        {{alert_text}}
      </v-alert>
      <form>
        <v-text-field
          v-model="user.username"
          label="Логин"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.first_name"
          label="Имя"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.second_name"
          label="Фамилия"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.third_name"
          label="Отчество"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          label="Пароль"
          required
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>

        <v-select
          :items="groups"
          label="Группа"
          required
          v-model="user.group"
        ></v-select>

        <v-text-field
          v-model="user.year"
          label="Год начала обучения"
          required
        ></v-text-field>

        <v-select
          :items="[0,5,10]"
          label="Уровень прав"
          required
          v-model="user.permission_level"
        ></v-select>

        <v-btn @click="add_single_user">Добавить</v-btn>
      </form>
    </v-card-text>
  </v-card>

  <v-card flat>
      <v-card-title primary-title class="title">Добавить пользователей</v-card-title>
      <v-card-text>
        <v-alert
          v-model="alert1"
          dismissible
          :type="alert1_type"
        >
          {{alert1_text}}
        </v-alert>
        <form>
          <v-textarea
            box
            label="CSV: логин,имя,фамилия,отчество,группа,год начала обучения,уровень прав"
            auto-grow
            v-model="multiple_csv"
          ></v-textarea>
          <v-btn @click="add_multiple">Добавить</v-btn>
        </form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

import Papa from 'papaparse'

export default {
  name: 'AddUser',
  data: function () {
    return {
      groups: ['Нет'],
      alert: false,
      alert_text: '',
      alert_type: 'success',
      alert1: false,
      alert1_text: '',
      alert1_type: 'success',
      showPassword: false,
      multiple_csv: '',
      user: {
        username: '',
        first_name: '',
        second_name: '',
        third_name: '',
        password: '',
        group: null,
        year: (() => { let y = new Date().getYear(); if (y < 1900) y += 1900; return y })(),
        permission_level: 0
      }
    }
  },
  methods: {
    add_single_user: function () {
      let payload = this.user
      if (payload.group === 'Нет') {
        payload.group = null
      }
      this.$store.dispatch('ADD_USER', payload).then((result) => {
        this.alert = true
        this.alert_text = 'Пользователь успешно добавлен'
      })
    },
    add_multiple: function () {
      let csv = Papa.parse(this.multiple_csv)
      if (csv.errors.length !== 0) {
        this.alert1_text = 'Ошибка в формате CSV'
        this.alert1_type = 'error'
        this.alert1 = true
      } else {
        for (let line in csv.data) {
          let user = {}
          user.username = line[0]
          user.first_name = line[1]
          user.second_name = line[2]
          user.third_name = line[3]
          user.password = line[4]
          user.group = line[5]// tood
          user.year = line[6]
          user.permission_level = line[7]
          if (user.group === '') {
            user.group = null
          }
          this.$store.dispatch('ADD_USER', user).then()
        }
        this.alert1_text = 'Пользователи успешно добавлены'
        this.alert1_type = 'success'
        this.alert1 = true
      }
    }
  },
  mounted () {
    this.$store.dispatch('GET_GROUPS').then((result) => {
      this.groups.concat(result.data)
    })
  }
}
</script>

<style scoped>

</style>
