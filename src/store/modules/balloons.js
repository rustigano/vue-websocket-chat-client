const state = {
  balloons: [],
  incrementer: 0
}

const getters = {
  getBalloons (state) {
    return state.balloons
  }
}

const mutations = {
  createBalloon (state, {sender, message, whisperTo}) {
    state.incrementer++
    let balloon = {id: state.incrementer, sender: sender, message: message, offset: 25, whisperTo: whisperTo}
    state.balloons.push(balloon)
  },
  deleteBalloon (state, {id}) {
    let index = state.balloons.findIndex(item => item.id === id)
    state.balloons.splice(index, 1)
  },
  moveBalloonsUp (state, {sender, distance}) {
    state.balloons.forEach(function (balloon) {
      if (balloon.sender.id === sender.id) balloon.offset += distance
    })
  },
  truncateBalloonList (state) {
    state.balloons = []
  }
}

const actions = {
  createBalloon (context, {sender, message, whisperTo}) {
    context.commit('createBalloon', {sender, message, whisperTo})
  },
  deleteBalloon (context, id) {
    context.commit('deleteBalloon', id)
  },
  moveBalloonsUp (context, {sender, distance}) {
    context.commit('moveBalloonsUp', {sender, distance})
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
