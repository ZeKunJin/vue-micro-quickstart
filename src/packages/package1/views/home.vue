<template>
  <div class="package1-index-layout">
    package1 home page<br />
    count: {{ store.state.count }}<br />
    <button @click="store.mutations.ADD_COUNT()">+</button>
    <button @click="login">login</button>
    <button @click="getUserInfo">get user info</button>

    <img src="../assets/logo.png" alt="" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import store from '../store'

export default {
  data() {
    return {
      store
    }
  },

  methods: {
    ...mapActions({
      Login: 'user/Login',
      GetInfo: 'user/GetInfo'
    }),

    login() {
      this.Login({ username: 'chajiepi', password: '123' })
    },

    getUserInfo() {
      this.GetInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.package1-index-layout {
  font-size: 24px;
}
</style>
