<template>
    <div>
        <button @click="$router.push('/list?isFormMicApp=yes')">跳转</button>
        <input type="text" v-model="test">
        <div>我是子应用1 中的 manage 页面</div>
    </div>
</template>

<script>
    export default {
        name: "manage",
        data(){
            return{
                test:''
            }
        },
        mounted() {
            console.log('function mounted')
        }
    }
</script>

<style scoped>

</style>