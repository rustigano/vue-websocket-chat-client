<template>
            <b-input
                    class="message-input-container"
                    v-bind:style="{ width: columnWidth + 'px'}"
                    type="textarea"
                    maxlength="250"
                    v-on:keyup.enter.native="sendMsg"
                    v-model="message"
                    ref="messageInputField"
                    placeholder="type your message here and press enter to send..."></b-input>
</template>
<style scoped>
    .message-input-container {
        position: absolute;
        bottom: 0;
    }
</style>
<script>
  // @todo enable / disable input based on isConnected
  export default {
    name: 'MessageInput',
    props: ['columnWidth'],
    data () {
      return {
        message: ''
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.$refs.messageInputField.focus()
      })
    },
    methods: {
      sendMsg () {
        if (this.message.trim() !== '') {
          this.$bus.$emit('message-input-event', {msg: this.message})
          this.message = ''
        }
      }
    }
  }
</script>