##Cookie：
今天我们要说的当然不是甜品，而是在 HTTP 协议中使用到的 Cookie 知识
`HTTP Cookie（也叫Web Cookie或浏览器Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。`

我们知道，服务器和客户端（浏览器）之间通过 HTTP 发送请求和响应来交流。
但是 HTTP 是[无状态协议](https://en.wikipedia.org/wiki/Stateless_protocol)：这样做当然能够减少服务器负担，服务器不必记录每一次请求和响应的状态，但这严重阻碍了[交互式Web应用程序](https://zh.wikipedia.org/wiki/%E4%BA%A4%E4%BA%92%E5%BC%8FWeb%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F "交互式Web应用程序")的实现。

**所以就有了 Cookie 技术：在请求和响应的报文中写入 Cookie 信息来控制客户端状态。**
- 服务器通过 Set-Cookie 响应头设置 Cookie
- 浏览器得到 Cookie 之后，每次请求都要带上 Cookie
- 服务器发现并读取 Cookie 就知道对应客户端的状态信息

Cookie主要用于以下三个方面：
- 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
- 个性化设置（如用户自定义设置、主题等）
- 浏览器行为跟踪（如跟踪分析用户行为等）

**通过 HTTP 协议和 Cookie 技术的协同作用，服务器与客户端之间就可以既快速（HTTP 无状态）又可控（Cookie 有状态）得请求和响应并交互了。
当然，由于 Cookie 的安全性等问题，有了 Session（服务器的一小块内存）本文不涉及**

##在 node.js 服务端中设置响应头的 Set Cookie（以用户的 email 为例）代码示例 [API 详情](https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_response_setheader_name_value)
```
response.setHeader('Set-Cookie',`sign_in_email = ${email}`)
```
(这是我写的关于登录注册 demo 里登录请求成功的服务端响应 Cookie 内容部分，完整的代码有兴趣可以看我 [github](https://github.com/Adashuai5/node-demo/tree/master/cookie-demo)，有关 node.js 搭建简单的服务器的内容可以看我相关博客)

如图当 1@ada.com 用户发送登录请求成功，服务器返回响应的响应头（Response Headers）内出现 Set - Cookie ![](https://upload-images.jianshu.io/upload_images/7094266-fdff2ea48f36c28e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)其他页面（只要是同源域名）都将带上 Cookie 信息（这里我们并没有设置其他内容）![](https://upload-images.jianshu.io/upload_images/7094266-341585400a01ecf2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
设置多个 Cookies
```
response.setHeader('Set-Cookie', [`sign_in_email = ${email}`, 'language=javascript']);
```
在开发者工具里的 Application 界面里有 Cookies 我们可以随意设置其 cookie ![](http://upload-images.jianshu.io/upload_images/7094266-637c2da4867f4daf?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
##Set-Cookie 字段还可以附加 Cookie 的属性 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie)
![常用属性](https://upload-images.jianshu.io/upload_images/7094266-479fc61fdf79ed54.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**多个属性之间用 ; 连接，下面代码添加了 Secure 和 HttpOnly 属性**
```
response.setHeader('Set-Cookie',`sign_in_email = ${email};Secure;HttpOnly`)
```
**可以通过设置 Set-Cookie 的 Max-Age 属性 和 Expires 属性**
以 node.js 为例
```
response.setHeader('Set-Cookie',' Max-Age=1000; Expires=Sun, 16 Sep 2018 10:05:35 GMT')
```
上面代码设置了响应头在1000秒后 cookie 失效，同时指定了 Expires 和Max-Age，那么Max-Age的值将优先生效

关闭 session（会话）即可删除内存 Cookie；上述过期时间达到则会删除硬盘 Cookie，因此可以通过设置过期时间删除 Cookie
我们还可以通过手动清除浏览器 Cookie 及缓存删除 cookie

**相关内容可以参考
[Cookie 的属性](http://javascript.ruanyifeng.com/bom/cookie.html#toc4)
[HTTP Cookie](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)
[Cookie-wikipedia](https://zh.wikipedia.org/wiki/Cookie)
同时这也是本文参考内容，另外还参考了 《图解HTTP》相关章节**

---
本文仅供个人学习使用
