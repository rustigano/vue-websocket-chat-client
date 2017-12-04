const state = {
  username: 'Tobias',
  server: 'ws://localhost:3001'
}

const getters = {
  getUsername (state) {
    return state.username
  },
  getServer (state) {
    return state.server
  }
}

const mutations = {
  setUsername (state, username) {
    state.username = username
  },
  setServer (state, server) {
    state.server = server
  }
}

const actions = {
  setUsername (context, username) {
    context.commit('setUsername', username)
  },
  setServer (context, server) {
    context.commit('setServer', server)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
