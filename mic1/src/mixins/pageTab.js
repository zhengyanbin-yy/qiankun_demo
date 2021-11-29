import store from '../store'
export default {
    methods:{
        emitRouteInfo(info){
            if (!info)return
            let appName = store.state.appName
            const routeObj = {
                fullPath: '/'+appName+info.fullPath,
                hash: info.hash,
                meta: info.meta,
                name: info.name,
                params: info.params,
                path: '/'+appName+info.path,
                query: info.query,
                isMico: true
            }
            this.parentProps.setGlobalState({subRoute: routeObj})
        }
    }
}