<template>
  <v-navigation-drawer
    fixed
    v-model="$store.state.globalNavigationDrawer"
    clipped
    app
  >

    <v-toolbar flat class="transparent">
      <v-list class="pa-0">

        <v-list-tile avatar @click.stop="$router.push({ name: 'profile', params: { id: $store.getters.userId } })">
          <v-list-tile-avatar>
            <img :src="$store.getters.avatarUrl" alt="avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ this.$store.getters.user.first_name }} {{ this.$store.getters.user.second_name }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile :to="{name: 'works_list'}">
        <v-list-tile-action>
          <v-icon>assignment</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Доступные лабораторные работы</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <!-- if prepod -->
      <v-list-group
        prepend-icon="account_circle"
        value="true"
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>Преподавателю</v-list-tile-title>
          </v-list-tile>
        </template>
        <v-list-group
          no-action
          sub-group
          value="true"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Лабораторные работы</v-list-tile-title>
            </v-list-tile>
          </template>

          <v-list-tile
            v-for="(tutor, i) in tutors_works"
            :key="i"
            :to="tutor[2]"
          >
            <v-list-tile-title v-text="tutor[0]"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="tutor[1]"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

        <v-list-group
          no-action
          sub-group
          value="true"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Документы</v-list-tile-title>
            </v-list-tile>
          </template>

          <v-list-tile
            v-for="(x, i) in docs"
            :key="i"
            :to="x[2]"
          >
            <v-list-tile-title v-text="x[0]"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="x[1]"></v-icon>
            </v-list-tile-action>
          </v-list-tile>

        </v-list-group>

      </v-list-group>

      <!-- if admin -->
      <v-list-group
        prepend-icon="account_circle"
        value="true"
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>Администратору</v-list-tile-title>
          </v-list-tile>
        </template>
        <v-list-group
          no-action
          sub-group
          value="true"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Пользователи</v-list-tile-title>
            </v-list-tile>
          </template>

          <v-list-tile
            v-for="(a, i) in admin"
            :key="i"
            :to="a[2]"
          >
            <v-list-tile-title v-text="a[0]"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="a[1]"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

        <v-list-group
          no-action
          sub-group
          value="true"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Группы</v-list-tile-title>
            </v-list-tile>
          </template>

          <v-list-tile
            v-for="(a, i) in admin_g"
            :key="i"
            :to="a[2]"
          >
            <v-list-tile-title v-text="a[0]"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="a[1]"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

      </v-list-group>

    </v-list>

  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavMenu',
  data: function () {
    return {
      tutors_works: [
        ['Добавть работу', 'note_add', { name: 'add_work' }],
        ['Список моих работ', 'assignment', { name: 'works_list' }]
      ],
      docs: [
        ['Добавить документ', 'attach_file', { name: 'add_attachment' }],
        ['Список документов', 'attachment', { name: 'attachments_list' }]
      ],
      admin: [
        ['Добавить пользователей', 'person_add', { name: 'add_user' }],
        ['Список пользователей', 'people', { name: 'users_list' }]
      ],
      admin_g: [
        ['Группы пользователей', 'group', { name: 'group' }]
      ]
    }
  }
}
</script>

<style scoped>
</style>
