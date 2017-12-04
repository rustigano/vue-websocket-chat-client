const state = {
  messages: [],
  incrementer: 0
}

const getters = {
  getMessages (state) {
    return state.messages
  }
}

const mutations = {
  createMessage (state, {sender, message, whisperTo}) {
    state.incrementer++
    let msg = {id: state.incrementer, sender: sender, msg: message, whisperTo: whisperTo}
    state.messages.push(msg)
  },
  truncateMessageList (state) {
    state.messages = []
  }
}

const actions = {
  createMessage (context, {sender, message, whisperTo}) {
    context.commit('createMessage', {sender, message, whisperTo})
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
