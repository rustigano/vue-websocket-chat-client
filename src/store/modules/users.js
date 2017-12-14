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
  deleteUser (state, userId) {
    let index = state.users.findIndex(item => item.id === userId)
    if (index > -1) {
      state.users.splice(index, 1)
    } else {
      // console.log('error while trying to delete user', userId)
    }
  },
  truncateUserList (state) {
    state.users = []
  },
  setWhisperingTo (state, userId) {
    state.whisperingTo = userId
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
    return new Promise((resolve, reject) => {
      users.forEach(item => context.commit('createUser', item))
      resolve()
    })
  },
  createUser (context, user) {
    return new Promise((resolve, reject) => {
      context.commit('createUser', user)
      resolve()
    })
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
  deleteUser (context, userId) {
    context.commit('deleteUser', userId)
  },
  truncateUserList (context) {
    return new Promise((resolve, reject) => {
      context.commit('truncateUserList')
      resolve()
    })
  },
  setWhisperingTo (context, userId) {
    context.commit('setWhisperingTo', userId)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
