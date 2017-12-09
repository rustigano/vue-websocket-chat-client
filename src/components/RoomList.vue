<template>
    <b-collapse class="card room-list" :open.sync="isOpen">
        <div slot="trigger" class="card-header">
            <p class="card-header-title">Rooms</p>
            <a class="card-header-icon">
                <b-icon :icon="isOpen ?
                        'menu-down' : 'menu-up'">
                </b-icon>
            </a>
        </div>
        <div class="card-content">
            <div class="content">
                <room-list-item
                        v-for="(room, index) in rooms"
                        v-bind:room="room"
                        v-bind:index="index"
                        v-bind:key="room.id"
                        :index="index"
                ></room-list-item>
            </div>
        </div>
        <footer class="card-footer">
            <a class="card-footer-item"
               @click="createRoom">Create</a>
        </footer>
    </b-collapse>
</template>
<style scoped>
    .room-list {
        position: relative;
        top: 0;
    }
</style>
<script>
  import RoomListItem from '@/components/RoomListItem.vue'

  export default {
    name: 'RoomList',
    components: {RoomListItem},
    data: function () {
      return {
        isOpen: true
      }
    },
    watch: {
      // When the dimensions of the userlist have changed
      // Collapsable is opened or closed or
      // users have been added or removed
      // fire an event to notify the ChatInterface component
      // so it knows that the height of the
      // messagelist component needs to be re-calculated.
      // The event is fired after a slight delay so we can assume that
      // by that time the re-adjusting of the component
      // (opening or closing animation) has been completed.
      isOpen: function () {
        setTimeout(() => this.$bus.$emit('userlist-dimensions-changed-event'), 1500)
      },
      users: function () {
        setTimeout(() => this.$bus.$emit('userlist-dimensions-changed-event'), 750)
      }
    },
    computed: {
      rooms () {
        return this.$store.getters.getRooms
      }
    },
    methods: {
      createRoom () {
        this.$bus.$emit('create-room-event', {'name': 'The cool new room'})
      }
    }
  }
</script>