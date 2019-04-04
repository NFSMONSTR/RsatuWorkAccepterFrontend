<template>
  <v-card flat>
    <v-card-title primary-title class="title">Добавить документ</v-card-title>
    <v-card-text>
      <form>
        Тип документа:
        <v-radio-group v-model="is_link" required>
          <v-radio
            label="Ссылка"
            :value="true"
          ></v-radio>
          <v-radio
            label="Файл"
            :value="false"
          ></v-radio>
        </v-radio-group>

        <v-text-field
          v-if="is_link"
          v-model="name"
          label="Название"
          required
        ></v-text-field>

        <v-text-field
          v-if="is_link"
          v-model="link"
          label="Ссылка"
          required
        ></v-text-field>

        <input
          v-if="!is_link"
          type="file"
          @change="onFilePicked"
        >
        <br v-if="!is_link">
        <br v-if="!is_link">

        <v-btn @click="submit">Добавить</v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AddAttachment',
  data: function () {
    return {
      is_link: true,
      name: '',
      link: '',
      file_name: '',
      file_data: ''
    }
  },
  methods: {
    submit: function () {
      let payload
      if (this.is_link) {
        payload = {
          is_link: this.is_link,
          name: this.name,
          link: this.link
        }
      } else {
        payload = {
          is_link: this.is_link,
          name: this.file_name,
          file: this.file_data
        }
      }
      this.$store.dispatch('ADD_ATTACHMENT', payload).then()
    },
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
    }
  }
}
</script>

<style scoped>

</style>
