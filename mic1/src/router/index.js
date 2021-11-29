import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>import('../views/Home.vue')
  },
  {
    path: '/list',
    name: 'About',
    component: () =>import('../views/About.vue'),
      meta:{
        title:'aaa'
      }
  },
    {
        
        path: '/function/manage',
        name: 'manage',
        component: () => import('../views/function/manage.vue'),
        meta:{
            title:'管理页面'
        }
    },
    {
        path:'/design/:viewId',
        name:'DesignPage',
        component: () =>import('../views/designPage/DesignPage'),
    },
    {
        path:'*',
        component:  () =>import('../views/error-page/404')
    }
]

export default routes
