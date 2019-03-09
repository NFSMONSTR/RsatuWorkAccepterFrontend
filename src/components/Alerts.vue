<template>
  <div>
    <alert v-for="message in messages" :key="message.id" :alert_type="message.type">{{ message.text }}</alert>
  </div>
</template>

<script>
import Alert from './Alert'
export default {
  name: 'Alerts',
  components: {Alert},
  data: function () {
    return {
      messages: [],
      messages_counter: 0
    }
  },
  methods: {
    push_message: function (message) {
      message['id'] = this.messages_counter
      this.messages_counter++
      this.messages.push(message)
    },
    push_message_info: function (messageText) {
      let message = {
        type: 'info',
        text: messageText
      }
      this.push_message(message)
    },
    push_message_warning: function (messageText) {
      let message = {
        type: 'warning',
        text: messageText
      }
      this.push_message(message)
    },
    push_message_danger: function (messageText) {
      let message = {
        type: 'danger',
        text: messageText
      }
      this.push_message(message)
    },
    clear_messages: function () {
      this.messages = []
      this.messages_counter = 0
    }
  }
}
</script>

<style scoped>
</style>
