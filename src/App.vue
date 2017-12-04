<template>
    <section id="app">
        <navigation></navigation>
        <chat-interface v-if="isConnected"></chat-interface>
        <transition name="fade" mode="out-in">
            <welcome v-if="!isConnected"></welcome>
        </transition>
        <keep-alive>
        <b-modal :active.sync="isComponentModalActive" has-modal-card>
            <connect-to-chat-window></connect-to-chat-window>
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
  import ConnectToChatWindow from '@/components/ConnectToChatWindow.vue'
  import Welcome from '@/components/Welcome.vue'
  import ChatInterface from '@/components/ChatInterface.vue'

  export default {
    name: 'app',
    components: {
      Navigation, ConnectToChatWindow, Welcome, ChatInterface
    },
    data () {
      return {
        isComponentModalActive: false
      }
    },
    computed: {
      isConnected: function () {
        return this.$store.getters.getConnected
      }
    },
    created () {
      this.$bus.$on('show-connect-window-event', (e) => {
        this.isComponentModalActive = true
      })
    }
  }
</script>