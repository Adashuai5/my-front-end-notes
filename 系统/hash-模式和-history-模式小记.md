在 vue-router 中，默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。
如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面

## hash 模式和 history 模式主要区别
1.  使用 hash 模式，当 一个窗口的 hash （URL 中 # 后面的部分）改变时就会触发 hashchange 事件，而不会刷新页面，比如: 在页面内点击带有锚点的 a 标签，不会刷新页面。
2.  使用 history，URL 没有了 #，一般都需要服务器端配置或支持 SSR，否则刷新页面服务器会返回 404。

## hash 模式以及为什么改变 hash 不刷新页面——[URL的井号‘#’](http://www.ruanyifeng.com/blog/2011/03/url_hash.html)
## 有关 [history 对象](https://javascript.ruanyifeng.com/bom/history.html#toc1)
由于 HTML5 只在 IE9 以上支持
## 控制 vue-router 内的自动降级
>HTML5 历史模式或 hash 模式，在 IE9 中自动降级

可使用 **fallback** API

![](https://upload-images.jianshu.io/upload_images/7094266-b7d0691f21ffc7cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
