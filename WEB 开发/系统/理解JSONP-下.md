[理解 JSONP 上](https://www.jianshu.com/p/2a2fe02917e7)

# 跨域 SRJ

**如果我访问其他网站的服务器，可以吗？
由于 JSONP 可以规避同源策略，因此可以**
下面我们自己做两个网站尝试一下
请求方：ada.com （浏览器）
响应方：jack.com （服务器）

Linux 或 mac 直接

```
vi /etc/hosts
```

windows 需要找到/etc/hosts 文件 比较难找，推荐 Everything![](https://upload-images.jianshu.io/upload_images/7094266-19f9953c967705a5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)在 hosts 文件下编辑两个网站![](https://upload-images.jianshu.io/upload_images/7094266-28b643545d3a06f3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)打开两个 node 服务器![](https://upload-images.jianshu.io/upload_images/7094266-3cd83a6dd9b8e522.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

将 script.src 改成后端服务器的 jack.com

```
script.src = 'http://jack.com:8002/pay'
```

成功在 ada.com 里接收到 jack.com，ada.com 的前端程序员成功向 jack.com 的后端程序员发起请求并得到响应![](https://upload-images.jianshu.io/upload_images/7094266-455e37f97e889991.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)跨域 SRJ 成功

# 代码分离：

**耦合**和**解耦**![](https://upload-images.jianshu.io/upload_images/7094266-39446f3e68a37a78.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)上面的 amount.innerText=amount.innerText-1 就是前端页面的代码，这说明 jack.com 的后端程序元需要对 ada.com 的页面细节了解的很清楚，这种情况叫做耦合
那我们让前后端分离呗，即解耦
后端改成

```
//获取参数.call（this，成功）
response.write(`${query.callbackName}.call(undefined,'success')`)
```

前端给参

```
//callbackName = 随便
script.src = 'http://jack.com:8002/pay?callbackName=yyy'
```

# JSONP:

![](https://upload-images.jianshu.io/upload_images/7094266-9442483142643759.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

上面代码高亮的部分就是[JSON](https://www.json.org/)（一个键必须是双引号的对象）
JSON 左边的代码就是左 padding，右边就是右 padding，所以 JSONP=JSON +Padding

# 让我们理一下过程

请求方：ada.com 的前端程序员（浏览器）
响应方：jack.com 的后端程序员（服务器） 1.请求方创建 script，src 指向响应方，同时传一个查询参数 ?callbackName=yyy 2.响应方根据查询参数 callbackName，构造形如
yyy.call(undefined, '你要的数据')
yyy('你要的数据')
这样的响应 3.浏览器接收到响应，就会执行 yyy.call(undefined, '你要的数据') 4.那么请求方就知道了他要的数据
这就是 JSONP
**约定：**
callbackName -> callback
yyy -> 随机数 如 ada1213123123412()

# JSONP 方案

```
button.addEventListener('click', (e)=>{
    let script = document.createElement('script')
    let functionName = 'ada'+ parseInt(Math.random()*10000000 ,10)
    window[functionName] = function(){  // 每次请求之前搞出一个随机的函数
        amount.innerText = amount.innerText - 1
    }
    script.src = 'http://jack.com:8002/pay?callback=' + functionName
    document.body.appendChild(script)
    script.onload = function(e){ // 状态码是 200~299 则表示成功
        e.currentTarget.remove()
        delete window[functionName] // 请求完了就干掉这个随机函数
    }
    script.onload = function(e){ // 状态码大于等于 400 则表示失败
        e.currentTarget.remove()
        delete window[functionName] // 请求完了就干掉这个随机函数
    }
})
```

Node 部分：

```
if (path === '/pay') {
    var amount = fs.readFileSync('./db', 'utf8')
    var newAmount = amount - 1
    fs.writeFileSync('./db', newAmount)
    response.setHeader('Content-Type', 'application/javascript')
    response.write(`${query.callbackName}.call(undefined,
      'success'`)
    response.end()
```

jQuery 写法

```
 $.ajax({
 url: "http://jack.com:8002/pay",
 dataType: "jsonp",
 success: function( response ) {
     if(response === 'success'){
     amount.innerText = amount.innerText - 1
     }
 }
 })
```

# [JSONP 为什么不支持 POST？](https://www.zhihu.com/question/28890257)

因为 JSONP 是通过**动态创建 Script** 实现的，而**动态创建 Script**只能用 GET 请求，不能用 POST 请求

---

本文主要用于个人学习使用
