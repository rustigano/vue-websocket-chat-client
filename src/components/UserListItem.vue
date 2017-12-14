<template>
    <tr>
        <td>

        <span v-if="isMe">&#129412; you <em>({{ user.username }})</em></span>
        <span v-else>{{ user.username }}</span>
<!--        <a class="button is-small" @click="startVideo()">
            <b-icon
                    icon="video"
                    type="is-info">
            </b-icon>
        </a>-->
        </td>
    </tr>
</template>
<script>
  // import Peer from 'simple-peer'

  export default {
    name: 'User',
    props: ['user'],
    computed: {
      isMe () {
        return this.user.id === this.$store.getters.getMyId
      }
    }/*,
    methods: {
      startVideo: function () {
        console.log('startVideo')
        navigator.mediaDevices.getUserMedia({video: {width: 1280, height: 720}, audio: false})
          .then((mediaStream) => {
            var video = document.querySelector('video')
            video.srcObject = mediaStream
            video.onloadedmetadata = (e) => { video.play() }
            console.log('started')
            var peer = new Peer({
              initiator: true,
              trickle: false
            })
            peer.on('signal', (data) => { console.log('signal', JSON.stringify(data)) })
          })
          .catch((err) => {
            console.log(err.name + ': ' + err.message)
            this.$snackbar.open({
              duration: 10000,
              message: 'Error ' + err.name,
              type: 'is-danger',
              actionText: 'Retry',
              onAction: () => {
                this.startVideo()
              }
            })
          }) // always check for errors at the end.
      }
    }  */
  }
</script>
