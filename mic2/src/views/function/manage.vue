<template>
    <div>
        <h3>我是  子应用2  中的页面</h3>
        <input type="text" v-model="test">
    </div>
</template>

<script>
    export default {
        name: "manage",
        data(){
            return{
                test:''
            }
        }
    }
</script>

<style scoped>

</style>