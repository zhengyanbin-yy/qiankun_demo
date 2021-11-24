<template>
  <div id="app">
      <keep-alive :include="loadedRouteNames">
          <template v-if="viewId">
              <router-view v-for="(id,index) in views" v-if="viewId&&viewId===id" :key="index" />
          </template>
          <template v-if="!viewId">
              <router-view />
          </template>
      </keep-alive>
  </div>
</template>
<script>
    const { name:appName } = require('../package.json')
    export default {
        data(){
            return{
                loadedRouteNames: [],
                views:[],
                viewId:''
            }
        },
        methods:{
            setViews(){
                this.viewId = this.$route.params.viewId
                if(this.viewId&&!this.views.includes(this.viewId))this.views.push(this.viewId)
            }
        },
        watch:{
            $route(n){
                this.setViews()
                const routeObj = {
                    fullPath: '/'+appName+n.fullPath,
                    hash: n.hash,
                    meta: n.meta,
                    name: n.name,
                    params: n.params,
                    path: '/'+appName+n.path,
                    query: n.query,
                    isMico: true
                }
                this.parentProps.setGlobalState({subRoute: routeObj})
            }
        },
        mounted() {
            this.setViews()

            if (window.__POWERED_BY_QIANKUN__) {
                this.parentProps.onGlobalStateChange(state => {
                    if (state.hasOwnProperty(appName)){
                        const { childRoute } = state[appName];
                        const loadedRoutes = childRoute.map(item => this.$router.resolve(item));
                        this.loadedRouteNames = loadedRoutes.map(item => item.route.name);
                        console.log('loadedRouteNames')
                        console.log(this.loadedRouteNames)
                        debugger
                    }
                }, true);
            }
        }
    }
</script>
<style lang="scss">

</style>
