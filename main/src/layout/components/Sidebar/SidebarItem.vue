<template>
    <div v-if="!item.hidden">
        <template v-if="item.subsetMenu.length===0">
                        <app-link :to="item.url">
            <el-menu-item :index="resolvePath(item.url)" :class="{'submenu-title-noDropdown':!isNest}">
                <item :title="item.menuName"/>
            </el-menu-item>
                        </app-link>
        </template>

        <el-submenu v-else ref="subMenu" :index="item.menuCode" popper-append-to-body>
            <template slot="title">
                <item :icon="item.meta && item.meta.icon" :title="item.menuName"/>
            </template>
            <sidebar-item v-for="child in item.subsetMenu" :key="child.menuCode" :is-nest="true" :item="child" :base-path="resolvePath(child.url)" class="nest-menu"/>
        </el-submenu>
    </div>
</template>

<script>
    import path from 'path'
    import {isExternal} from '@/utils/validate'
    import Item from './Item'
    import AppLink from './Link'
    import FixiOSBug from './FixiOSBug'

    export default {
        name: 'SidebarItem',
        components: {
            Item,
            AppLink
        },
        mixins: [FixiOSBug],
        props: {
            // route object
            item: {
                type: Object,
                required: true
            },
            isNest: {
                type: Boolean,
                default: false
            },
            basePath: {
                type: String,
                default: ''
            }
        },
        data() {
            // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
            // TODO: refactor with render function
            return {
            }
        },
        methods: {
            resolvePath(routePath) {
                if (isExternal(routePath)) {
                    return routePath
                }
                if (isExternal(this.basePath)) {
                    return this.basePath
                }
                return path.resolve(this.basePath, routePath)
            },
            openPage(item){
                let {url} = item
                this.$store.dispatch('tagsView/addView', {
                    path:url,
                    meta:{
                        title:item.menuName
                    }
                })
                this.$router.push(url)
            },
        },
        mounted() {

        }
    }
</script>
