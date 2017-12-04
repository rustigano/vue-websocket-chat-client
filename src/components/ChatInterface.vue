<template>
    <div class="container is-widescreen">
        <div class="columns">
            <div class="column is-four-fifths">
                <chatroom></chatroom>
            </div>
            <div class="column">
                <user-list class="is-hidden-mobile"></user-list>
                <messages  class="is-hidden-mobile" v-bind:componentHeight="messageListComponentHeight"></messages>
                <message-input v-bind:columnWidth="columnWidth"></message-input>
            </div>
        </div>
    </div>
</template>

<script>
  import Messages from '@/components/Messages.vue'
  import Chatroom from '@/components/Chatroom.vue'
  import UserList from '@/components/UserList.vue'
  import MessageInput from '@/components/MessageInput.vue'

  export default {
    name: 'app',
    components: {
      Chatroom, Messages, UserList, MessageInput
    },
    data: function () {
      return {
        messageListComponentHeight: 25,
        columnWidth: 100
      }
    },
    created () {
      this.$bus.$on('userlist-dimensions-changed-event', (e) => {
        this.$nextTick(function () {
          this.calculateColumnDimensions()
        })
      })
    },
    mounted () {
      this.calculateColumnDimensions()
      window.addEventListener('resize', this.calculateColumnDimensions)
    },
    beforeDestroy () {
      this.$bus.$off('userlist-dimensions-changed-event')
      window.removeEventListener('resize', this.calculateColumnDimensions)
    },
    methods: {
      calculateColumnDimensions () {
        let screenWidth = document.documentElement.clientWidth
        let msgInputElement = document.getElementsByClassName('message-input-container')[0]
        let userlistElement = document.getElementsByClassName('user-list')[0]

        // is the window less than 768?
        // (768px = bulma mobile breakpoint)
        if (screenWidth < 768) {
          // Is mobile - message input element gets same width as the window:
          this.columnWidth = screenWidth
          return
        }
        // Is bigger than mobile - message input element gets width of userlist:
        let chatroomElement = document.getElementsByClassName('chatroom')[0]
        this.messageListComponentHeight = chatroomElement.clientHeight - (userlistElement.clientHeight + msgInputElement.clientHeight)

        this.columnWidth = userlistElement.clientWidth
      }
    }

  }
</script>
