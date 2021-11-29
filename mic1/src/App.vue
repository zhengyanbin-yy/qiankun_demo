<template>
    <div id="app">
        <!--设计器产生的页面-->
        <div v-show="viewId">
            <template v-for="(id,index) in views">
                <keep-alive :key="index">
                    <router-view v-if="viewId===id" :key="id" />
                </keep-alive>
            </template>
        </div>
        <!--常规的vue页面-->
        <div v-show="!viewId">
            <keep-alive :include="loadedRouteNames">
                <router-view :key="$route.fullPath" />
            </keep-alive>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import pageTab from "./mixins/pageTab";
    export default {
        mixins:[pageTab],
        data(){
            return{
                loadedRouteNames: [],
                views:[],
                viewId:''
            }
        },
        computed:{
            ...mapState(['appName'])
        },
        methods:{
            setViews(){
                this.viewId = this.$route.params.viewId
            }
        },
        watch:{
            $route(n){
                this.setViews()
                if (!['DesignPage'].includes(n.name)) {
                    this.emitRouteInfo(n)
                }
            }
        },
        mounted() {
            this.setViews()

            if (window.__POWERED_BY_QIANKUN__) {
                this.parentProps.onGlobalStateChange(state => {
                    if (state.hasOwnProperty(this.appName)){//排除主应用页面加载多个子应用的那种情况
                        const { childRoute } = state[this.appName];
                        const loadedRoutes = childRoute.map(item => this.$router.resolve(item));
                        let views = []
                        loadedRoutes.forEach(item=>{
                            if (['DesignPage'].includes(item.route.name)){
                                views.push(item.route.params.viewId)
                            }
                        })
                        this.views = views
                        this.loadedRouteNames = loadedRoutes.map(item => item.route.name);
                    }
                }, true);
            }
        }
    }
</script>
<style lang="scss">

</style>
