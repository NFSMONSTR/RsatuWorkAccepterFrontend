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
      <v-list-tile :to="{name: 'admin'}">
        <v-list-tile-action>
          <v-icon>gavel</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Админ панель</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

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
      ]
    }
  }
}
</script>

<style scoped>
</style>
