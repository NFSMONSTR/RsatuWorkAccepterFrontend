<template>
  <div>
    <v-card flat>
      <v-card-title 
        primary-title 
        class="title">Добавить пользователя</v-card-title>
      <v-card-text>
        <v-alert
          v-model="alert"
          :type="alert_type"
          dismissible
        >
          {{ alert_text }}
        </v-alert>
        <form>
          <v-text-field
            v-model="user.username"
            label="Логин"
            required
          />

          <v-text-field
            v-model="user.first_name"
            label="Имя"
            required
          />

          <v-text-field
            v-model="user.second_name"
            label="Фамилия"
            required
          />

          <v-text-field
            v-model="user.third_name"
            label="Отчество"
            required
          />

          <v-text-field
            v-model="user.password"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            :type="showPassword ? 'text' : 'password'"
            label="Пароль"
            required
            @click:append="showPassword = !showPassword"
          />

          <v-select
            :items="groupNames"
            v-model="userGroup"
            label="Группа"
            required
          />

          <v-text-field
            v-model="user.year"
            label="Год начала обучения"
            required
          />

          <v-select
            :items="['USER','TEACHER','ADMIN']"
            v-model="user.role"
            label="Уровень прав"
            required
          />

          <v-btn @click="add_single_user">Добавить</v-btn>
        </form>
      </v-card-text>
    </v-card>

    <v-card flat>
      <v-card-title 
        primary-title 
        class="title">Добавить пользователей</v-card-title>
      <v-card-text>
        <v-alert
          v-model="alert1"
          :type="alert1_type"
          dismissible
        >
          {{ alert1_text }}
        </v-alert>
        <form>
          <v-textarea
            v-model="multiple_csv"
            box
            label="CSV: логин,имя,фамилия,отчество,пароль,группа,год начала обучения,уровень прав"
            auto-grow
          />
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
      groupNames: ['Нет'],
      groups: [],
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
        role: 'USER'
      },
      userGroup: null,
    }
  },
  mounted () {
    this.$store.dispatch('GET_GROUPS').then((result) => {
      const names = result.data.map(g => g.name)
      this.groupNames.push(...names)
      this.groups = result.data
    })
  },
  methods: {
    add_single_user: function () {
      let payload = this.user
      const groupIdx = this.groups.map(g => g.name).indexOf(this.userGroup);
      if (groupIdx !== -1) {
        payload.group = {id:this.groups[groupIdx].id}
      } else {
        payload.group = null
      }
      this.$store.dispatch('ADD_USER', payload).then((result) => {
        if (result.status === 201 || result.status === 200) {
          this.alert = true
          this.alert_type = 'success'
          this.alert_text = 'Пользователь успешно добавлен'
        } else {
          this.alert = true
          this.alert_type = 'error'
          this.alert_text = 'Ошибка при добавлении пользователя, ответ от сервера: ' + result.data.title + ': ' + result.data.description
        }
      })
    },
    add_multiple: function () {
      let csv = Papa.parse(this.multiple_csv)
      const groups = this.groups
      if (csv.errors.length !== 0) {
        this.alert1_text = 'Ошибка в формате CSV'
        this.alert1_type = 'error'
        this.alert1 = true
      } else {
        let users = []
        csv.data.forEach(function (line) {
          let user = {
            username: line[0],
            first_name: line[1],
            second_name: line[2],
            third_name: line[3],
            password: line[4],
            group: line[5],
            year: +line[6],
            role: line[7]
          }
          if (user.group === '-') {
            user.group = null
          } else {
            user.group = groups.find(g=>g.id===(+user.group))
          }
          users.push(user)
        })
        this.$store.dispatch('ADD_USERS', users).then((result) => {
          if (result.status === 0) {
            this.alert1_text = 'Все пользователи успешно добавлены'
            this.alert1_type = 'success'
            this.alert1 = true
          } else if (result.status === users.length) {
            this.alert1_text = 'Ни один пользователь не был добавлен'
            this.alert1_type = 'error'
            this.alert1 = true
          } else {
            let s = ''
            result.data.forEach(function (e, i, arr) {
              if (i !== arr.length - 1) {
                s += e + ', '
              } else {
                s += e
              }
            })
            this.alert1_text = 'Все пользователи, кроме: ' + s + ' были успешно добавлены'
            this.alert1_type = 'warning'
            this.alert1 = true
          }
        })
      }
    }
  },
}
</script>

<style scoped>

</style>
