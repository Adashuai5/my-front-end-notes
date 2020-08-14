# Function.prototype.bind()

bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```
function.bind(thisArg[, arg1[, arg2[, ...]]])
```

# bind polyfill

## 第一版

```
// ES6
function _bind(callThis, ...args) {
  const fn = this;
  return function(...args2) {
    return fn.call(callThis, ...args, ...args2);
  };
}
```

问题： API 太新

## 第二版

```
// ES3
var slice = Array.prototype.slice; // 使用 slice 代替 ... 运算符
function bind(callThis) {
  var fn = this;
  // 增加了错误判断
  if (typeof fn !== "function") {
    throw new Error("bind 必须绑定在函数身上");
  }
  var args = slice.call(arguments, 1);
  return function() {
    var args2 = slice.call(arguments, 0);
    return fn.apply(callThis, args.concat(args2));
  };
}
```

问题： 不支持 new

### new 做了什么

```
let fn1 = fn.bind(undefined, "x", "y");
let newFn = new fn1();
// new 内部实现了
// var temp = {}
// temp.__proto__ === fn.prototype
// fn.call(temp,'x','y')
// return this
console.assert(newFn.p1 === "x");
console.assert(newFn.p2 === "y");
```

而我们的第一和第二版 return 了 bind 传进来的 this，若不传则 p1，p2 直接传给了 window（global）

```
var fn = function() {
  console.log(this);
  console.log(this.__proto__ === fn.prototype)
}

fn()
//  Window {parent: Window, postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, …}
// false

fn.call({name:'ada'})
// {name: "ada"}
//  false

new fn()
// fn {}
// true
```

因此可以通过 this.**proto** === resultFn.prototype 来判断是否 bind 是否 new

```
function _bind(callThis, ...args) {
  const fn = this;
  return function resultFn(...args2) {
    return fn.call(
      this.__proto__ === resultFn.prototype ? this : callThis,
      ...args,
      ...args2
    );
  };
}
```

问题： resultFn 没有 prototype

```
function _bind(callThis, ...args) {
  const fn = this;
  function resultFn(...args2) {
    return fn.call(
      this.__proto__ === resultFn.prototype ? this : callThis,
      ...args,
      ...args2
    );
  }
  resultFn.prototype = fn.prototype;
  return resultFn;
}
```

问题：

1. 不用 new 但是用类似的对象也能使得 this.**proto** === resultFn.prototype 成立，此依据不够严谨
2. `该特性已经从 Web 标准中删除，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性`

代替方案

```
// this.constructor === resultFn// 可能是继承来的(不推荐)
resultFn.prototype.isPrototypeOf(this) // 推荐
this instanceof resultFn // 推荐
```

## 最终版本完整代码

```
// ES6
function _bind(callThis, ...args) {
  const fn = this;
  function resultFn(...args2) {
    return fn.call(
      // this.constructor === resultFn 可能是继承来的
      // this.__proto__ === resultFn.prototype 不推荐
      // resultFn.prototype.isPrototypeOf(this) 推荐
      this instanceof resultFn ? this : callThis,
      ...args,
      ...args2
    );
  }
  resultFn.prototype = fn.prototype;
  return resultFn;
}

// ES3
var slice = Array.prototype.slice;
function bind(callThis) {
  var fn = this;
  if (typeof fn !== "function") {
    throw new Error("bind 必须绑定在函数身上");
  }
  var args = slice.call(arguments, 1);
  function resultFn() {
    var args2 = slice.call(arguments, 0);
    return fn.apply(
      this instanceof resultFn ? this : callThis,
      args.concat(args2)
    );
  }
  resultFn.prototype = fn.prototype;
  return resultFn;
}
```
