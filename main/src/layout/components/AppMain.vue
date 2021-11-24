<template>
  <section class="app-main">
      <keep-alive :include="cachedViews">
          <router-view :key="key" />
      </keep-alive>
      <!-- 循环生成容器，每一个微应用使用独立的容器，自己控制微应用的显隐 -->
      <div v-for="item in microApps" :key="item.name" :id="item.container.slice(1)" v-show="currentFullPath.startsWith(item.prefixPath)" style="height:100%;"></div>
  </section>
</template>

<script>
    import {mapState} from 'vuex'

    import { loadMicroApp, initGlobalState } from 'qiankun';
    // 初始化 state
    const actions = initGlobalState({});
export default {
  name: 'AppMain',
    props:{
        microApps:Array
    },
  computed: {
      ...mapState('tagsView',['cachedViews','closeViewFullPath','newViewFullPath']),
    key() {
      return this.$route.path
    },
      currentFullPath(){
          return '/portal'+this.$route.path
      }
  },
    data(){
        return{
            loadedApp: {}, // 已加载的微应用
        }
    },
    methods:{
        loadApp(path){
            let indexPath = `/portal${path}`
            // 先判断是子应用还是主应用，再判断子应用是否已加载
            const microApp = this.microApps.find(item => indexPath.includes(item.prefixPath));
            if (microApp){
                let {name} = microApp
                const childRoutePath = indexPath.replace(microApp.prefixPath,'');
                if (!this.loadedApp[name]){//未加载过的子应用
                    const app = loadMicroApp(microApp);
                    this.loadedApp[name] = {
                        app,
                        childRoute: [],
                    };
                }
                // 如果子应用已加载，将子应用的路由纪录到数组中，并通知子应用增加 keep-alive 的 include
                if(!this.loadedApp[name].childRoute.includes(childRoutePath)){
                    this.loadedApp[name].childRoute.push(childRoutePath);
                    actions.setGlobalState(this.loadedApp);
                }
            }
        },
    },
    watch:{
        newViewFullPath(newVal){
            this.loadApp(newVal)
        },
        closeViewFullPath(newVal){
            let indexPath = `/portal${newVal}`
            // 先判断是子应用还是主应用
            const microApp = this.microApps.find(item => indexPath.includes(item.prefixPath));
            if (microApp){
                // 移除子应用已缓存的应用
                const childRoutePath = indexPath.replace(microApp.prefixPath,'');
                const childRouteIndex =  this.loadedApp[microApp.name].childRoute.indexOf(childRoutePath);
                this.loadedApp[microApp.name].childRoute.splice(childRouteIndex, 1);
                // 再当前微应用的页面是否已全部关闭
                if (this.loadedApp[microApp.name].childRoute.length === 0) {
                    this.loadedApp[microApp.name].app.unmount();
                    this.loadedApp[microApp.name] = null;
                }else {
                    actions.setGlobalState(this.loadedApp);
                }
            }
        },
    },
    mounted() {
        this.loadApp(this.$route.fullPath)
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
