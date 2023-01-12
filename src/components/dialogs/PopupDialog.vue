<template>
  <v-dialog
    v-model="open"
    persistent
    width="500"
  >

    <v-card>
      <v-card-title
        class="headline lighten-1"
      >
        Подтвердите действие
      </v-card-title>

      <v-card-text>
        Данное действие нельзя отменить. <slot/>
      </v-card-text>

      <v-divider/>

      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="primary"
          flat
          @click="$emit('no'); $emit('end')"
        >
          Нет
        </v-btn>
        <v-btn
          color="primary"
          flat
          @click="$emit('yes'); $emit('end')"
        >
          Да
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'PopupDialog',
  props: {
    open: {
      type: Boolean,
      default: false,
    }
  },
}
</script>

<style scoped>

</style>
