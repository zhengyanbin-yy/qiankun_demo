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
            title:'子应用2页面'
        }
    },
    {
        path:'*',
        component:  () =>import('../views/error-page/404')
    }
]

export default routes
