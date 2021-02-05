<template>
  <div class="package1-index-layout">
    package1 home page<br />
    count: {{ store.state.count }}<br />
    <button @click="store.mutations.ADD_COUNT()">+</button>
  </div>
</template>

<script>
import store from '../store'

export default {
  data() {
    return {
      store
    }
  }
}
</script>

<style lang="less" scoped>
.package1-index-layout {
  font-size: 24px;
}
</style>
