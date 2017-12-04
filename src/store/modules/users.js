import User from '@/store/modules/models/User.js'

const state = {
  myId: undefined,
  connected: false,
  users: [],
  whisperingTo: undefined
}

const getters = {
  getConnected (state) {
    return state.connected
  },
  getMyId (state) {
    return state.myId
  },
  getUserById: (state, getters) => (id) => {
    const user = state.users.find(user => user.id === id)
    return user
  },
  getUsers (state) {
    return state.users
  },
  getWhisperingTo (state) {
    return state.whisperingTo
  }
}

const mutations = {
  setConnected (state, value) {
    state.connected = value
  },
  setMyId (state, id) {
    state.myId = id
  },
  createUser (state, u) {
    let newUser = new User(u.id, u.username, u.x, u.y, u.avatar)
    state.users.push(newUser)
  },
  updateUser (state, user) {
    let indexOfUser = state.users.findIndex(item => item.id === user.id)
    state.users.splice(indexOfUser, 1, user)
  },
  moveAvatar (state, {id, x, y}) {
    const user = state.users.find(user => user.id === id)
    user.x = x
    user.y = y
  },
  changeAvatar (state, {id, image}) {
    const user = state.users.find(user => user.id === id)
    user.avatar = image
  },
  deleteUser (state, userid) {
    let index = state.users.findIndex(item => item.id === userid)
    if (index > -1) {
      state.users.splice(index, 1)
    } else {
      // console.log('error while trying to delete user', userid)
    }
  },
  truncateUserList (state) {
    state.users = []
  },
  setWhisperingTo (state, userid) {
    state.whisperingTo = userid
  }
}

const actions = {
  setConnected (context, value) {
    context.commit('setConnected', value)
  },
  setMyId (context, id) {
    context.commit('setMyId', id)
  },
  setUsers (context, users) {
    users.forEach(function (item) {
      context.commit('createUser', item)
    })
  },
  createUser (context, user) {
    context.commit('createUser', user)
  },
  updateUser (context, user) {
    context.commit('updateUser', user)
  },
  moveAvatar (context, {id, x, y}) {
    context.commit('moveAvatar', {id, x, y})
  },
  changeAvatar (context, {id, image}) {
    context.commit('changeAvatar', {id, image})
  },
  deleteUser (context, userid) {
    context.commit('deleteUser', userid)
  },
  setWhisperingTo (context, userid) {
    context.commit('setWhisperingTo', userid)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
