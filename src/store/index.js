import Vue from 'vue'
import Vuex from 'vuex'

import rooms from './modules/rooms'
import users from './modules/users'
import messages from './modules/messages'
import balloons from './modules/balloons'
import misc from './modules/misc'

Vue.use(Vuex)

const state = {}
const getters = {}
const mutations = {}

const actions = {
  resetStore (context) {
    context.commit('setConnected', false)
    context.commit('setMyId', undefined)
    context.commit('setWhisperingTo', undefined)
    context.commit('truncateUserList')
    context.commit('truncateRoomList')
    context.commit('truncateMessageList')
    context.commit('truncateBalloonList')
  }
}

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    rooms,
    users,
    messages,
    balloons,
    misc
  },
  strict: debug
})
export default store
