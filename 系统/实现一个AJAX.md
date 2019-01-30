[AJAX是什么鬼](https://www.jianshu.com/p/4591a66c50f5) 续篇
# 今天我们给AJAX封装一下

之前写了篇有关用原生JS写jQuery的[博客](https://www.jianshu.com/p/7e663286cb35)
下面是相关主要代码
```
window.jQuery = function (nodeOrSelector) {
    let nodes = {}
    nodes.addClass = function () {}
    nodes.html = function () {}
    return nodes
}
```
事实上就是用函数给代码封装一下并设定相关参数
```
window.jQuery.ajax = function (url, method, body, succseeFn, failFn) {
    let request = new XMLHttpRequest()
    //初始化请求
    request.open(method, url)
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                succseeFn.call(undefined, request.responseText)
            } else if (request.status >= 400) {
                failFn.call(undefined, request)
            }
        }
    }
    request.send(body)
}
```
```
window.$ = window.jQuery
```
可以使用$.ajax了
```
myButton.addEventListener('click', (e) => {
    $.ajax(
        '/ada',
        'post',
        'a=1&b=2',
        (responseText) => {
            console.log('s')
        },
        (request) => {
            console.log('f')
        })
})
```
**但是这个$.ajax依然有问题**
1.给定的参数顺序太死
如果我不传其中一个参数，就需要给这个参数所在位置占位，如若method是'get'，就不返回body，那就需要用undefined等占位
```
'/ada',
'post',
//null，undefined或'' 占位
'',
(responseText) => {
      console.log('s')
},
(request) => {
      console.log('f')
})
```
2.无法直观解释参数意思。
比如上面代码，如果你没看过前面内容或者原生JS代码，你都不知道这些参数分别表达的是什么意思。

**解决方法：给参数命名呗**
```
window.jQuery.ajax = function (options) {
    //给参数一个选项
    let method = options.method
    let url = options.url
    let body = options.body
    let succseeFn = options.succseeFn
    let failFn = options.failFn

    let request = new XMLHttpRequest()
    //初始化请求
    request.open(method, url)
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                succseeFn.call(undefined, request.responseText)
            } else if (request.status >= 400) {
                failFn.call(undefined, request)
            }
        }
    }
    request.send(body)
}

myButton.addEventListener('click', (e) => {
    //以对象的形式传参数
    $.ajax({
        url: '/ada',
        method: 'post',
        body: 'a=1&b=2',
        succseeFn: (responseText) => {
            console.log('s')
        },
        failFn: (request) => {
            console.log('f')
        }
    })
})
```
**加一个 setRequestHeader：设置请求第二部分**
```
headers: {
    'content-type':'application/x-www-form-urlencoded'
}
```
$.ajax 部分遍历一下 headers
```
let headers = options.headers
//下面代码放在 requset.open() 后
for (let key in headers) {
    let value = headers[key]
    request.setRequestHeader(key, value)
}
```
![](https://upload-images.jianshu.io/upload_images/7094266-5f2a6c8a84d872fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**如何向 $.ajax 传两个参数：如 jQuery.ajax( url [, options ] )**
```
let url
if(arguments.length === 1){
    url = options.url
}else if(arguments.length === 2){
    url = arguments[0]
    options = arguments[1]
}
```
现在我们的$.ajax 已经和jQuery的一样了

---
**优化一下代码，先不管两个参数那个**

**1.ES6的 [解构赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)**
```
//这6行代码太丑了
let url= options
let method = options.method
let body = options.body
let succseeFn = options.succseeFn
let failFn = options.failFn
let headers = options.headers
//用ES6解构赋值,上面代码等价于
let = {url,method,body,headers,successFn,failFn} = options 
```
可以不要 options 了
```
window.jQuery.ajax = function ({url,method,body,headers,succseeFn,failFn}){}
```
**2.Promise，相关知识可以[参考](http://es6.ruanyifeng.com/#docs/promise)**
之前我们给参数命名了，我是知道了这个参数代表什么。
但是每个人的命名都会不一样，比如 jQuery 的 ajax 对响应成功的命名就是 success 而我的是 successFn。
这对于不熟悉对应文档的人来说，使用十分不便。
针对这个问题，就有了 Promise
Promise的形式
```
window.Promise = function(fn){
    //...
    return {
        then:function(){}
    }
}
```
用Promise函数：resolve,reject 替换 successFn 和 failFn，这个两个参数是ES6规定的，这样就不会有上述问题了
return new Promise(function(resolve,reject){})
```
window.jQuery.ajax = function ({url,method,body,headers}) {
    //之前代码返回值是 undefined，我们return一个Promise
    return new Promise(function(resolve,reject){
        let request = new XMLHttpRequest()
    //初始化请求
    request.open(method, url)
    for (let key in headers) {
        let value = headers[key]
        request.setRequestHeader(key, value)
    }
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                // successFn 就由 resove 代替了
                resolve.call(undefined, request.responseText)
            } else if (request.status >= 400) {
                // failFn 就由 reject 代替了
                reject.call(undefined, request)
            }
        }
    }
    request.send(body)
    })
}

window.$ = window.jQuery

myButton.addEventListener('click', (e) => {
    //以对象的形式传参数
    $.ajax({
        url: '/ada',
        method: 'post',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'ada': '18'
        }
    }).then(
        //成功后执行的代码
        (responseText)=>{console.log(responseText)},
        //失败后执行的代码
        (request)=>{console.log(request)}
      )
})
```
then 后再 then
```
.then(
    //成功后执行的代码
    (responseText)=>{console.log(responseText);return '处理成功'}, 
    //失败后执行的代码
    (request)=>{console.log(request);return '处理失败'}
    ).then(
    //上一次成功后的return
    (responseText)=>{console.log(responseText)},
    //上一次失败后的return
    (request)=>{console.log(request)}
)
```
可以看下结果![](https://upload-images.jianshu.io/upload_images/7094266-46960dc591ffab15.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



完整代码请看 [github](https://github.com/Adashuai5/node-demo/tree/master/jQuery.AJAX)


---
#小记
**AJAX 的所有功能**
客户端的JS发起请求（浏览器上的）
服务端的JS发送响应（Node.js上的）
**1.JS 可以设置任意请求 header**
第一部分 request.open(method, url)
第二部分 request.setRequstHeader('content-type','application/x-www-form-urlencoded')
第四部分 request.send(body)
**2.JS 可以获取任意响应 header**
第一部分 request.status / request.statusText
第二部分 request.getResponseHeader() / request.getAllResponseHeaders()
第四部分 request.responseText
图解![](https://upload-images.jianshu.io/upload_images/7094266-82d62fca23713ea1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**有关回调 (callback:打电话回来)：**
```
succseeFn.call(undefined, request.responseText)
//这种形式就是回调
succseeFn: () => {}
```
**promise 的 .then() 和 .then().then() 理解**
```
.then(
  fn1,fn2
).then(
  fn3,fn4
  )

```
.then( , ) 逗号左边为成功执行，右边为失败执行 
我们可以称第一个： **.then( fn1 , fn2 )**为第一负责人；第二个： **.then( fn3 , fn4 )**为第二负责人
第一负责人成功则执行 fn1 ，失败则执行 fn2；第一负责人处理完成处理则第二负责人执行 fn3 ，处理不好（如代码有问题）则执行 fn4
---
本文仅供个人学习使用

