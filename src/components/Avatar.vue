<template>

    <div class="avatar"
         v-bind:style="{ top: (roomRect.y + user.y) + 'px', left: (roomRect.x + user.x) + 'px' }"
         v-bind:class="{ 'is-dragging-over-avatar': isDraggingOver, 'avatar-not-part-of-whispering-session': !isPartOfWhisperSession}"
         @dragover.prevent="dragOverHandler"
         @dragleave.prevent="dragLeaveHandler"
         @drop="dropHandler"
         @click.prevent.stop="toggleWhispering">
        <img v-bind:src="avatarImageSource">
        <div class="username">{{ user.username }}</div>
    </div>

</template>
<script>
  export default {
    name: 'Avatar',
    props: ['user', 'roomRect'],
    data: function () {
      return {
        // The maximum allowed filesize for an
        // avatar-image (in kilobytes) 'maxFileSize: 200' equals 200kb
        maxFileSize: 200,
        isDraggingOver: false,
        // Defaults to smileyface gif image
        defaultAvatarImage: 'src/assets/avatar.gif'
      }
    },
    computed: {
      avatarImageSource () {
        return this.user.avatar === undefined ? this.defaultAvatarImage : this.user.avatar
      },
      // @todo refactor whispering
      isPartOfWhisperSession () {
        if (this.$store.getters.getWhisperingTo !== undefined) {
          if (this.$store.getters.getWhisperingTo === this.user.id || this.user.id === this.$store.getters.getMyId) {
            return true
          }
        } else {
          return true
        }
        return false
      }
    },
    created () {
      this.$bus.$on('move-to-room-event', (e) => {
        if (this.$store.getters.getWhisperingTo !== undefined) this.$store.dispatch('setWhisperingTo', undefined)
      })
    },
    methods: {
      toggleWhispering () {
        if (this.user.id === this.$store.getters.getMyId) {
          // (It is weird to whisper to yourself)
          if (this.$store.getters.getWhisperingTo === undefined) {
            this.$toast.open({
              message: 'Click on another user to send a private message',
              type: 'is-info',
              queue: false
            })
          } else {
            let whisperTargetUser = this.$store.getters.getUserById(this.$store.getters.getWhisperingTo)
            this.$toast.open({
              message: `Click on ${whisperTargetUser.username} to end whispering`,
              type: 'is-info',
              queue: false
            })
          }
        } else {
          if (this.$store.getters.getWhisperingTo !== undefined) {
            this.$store.dispatch('setWhisperingTo', undefined)
            this.$toast.open({
              message: 'Whispering ended',
              type: 'is-info',
              queue: false
            })
          } else {
            this.$store.dispatch('setWhisperingTo', this.user.id)
            this.$toast.open({
              message: `Whispering to ${this.user.username}`,
              type: 'is-info',
              queue: false
            })
          }
        }
      },
      dragOverHandler (e) {
        if (this.user.id === this.$store.getters.getMyId) this.isDraggingOver = true
      },
      dragLeaveHandler (e) {
        this.isDraggingOver = false
      },
      dropHandler (e) {
        if (this.user.id !== this.$store.getters.getMyId) return
        e.preventDefault()
        e.stopPropagation()
        this.isDraggingOver = false
        // @todo Do not allow dropping of multiple files or only take first file and display notification
        // console.log('dropped', e)
        let dt = e.dataTransfer
        if (dt.items) {
          // Use DataTransferItemList interface to access the file(s)
          for (let i = 0; i < dt.items.length; i++) {
            if (dt.items[i].kind === 'file') {
              let file = dt.items[i].getAsFile()

              // console.log('... file[' + i + '"].name = ' + file.name)
              // console.log(file)
              // https://stackoverflow.com/questions/3146483/html5-file-api-read-as-text-and-binary

              // Limit filesize:
              if (file.size > (1024 * this.maxFileSize)) {
                let actualFileSize = Math.round(file.size / 1024)
                this.$toast.open({
                  duration: 5000,
                  message: `File is too big (${actualFileSize} kb)!`,
                  position: 'is-bottom',
                  type: 'is-warning'
                })
                continue
              } else {
                // console.log(`File size ${file.size} bytes) ok!`)
              }

              if (typeof window.FileReader !== 'function') {
                this.$toast.open({
                  duration: 5000,
                  message: `Unable to change avatar (The file API isn't supported on this browser yet.)`,
                  position: 'is-bottom',
                  type: 'is-danger'
                })
                return
              }

              // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText
              let fr = new FileReader()

              fr.addEventListener('loadend', () => {
                this.$bus.$emit('change-avatar-event', {image: fr.result})
              }, false)
              fr.readAsDataURL(file)
            }
          }
        } else {
          // Use DataTransfer interface to access the file(s)
          for (let j = 0; j < dt.files.length; j++) {
            console.log(`... file[${j}].name = ${dt.files[j].name}`)
          }
        }
      }
    }
  }
</script>