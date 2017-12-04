<template>
    <div class="box message-input-container"
         v-bind:style="{ width: columnWidth + 'px'}">
        <b-field>
            <b-input
                    type="textarea"
                    maxlength="250"
                    v-on:keyup.enter.native="sendMsg"
                    v-model="message"
                    ref="messageInputField"
                    placeholder="type your message here..."></b-input>
        </b-field>
        <button class="button is-primary is-pulled-right" @click="sendMsg()">
            Send
        </button>
    </div>
</template>
<style scoped>
    .message-input-container {
        /*height: 250px;*/
        position: absolute;
        /*background-color: white;*/
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