![](https://upload-images.jianshu.io/upload_images/7094266-2dec29754959acf7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##Cookie 和 票
![](https://upload-images.jianshu.io/upload_images/7094266-b8737221fb88886b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
首页 URL 相同但显示不同![](https://upload-images.jianshu.io/upload_images/7094266-c93da59a198af037.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#Cookie 存在的问题
**用户可以随意篡改 Cookie**
例如：a 用户可以通过得到 b 用户的 email 来获得其 password![](https://upload-images.jianshu.io/upload_images/7094266-5d0e61f59020da61.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
##解决方法：引入 Session
session 相当于一块内存（对象）
```
let sessions = {
}
```
**注意重启服务器的同时会刷新 sessions**![](https://upload-images.jianshu.io/upload_images/7094266-f8c9b75d9cad9221.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**将 response.setHeader() 改成一个 sessionId（随机数）**
```
let sessionId = Math.random()*10000000
sessions[sessionId] = {sign_in_email:email}
response.setHeader('Set-Cookie',`sessionId = ${sessionId}`)
```
**可以看到 Cookie 变成了随机数，这样子用户猜不到其他用户的信息（随机数你猜啊），解决上述 Cookie 存在的问题**![](https://upload-images.jianshu.io/upload_images/7094266-c550834b71977499.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
令首页的 email 为 sessions[hash.sessionId].sign_in_email

```
let email = sessions[hash.sessionId].sign_in_email
// 由于重启服务器的同时会刷新，那么就会报 undefined，因此要判断
let email
let mySessions = sessions[hash.sessionId]
if(mySessions){
  email = mySessions.sign_in_email
}
```
事实上就是让 email 等于 用户的 email![此图便于理解上面代码](https://upload-images.jianshu.io/upload_images/7094266-b589ea7a749b7905.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

好的，这样子就可以了![](https://upload-images.jianshu.io/upload_images/7094266-0e9a7a3f15c1bbec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## Session 与 Cookie 的关系
一般来说，Session 基于 Cookie 来实现。
- Cookie
1.  服务器通过 Set-Cookie 头给客户端一串字符串
2.  客户端每次访问相同域名的网页时，必须带上这段字符串
3.  客户端要在一段时间内保存这个 Cookie
4.  Cookie 默认在用户关闭页面后就失效，后台代码可以任意设置 Cookie 的过期时间
5.  [大小大概在 4kb 以内](https://stackoverflow.com/questions/640938/what-is-the-maximum-size-of-a-web-browsers-cookies-key "null")
- Session
1.  将 SessionId（随机数）通过 Cookie 发给客户端
2.  客户端访问服务器时，服务器读取 SessionId
3.  服务器有一块内存（哈希表）保存了所有 sessionId
4.  通过 SessionID 我们可以得到对应用户的隐私信息，如 id、email
5.  这块内存（哈希表）就是服务器上的 sessions
---
##LocalStorage（[项目相关](https://xiedaimala.com/tasks/4fb245e2-3194-455a-a0c3-56b85909ca91/video_tutorials/4f04adbb-6031-45c9-8dff-d2a0375a3460)）
HTML5 提供的 API，其本质是 hash （浏览器上的 hash）![LocalStorage 属性](https://upload-images.jianshu.io/upload_images/7094266-50e9c5006199370e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**localStorage.setItem(key,value) 属性：**用来设置 localstorage

![setItem](https://upload-images.jianshu.io/upload_images/7094266-08cae8fc9894fbbf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

与 Cookie 一样我们在 Application 里面可以看到 LocalStorage

![](https://upload-images.jianshu.io/upload_images/7094266-0471e76057cc81ba.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)注意里面保存的必须是字符串所以 {name:'obj'} 变成了 [object Object]![](https://upload-images.jianshu.io/upload_images/7094266-c00a4f35ef1960c0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**可以通过 JSON.stringify()转义内容为 JSON**

![](https://upload-images.jianshu.io/upload_images/7094266-58dcf10267442735.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/7094266-32ceb2692ecaa262.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**localStorage.getItem(key) 属性**

![getItem](https://upload-images.jianshu.io/upload_images/7094266-9aab595aaa366366.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**localStorage.clear() 属性：**清除当前页面所有 Local Storage
![](https://upload-images.jianshu.io/upload_images/7094266-ca50c216c92a6973.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**LocalStorage 可以永久储存页面数据**
在没有 LocalStorage 的年代 无法储存页面数据，刷新即刻回归初始值
```
<script>
    let a = localStorage.getItem('a')
    if (!a) {
        a = 0
    } else {
        a = (+a) + 1
    }
    console.log('a')
    console.log(a)
    localStorage.setItem('a', a)
</script>
```
![](https://upload-images.jianshu.io/upload_images/7094266-d9c1942cbb27a9b0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**LocalStorage 可以记录有没有提示过用户**
```
<script>
    let already = localStorage.getItem('已经提示过了')
    if (!already) {
        alert('我们的网站改版了')
        localStorage.setItem('已经提示过了', true)
    } else {

    }
</script>
```
![](https://upload-images.jianshu.io/upload_images/7094266-a178887521a37c1a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##LocalStorage 特点
1. LocalStorage 跟 HTTP 无关
2. HTTP 不会带上 LocalStorage 的值
3. 只有相同域名的页面才能互相读取 LocalStorage（没有同源那么严格）
4. 每个域名 localStorage 最大存储量为 5Mb 左右（每个浏览器不一样）

超出则会提示![](https://upload-images.jianshu.io/upload_images/7094266-b7dc2d7e6bdb0252.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

5. 常用场景：记录有没有提示过用户（没有用的信息，不能记录密码）
6. LocalStorage 永久有效，除非用户清理缓存
##SessionStorage 特点（这里的 Session 是会话的意思，与上面服务器里面的 Sessions 有区别）
1、2、3、4 同上
**与LocalStorage 的主要区别**
5. SessionStorage 的 session 是会话的意思，SessionStorage 在用户关闭页面（会话结束）后就失效
#总结：
1. Session 与 Cookie 的关系：Session 依赖于 Cookie，Cookie 是 Session 的基石
2. Cookie 和 LocalStorage 区别：HTTP 请求与响应会带上 Cookie 而 LoaclStorage 不会
3. SessionStorage 与LocalStorage 的区别：SessionStorage 在用户关闭页面后就失效；LocalStorage 永久有效，除非用户清理缓存
#Session 可以用 LocalStorage + 查询参数实现（不要记）
#为什么会有 Cookie 和 LocalStorage 的区别这个问题？
因为一开始没有 LocalStorage 这个 API，那时候前端经常通过 Cookie 来存储跨页面的数据，这样会引起请求响应特别慢的问题。
现在有了 LocalStorage，**前端就不要去读、写 Cookie 了**（那是后端的事） 
---
#Cache-Control 是什么
[Cache-Control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)
不设置 max-age，每一次请求浏览器都会访问服务器，这样子太费时间，影响用户体验
```
if(path === '/js/main.js'){
  let string = fs.readFileSync('./js/main.js', 'utf8')
  response.setHeader('Content-Type', 'application/javascript; charset=utf-8')
  response.write(string)
  response.end()
}
```
可以通过 Cache-Control: max-age=<seconds> 来设置缓存存储的最大周期
```
response.setHeader('Cacha-Control','max-age=31536000') // 一年
```
一般设置1年或10年
在第一次访问后，页面资源被缓存下来，再次访问时浏览器会优先访问缓存，而不发请求![max-age = 30 为例](https://upload-images.jianshu.io/upload_images/7094266-cf452960b1c7eb07.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**如果服务器更新了缓存内容，只要改变对应的 URL 就行了**

以知乎为例![](https://upload-images.jianshu.io/upload_images/7094266-58d085a8f08b4c39.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
1. 首页一般无法设置缓存 max-age![首页](https://upload-images.jianshu.io/upload_images/7094266-4cd71db0c6c2f463.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. 其他资源一般设置1年以上 max-age，**通过v2+随机数 改变 URL 更新内容**![](https://upload-images.jianshu.io/upload_images/7094266-65c5407d96a5596a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 勾选 Diasble cache（禁用缓存）则加载所有资源![](https://upload-images.jianshu.io/upload_images/7094266-35699c151b8be203.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/7094266-c91a66a600f99f85.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

缓存过多？浏览器会管理的。
---
#Expire 是什么
[expires](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Expires) 和 Cache-Control: max-age=<seconds> 用法差不多，但是它是旧 API 有缺点，它设定的是过期日期，与绝对时间相比不可控制因素太多。**优先使用 Cache-Control
#Etag 是什么
**MD5 [MD5消息摘要算法](https://zh.wikipedia.org/wiki/MD5)**
服务器预先提供一个MD5校验和，用户下载完文件以后，用MD5算法计算下载文件的MD5校验和，然后通过检查这两个校验和是否一致，就能判断下载的文件是否出错
```
npm install md5
```
```
var md5 = require('md5')
```
![](https://upload-images.jianshu.io/upload_images/7094266-196def954debc48e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
if(path === '/js/main.js'){
    let string = fs.readFileSync('./js/main.js', 'utf8')
    response.setHeader('Content-Type', 'application/javascript; charset=utf-8')
    let fileMd5 = md5(string)
    response.setHeader('ETag', fileMd5)
    if(request.headers['if-none-match'] === fileMd5){
        // 没有响应体
        response.statusCode = 304 // 304 Not Modified
    }else{
        // 有响应体
        response.write(string)
    }
    response.end()
}
```
这样子就不会返回响应体，节约响应时间，并返回 304 Not Modified![](https://upload-images.jianshu.io/upload_images/7094266-2c33a718b5e934b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#Cache-Control: max-age=n 缓存 与 ETag 的「缓存」有什么区别
Cache-Control: max-age=n 缓存：在n秒内用户刷新页面，客户端不发请求，直接用缓存内容；ETag 的「缓存」是响应体，是要发请求的，而如果 md5 不匹配 则返回响应体，否则响应体为空
相对而言自然是 Cache-Control 不发请求省时间更好
![](https://upload-images.jianshu.io/upload_images/7094266-50f857220eb18574.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

相关博客[浏览器缓存详解:expires,cache-control,last-modified,etag详细说明](https://blog.csdn.net/eroswang/article/details/8302191)
