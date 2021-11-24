const path = require('path');
const { name } = require('./package.json')
module.exports = {
  assetsDir: 'static',
  publicPath: `/`+name,
  devServer: {
    // 监听端口
    port: 10301,
    // 关闭主机检查，使微应用可以被 fetch
    disableHostCheck: true,
    // 配置跨域请求头，解决开发环境的跨域问题
    headers: {
      'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: 0
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'api': path.resolve(__dirname, 'src/api'),
      }
    },
    output: {
      // 微应用的包名，这里与主应用中注册的微应用名称一致
      library: name+`-[name]`,
      // 将你的 library 暴露为所有的模块定义下都可运行的方式
      libraryTarget: 'umd',
      // 按需加载相关，设置为 webpackJsonp_VueMicroApp 即可
      jsonpFunction: `webpackJsonp_`+name,
    }
  },
    // 设置common要参与编译打包（ES6 -> ES5）
    // transpileDependencies: ['common']
}