import state from './state'

const mutations = {
  EDIT_COUNT(value) {
    state.count = value
  }
}

export default mutations
