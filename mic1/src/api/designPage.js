import request from '../axios/axios'
import qs from 'qs'
const headersConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
}
// 获取 配置 页面json串的接口，用于解析器解析
export function getPageJson(data) {
    return request({
        url: '/application/meta/view/info/query',
        method: 'post',
        data:qs.stringify(data)
    })
}