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
            title:'子应用1页面'
        }
    },
    {
        path:'/dynamic/:viewId',
        name:'DynamicPage',
        component:()=>import('../views/dynamic/DynamicPage'),
        meta:{
            title:'动态展示内容页面'
        }
    },
    {
        path:'*',
        component:  () =>import('../views/error-page/404')
    }
]

export default routes
