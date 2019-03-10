# Vue

## Vue.js 特性：

1.轻量级
2.双向数据绑定
3.指令
4.组件化

## 什么是 MVVM

```
MVC => MVP => MVVM
// 视图层和数据层的双向绑定
View <=> ViewModel <=> Model
```
1. MVVM是一种设计思想， 是 Model-View-ViewModel 的缩写。Model 层代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑；View 代表 UI 组件，它负责将数据模型转化成 UI 展现出来，ViewModel 是一个同步 View 和 Model 的对象。

2. 在 MVVM 架构下，View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互，Model 和 ViewModel 之间的交互是双向的， 因此 View 数据的变化会同步到Model 中，而 Model 数据的变化也会立即反应到 View 上。

3. ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而 View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作 DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

## Vue.js 的优点

1. 低耦合。视图（View）可以独立于Model变化和修改，一个ViewModel可以绑定到不同的"View"上，当View变化的时候Model可以不变，当Model变化的时候View也可以不变。
2. 可重用性。你可以把一些视图逻辑放在一个ViewModel里面，让很多view重用这段视图逻辑。
3. 独立开发。开发人员可以专注于业务逻辑和数据的开发（ViewModel），设计人员可以专注于页面设计。
4. 可测试。界面素来是比较难于测试的，而现在测试可以针对ViewModel来写
5. 易用灵活高效

## Vue 组件是什么

组件 (Component) 是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素，Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以表现为用 is 特性进行了扩展的原生 HTML 元素。所有的 Vue 组件同时也都是 Vue 的实例，所以可接受相同的选项对象 (除了一些根级特有的选项) 并提供相同的生命周期钩子。

# Vue-cli
Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统，致力于将 Vue 生态中的工具基础标准化。

## Vue 脚手架 3.x 以上版本使用

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
## Vuecli 3.x 版本(上图)与 2.x 初始化目录对比

