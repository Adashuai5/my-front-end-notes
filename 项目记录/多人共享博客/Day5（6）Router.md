## 路由的优化

#### 1.给博客编 id：不同博客应该有对应页面

如博客的 user detial edit ，给他们添加对应博客 id
以 user 为例，其他两个一样

```
{ // vue语法 用 ./:blogId 的方法
    path: '/user/:blogId',
    component: User
}
```

#### 2.[路由元信息[Vue Router]](https://router.vuejs.org/zh/)

(https://router.vuejs.org/zh/guide/advanced/meta.html)**
对于如 edit create my 等页面，肯定是用户登录状态下才能实现的
**我们可以在定义路由时配置 meta 字段：\*\*
以 create 为例，其他两个一样

```
{
  path: '/create',
  component: Create,
  meta: { requiresAuth: true }
}
```

**与之前直接 export default router（Day3（4）router-view 中）不同，我们不直接 export default
而是：**

```
// 先 const 一个 router
const router =  new Router({
  routes: []
})

// 遍历 $route.matched 检查 meta 字段
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
```

**使用 vuex 中的 islogin 而不是用 api 里面的（因为 api 里面是异步的要发请求，没必要）**

```
// 只需要 引入 store
import store from '../store'
// 判断是否登录：上面代码中 !auth.loggedIn() 改为
!store.getters.isLogin()
```

**但是这样子只是生成一个 URL 却没有做要做的事情**
修改 ./pages/Login/template.js 跳转路径

```
// 跳转路径
.then(() => {
  this.$router.push({ path: this.$route.query.redirect || '/' }) // 询问是否更改路径或原路径
})
```

**新的问题：用 isLogin 判断不好，因为发请求时我们的 header 部分会判断 是否登录，此时我们发现我们还有 checkLogin**
checkLogin 需要执行 actions：除了 mapActions 外还可以直接用 **dispatach**![](https://upload-images.jianshu.io/upload_images/7094266-565f6a7503a3ae3a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)那么上面代码即改成

```
store.dispatch('checkLogin').then(isLogin => {
  if (isLogin) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})
```

---

## **项目发布**

```
npm run build
```

然后出现 dist 文件：把我们所有代码打包
这样会出现一个问题：就是![](https://upload-images.jianshu.io/upload_images/7094266-b54a889245da1c3c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)页面的 js 不独立，发请求会加载所有 js 文件，会造成资源浪费
我们可以打开服务器加载看一下![](https://upload-images.jianshu.io/upload_images/7094266-f0eaab80ef5fd7b5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
如图，所有 js 都一次性加载了，这样并不好![](https://upload-images.jianshu.io/upload_images/7094266-ff5220ec93a12405.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**优化：实现懒加载**
其实是 webpack 的方法：将原来的引入路径改成直接在 routes 里异步加载路径

```
const router =  new Router({
  routes: [
    {
      path: '/',
      // 回调函数的异步加载
      component: () => import('@/pages/Index/template.vue')
    },
    {
      path: '/register',
      component: () => import('@/pages/Register/template.vue')
    },
    {
      path: '/login',
      component: () => import('@/pages/Login/template.vue')
    },
    {
      path: '/user/:blogId',
      component: () => import('@/pages/User/template.vue')
    },
    {
      path: '/detail/:blogId',
      component: () => import('@/pages/Detail/template.vue')
    },
    {
      path: '/edit/:blogId',
      component: () => import('@/pages/Edit/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/create',
      component: () => import('@/pages/Create/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/my/',
      component: () => import('@/pages/My/template.vue'),
      meta: { requiresAuth: true }
    }
  ]
})
```

重新打包后，js 分开了![](https://upload-images.jianshu.io/upload_images/7094266-1cc2429456f488a1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
