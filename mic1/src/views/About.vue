<template>
  <div class="about">
      <input v-model="val"/>
    <h3>我是  子应用1  中的页面</h3>
      <div>This is an about page</div>
  </div>
</template>
<script>
    export default {
        name:'About',
        data(){
            return{
                val:''
            }
        },
        methods:{
            update(){
                
            }
        }
    }
</script>
