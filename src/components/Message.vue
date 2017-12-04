<template>
    <div>
        <!-- (unicorn) <span v-if="isMe">&#129412;</span>-->
        <span
                class="tag"
                v-bind:class="{ 'is-info': !isMe, 'is-light': isMe}">
                {{ message.sender }}
                <template v-if="isWhisperedToMe"> &gt; me</template>
                <template v-if="isMe && isWhispered"> &gt; {{ whisperTargetName }}</template>
                </span>
        <template v-if="isWhispered"><em>...{{ message.msg }}...</em></template>
        <template v-else>{{ message.msg }}</template>
    </div>
</template>
<script>
  export default {
    name: 'Message',
    props: ['message'],
    computed: {
      isMe () {
        return this.message.sender === 'me'
      },
      isWhispered () {
        return this.message.whisperTo !== undefined
      },
      isWhisperedToMe () {
        return this.message.whisperTo === this.$store.getters.getMyId
      },
      whisperTargetName () {
        if (this.isMe && this.isWhispered) {
          let user = this.$store.getters.getUserById(this.message.whisperTo)
          if (user !== undefined) return user.username
          return 'unknown'
        } else {
          return ''
        }
      }
    }
  }
</script>
