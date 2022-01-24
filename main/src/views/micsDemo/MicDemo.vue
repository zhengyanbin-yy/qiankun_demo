<template>
  <div style="height:100%;width:100%;">
    <el-popover
      placement="top-start"
      title="标题"
      width="200"
      trigger="hover"
      content=""
    >
      <el-button>添加子应用</el-button>
    </el-popover>
    <el-button @click="addSon">点这里</el-button>
    <br>
      <div id="mic-static1" style="width: 45%;height: 300px;background: #eee;display: inline-block;vertical-align: middle;" />
      <div id="mic-static2" style="width: 45%;height: 300px;background: #eee;display: inline-block;vertical-align: middle;" />
    <div style="width: 100%;height: calc(100% - 80px)">
      <div v-for="(item,index) of apps" :id="'mic-wrap'+(index+1)" :key="index" style="width: 45%;height: 300px;background: #eee;display: inline-block;vertical-align: middle;" />
    </div>
  </div>
</template>

<script>
import { loadMicroApp } from 'qiankun'
export default {
  name: 'MicDemo',
  data() {
    return {
      apps: [],
        micApps:[]
    }
  },
  methods: {
    addSon() {
      this.apps.push({})
      this.$nextTick(() => {
        const length = this.apps.length
          let newMicApp
        if (length % 2) {
            newMicApp =
          loadMicroApp({
            name: 'mic1',
            entry: `http://localhost:10301/mic1/`,
            container: '#mic-wrap' + length,
            props: { data: { defaultPath: '/function/manage', manual: true }}
          })
        } else {
            newMicApp =
          loadMicroApp({
            name: 'mic2',
            entry: `http://localhost:10300/mic2/`,
            container: '#mic-wrap' + length,
            props: { data: { defaultPath: '/list', manual: true }}
          })
        }
        this.micApps.push(newMicApp)
      })
    }
  },
    mounted() {
        let mic1 = loadMicroApp({
            name: 'mic1',
            entry: `http://localhost:10301/mic1/`,
            container: '#mic-static1',
            props: { data: { defaultPath: '/function/manage', manual: true }}
        })

        let mic2 = loadMicroApp({
            name: 'mic2',
            entry: `http://localhost:10300/mic2/`,
            container: '#mic-static2',
            props: { data: { defaultPath: '/list', manual: true }}
        })

        this.micApps.push(mic1)
        this.micApps.push(mic2)
    },
    beforeDestroy() {
      this.micApps.forEach(item=>{
          item.unmount()
      })
    }
}
</script>

<style scoped>

</style>
