<template>

    <div class="chatroom"
         v-bind:style="{ 'background-color': roomBackgroundColor}"
         @dragover.prevent="dragOverHandler"
         @drop="dropHandler"
         @click="moveMyAvatar">
        <div class="room-name">{{ roomName}}</div>

        <!--<video src=""></video>-->
        <transition-group name="list" tag="p">
            <avatar
                    v-for="(user, index) in users"
                    v-bind:user="user"
                    v-bind:index="index"
                    v-bind:key="user.id"
                    :index="index"
            ></avatar>
        </transition-group>
        <transition-group name="list" tag="p">
            <text-balloon
                    v-for="(balloon, index) in balloons"
                    v-bind:balloon="balloon"
                    v-bind:index="index"
                    v-bind:key="balloon.id"
                    :index="index"
            ></text-balloon>
        </transition-group>

    </div>
</template>
<style>
    .chatroom {
        height: 90vh;
        transition: background-color 1s ease;
    }

    .room-name {
        position: relative;
        background-color: black;
        color: #ffffff;
        border: 1px solid #eeeeee;
        left: 2px;
        top: 2px;
        font-size: 0.7em;
        width: 10em;
        height: 2.2em;
        padding-top: 5px;
        padding-left: 5px;
    }

    .is-dragging-over-avatar {
        border: 5px solid greenyellow;
    }

    .avatar {
        position: absolute;
        max-width: 100px;
        text-align: center;
        transition: top 1s ease, left 1s ease, opacity 0.7s ease; /* Animate avatar when it receives a  new position */
    }

    .avatar > .username {
        background-color: black;
        color: yellow;
        text-align: center;
    }

    .avatar > img {
        max-width: 90px;
    }

    .avatar-not-part-of-whispering-session {
        opacity: 0.5;
    }

    .list-enter-active, .list-leave-active {
        transition: top 1s, left 1s, opacity 1s;
    }

    /* Animate avatar when it enters or leaves the chatroom */
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */
    {
        opacity: 0;
        transform: translateY(30px);
    }

</style>
<script>
  import Avatar from '@/components/Avatar.vue'
  import TextBalloon from '@/components/TextBalloon.vue'

  export default {
    name: 'Chatroom',
    components: {Avatar, TextBalloon},
    computed: {
      roomName () {
        return this.$store.getters.getRoom.name
      },
      roomBackgroundColor () {
        if (this.whisperSessionActive) {
          return '#111111'
        } else {
          return this.$store.getters.getRoom.backgroundColor
        }
      },
      users () {
        return this.$store.getters.getUsers
      },
      balloons () {
        return this.$store.getters.getBalloons
      },
      whisperSessionActive () {
        if (this.$store.getters.getWhisperingTo !== undefined) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      moveMyAvatar (e) {
        let x = e.offsetX
        let y = e.offsetY
        this.$bus.$emit('move-my-avatar-event', {'x': x, 'y': y})
      },
      dragOverHandler (e) {},
      dropHandler (e) {
        this.$snackbar.open({
          duration: 5000,
          message: 'Drop the image onto your avatar to change.',
          position: 'is-bottom',
          type: 'is-danger'
        })
        e.preventDefault()
        e.stopPropagation()
      }
    }
  }
</script>