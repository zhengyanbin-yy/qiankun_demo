import axios from 'axios'
import {Message,MessageBox} from 'element-ui'
const { name } = require('../../package.json')
// create an axios instance
const service = axios.create({
    baseURL: name+'/service',
    timeout: 60000 // request timeout
})
// request interceptor
service.interceptors.request.use(
    config => {
        
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        if(response?.data?.type)response.data.success = response.data.type
        const res = response.data
        // if the custom code is not 20000, it is judged as an error.
        if (res.hasOwnProperty('type') && res.type !== true) {
            if (res?.message)
                Message({
                    message: res?.message,
                    type: 'error',
                    duration: 5 * 1000
                })
            
            return Promise.reject(new Error(res?.message || 'Error'))
        } else {
            if (response?.data?.data) response.data.rows = response.data.data
            return response.data
        }
    },
    error => {
        const noMessage = ['SYS.SECURITY.IDENTIFICATION.FAIL']
        const data = error.response ? error.response.data : error
        if(noMessage.indexOf(data.messageKey) === -1){
            if(data.messageKey === 'SYS.SECURITY.LOGIN.TIMEOUT'){
                MessageBox.alert('登录超时，请重新登录',{
                    callback(action, instance){
                        if (action==='confirm'){
                            location.href = 'portal/login'
                        }
                    }
                })
                return Promise.reject(data)
            }
            Message({
                message: data.message ? data.message : '请求失败',
                type: 'error',
                duration: 5 * 1000
            })
        }
        return Promise.reject(data)
    }
)


export default service
