#### axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，它本身具有以下特征：
- 从浏览器中创建 XMLHttpRequest
- 从 node.js 发出 http 请求
- 支持 Promise API拦截
- 请求和响应转换
- 请求和响应数据取消
- 请求自动转换JSON数据
- 客户端支持防止 CSRF/XSRF
---
#### 1. 安装
```
npm install axios
```
#### 2. 引入加载
```
import axios from'axios'
```
#### 3. 将axios全局挂载到VUE原型上
```
Vue.prototype.$http = axios
```

#### axios url 有两种传递参数的形式
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
#### POST传递数据有两种格式：
- form­-data ?page=1&limit=48
- x-­www­-form-­urlencoded { page: 1,limit: 10 }
**在axios中，post请求接收的参数必须是 form­-data 形式
如果要使用 x-­www­-form-­urlencoded 形式，需要用qs插件—­qs.stringify转换**
```
this.$http.post('/user', qs.stringify({
   ID: 12345
  })
);
```
