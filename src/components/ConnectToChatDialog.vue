<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Connect to chat</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Your username">
                    <b-input
                            type="username"
                            ref="usernameInput"
                            v-model="username"
                            placeholder="Your username"
                            required>
                    </b-input>
                </b-field>
                <b-field>
                    <b-select
                            placeholder="choose a server"
                            v-model="server"
                            expanded>
                        <option value="ws://localhost:3001">ws://localhost:3001</option>
                    </b-select>
                </b-field>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Close</button>
                <button
                        class="button is-primary"
                        v-bind:class="{'is-loading': connecting}"
                        @click.self.prevent="connect()">Connect
                </button>
            </footer>
        </div>
    </form>
</template>

<script>
  export default {
    data: function () {
      return {
        username: this.$store.getters.getUsername,
        server: this.$store.getters.getServer,
        connecting: false
      }
    },
    created () {
      this.$bus.$on('connected-event', (e) => {
        this.connecting = false
        this.$parent.close()
      })
    },
    mounted () {
      this.$nextTick(() => {
        this.$refs.usernameInput.focus()
      })
    },
    beforeDestroy () {
      this.$bus.$off('connected-event')
    },
    methods: {
      connect () {
        this.$store.dispatch('setUsername', this.username)
        this.$store.dispatch('setServer', this.server)
        this.connecting = true
        this.$bus.$emit('connect-to-chat-event')
      }
    }
  }
</script>

<style scoped>
    .modal-card {
        width: auto;
    }
</style>