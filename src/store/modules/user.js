import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { login } from '@/api/auth'
import { getUserInfo } from '@/api/user'

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
      login(userInfo)
        .then(({ data }) => {
          const { token } = data
          Vue.ls.set(ACCESS_TOKEN, token)
          commit('SET_TOKEN', token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  GetInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then(({ data }) => {
          const { id, username: name } = data
          commit('SET_ID', id)
          commit('SET_NAME', name)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

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
