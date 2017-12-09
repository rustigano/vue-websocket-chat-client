<template>
    <div @click="moveToRoom"
    v-bind:class="{vet:currentRoom}"
    ><span> <template v-if="currentRoom">&gt;</template>{{ room.name }}</span> <span v-show="isMine">(yours &#129412;)</span></div>
</template>
<style>
    .vet {
        font-weight: bold;
    }
</style>
<script>
  export default {
    name: 'Room',
    props: ['room'],
    computed: {
      isMine () {
        return this.room.creatorid === this.$store.getters.getMyId
      },
      currentRoom () {
        return this.room.id === this.$store.getters.getRoom.id
      }
    },
    methods: {
      moveToRoom () {
        this.$bus.$emit('move-to-room-event', {'roomId': this.room.id})
      }
    }
  }
</script>