![](https://upload-images.jianshu.io/upload_images/7094266-35ec0c0fd8c70b11.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/7094266-2e5b972e8f4586e0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# Vue Router

Vue Router 是 Vue.js 官方的路由管理器。
安装
```
npm install vue-router
```
引用
```
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```
配置路由文件，并在vue实例中注入 
```
const router = new VueRouter({
  routes:[{
    path:'/user/:userId', // 指定要跳转的路径
    name: 'user', // 命名路由，便于路由跳转
    component: User// 指定要跳转的组件
    }]
})
const User = ({
  template: '<div>User</div>'
})
```
## 确定视图加载的位置
视图可以添加命名，如果 router-view 没有设置名字，那么默认为 default
```
<router-view></router-view>
<router-view name="a"></router-view>
```
```
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: { // 同个路由，多个视图就需要多个组件,components 要有(s)
        default: Foo,
        a: Bar
      }
    }
  ]
})
```
## 实现路由跳转

```
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link> // 路由导航到 /user/123
```
等同于代码调用 router.push() 
```
// 编程式导航
router.push({ name: 'user', params: { userId: 123 }}) // 路由导航到 /user/123
```
## 路由传参
使用动态路由参数，以冒号开头
```
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```
现在呢，像 /user/foo 和 /user/bar 都将映射到相同的路由。

当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用。
```
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
```
## 响应路由参数变化
动态路由会引起组件复用，如果想对路由参数的变化作出响应，可以简单地 **watch** (监测变化) $route 对象：
```
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```
或者使用 **beforeRouteUpdate** 导航守卫

```
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```
## 路由组件参数解耦
在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。可使用 props 解耦组件：
```
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```
props 有三种模式：布尔模式、对象模式、函数模式
# Vuex

Vuex 是一个为 Vue.js 开发的状态管理模式：采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

## 在 store (存储)内有下列核心概念

**State()：核心原始数据** 展示
**Getter：计算属性，根据所依赖的数据的变化计算自身变化** 存储
**Mutation(转变)：提交 mutation 才能改变存储状态**
**Action：**Action 类似于 mutation，不同在于：
Action 提交的是 mutation，而不是直接变更状态。
Action 可以包含任意异步操作。
**Module：可以将将 store 分割**
一般放在 state 文件夹下

![](https://upload-images.jianshu.io/upload_images/7094266-c1e2d56805eff7e7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## vuex状态管理的流程

view => actions => mutations => state => view

## 核心概念详解

### state：记录所有公共数据状态的对象
```
// 组件如何获取
this.$store.state.XXX
// 此处的 XXX 是 state 内定义的数据状态的键名
```
### mutations：包含所有 操作数据状态的方法 的对象
```
// 组件如何调用
this.$store.commit(XXX)
// 此处的 XXX是 mutations 中定义的方法名
```
### actions：用于操作 mutations 内方法 的对象
actions 提交的是 mutation，而不是直接变更状态 actions可以包含异步操作，但是 mutation 只能包含同步操作
```
// 如何调用
this.$store.dispatch(XXX)
// 此处的XXX是你在actions中定义的方法名
```
### getters：定义状态内容的方法 的对象
```
this.$store.getters.XXX
// 此处的XXX是你在getters里定义的方法名
```
### Module
当应用较大时，store将变得臃肿，Vuex 允许我们将 store 分割成模块（module）。
每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割
```
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
# Axios 
axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，它本身具有以下特征：
- 从浏览器中创建 XMLHttpRequest
- 从 node.js 发出 http 请求
- 支持 Promise API拦截
- 请求和响应转换
- 请求和响应数据取消
- 请求自动转换JSON数据
- 客户端支持防止 CSRF/XSRF
1. 安装
```
npm install axios
```
2. 引入加载
```
import axios from 'axios'
```
3. 将axios全局挂载到 Vue 原型上
```
Vue.prototype.$http = axios
```
## 设置全局 axios 默认值
```
// 设置基础路径，一般为后端接口线上地址根路径
axios.defaults.baseURL = 'https://api.example.com';
// 设置默认 token
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// 默认 POST 请求
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```
## axios 的 url 有两种传递参数的形式
```
// 第一种 对象形式
this.$http.get('/user', {
    params: {
      ID: 12345
    }
  })
// 如果只有一个参数，可以省略 params
this.$http.get('/user', {
      ID: 12345
  }) 
--------------------------------- 
// 第二种 形式
this.$http.get('https://cnodejs.org/api/v1/topics?page=1&limit=15')
```
## POST 传递数据有两种格式：
1. form­-data ?page=1&limit=48
2. x-­www­-form-­urlencoded { page: 1,limit: 10 }

**在 axios 中，post 请求接收的参数必须是 form­-data 形式
如果要使用 x-­www­-form-­urlencoded 形式，需要用 qs 插件—qs.stringify 转换**
```
this.$http.post('/user', qs.stringify({
   ID: 12345
  })
);
```
## 实现增删改查
### 发起 GET 请求：查
![](https://upload-images.jianshu.io/upload_images/7094266-12145e74b1272089.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
const axios = require('axios') // 下同省略

//发起一个user请求，参数为给定的ID
axios.get('/user?ID=12345')
  .then((response) => {
    console.log(response)
  }
  .catch((error) => {
    console.log(error)
  }
```
### 发起 POST 请求：增
![](https://upload-images.jianshu.io/upload_images/7094266-8609f819ec24a9ad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
axios.post('/user', {
  firstName: 'yuanda',
  lastName: 'zhou'
})
  .then((response) => {
    console.log(response)
  })
  .catch(function(error){
    console.log(error);
  })
```
```
axios.request(config)
axios.get(url[,config])
axios.delete(url[,config]) // 删除
axios.head(url[,config])
axios.options(url[,config])
axios.post(url[,data[,config]])
axios.put(url[,data[,config]]) // 改
axios.patch(url[,data[,config]])
```
PUT 和 POST 方法的区别是,PUT方法是幂等的：连续调用一次或者多次的效果相同（无副作用）。连续调用同一个POST可能会带来额外的影响，比如多次提交订单。
## 并发请求
```
function getUserAccount(){
    return axios.get('/user/12345');
}

function getUserPermissions(){
    return axios.get('/user/12345/permissions');
}

axios.all([getUerAccount(),getUserPermissions()])
    .then(axios.spread(function(acc,pers){
        //两个请求现在都完成
    }));
```
axios.all 使用的是类似 Primise.all 的功能，所以如果其中有一个请求出现了错误那么就会停止请求，所以建议对于单个请求最好附加上处理的 catch。
## 拦截器 interceptors
你可以在**请求**或者**响应**被 then 或者 catch 处理之前对他们进行拦截。
```
//添加一个请求拦截器
axios.interceptors.request.use(function(config){
    //在请求发送之前做一些事
    return config;
},function(error){
    //当出现请求错误是做一些事
    return Promise.reject(error);
});

//添加一个返回拦截器
axios.interceptors.response.use(function(response){
    //对返回的数据进行一些处理
    return response;
},function(error){
    //对返回的错误进行一些处理
    return Promise.reject(error);
});
```
用 eject 移除拦截器
```
var myInterceptor = axios.interceptors.request.use(function(){/*...*/});
axios.interceptors.request.eject(myInterceptor);
```
## axios 如何获取 cookie
axios 默认是不让 ajax 请求头部携带cookie的，因此，在 main.js 中设置如下：
```
import axios from 'axios'
axios.defaults.withCredentials=true; //让ajax携带cookie
Vue.prototype.$axios = axios;
```
通过js原生接口来获取: 
```
let allCookies = document.cookie 
```
