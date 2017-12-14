<template>
    <!--is-transparent-->
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <div class="navbar-item">
                <connection></connection>
            </div>
            <div class="navbar-burger burger" data-target="navbarMain">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div id="navbarMain" class="navbar-menu">
            <div class="navbar-end">
                <div class="navbar-item">

                    <a v-show="isConnected" class="button is-primary"
                       v-bind:class="{ 'is-loading': isDisconnecting}"
                       @click="disconnectFromChat()">
                        Disconnect
                    </a>

                    <a v-show="!isConnected" class="button is-primary"
                       @click="showConnectionWindow()">
                        Connect to the chat
                    </a>

                </div>
            </div>
        </div>
    </nav>
</template>

<script>
  import Connection from '@/components/Connection.vue'

  export default {
    name: 'Navigation',
    data: function () {
      return {
        isDisconnecting: false
      }
    },
    components: {Connection},
    computed: {
      isConnected: function () {
        return this.$store.getters.getConnected
      }
    },
    watch: {
      isConnected: function () {
        this.isDisconnecting = false
      }
    },
    mounted: function () {
      // Get all "navbar-burger" elements
      var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(function ($el) {
          $el.addEventListener('click', function () {
            // Get the target from the "data-target" attribute
            var target = $el.dataset.target
            var $target = document.getElementById(target)

            // Toggle the class on both the "navbar-burger" and the "navbar-menu"
            $el.classList.toggle('is-active')
            $target.classList.toggle('is-active')
          })
        })
      }
    },
    methods: {
      showConnectionWindow () {
        this.$bus.$emit('show-connect-to-chat-dialog-event')
      },
      disconnectFromChat () {
        this.isDisconnecting = true
        this.$bus.$emit('disconnect-event')
      }
    }

  }
</script>