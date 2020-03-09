## 学习方法：文档 + stackoverflow CRM 
### 1. fs 模块
用于读写文件
### 2. http 模块
创建 sever
### 3. express 框架
基于 node.js 的创建 sever 的框架
### 4. koa 框架
重写 express 的框架
# 5. Event Loop
[Event Loop、计时器、nextTick](https://juejin.im/post/5ab7677f6fb9a028d56711d0)

## Node.js 和 Chrome 内的 JS 引擎
![](https://upload-images.jianshu.io/upload_images/7094266-50551547099f1768.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
Node.js 和 Chrome 一样，是可以运行 js 的平台，js引擎只占他们的一部分，其内部还有复杂的其他模块
## 浏览器内 JS 引擎机制
![](https://upload-images.jianshu.io/upload_images/7094266-7b36e233b1550a6d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

JS 引擎是单线程的，但是在浏览器内，它的异步操作都是让 Chrome 的 C++ 模块代替完成，甚至 setTimeout 都是浏览器 API

## Node.js 内的 JS 引擎
![](https://upload-images.jianshu.io/upload_images/7094266-b62fd76b5784d1b2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

同理，在 Node.js 中，异步操作也不是 JS 引擎自己完成，其依赖操作系统代替完成。
## Event Loop
而事件循环，就是 Node.js 和 操作系统之间处理异步的交互过程
当 Node.js 启动时，会做这几件事
**1. 初始化 event loop**
**2. 开始执行脚本（或者进入 REPL，本文不涉及 REPL）。这些脚本有可能会调用一些异步 API、设定计时器或者调用 process.nextTick()**
**3. 开始处理 event loop**

![](https://upload-images.jianshu.io/upload_images/7094266-a999f8b32a75dc31.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 在 Event Loop 中，我们比较关注的是 timers、poll 和 check**
#### timers：计时器阶段
此阶段主要是执行如 setTimeout 和 setInterval 的阶段，可以**指定**某个回调函数的时间，但不是真正的执行时间，真正的执行时间可能会因为 Node.js 在执行其他函数而推迟。
#### poll 阶段
poll 阶段有两个功能：
1. 如果发现计时器的时间到了，就绕回到 timers 阶段执行计时器的回调。
2. 然后再，执行 poll 队列里的回调。

当 event loop 进入 poll 阶段，如果发现没有计时器，就会：

1. 如果 poll 队列不是空的，event loop 就会依次执行队列里的回调函数，直到队列被清空或者到达 poll 阶段的时间上限。
2. 如果 poll 队列是空的，就会：
- 1. 如果有 setImmediate() 任务，event loop 就结束 poll 阶段去往 check 阶段。
- 2. 如果没有 setImmediate() 任务，event loop 就会等待新的回调函数进入 poll 队列，并立即执行它。

一旦 poll 队列为空，event loop 就会检查计时器有没有到期，如果有计时器到期了，event loop 就会回到 timers 阶段执行计时器的回调
#### check 阶段
setImmediate() 发生在此阶段，由于每次需要执行 timers 阶段都会先执行 check 阶段，因此**绝大部分时候** setImmediate() 比 setInterval() 和 setTimeout() 先执行，除了第一次循环：若首次循环（ event loop 的准备阶段）时间大于4ms，则进入循环直接执行 setTimeout(()=>{},0)，而后进入 poll，而后执行 setImmediate() 
```
// setTimeout 的最小间隔时间为 4 ms
setTimeout(()=>{},0)
// 上面代码等价于
setTimeout(()=>{},4)
```
#### process.nextTick()
从技术上来讲 process.nextTick() 并不是 event loop 的一部分。实际上，不管 event loop 当前处于哪个阶段，nextTick 队列都是在当前阶段后就被执行了。

---
## MacroTask 宏任务、MicroTask 微任务
妈（Ma）咪 （Mi）
- macrotasks 有 setTimeout setInterval setImmediate I/O UI渲染
- microtasks 有 Promise process.nextTick Object.observe MutationObserver
1. 先执行 Mi 再执行 Ma。
2. new Promise(fn).then(success) 期中 fn 是立即执行的，success 会被放入 Mi 任务。
