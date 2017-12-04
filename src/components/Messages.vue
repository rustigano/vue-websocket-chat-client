<template>
    <div id="message-list"
         v-bind:style="{ height: (componentHeight - 25) + 'px'}">
        <message
                v-for="(message, index) in messages"
                v-bind:message="message"
                v-bind:index="index"
                v-bind:key="message.id"
                :index="index"
        ></message>
    </div>
</template>
<style>
    #message-list {
        position: relative;
        overflow: auto;
        /*height: auto;*/
        width: auto;
        margin-top: 25px;
        /*margin-bottom: 150px;*/
        /*bottom: 150px;*/
    }
</style>
<script>
  import Message from '@/components/Message.vue'

  export default {
    name: 'Messages',
    props: ['componentHeight'],
    components: {Message},
    computed: {
      messages () {
        return this.$store.getters.getMessages
      }
    },
    watch: {
      // When a new message is added to
      // the messages,
      // wait 200ms for the DOM to be updated
      // and then scroll to the last message
      // so the user can see it
      messages: function () {
        setTimeout(() => this.scrollToLastMessage(), 200)
      }
    },
    methods: {
      scrollToLastMessage () {
        this.$el.scrollTop = 99999999999
      }
    }
  }
</script>