<template>

    <div class="avatar"
         v-bind:style="{ top: user.y + 'px', left: user.x + 'px' }"
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
    props: ['user'],
    data: function () {
      return {
        isDraggingOver: false
      }
    },
    computed: {
      avatarImageSource () {
        if (this.user.avatar === undefined) {
          return 'src/assets/avatar.gif'
        } else {
          return this.user.avatar
        }
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
    methods: {
      toggleWhispering () {
        if (this.$store.getters.getWhisperingTo !== undefined) {
          this.$store.dispatch('setWhisperingTo', undefined)
          this.$toast.open('Whispering ended')
        } else {
          if (this.user.id === this.$store.getters.getMyId) return // It is weird to whisper to yourself
          this.$store.dispatch('setWhisperingTo', this.user.id)
          this.$toast.open('Whispering to ' + this.user.username)
        }
      },
      errorToast (msg) {
        this.$toast.open({
          duration: 5000,
          message: msg,
          position: 'is-bottom',
          type: 'is-danger'
        })
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
        var dt = e.dataTransfer
        if (dt.items) {
          // Use DataTransferItemList interface to access the file(s)
          for (var i = 0; i < dt.items.length; i++) {
            if (dt.items[i].kind === 'file') {
              var file = dt.items[i].getAsFile()
              // console.log('... file[' + i + '"].name = ' + file.name)
              // console.log(file)

              // https://stackoverflow.com/questions/3146483/html5-file-api-read-as-text-and-binary

              // Limit to Max 200k
              if (file.size > (1024 * 200)) {
                this.errorToast('File is too big (' + parseInt(file.size / 1024) + ' kb)!')
                continue
              } else {
                // this.errorToast('File size (' + file.size + ' bytes) ok!')
              }

              if (typeof window.FileReader !== 'function') {
                this.errorToast('The file API isn\'t supported on this browser yet.')
                return
              }

              // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText
              var fr = new FileReader()

              fr.addEventListener('loadend', () => {
                this.$bus.$emit('change-avatar-event', {image: fr.result})
              }, false)
              fr.readAsDataURL(file)
            }
          }
        } else {
          // Use DataTransfer interface to access the file(s)
          for (var j = 0; j < dt.files.length; j++) {
            console.log(`... file[${j}].name = ${dt.files[j].name}`)
          }
        }
      }
    }
  }
</script>