<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Create a new room</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Name of the room">
                    <b-input
                            ref="roomNameInput"
                            v-model="roomName"
                            placeholder="The tropical room"
                            required>
                    </b-input>
                </b-field>
                <b-field label="Backgroundcolor of the room">
                    <color-picker :value="colors" @input="updateValue"></color-picker>
                    <!--<color-picker v-model="colors" />-->
                </b-field>
            </section>

            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Close</button>
                <button
                        class="button is-primary"
                        @click.self.prevent="createRoom()">Go
                </button>
            </footer>
        </div>
    </form>
</template>

<script>
  // , Sketch
  import { Compact } from 'vue-color'

  /* var defaultProps = {
    hex: '#194d33',
    hsl: {
      h: 150,
      s: 0.5,
      l: 0.2,
      a: 1
    },
    hsv: {
      h: 150,
      s: 0.66,
      v: 0.30,
      a: 1
    },
    rgba: {
      r: 25,
      g: 77,
      b: 51,
      a: 1
    },
    a: 1
  } */

  export default {
    components: {
      'color-picker': Compact /* Sketch */
    },
    data: function () {
      return {
        roomName: '',
        colors: {
          hex: 'red'
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.$refs.roomNameInput.focus()
      })
    },
    methods: {
      createRoom () {
        if (this.roomName === '') return
        this.$bus.$emit('create-room-event', {'room': {'name': this.roomName, 'backgroundColor': this.colors.hex}})
        this.$parent.close()
      },
      updateValue (e) {
        this.colors.hex = e.hex
      }
    }
  }
</script>

<style scoped>
    .modal-card {
        width: auto;
    }
</style>