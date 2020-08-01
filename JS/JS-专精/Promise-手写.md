[Promise pdf](chrome-extension://cdonnmffkdaoajfknoeeecmchibpmkmg/assets/pdf/web/viewer.html?file=https%3A%2F%2Fstatic.xiedaimala.com%2Fxdml%2Ffile%2F3ac7c224-c23d-491f-84b5-4fabfbeab9b8%2F2019-9-3-12-9-56.pdf#page=17&zoom=auto,-14,540)

# Promise 解决什么问题？

回调地狱

# 优点?

## 1. 减少缩进

都变成 .then 形式

## 2. 消灭 if(err)

error 都放在 .then 的第二个参数 

# Promise 完整 API

## promise 是一个类

- 属性：length（可忽律）
- 方法：all/ allSettled/ race/ reject/ resolve
- 对象属性：**then**/ finally/ catch
- 对象内部属性：**state** = pending/ fulfilled/ rejected

# 通过 [Promises/A+](https://promisesaplus.com/) 规范

# 测试

## chai 和 mocha 
```
import * as chai from "chai";

const assert = chai.assert;

describe("Chai 能用", () => {
  it("可以相等", () => {
    // @ts-ignore
    assert(2 === 1);
  });
});

// @ts-ignore 可以忽略 typescript 的检测
```

chai 提供 assert
mocha 提供 describe 和 it （以及命令行界面的输出等）

## sinon

```
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import Promise1 from "../src/promise";

chai.use(sinonChai);
const assert = chai.assert;

describe("Chai 能用",() => {
  it("promise.then(success) 的 success 在 resolve 被调用时候执行", done => {
    let success = sinon.fake(); // 1
    const promise = new Promise1((resolve, reject) => {
      assert.isFalse(success.called); // 2
      resolve();
      setTimeout(() => {
        assert.isTrue(success.called);
        done(); // 3
      });
    });
    // @ts-ignore
    promise.then(success);
  });
});
```

1. sinon.fake() 可以模拟一个函数
2. sinon.fake().called 可以判断函数是否调用
3. done => { done() } 保证在异步代码执行完毕后执行

# 在浏览器上模拟 微任务

浏览器没有 node.js 的 process.nextTick API
使用 [MutationObserverInit](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit) API 代替

```
function nextTick(fn) {
  // node.js 环境
  if (process !== undefined && typeof process.nextTick === "function") {
    return process.nextTick(fn);
  } else {
    // 浏览器环境
    var counter = 1;
    var observer = new MutationObserver(fn);
    var textNode = document.createTextNode(String(counter));

    observer.observe(textNode, {
      characterData: true
    });

    counter = counter + 1;
    textNode.data = String(counter);
  }
}
```
