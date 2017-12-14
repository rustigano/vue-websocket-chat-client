<template>
    <div class="card balloon"
         v-bind:class="{whispered: isWhispered}"
         v-bind:style="{ top: (roomRect.y + balloon.sender.y - (balloon.offset)) + 'px', left: roomRect.x + balloon.sender.x + 'px' }">
        <div class="card-content">
            <div class="content">
                <template v-if="isWhispered"><em>...{{ balloon.message }}...</em></template>
                <template v-else>{{ balloon.message }}</template>
            </div>
        </div>
    </div>

</template>

<script>
  export default {
    name: 'TextBalloon',
    props: ['balloon', 'roomRect'],
    data: function () {
      return {
        cardHeight: 25
      }
    },
    computed: {
      isWhispered () {
        return this.balloon.whisperTo !== undefined
      }
    },
    mounted () {
      this.calculateBalloonHeight()
      setTimeout(() => { this.$store.dispatch('deleteBalloon', {id: this.balloon.id}) }, 5000)
    },
    methods: {
      calculateBalloonHeight () {
        let cards = document.getElementsByClassName('balloon')
        let card = cards[cards.length - 1]
        this.cardHeight = card.clientHeight
        // The +5 is for some space between the balloons
        this.$store.dispatch('moveBalloonsUp', {sender: this.balloon.sender, distance: this.cardHeight + 5})
      }
    }
  }
</script>