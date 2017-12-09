<template>
    <div class="block">
        <b-icon
                v-if="isConnected"
                icon="lan-connect"
                type="is-success">
        </b-icon>
        <b-icon
                type="is-danger"
                v-else
                icon="lan-disconnect">
        </b-icon>
    </div>
</template>
<script>
  export default {
    name: 'Connection',
    data: function () {
      return {
        currentlyTryingToPing: false,
        conn: undefined,
        clientPingPongInterval: 0,
        connecting: false
      }
    },
    computed: {
      isConnected: function () {
        return this.$store.getters.getConnected
      }
    },
    created () {
      this.$bus.$on('connect-to-chat-event', (e) => {
        this.createConnection()
      })
      this.$bus.$on('disconnect-event', (e) => {
        clearInterval(this.clientPingPongInterval)
        this.conn.close()
      })
      this.$bus.$on('message-input-event', (e) => {
        this.conn.send(this.createClientMessage('msg', {
          'msg': e.msg,
          'whisperTo': this.$store.getters.getWhisperingTo
        }))
      })
      this.$bus.$on('move-my-avatar-event', (e) => {
        this.conn.send(this.createClientMessage('pos', {'x': e.x, 'y': e.y}))
      })
      this.$bus.$on('change-avatar-event', (e) => {
        this.conn.send(this.createClientMessage('set-avatar', {'image': e.image}))
      })
      this.$bus.$on('move-to-room-event', (e) => {
        this.conn.send(this.createClientMessage('move-to-room', {'id': e.roomId}))
      })
      this.$bus.$on('create-room-event', (e) => {
        this.conn.send(this.createClientMessage('create-room', {'name': e.name}))
      })
    },
    methods: {
      createConnection: function () {
        if (this.conn !== undefined) return
        this.conn = new WebSocket(this.$store.getters.getServer + '/?username=' + this.$store.getters.getUsername)
        this.conn.onopen = (e) => {
          this.$store.dispatch('setConnected', true)
          // Set up client side ping pong each 15 secs:
          // @todo actie ondernemen (isConnected = false) wanneer
          // er na 30 sec nog geen serverpong is gekomen
          this.clientPingPongInterval = setInterval(() => {
            this.setIsPinging(true)
            this.conn.send(this.createClientMessage('client-ping', {}))
          }, 15000)
          this.$bus.$emit('connected-event')
        }
        this.conn.onclose = (e) => {
          this.conn = undefined
          this.$store.dispatch('resetStore')
          this.$snackbar.open({
            duration: 10000,
            message: 'Connection lost',
            type: 'is-danger',
            actionText: 'Reconnect',
            onAction: () => {
              this.createConnection()
            }
          })
        }
        this.conn.onerror = (e) => {
          // console.log('conn.onerror', e)
        }
        this.conn.onmessage = (e) => {
          var response = JSON.parse(e.data)
          // console.log(response)

          var sender
          var senderName = response.sender
          if (response.sender !== '') {
            sender = this.$store.getters.getUserById(response.sender)
            if (sender !== undefined) {
              senderName = response.sender === this.$store.getters.getMyId ? 'You' : sender.username
            }
          }

          switch (response.type) {
            case 'connect':
              this.$store.dispatch('setMyId', response.data.key)
              this.$store.dispatch('setUsers', response.data.users)
              this.$store.dispatch('setRooms', response.data.rooms)
              this.$store.dispatch('setRoom', response.data.room.id)
              this.$toast.open('Welcome to the chat')
              break
            case 'disconnect':
              clearInterval(this.clientPingPongInterval)
              if (this.$store.getters.getWhisperingTo === response.sender) this.$store.dispatch('setWhisperingTo', undefined)
              this.$toast.open(senderName + ' has left the chat')
              this.$store.dispatch('deleteUser', response.sender)
              break
            case 'server-pong':
              this.setIsPinging(false)
              break
            case 'new-user':
              if (sender === undefined) {
                if (this.$store.getters.getUserById(response.sender) !== undefined) return
                this.$store.dispatch('createUser', {
                  'id': response.sender,
                  'username': response.data.username,
                  'x': 0,
                  'y': 0,
                  'avatar': undefined
                })
                let u = this.$store.getters.getUserById(response.sender)
                senderName = u.username
                this.$toast.open(senderName + ' has joined the chat')
              }
              break
            case 'set-avatar':
              this.$store.dispatch('changeAvatar', {id: response.sender, image: response.data.image})
              this.$toast.open(senderName + ' changed avatar')
              break
            case 'msg':
              // if (response.sender === this.$store.getters.getMyId) senderName = 'me'
              this.$store.dispatch('createMessage', {
                sender: senderName,
                message: response.data.msg,
                whisperTo: response.data.whisperTo
              })
              this.$store.dispatch('createBalloon', {
                sender: sender,
                message: response.data.msg,
                whisperTo: response.data.whisperTo
              })
              break
            case 'pos':
              this.$store.dispatch('moveAvatar', {id: response.sender, x: response.data.x, y: response.data.y})
              break
            case 'create-room':
              this.$store.dispatch('createRoom', response.data.room)
              if (response.sender === this.$store.getters.getMyId) {
                this.$toast.open('Room created')
              }
              break
            case 'enters-room':
              // als ik dan room en users vervangen
              if (response.sender === this.$store.getters.getMyId) {
                this.$store.dispatch('truncateUserList')
                  .then(this.$store.dispatch('setRoom', response.data.roomId))
                  .then(this.$store.dispatch('setUsers', response.data.users))
                  .then(this.$toast.open('You entered the room'))
              } else {
                this.$store.dispatch('createUser', response.data.user).then(
                  this.$toast.open(this.getUsername(response.data.user.id) + ' entered the room')
                )
              }
              break
            case 'leaves-room':
              // user-list aanpassen
              this.$store.dispatch('deleteUser', response.sender)
              // this.$store.dispatch('setRoom', response.data.room)
              this.$toast.open(senderName + ' left to other room')
              break
            default:
              console.log('unknown response type')
              break
          }
        }
      },
      getUsername (senderId) {
        let senderName = senderId
        if (senderId !== '') {
          let sender = this.$store.getters.getUserById(senderId)
          if (sender !== undefined) {
            senderName = senderId === this.$store.getters.getMyId ? 'You' : sender.username
          }
        }
        return senderName
      },
      setIsPinging (value) {
        this.currentlyTryingToPing = value
      },
      createClientMessage (type, content) {
        // , 'date': new Date()
        return JSON.stringify({'type': type, 'data': content})
      }
    }
  }
</script>