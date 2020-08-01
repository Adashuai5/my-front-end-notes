随着公司项目不断增大，项目打包编译的时长也不断增加，尤其是在公司使用 jenkins 自动化部署以后更甚。由此我想到此问题可能是引入依赖过多而造成。通过 google 查看分析，终于找到相关问题并初步实践，方法如下：

# 1. 使用 [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) 分析项目外部依赖大小

```
# NPM
npm install --save-dev webpack-bundle-analyzer
# Yarn
yarn add -D webpack-bundle-analyzer
```

官网显示的使用方法，需要在 webpack.config.js 内配置：

```
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```

而我们的项目是使用 vue-cli3 搭建，其内置 webpack （也就是没有 webpack.config.js），因此我们找到 vue.config.js 使用如下代码引入插件：

```
// vue.config.js
module.exports = {

  chainWebpack: config => {
    //*//
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
}
```

此时运行 yarn serve 会执行 webpack-bundle-analyzer 插件 BundleAnalyzerPlugin 的默认功能

![](https://upload-images.jianshu.io/upload_images/7094266-ab4bc9a1e287601a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

serve 完成，会在浏览器自动生成依赖大小分析的可视化网站，如下图所示

![](https://upload-images.jianshu.io/upload_images/7094266-a23b069d62f17087.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 2. 使用 [webpack 外部扩展(externals)](https://www.webpackjs.com/configuration/externals/)

> 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖

## 使用前打包时间

![](https://upload-images.jianshu.io/upload_images/7094266-db8c24d4609bb95c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

使用 externals 过滤我们希望通过 cdn 引入的依赖，同样在 vue.config.js 配置：
（注意所需依赖的别名）

```
// vue.config.js
module.exports = {

  chainWebpack: config => {
    //*//
    config.externals({
      'axios': 'axios',
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'element-ui': 'ELEMENT' // 注意此处要全大写且 Vue.use(ELEMENT)
    })
  },
}
```

而后在项目 index.html 文件内引入对应 cdn

```
<!-- public/index.html -->
  <script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js"></script>
  <script src="https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js"></script>
  <script src="https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js"></script>
  <script src="https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js">
  <script src="https://cdn.bootcss.com/element-ui/2.3.3/index.js"></script>
```

需要将原来的引用注释，我们的过滤才能生效

```js
// import Vue from "vue"
// import Element from "element-ui"
```

再次使用 webpack-bundle-analyzer，可以看到依赖的体积减少了近 10 M

![](https://upload-images.jianshu.io/upload_images/7094266-8519d5ef027b6035.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 使用后打包时间

再次打包，打包时间缩短了近一倍

![](https://upload-images.jianshu.io/upload_images/7094266-7df2a6d82c804a18.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3.  使用 HardSourceWebpackPlugin 缓存，提高构建速度

HardSourceWebpackPlugin 为模块提供中间缓存，缓存默认的存放路径是: node_modules/.cache/hard-source

```
yarn add --dev hard-source-webpack-plugin
```

```
// vue.config.js
module.exports = {

chainWebpack: config => {
    // 提高构建速度的 webpack 插件
    config
      .plugin('hard-source-webpack-plugin')
      .use(require('hard-source-webpack-plugin'))
  },
}
```

未完待续。。。

深入：[Webpack 大法之 Code Splitting](https://zhuanlan.zhihu.com/p/26710831?refer=ElemeFE)

---

参考
[vue-cli3 使用 webpack-bundle-analyzer 插件](https://juejin.im/post/5d7266495188256f3b09baea);
[解决 vue 打包 wendor 过大的问题](https://www.jianshu.com/p/b2fe6aebe691)
