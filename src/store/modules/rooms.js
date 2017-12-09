import Room from './models/Room'

const state = {
  rooms: [],
  room: {backgroundColor: '#00b3ee'}
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
    let newRoom = new Room(r.id, r.creatorid, r.name, r.backgroundColor)
    state.rooms.push(newRoom)
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
    rooms.forEach(room => context.commit('createRoom', room))
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
