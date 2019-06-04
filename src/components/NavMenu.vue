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

    <v-list class="pt-0" dense expand>
      <v-divider></v-divider>

      <div v-for="(m, i) in menu_nav" v-bind:key="i">
         <v-list-tile v-if="(m.type === 0) && ($store.getters.user.permission_level>=m.perm)" :to="m.to">
          <v-list-tile-action>
            <v-icon>{{ m.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
             <v-list-tile-title>{{m.header}}</v-list-tile-title>
          </v-list-tile-content>
         </v-list-tile>

        <v-list-group
          v-if="(m.type === 1) && ($store.getters.user.permission_level>=m.perm)"
          no-action=""
          :prepend-icon="m.icon"
          value="true"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>{{m.header}}</v-list-tile-title>
            </v-list-tile>
          </template>
            <v-list-tile
              v-for="(data, i) in m.data"
              :key="i"
              :to="data[2]"
              v-if="$store.getters.user.permission_level>=data[3]"
            >
              <v-list-tile-title v-text="data[0]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="data[1]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
        </v-list-group>
      </div>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavMenu',
  data: function () {
    return {
      menu_nav: [
        {
          type: 0,
          header: 'Доступные лабораторные работы',
          to: {name: 'works_list'},
          icon: 'assignment',
          perm: 0
        },
        {
          type: 1,
          header: 'Документы',
          perm: 0,
          icon: 'attachment',
          data: [
            ['Добавить документ', 'attach_file', { name: 'add_attachment' }, 0],
            ['Список документов', 'attachment', { name: 'attachments_list' }, 0]
          ]
        },
        {
          type: 1,
          header: 'Лабораторные работы',
          perm: 5,
          icon: 'assignment',
          data: [
            ['Добавть работу', 'note_add', { name: 'add_work' }, 5],
            ['Список моих работ', 'assignment', { name: 'works_list' }, 5]
          ]
        },
        {
          type: 1,
          header: 'Пользователи',
          perm: 10,
          icon: 'people',
          data: [
            ['Добавить пользователей', 'person_add', { name: 'add_user' }, 10],
            ['Список пользователей', 'people', { name: 'users_list' }, 10],
            ['Группы пользователей', 'group', { name: 'group' }, 10]
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
