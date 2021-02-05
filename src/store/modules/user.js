import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const state = {
  token: '',
  id: '',
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  Login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      resolve()
    })
  },

  GetInfo({ commit }) {},

  Logout({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      Vue.ls.remove(ACCESS_TOKEN)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
