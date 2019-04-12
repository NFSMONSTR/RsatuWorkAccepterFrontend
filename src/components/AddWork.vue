<template>
  <v-card flat>
    <v-card-title primary-title class="title">Добавить работу</v-card-title>
    <v-card-text>
      <form>

        <v-text-field
          v-model="work.name"
          label="Название работы"
          required
        ></v-text-field>

        <v-text-field
          v-model="work.subject"
          label="Предмет"
          required
        ></v-text-field>

        <v-text-field
          v-model="work.short_description"
          label="Краткое описание"
          required
        ></v-text-field>

        Тип разметки описания:
        <v-radio-group v-model="work.markup" required>
          <v-radio
            label="Markdown"
            :value="0"
          ></v-radio>
          <v-radio
            label="MathML, TeX, ASCIIMath (MathJax)"
            :value="1"
          ></v-radio>
        </v-radio-group>

        <v-textarea
          box
          label="Описание работы"
          auto-grow
          v-model="work.description"
        ></v-textarea>

        <v-expansion-panel>
          <v-expansion-panel-content>
            <template v-slot:header>
              <div>Превью описания</div>
            </template>
            <v-card>
              <v-card-text v-if="work.markup===0"><vue-markdown :source="work.description"></vue-markdown></v-card-text>
              <v-card-text v-else><vue-mathjax :formula="work.description"></vue-mathjax></v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-btn color="primary" @click="submit">Добавить работу</v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import VueMathjax from '@/components/VueMathjax'

export default {
  name: 'AddWork',
  components: {
    VueMarkdown,
    VueMathjax
  },
  data: function () {
    return {
      work: {
        name: '',
        subject: '',
        short_description: '',
        markup: 0,
        description: ''
      }
    }
  },
  methods: {
    submit: function () {
      this.$store.dispatch('ADD_WORK', this.work).then((result) => {
        this.$router.push({ name: 'works_list' })
      })
    }
  }
}
</script>

<style scoped>

</style>
