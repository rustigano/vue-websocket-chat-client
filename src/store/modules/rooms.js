const state = {
  /** @var Array rooms - all the rooms in the program */
  rooms: [],
  /** @var Object room - The room the user is currently in */
  room: {}
}

const getters = {
  getRoomById: (state, getters) => (id) => {
    const room = state.rooms.find(room => room.id === id)
    return room
  },
  getRooms (state) {
    return state.rooms
  },
  getRoom (state) {
    return state.room
  }
}

const mutations = {
  createRoom (state, r) {
    state.rooms.push(r)
  },
  updateRoom (state, room) {
    let indexOfRoom = state.rooms.findIndex(item => item.id === room.id)
    state.rooms.splice(indexOfRoom, 1, room)
  },

  deleteRoom (state, roomid) {
    let index = state.rooms.findIndex(item => item.id === roomid)
    if (index > -1) {
      state.rooms.splice(index, 1)
    } else {
      // console.log('error while trying to delete room', roomid)
    }
  },
  truncateRoomList (state) {
    state.rooms = []
  },
  setRoom (state, roomId) {
    state.room = state.rooms.find(room => room.id === roomId)
  }
}

const actions = {
  setRooms (context, rooms) {
    return new Promise((resolve, reject) => {
      rooms.forEach(room => context.commit('createRoom', room))
      resolve()
    })
  },
  createRoom (context, room) {
    context.commit('createRoom', room)
  },
  updateRoom (context, room) {
    context.commit('updateRoom', room)
  },
  deleteRoom (context, roomid) {
    context.commit('deleteRoom', roomid)
  },
  setRoom (context, roomId) {
    return new Promise((resolve, reject) => {
      context.commit('setRoom', roomId)
      resolve()
    })
  },
  truncateRoomList (context) {
    context.commit('truncateRoomList')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
