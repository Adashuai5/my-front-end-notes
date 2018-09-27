本项目做一款多人共享博客，包含首页、用户文章列表、登录、注册、个人管理、编辑、发布等功能。
使用 Vue.js 技术栈：vue-cli/vue2/axios/vue-router/vuex/es6/npm
##前后端接口约定：[测试](https://xiedaimala.com/tasks/0e61bf37-d479-481b-a43e-8d7dd6069f93/#/text_tutorial/606cfb19-ca16-4fec-8564-75c1979871d6)
---
出现 npm miss node_modules 问题
[换源](https://www.jianshu.com/p/f311a3a155ff)
通过将 npm 淘宝源换成官方源解决了，官方源比较慢，用命令行翻墙工具可以提高速度
若命令行翻墙没用，可以在项目成功创建后换成淘宝源
---
##[使用 vue-cli 创建项目模板](https://xiedaimala.com/tasks/fa5c2fff-9c15-4280-8710-643932e21acb/text_tutorials/8c280f59-dc36-4989-9de4-6c944caf412f)
##创建 Router（路由）

1.components 是组件的意思
我们的应该是页面
在 src 目录下新建 pages 文件 逻辑上更好
在 pages 中加入想要的页面
2.把 html css js 分开
---
把 config 里面的 index.js 里的build 路径改为 相对路径（这样子传到 github 上就不会访问不到路径了）![](https://upload-images.jianshu.io/upload_images/7094266-e254fa888658ba7a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

---
## css 属性添加
**scoped 属性**
css 有全局作用域
添加 scoped 针对当前 css 作用域的元素

**引入 less**
```
// 在项目目录下
npm install less --save-dev
npm install less-loader --save-dev
// 然后重新
npm install
npm run dev
```
属性 lang = "less"
```
// 用法 color 为例
@color: red;
p {
    color: @color;
}
```
两个变动![](https://upload-images.jianshu.io/upload_images/7094266-a1e3c8a937669877.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/7094266-106826cb3a3d1c45.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
##assets 文件
可放置 base.less 
```
// base.less 代码
@themeColor:#ff3300;
```
```
// less 代码
@import "../../assets/base.less"; //这里分号不要忘记
p {
    color: @themeColor;
}
```
