# 一个开放的标准，由实现者提供，为实现者提供的合理、可互操作的 JavaScript Promise 。

promise 代表了一个异步操作的最终结果。与 promise 交互的主要方式是通过它的 then 方法，它注册回调来接收 promise 的最终值或 promise 无法实现的原因。

本规范详细说明了 then 方法的行为，提供了一个可互操作的基础，所有符合 Promise/A+ 的 promise 实现都可以依赖它来提供。因此，本规范应该被认为是非常稳定的。尽管 Promises/A+ 组织可能偶尔会对本规范进行一些向后兼容的小改动，以解决新发现的问题，但只有在仔细考虑、讨论和测试之后，我们才会对大的或向后不兼容的改动进行整合。

从历史上看，Promises/A+ 澄清了早期的 [Promises/A proposal](http://wiki.commonjs.org/wiki/Promises/A) 提案中的行为条款，将其扩展到了事实上的行为，并省略了一些没有明确规定或有问题的部分。

最后，核心的 Promises/A+ 规范并没有涉及到如何创建、实现或拒绝承诺的问题，而是选择将重点放在提供一个可互操作的然后方法上。未来在同伴规范中的工作可能会涉及到这些主题。

# 1. 术语

1.1. "promise" 是一个具有 then 方法的对象或函数，其行为符合本规范。
1.2. "thenable" 是一个定义了一个 then 方法的对象或函数。
1.3. "value" 是任何合法的 JavaScript 值（包括 undefined、thenable 或 promise）。
1.4. "exception" 是使用 throw 语句抛出的值。
1.5. "reason" 是表示拒绝承诺的原因的值。

# 2. 必要条件

## 2.1. Promise 状态

promise 必须处于三种状态之一：pending，fulfilled 或 rejected。

### 2.1.1. 在 pending 状态下，promise：

- 2.1.1.1. 可以过渡到 fulfilled 或 rejected 的状态。

### 2.1.2. fulfilled 状态，promise：

- 2.1.2.1. 不得过渡到任何其他状态。
- 2.1.2.2. 必须有一个值，这个值不能改变。（成功的返回值）

### 2.1.3. fulfilled 状态，promise：

- 2.1.2.1. 不得过渡到任何其他状态。
- 2.1.2.2. 必须有一个原因，这必须是不可以改变的。（失败的原因）

这里，"不得改变"是指不可改变的特性（即 ===），但并不意味着深层的不变性。

## then 方法

promise 必须提供一个 then 方法来获取其当前或最终值或失败原因。

then 方法接受两个参数：

```
promise.then(onFulfilled, onRejected)
```

### 2.2.1. onFulfilled 和 onRejected 都是可选的参数：

- 2.2.1.1. 如果 onFulfilled 不是一个函数，必须忽略。
- 2.2.1.2. 如果 onRejected 不是函数，必须忽略。

### 2.2.2. 如果 onFulfilled 是一个函数：

- 2.2.2.1. 它必须在 promise fulfilled 后调用，以 promise 的值作为第一个参数。
- 2.2.2.2. 它不得在 promise fulfilled 之前调用。
- 2.2.2.3. 它只能被调用一次。

### 2.2.3. 如果 onRejected 是一个函数：

- 2.2.3.1. 它必须在 promise rejected 后调用，以 promise 的失败原因作为第一个参数。
- 2.2.3.2. 它不得在 promise rejected 之前调用。
- 2.2.3.3. 它只能被调用一次。

### 2.2.4. onFulfilled 或 onRejected 必须在 [执行上下文](https://es5.github.io/#x10.3) 栈中只包含平台代码时才能调用（在我写的代码执行完之前，不得调用 then 后面两个函数）。【3.1】

### 2.2.5. onFulfilled 和 onRejected 必须作为函数调用（即没有 this）。【3.2】

### 2.2.6. then 可以在同一个 promise 上被多次调用：

- 2.2.6.1. 如果/当 promise 被满足时，所有相应的 onFulfilled 回调必须按照其对 then 的调用顺序执行。
- 2.2.6.2. 如果/当 promise 被拒绝时，所有的 onRejected 回调必须按照其对 then 的调用顺序执行。

### 2.2.7. then 必须返回一个 promise【3.3】：

```
 promise2 = promise1.then(onFulfilled, onRejected);
```

- 2.2.7.1. 如果 onFulfilled 或 onRejected 返回值为 x，则运行 Promise 解析过程 [[Resolve]](promise2, x)【2.3】.。
- 2.2.7.2. 如果 onFulfilled 或 onRejected 都抛出异常 e，那么 promise2 必须以 e 为原因拒绝。
- 2.2.7.3. 如果 onFulfilled 不是函数，并且 promise1 是 fulfilled，那么 promise2 必须以与 promise1 相同的值来 fulfilled。
- 2.2.7.4. 如果 onRejected 不是一个函数，并且 promise1 是 rejected，那么 promise2 必须以与 promise1 相同的失败原因 rejected。

## Promise 解析过程

Promise 解析过程是一个抽象的操作，它以一个 promise 和一个值作为输入，我们将其称为 [[Resolve]](promise, x)。如果 x 是一个 thenable，在假设 x 的行为至少有点像 promise 的前提下，它试图使 promise 采用 x 的状态。否则，它用值 x 来实现 promise 。

这种对 thenable 的处理方法允许 promise 实现互操作，只要它们暴露了一个符合 Promises/A+ 的 then 方法。它还允许 Promises/A+ 实现用合理的 then 方法 "同化 "不符合的实现。

运行`[[Resolve]](promise, x)`,执行以下步骤：

### 2.3.1 如果`promise`和`x`引用同一个对象，则用`TypeError`作为原因拒绝（reject）`promise`。

### 2.3.2 如果`x`是一个 promise,采用 promise 的状态[3.4](#34)

- 2.3.2.1 如果`x`是请求状态(pending),`promise`必须保持 pending 直到`x`fulfilled 或 rejected
- 2.3.2.2 如果`x`是完成态(fulfilled)，用相同的值完成 fulfill`promise`
- 2.3.2.2 如果`x`是拒绝态(rejected)，用相同的原因 reject`promise`

### 2.3.3 另外，如果`x`是个对象或者方法

- 2.3.3.1 让`then`作为`x.then`. [3.5](#35)
- 2.3.3.2 如果取回的`x.then`属性的结果为一个异常`e`,用`e`作为原因 reject `promise`
- 2.3.3.3 如果`then`是一个方法，把`x`当作`this`来调用它， 第一个参数为 `resolvePromise`，第二个参数为`rejectPromise`,其中:
  - 2.3.3.3.1 如果/当 `resolvePromise`被一个值`y`调用，运行 `[[Resolve]](promise, y)`
  - 2.3.3.3.2 如果/当 `rejectPromise`被一个原因`r`调用，用`r`拒绝（reject）`promise`
  - 2.3.3.3.3 如果`resolvePromise`和 `rejectPromise`都被调用，或者对同一个参数进行多次调用，第一次调用执行，任何进一步的调用都被忽略
  - 2.3.3.3.4 如果调用`then`抛出一个异常`e`,
    - 2.3.3.3.4.1 如果`resolvePromise`或 `rejectPromise`已被调用，忽略。
    - 2.3.3.3.4.2 或者， 用`e`作为 reason 拒绝（reject）`promise`
- 2.3.3.4 如果`then`不是一个函数，用`x`完成(fulfill)`promise`

### 2.3.4 如果 `x`既不是对象也不是函数，用`x`完成(fulfill)`promise`

如果一个 promise 被一个 thenable resolve,并且这个 thenable 参与了循环的 thenable 环， `[[Resolve]](promise, thenable)`的递归特性最终会引起`[[Resolve]](promise, thenable)`再次被调用。 遵循上述算法会导致无限递归，鼓励（但不是必须）实现检测这种递归并用包含信息的`TypeError`作为 reason 拒绝（reject）[3.6](#36)

## 3.备注

### 3.1 这里的"平台代码"

指的是引擎，环境和 promise 执行代码。在实践中，此要求确保`onFulfilled`和`onRejected` 能够异步执行，在`then`被调用之后传入事件环，并使用新的栈。这可以使用诸如`setTimeout`或`setImmediate`之类的“宏任务”机制， 或者使用诸如`MutationObserver`或`process.nextTick`之类的“微任务”机制来实现。 由于 promise 实现被认为是平台代码，因此它本身可能包含一个任务调度队列或调用处理程序的“trampoline”。

### 3.2 没有 this 的情况

也就是说，在严格模式下，`this`是未定义的; 在宽松模式下，它将成为全局对象。

### 3.3 then 必须返回 promise

在实例满足所有要求的情况下，可以允许`promise2 === promise1`. 每个实例都必须表明是否能实现，以及在什么情况下，`promise2 === promise1` ？

### 3.4 关于 x

通常，当`x`来自当前的实例时，`x`才是真正的`promise` This clause allows the use of implementation-specific means to adopt the state of known-conformant promises

### 3.5 关于 x.then

这个流程首先保存`x.then`的引用， 然后测试这个引用，然后调用这个引用，避免多次获取`x.then`属性。 这些预防措施对于确保访问者属性的一致性非常重要，访问者属性的值可能在检索之间发生变化。

### 3.6 如何对待 thenable chain

实例不应该对 thenable 链的深度设置任意限制，并假设递归超出任意限制，递归会无穷。只有真正的循环才会导致`TypeError`. 如果遇到 thenbles 的无限链，那么永远递归就是正确的行为。
