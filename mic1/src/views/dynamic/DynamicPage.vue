<template>
    <div>
        <h3>子应用动态路由页面  我的参数是 {{$route.params.viewId}}</h3>
        <input type="text" v-model="test">
    </div>
</template>

<script>
    export default {
        name: "DynamicPage",
        data(){
            return{
                test:''
            }
        },
        mounted() {
            this.test = new Date().getTime()
        }
    }
</script>

<style scoped>

</style>