<template>
  <div>
    <h3>主应用111 动态路由页面  我的参数是 {{ $route.params.viewId }}</h3>
    <input v-model="test" type="text">
  </div>
</template>

<script>
export default {
  name: 'ShowParam',
  data() {
    return {
      test: ''
    }
  },
  mounted() {
    this.test = new Date().getTime()
  }
}
</script>

<style scoped>

</style>
