<template>
    <div>
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
    data: function () {
      return {
        isMe: false,
        isWhispered: false,
        isWhisperedToMe: false,
        whisperTargetName: ''
      }
    },
    created () {
      this.isMe = this.message.sender === 'me'
      this.isWhispered = this.message.whisperTo !== undefined
      this.isWhisperedToMe = this.message.whisperTo === this.$store.getters.getMyId
      this.whisperTargetName = this.getWhisperTargetName()
    },
    methods: {
      getWhisperTargetName () {
        if (this.isMe && this.isWhispered) {
          let user = this.$store.getters.getUserById(this.message.whisperTo)
          return user === undefined ? 'unknown' : user.username
        } else {
          return ''
        }
      }
    }
  }
</script>
