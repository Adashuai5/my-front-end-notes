# 前端路由

随着 ajax 的流行，异步数据请求交互运行在不刷新浏览器的情况下进行。而异步交互体验的更高级版本就是 SPA —— 单页应用。单页应用不仅仅是在页面交互是无刷新的，连页面跳转都是无刷新的，为了实现单页应用，所以就有了前端路由。

## hash 模式

类似于服务端路由，前端路由实现起来其实也很简单，就是匹配不同的 url 路径，进行解析，然后动态的渲染出区域 html 内容。但是这样存在一个问题，就是 url 每次变化的时候，都会造成页面的刷新。那解决问题的思路便是在改变 url 的情况下，保证页面的不刷新。在 2014 年之前，大家是通过 hash 来实现路由，url hash 就是类似于：

```html
http://www.xxx.com/#/login
```

这种 #。后面 hash 值的变化，并不会导致浏览器向服务器发出请求，浏览器不发出请求，也就不会刷新页面。另外每次 hash 值的变化，还会触发 hashchange 这个事件，通过这个事件我们就可以知道 hash 值发生了哪些变化。然后我们便可以监听 hashchange 来实现更新页面部分内容的操作：

```
function matchAndUpdate () {
   // todo 匹配 hash 做 dom 更新操作
}
window.addEventListener('hashchange', matchAndUpdate)
```

## history 模式

14 年后，因为 HTML5 标准发布。多了两个 API，pushState 和 replaceState，通过这两个 API 可以改变 url 地址且不会发送请求。同时还有 popstate 事件。通过这些就能用另一种方式来实现前端路由了，但原理都是跟 hash 实现相同的。用了 HTML5 的实现，单页路由的 url 就不会多出一个 #，变得更加美观。**但因为没有 # 号，所以当用户刷新页面之类的操作时，浏览器还是会给服务器发送请求。**为了避免出现这种情况，所以这个实现需要服务器的支持，需要把所有路由都重定向到根页面。

```
function matchAndUpdate () {
   // todo 匹配路径 做 dom 更新操作
}
window.addEventListener('popstate', matchAndUpdate)
```

在 vue-router 中，默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。
如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面

## hash 模式和 history 模式主要区别

1.  使用 hash 模式，当 一个窗口的 hash （URL 中 # 后面的部分）改变时就会触发 hashchange 事件，而不会刷新页面，比如: 在页面内点击带有锚点的 a 标签，不会刷新页面。
2.  使用 history，URL 没有了 #，一般都需要服务器端配置或支持 SSR，否则刷新页面服务器会返回 404。

## hash 模式以及为什么改变 hash 不刷新页面——[URL 的井号‘#’](http://www.ruanyifeng.com/blog/2011/03/url_hash.html)

## 有关 [history 对象](https://javascript.ruanyifeng.com/bom/history.html#toc1)

由于 HTML5 只在 IE9 以上支持

## 控制 vue-router 内的自动降级

> HTML5 历史模式或 hash 模式，在 IE9 中自动降级

可使用 **fallback** API

![](https://upload-images.jianshu.io/upload_images/7094266-b7d0691f21ffc7cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
