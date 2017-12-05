<template>
    <div class="card balloon"
         v-bind:class="{whispered: isWhispered}"
         v-bind:style="{ top: (balloon.sender.y - (balloon.offset)) + 'px', left: balloon.sender.x + 'px' }">
        <div class="card-content">
            <div class="content">
                <template v-if="isWhispered"><em>...{{ balloon.message }}...</em></template>
                <template v-else>{{ balloon.message }}</template>
            </div>
        </div>
    </div>

</template>


<style scoped>
    .balloon {
        word-break: break-all;
        max-width: 250px;
        border-radius: 25px;
        position: absolute;
        transition: all 1s;
    }
    .balloon.whispered {
        border-color: black;
        border-style: dotted solid;
    }
</style>
<script>
  export default {
    name: 'TextBalloon',
    props: ['balloon'],
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
        this.$store.dispatch('moveBalloonsUp', {sender: this.balloon.sender, distance: this.cardHeight})
      }
    }
  }
</script>