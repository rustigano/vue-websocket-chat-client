<template>
    <section id="app">
        <navigation></navigation>
        <chat-interface v-if="isConnected"></chat-interface>
        <transition name="fade" mode="out-in">
            <welcome v-if="!isConnected"></welcome>
        </transition>
        <keep-alive>
            <b-modal :active.sync="connectToChatDialogActive" has-modal-card>
                <connect-to-chat-dialog></connect-to-chat-dialog>
            </b-modal>
        </keep-alive>
        <keep-alive>
            <b-modal :active.sync="createRoomWindowActive" has-modal-card>
                <create-room-dialog></create-room-dialog>
            </b-modal>
        </keep-alive>
    </section>

</template>
<style>
    .fade-enter-active {
        transition: opacity 2s
    }

    .fade-leave-active {
        transition: opacity 1s
    }

    .fade-enter, .fade-leave-to {
        opacity: 0
    }
</style>
<script>
  import Navigation from '@/components/Navigation.vue'
  import ConnectToChatDialog from '@/components/ConnectToChatDialog.vue'
  import CreateRoomDialog from '@/components/CreateRoomDialog.vue'
  import Welcome from '@/components/Welcome.vue'
  import ChatInterface from '@/components/ChatInterface.vue'

  export default {
    name: 'app',
    components: {
      Navigation, ConnectToChatDialog, CreateRoomDialog, Welcome, ChatInterface
    },
    data () {
      return {
        connectToChatDialogActive: false,
        createRoomWindowActive: false
      }
    },
    computed: {
      isConnected: function () {
        return this.$store.getters.getConnected
      }
    },
    created () {
      this.$bus.$on('show-connect-to-chat-dialog-event', (e) => {
        this.connectToChatDialogActive = true
      })
      this.$bus.$on('show-create-room-dialog-event', (e) => {
        this.createRoomWindowActive = true
      })
    }
  }
</script>