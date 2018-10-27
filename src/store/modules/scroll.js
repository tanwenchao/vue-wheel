import * as types from '../mutation-types'

// initial state
const state = {
  demoscroll: 0
}

// mutations
const mutations = {
  [types.UPDATE_DEMOSCROLL] (state, status) {
    state.demoscroll = status
  }
}

export default {
  // getters,
  // actions,
  state,
  mutations
}
