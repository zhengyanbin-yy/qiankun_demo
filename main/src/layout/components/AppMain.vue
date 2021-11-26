<template>
  <section class="app-main">
      <!--  
          mainRoutes  打开主应用的路由集合
          使用循环  router-view  的原因是，如果两个tab页面匹配到同一个动态路由，如：/demo/:id ，这两个页面无法保持状态或者保持状态有问题
          -->
    <div v-for="(item,index) in mainRoutes" v-show="item===key" :key="index">
      <keep-alive>
        <router-view :key="index" />
      </keep-alive>
    </div>
    <!-- 循环生成容器，每一个微应用使用独立的容器，自己控制微应用的显隐 -->
    <div v-for="item in microApps" v-show="currentFullPath.startsWith(item.prefixPath)" :id="item.container.slice(1)" :key="item.name" style="height:100%;" />
  </section>
</template>

<script>
import { mapState } from 'vuex'

import { loadMicroApp, initGlobalState } from 'qiankun'
// 初始化 state
const actions = initGlobalState({})
export default {
  name: 'AppMain',
  props: {
    microApps: Array
  },
  computed: {
    ...mapState('tagsView', ['cachedViews', 'closeViewFullPath', 'newViewFullPath']),
    key() {
      return this.$route.path
    },
    currentFullPath() {
      return '/portal' + this.$route.path
    }
  },
  data() {
    return {
      loadedApp: {}, // 已加载的微应用
      mainRoutes: []
    }
  },
  watch: {
    newViewFullPath(newVal) {
      this.loadApp(newVal)
    },
    closeViewFullPath(newVal) {
      if (!newVal) return false
      const indexPath = `/portal${newVal}`
      // 先判断是子应用还是主应用
      const microApp = this.microApps.find(item => indexPath.includes(item.prefixPath))
      if (microApp) {
        // 移除子应用已缓存的应用
        const childRoutePath = indexPath.replace(microApp.prefixPath, '')
        const childRouteIndex = this.loadedApp[microApp.name].childRoute.indexOf(childRoutePath)
        this.loadedApp[microApp.name].childRoute.splice(childRouteIndex, 1)
        // 再当前微应用的页面是否已全部关闭
        if (this.loadedApp[microApp.name].childRoute.length === 0) {
          this.loadedApp[microApp.name].app.unmount()
          this.loadedApp[microApp.name] = null
        } else {
          actions.setGlobalState(this.loadedApp)
        }
      } else { // 主应用
        const index = this.mainRoutes.findIndex(r => r === newVal)
        this.mainRoutes.splice(index, 1)
      }
    }
  },
  mounted() {
    this.loadApp(this.$route.fullPath)
  },
  methods: {
    loadApp(path) {
      const indexPath = `/portal${path}`
      // 先判断是子应用还是主应用，再判断子应用是否已加载
      const microApp = this.microApps.find(item => indexPath.includes(item.prefixPath))
      if (microApp) {
        const { name } = microApp
        const childRoutePath = indexPath.replace(microApp.prefixPath, '')
        if (!this.loadedApp[name]) { // 未加载过的子应用
          const app = loadMicroApp(microApp)
          this.loadedApp[name] = {
            app,
            childRoute: []
          }
        }
        // 如果子应用已加载，将子应用的路由纪录到数组中，并通知子应用增加 keep-alive 的 include
        if (!this.loadedApp[name].childRoute.includes(childRoutePath)) {
          this.loadedApp[name].childRoute.push(childRoutePath)
          actions.setGlobalState(this.loadedApp)
        }
      } else { // 主应用
        if (!this.mainRoutes.includes(path)) {
          this.mainRoutes.push(path)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
