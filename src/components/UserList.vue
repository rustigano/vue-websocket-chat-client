<template>
    <b-collapse class="card user-list" :open.sync="isOpen">
        <div slot="trigger" class="card-header">
            <p class="card-header-title">Online now</p>
            <a class="card-header-icon">
                <b-icon :icon="isOpen ?
                        'menu-down' : 'menu-up'">
                </b-icon>
            </a>
        </div>
        <div class="card-content">
            <div class="content">
                <user-list-item
                        v-for="(user, index) in users"
                        v-bind:user="user"
                        v-bind:index="index"
                        v-bind:key="user.id"
                        :index="index"
                ></user-list-item>
            </div>
        </div>
    </b-collapse>
</template>
<style scoped>
    .user-list {
        position: relative;
        top: 0;
    }
</style>
<script>
  import UserListItem from '@/components/UserListItem.vue'

  export default {
    name: 'Users',
    components: {UserListItem},
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
      users () {
        return this.$store.getters.getUsers
      }
    }
  }
</script>