<template>
    <div>
        <h3>子应用动态路由页面  我的参数是 {{$route.params.viewId}}</h3>
        <input type="text" v-model="test">
    </div>
</template>

<script>
    import pageTab from "../../mixins/pageTab";
    export default {
        name: "DynamicPage",
        mixins:[pageTab],
        data(){
            return{
                test:'',
                routeInfo:null,
            }
        },
        methods:{
            getData(){
                this.test = new Date().getTime()
                this.routeInfo = {...this.$route}
                this.routeInfo.meta.title = '页面'+this.$route.params.viewId
                this.emitRouteInfo(this.routeInfo)
            }
        },
        mounted() {
            this.getData()
        },
        watch:{
            $route(newVal){
                this.routeInfo&&this.emitRouteInfo(this.routeInfo)
            }
        },
        beforeRouteLeave(to,from,next){
            this.emitRouteInfo(to)
        }
    }
</script>

<style scoped>

</style>