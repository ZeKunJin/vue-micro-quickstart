<template>
  <div class="package1-index-layout">
    <div>
      package1 home page<br />
      count: {{ store.state.count }}<br />
      <button @click="store.mutations.ADD_COUNT()">state +</button>
      <button @click="login">login</button>
      <button @click="getUserInfo">get user info</button>
      <button @click="handleNavi">navi</button>
    </div>

    <img src="../assets/logo.png" alt="" />

    <div>{{ userInfo }}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import store from '../store'

export default {
  data() {
    return {
      userInfo: {},
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
      this.GetInfo().then(res => {
        this.userInfo = res
      })
    },

    handleNavi() {
      this.$router.package2.push({ name: 'index' })
    }
  }
}
</script>

<style lang="less" scoped>
.package1-index-layout {
  text-align: center;
  padding: 24px 0;
}
</style>
