### 背景

在开发中常常遇到需要如展示列表等滚动的场景

为了让移动端设备列表流畅滚动我们原来实现方式

```css
overflow-y: scroll;
// 让滚动条产生滚动回弹的效果，就像ios原生的滚动条一样流畅
-webkit-overflow-scrolling: touch;
```

但是这种实现方式会有 ios 兼容性问题

- 在safari上，使用了`-webkit-overflow-scrolling:touch`之后，页面偶尔会卡住不动。
- 在safari上，点击其他区域，再在滚动区域滑动，滚动条无法滚动的bug。
- 通过动态添加内容撑开容器，结果根本不能滑动的bug。

具体的坑及原因等可以参考 [这篇文章](https://www.cnblogs.com/xiahj/p/8036419.html)

#### 案例：

宁波北分银行-城市出游记，去旅行的地图在 ios 下滚动到边界会出现“橡皮筋效果”问题

### better-scroll

使用 [better-scroll ](https://better-scroll.github.io/docs/zh-CN/guide/base-scroll.html#%E4%B8%8A%E6%89%8B)——一个基于原生 JS 实现的移动端滚动框架，可以完美实现移动端滚动，解决 ios 兼容性问题

#### 安装：

```
npm install @better-scroll/core --save
// or
yarn add @better-scroll/core
```

然后使用参考： react [demo](https://codesandbox.io/s/better-scroll-nw310?file=/src/App.jsx)/ hooks 版本  [demo](https://codesandbox.io/s/better-scroll-nw310?file=/src/Hooks.js)

官方提供更多示例请参考 [文档](https://better-scroll.github.io/docs/zh-CN/guide/base-scroll.html#%E4%B8%8A%E6%89%8B)

常见问题：

better-scroll 计算高度是不包含 margin 的，你可以在 wrapper 层使用 margin，[详见](https://github.com/ustbhuangyi/better-scroll/issues/499)

其他问题：[FAQ](https://better-scroll.github.io/docs/zh-CN/FAQ/)

todo: better-scroll 组件化



