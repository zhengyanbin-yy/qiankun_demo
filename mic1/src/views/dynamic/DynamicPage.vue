<template>
    <div>
        <h3>这个页面的问题是 如何在第二此打开菜单的时候重新渲染 第二次的那个</h3>
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