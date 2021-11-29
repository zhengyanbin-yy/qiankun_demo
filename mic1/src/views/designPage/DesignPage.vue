<template>
    <div>
        <h3>子应用动态路由页面 {{$route.params.viewId}}</h3>
        <input type="text" v-model="test">
    </div>
</template>

<script>
    import pageTab from "../../mixins/pageTab";

    export default {
        name: "DesignPage",
        mixins:[pageTab],
        data(){
            return{
                routeInfo:null,
                test:'',
            }
        },
        methods:{
            getPageJson(){
                this.test = new Date().getTime()
                this.routeInfo = {...this.$route}
                this.routeInfo.meta.title = '页面'+this.$route.params.viewId
                this.emitRouteInfo(this.routeInfo)
            }
        },
        mounted() {
            this.getPageJson()
        },
        /*watch:{
            $route(newVal){
                this.routeInfo&&this.emitRouteInfo(this.routeInfo)
            }
        },
        beforeRouteLeave(to,from,next){//为啥不触发呢
            // this.emitRouteInfo(to)
        },*/
        beforeDestroy() {
            this.emitRouteInfo({})
        }
    }
</script>

<style scoped>

</style>