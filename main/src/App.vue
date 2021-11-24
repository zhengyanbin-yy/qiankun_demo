<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
    import {mapMutations} from 'vuex'
export default {
  name: 'App',
    methods:{
        ...mapMutations('tagsView',['UPDATE_NEW_PATH']),
    },
    watch:{
        $route(newVal){
            this.UPDATE_NEW_PATH(newVal.fullPath)
        }
    }
}
</script>
