![img](https://image.fundebug.com/2019-01-03-0.png)

[页面渲染](https://juejin.im/post/6844904134307495943)

[深入浅出浏览器原理](https://blog.fundebug.com/2019/01/03/understand-browser-rendering/)

### 记录

浏览器进程：

- Brower 进程（唯一）
- 第三方插件进程（每个插件一个进程）
- GPU进程（唯一）
- 渲染进程（一个tab一个进程）
  - GUI渲染线程
  - JS引擎线程
  - 事件触发线程
  - 定时器触发线程
  - 异步请求线程



浏览器事件循环

![img](https://user-gold-cdn.xitu.io/2020/1/18/16fb7ae3b678f1ea?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)