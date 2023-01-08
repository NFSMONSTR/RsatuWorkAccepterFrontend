<template>
  <v-dialog
    v-model="open"
    persistent
    max-width="600"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Изменить аватар</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-flex xs12>
            <input
              type="file"
              @change="onFilePicked"
            >
          </v-flex>
          <v-flex xs12>
            <v-btn 
              :disabled="file_data===''" 
              color="success" 
              block 
              @click="uploadAvatar()">Загрузить аватар</v-btn>
          </v-flex>
          <v-flex xs12>
            <v-btn 
              color="error" 
              block 
              @click="removeAvatar()">Удалить аватар</v-btn>
          </v-flex>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn 
          color="blue darken-1" 
          flat 
          @click="$emit('end')">Закрыть</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AvatarDialog',
  props: ['open'],
  data: function () {
    return {
      file_name: '',
      file_data: ''
    }
  },
  methods: {
    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.file_name = files[0].name

        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.file_data = fr.result
        })
      } else {
        this.file_name = ''
        this.file_data = ''
      }
    },
    uploadAvatar () {
      if ((this.file_name !== '') && (this.file_data !== '')) {
        this.$store.dispatch('ADD_AVATAR', { 'file': this.file_data }).then((result) => {
          this.$emit('update')
          this.$emit('end')
        })
      }
    },
    removeAvatar () {
      this.$store.dispatch('DELETE_AVATAR').then()
      this.$emit('update')
      this.$emit('end')
    }
  }
}
</script>

<style scoped>

</style>
