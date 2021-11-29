import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
        if (store.state.app.subApps.length===0){
            setTimeout(()=>{
                let subApps = []
                subApps.push({
                    name:'mic1',
                    entry: `http://localhost:10301/mic1/`,
                    container: `#mic1`,
                    prefixPath: `/portal/mic1`,
                })
                // 将子应用的跟路由添加到路由表
                router.addRoutes([{
                    path: `/mic1/*`,
                    component: ()=>import('@/layout'),
                    children: []
                }])
                subApps.push({
                    name:'mic2',
                    entry: `http://localhost:10300/mic2/`,
                    container: `#mic2`,
                    prefixPath: `/portal/mic2`,
                })
                // 将子应用的跟路由添加到路由表
                router.addRoutes([{
                    path: `/mic2/*`,
                    component: ()=>import('@/layout'),
                    children: []
                }])
                store.commit('app/SET_APPS', subApps)
                if (to.fullPath==='/404'&&subApps.find(subApp=>subApp.name===to.redirectedFrom.split('/')[1])){
                    next(to.redirectedFrom)
                }else {
                    next()
                }
            },500)
        }else {
            next()
        }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
