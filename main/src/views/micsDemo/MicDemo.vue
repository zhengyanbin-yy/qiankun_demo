<template>
    <div style="height:100%;width:100%;">
        <el-popover
                placement="top-start"
                title="标题"
                width="200"
                trigger="hover"
                content="">
            <el-button>添加子应用</el-button>
        </el-popover>
        <el-tooltip class="item" effect="dark" content="这个页面的问题是每执行一次 loadMicroApp 就打开一个tab" placement="right">
            <el-button @click="addSon">点这里</el-button>
        </el-tooltip>
        <div style="width: 100%;height: calc(100% - 80px)">
            <div style="width: 45%;height: 300px;background: #eee;display: inline-block" v-for="(item,index) of apps" :key="index" :id="'mic-wrap'+(index+1)"></div>
        </div>
    </div>
</template>

<script>
    import {loadMicroApp} from "qiankun";
    export default {
        name: "MicDemo",
        data(){
            return{
                apps:[],
            }
        },
        methods:{
            addSon(){
                this.apps.push({})
                this.$nextTick(()=>{
                    let length = this.apps.length
                    if (length%2){
                        loadMicroApp({
                            name:'mic1',
                            entry:`http://localhost:10301/mic1/`,
                            container:'#mic-wrap'+length,
                            props: { data : { defaultPath: '/function/manage',manual:true } }
                        })
                    }else {
                        loadMicroApp({
                            name:'mic2',
                            entry:`http://localhost:10300/mic2/`,
                            container:'#mic-wrap'+length,
                            props: { data : { defaultPath: '/list',manual:true } }
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>