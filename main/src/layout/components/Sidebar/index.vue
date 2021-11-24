<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in menus" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import {constantRoutes} from '@/router'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
      menus(){
        return [
            /*{
                menuName:"子应用1页面",
                subsetMenu:[],
                url:"/mic1/function/manage"
            },
            {
                menuName:"子应用2页面",
                subsetMenu:[],
                url:"/mic2/function/manage"
            },*/
            {
                menuName:"子应用1的页面",
                subsetMenu:[],
                url:"/mic1/dynamic/1"
            },
            {
                menuName:"和上面菜单打开同一页面只是参数不同",
                subsetMenu:[],
                url:"/mic1/dynamic/2"
            },
            {
                menuName:"主应用显示多个子应用",
                subsetMenu:[],
                url:"/mics/dynamic"
            },
        ]
      }
  }
}
</script>
