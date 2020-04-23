[async await 全解.pdf](chrome-extension://cdonnmffkdaoajfknoeeecmchibpmkmg/assets/pdf/web/viewer.html?file=https%3A%2F%2Fstatic.xiedaimala.com%2Fxdml%2Ffile%2F3ac7c224-c23d-491f-84b5-4fabfbeab9b8%2F2019-9-11-16-28-2.pdf)

# Promise

**async await 所有知识都来自 Promise**
```
const result = await promise
```
ES6 之前没有 Promise

那时只有 如 setTimeout 宏任务

ES6 引入 Promise 才有 微任务

![](https://upload-images.jianshu.io/upload_images/7094266-5868499dce7f2e9f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/7094266-efa12525af0a72da.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## Promise.allSettled

该 API 与 all 的区别

![](https://upload-images.jianshu.io/upload_images/7094266-78c8c585a778c5d4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

该 API 很多浏览器不支持

我们可以用 all 模拟
```
Promise.all([
  Promise.reject(1)
  .then((value) =>{ return {status:'ok', value}}, (reason) =>{return {status:'not ok',reason}}),
  Promise.resolve(2)
  .then((value) =>{ return {status:'ok', value}}, (reason) =>{return {status:'not ok',reason}}),
  Promise.resolve(3)
  .then((value) =>{ return {status:'ok', value}}, (reason) =>{return {status:'not ok',reason}})])
  .then(r => console.log(r))

// [{…}, {…}, {…}]
// 0: {status: "not ok", reason: 1}
// 1: {status: "ok", value: 2}
// 2: {status: "ok", value: 3}
// length: 3
// __proto__: Array(0)
```

优化成 API 的形式如下

```
let allSettled = (promiseList) => promiseList.map(promise =>
  promise.then((value) => ({
    status: 'ok',
    value
  }), (reason) => ({
    status: 'not ok',
    reason
  })))

Promise.allSettled2 = function(promiseList) {
  return Promise.all(allSettled(promiseList))
}
```

![](https://upload-images.jianshu.io/upload_images/7094266-229afce2515086a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




