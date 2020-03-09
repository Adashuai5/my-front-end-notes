## Vue 脚手架 3.x以上版本
全局安装
```
yarn global add @vue/cli
```
快速原型开发
```
npm install -g @vue/cli-service-global
```
创建项目
```
vue create hello-world
// 如果是在 Windows 上通过 minTTY 使用 Git Bash，交互提示符并不工作，需要执行下面命令
winpty vue.cmd create hello-world
```
```
cd hello-world
```
Project setup
```
yarn install
```
（以下命令 run 可以省略）
Compiles and hot-reloads for development
```
yarn run serve
```
Compiles and minifies for production
```
yarn run build
```
Run your tests
```
yarn run test
```
Lints and fixes files
```
yarn run lint
```
# Vuecli 3.x 版本与 2.x初始化目录对比

![3.x 版本](https://upload-images.jianshu.io/upload_images/7094266-35ec0c0fd8c70b11.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![2.x 版本](https://upload-images.jianshu.io/upload_images/7094266-2e5b972e8f4586e0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
.
|-- build                            // 项目构建(webpack)相关代码
|   |-- build.js                     // 生产环境构建代码
|   |-- check-version.js             // 检查node、npm等版本
|   |-- dev-client.js                // 热重载相关
|   |-- dev-server.js                // 构建本地服务器
|   |-- utils.js                     // 构建工具相关
|   |-- webpack.base.conf.js         // webpack基础配置
|   |-- webpack.dev.conf.js          // webpack开发环境配置
|   |-- webpack.prod.conf.js         // webpack生产环境配置
|-- config                           // 项目开发环境配置
|   |-- dev.env.js                   // 开发环境变量
|   |-- index.js                     // 项目一些配置变量
|   |-- prod.env.js                  // 生产环境变量
|   |-- test.env.js                  // 测试环境变量
|-- src                              // 源码目录
|   |-- components                     // vue公共组件
|   |-- store                          // vuex的状态管理
|   |-- App.vue                        // 页面入口文件
|   |-- main.js                        // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件，比如一些图片，json数据等
|   |-- data                           // 群聊分析得到的数据用于数据可视化
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .gitignore                       // git上传需要忽略的文件格式
|-- README.md                        // 项目说明
|-- favicon.ico 
|-- index.html                       // 入口页面
|-- package.json                     // 项目基本信息
.
```
```
// 检查 Node 和 npm 版本
require('./check-versions')()
 
// 获取 config/index.js 的默认配置
var config = require('../config')
 
// 如果 Node 的环境无法判断当前是 dev / product 环境
// 使用 config.dev.env.NODE_ENV 作为当前的环境
 
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
 
// 使用 NodeJS 自带的文件路径工具
var path = require('path')
 
// 使用 express
var express = require('express')
 
// 使用 webpack
var webpack = require('webpack')
 
// 一个可以强制打开浏览器并跳转到指定 url 的插件
var opn = require('opn')
 
// 使用 proxyTable
var proxyMiddleware = require('http-proxy-middleware')
 
// 使用 dev 环境的 webpack 配置
var webpackConfig = require('./webpack.dev.conf')
 
// default port where dev server listens for incoming traffic
 
// 如果没有指定运行端口，使用 config.dev.port 作为运行端口
var port = process.env.PORT || config.dev.port
 
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
 
// 使用 config.dev.proxyTable 的配置作为 proxyTable 的代理配置
var proxyTable = config.dev.proxyTable
 
// 使用 express 启动一个服务
var app = express()
 
// 启动 webpack 进行编译
var compiler = webpack(webpackConfig)
 
// 启动 webpack-dev-middleware，将 编译后的文件暂存到内存中
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})
 
// 启动 webpack-hot-middleware，也就是我们常说的 Hot-reload
var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})
 
// proxy api requests
// 将 proxyTable 中的请求配置挂在到启动的 express 服务上
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})
 
// handle fallback for HTML5 history API
// 使用 connect-history-api-fallback 匹配资源，如果不匹配就可以重定向到指定地址
app.use(require('connect-history-api-fallback')())
 
// serve webpack bundle output
// 将暂存到内存中的 webpack 编译后的文件挂在到 express 服务上
app.use(devMiddleware)
 
// enable hot-reload and state-preserving
// compilation error display
// 将 Hot-reload 挂在到 express 服务上
app.use(hotMiddleware)
 
// serve pure static assets
// 拼接 static 文件夹的静态资源路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// 为静态资源提供响应服务
app.use(staticPath, express.static('./static'))
 
// 让我们这个 express 服务监听 port 的请求，并且将此服务作为 dev-server.js 的接口暴露
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
 
  // when env is testing, don't need open it
  // 如果不是测试环境，自动打开浏览器并跳到我们的开发地址
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
```
