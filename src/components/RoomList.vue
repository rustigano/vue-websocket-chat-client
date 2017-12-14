<template>

    <div class="content">
        <section v-bind:style="{ height: componentHeight - 75  + 'px'}">
            <b-table
                    :data="rooms"

                    :bordered="true"
                    :striped="true"
                    :narrowed="false"
                    :hoverable="true">

                <template slot-scope="props">
                    <b-table-column label="rooms">
                        <b-icon
                                icon="account-multiple"
                                v-bind:style="{color: props.row.backgroundColor}">
                        </b-icon>
                        <a class="button"
                           v-bind:class="{vet: isCurrentRoom(props.row)}"
                           @click="moveToRoom(props.row)">
                            {{ props.row.name }}
                        </a>
                        <template v-if="isMine(props.row)">(yours &#129412;)
                            <a class="button is-small is-white"
                               @click="confirmDelete(props.row)"><b-icon icon="minus-circle" type="is-danger"></b-icon></a>
                        </template>
                    </b-table-column>
                </template>

            </b-table>
        </section>
        <footer>
            <a class="button is-primary"
               @click="createRoom()">
                <b-icon icon="account-multiple-plus"></b-icon>
                <span>Create</span>
            </a>
        </footer>
    </div>

</template>
<style scoped>
    .vet {
        font-weight: bold
    }

    .content {
        height: 100%;
    }

    section {
        overflow: auto;
        width: auto;
        height: auto;
    }

    footer {
        margin-top: 10px;
        position: relative;
        bottom: 0;
    }
</style>

<script>
  export default {
    name: 'RoomList',
    props: ['componentHeight'],
    computed: {
      rooms () {
        return this.$store.getters.getRooms
      }
    },
    methods: {
      createRoom () {
        this.$bus.$emit('show-create-room-dialog-event')
      },
      moveToRoom (targetRoom) {
        if (this.isCurrentRoom(targetRoom)) {
          this.$toast.open({
            message: 'You are already in this room',
            queue: false,
            type: 'is-warning'
          })
        } else {
          this.$bus.$emit('move-to-room-event', {'roomId': targetRoom.id})
        }
      },
      confirmDelete (targetRoom) {
        this.$dialog.confirm({
          title: `Deleting room`,
          message: `Are you sure you want to <b>delete</b> the room'${targetRoom.name}'? This action cannot be undone.`,
          confirmText: 'Delete room',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.deleteRoom(targetRoom)
        })
      },
      deleteRoom (targetRoom) {
        this.$toast.open('Room deleted!')
        this.$bus.$emit('delete-room-event', {'roomId': targetRoom.id})
      },
      isMine (room) {
        return room.creatorId === this.$store.getters.getMyId
      },
      isCurrentRoom (room) {
        return room.id === this.$store.getters.getRoom.id
      }
    }
  }
</script>