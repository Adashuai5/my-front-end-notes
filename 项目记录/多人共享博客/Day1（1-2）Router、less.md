本项目做一款多人共享博客，包含首页、用户文章列表、登录、注册、个人管理、编辑、发布等功能。
使用 Vue.js 技术栈：**vue-cli/vue2/axios/vue-router/vuex/es6/npm**

## 前后端接口约定文档：[测试](https://xiedaimala.com/tasks/0e61bf37-d479-481b-a43e-8d7dd6069f93/#/text_tutorial/606cfb19-ca16-4fec-8564-75c1979871d6)

```
// 测试 POST /auth/register 用户注册
# -d 是用来传递数据
# 对于 POST 和 PUT 可以：  -X POST， 对于 GET，不加 -X
curl -d "username=ada&password=123456" -X POST "http://blog-server.hunger-valley.com/auth/register"

// 测试 POST /auth/login 用户登录
# -i 可以展示响应头
# 会发现响应头里有 setCookie 信息，得到 cookie

curl -d "username=ada&password=123456" "http://blog-server.hunger-valley.com/auth/login" -i

// 测试 GET /auth 判断用户是否登录
#先通过登录接口获取 cookie，带上 cookie 就能测试登录

curl "http://blog-server.hunger-valley.com/auth" -b "connect.sid=s%3AmeDbrn03UtTM8fqChaPQ20wmWlnKeHiu.e3uMtu7j1zQ1iNeaajCmxkYYGQ%2FyHV1ZsozMvZYWC6s"
# -b 后面部分就是通过登录接口获取的 cookie

// 其他测试类似
```

- GET 获取数据
- POST 提交或者创建
- PATCH 修改数据，部分修改
- DELETE 删除数据
- PUT 修改数据，整体替换原有数据

---

出现 npm miss node_modules 问题
[换源](https://www.jianshu.com/p/f311a3a155ff)
通过将 npm 淘宝源换成官方源解决了，官方源比较慢，用命令行翻墙工具可以提高速度
若命令行翻墙没用，可以在项目成功创建后换成淘宝源

---

##[使用 vue-cli 创建项目模板](https://xiedaimala.com/tasks/fa5c2fff-9c15-4280-8710-643932e21acb/text_tutorials/8c280f59-dc36-4989-9de4-6c944caf412f) ##创建 Router（路由）

```
import Index from '@/pages/Index/template.vue'
// 这里的 '@' 指代 src
```

1.components 是组件的意思
我们的应该是页面
在 src 目录下新建 pages 文件 逻辑上更好
在 pages 中加入想要的页面 2.把 html css js 分开

---

把 config 里面的 index.js 里的 build 路径改为 相对路径（这样子传到 github 上就不会访问不到路径了）![](https://upload-images.jianshu.io/upload_images/7094266-e254fa888658ba7a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

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
