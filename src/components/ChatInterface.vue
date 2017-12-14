<template>
    <div class="container is-widescreen">
        <div class="columns">
            <div class="column">
                <room-list v-bind:componentHeight="roomListComponentHeight"></room-list>
            </div>

            <div class="column is-three-fifths">
                <chatroom></chatroom>

            </div>
            <div class="column">
                <user-list class="is-hidden-mobile"></user-list>
                <messages class="is-hidden-mobile" v-bind:componentHeight="messageListComponentHeight"></messages>
                <message-input v-bind:columnWidth="columnWidth"></message-input>
            </div>
        </div>
    </div>
</template>

<script>
  import Messages from '@/components/Messages.vue'
  import Chatroom from '@/components/Chatroom.vue'
  import UserList from '@/components/UserList.vue'
  import RoomList from '@/components/RoomList.vue'
  import MessageInput from '@/components/MessageInput.vue'

  export default {
    name: 'app',
    components: {
      Chatroom, Messages, UserList, RoomList, MessageInput
    },
    data: function () {
      return {
        roomListComponentHeight: 25,
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
        } else {
          // Is bigger than mobile - message input element gets width of userlist:
          let chatroomElement = document.getElementsByClassName('chatroom')[0]
          this.messageListComponentHeight = chatroomElement.clientHeight - (userlistElement.clientHeight + msgInputElement.clientHeight)
          this.roomListComponentHeight = chatroomElement.clientHeight
          this.columnWidth = userlistElement.clientWidth
        }
      }
    }
  }
</script>
