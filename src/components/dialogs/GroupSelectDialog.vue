<template>
  <v-dialog 
    v-model="open" 
    fullscreen 
    hide-overlay 
    transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar 
        dark 
        color="primary">
        <v-btn 
          icon 
          dark 
          @click="$emit('end')">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Выберите группу</v-toolbar-title>
      </v-toolbar>
      <div class="text-xs-center pt-2">
        <v-progress-circular 
          v-if="loading" 
          :indeterminate="loading" 
          class="align-self-center ma-5"/>
      </div>
      <v-list 
        v-if="!loading" 
        three-line>
        <template v-for="(item, index) in groups">

          <v-list-tile
            :key="index"
            @click.stop="$emit('result',item); $emit('end')"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'GroupSelectDialog',
  props: {
    open: {
      type: Boolean,
      default: false,
    }
  },
  data: function () {
    return {
      groups: [
        {
          id: 0,
          name: 'No connection',
        }
      ],
      loading: true,
    }
  },
  watch: {
    open: function (val) {
      if (val) {
        this.load_groups()
      }
    }
  },
  methods: {
    load_groups() {
      this.loading = true
      this.$store.dispatch('GET_GROUPS').then((result) => {
        this.groups = result.data
        this.loading = false;
      })
    },
  },
}
</script>

<style scoped>

</style>
