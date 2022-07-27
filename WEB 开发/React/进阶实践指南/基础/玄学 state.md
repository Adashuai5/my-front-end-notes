React 是有多种模式：

`legacy` 模式：当前版本（本章节主要还是围绕 legacy 模式下的 state）

 `blocking` 模式：concurrent 的优雅降级版本和过渡版本

 `concurrent` 模式：未来的默认版本，这个模式下会开启一些新功能

### 类组件中的 state

#### 一次更新流程

render 阶段 render 函数执行 -> commit 阶段真实 DOM 替换 -> setState 回调函数执行 callback

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d5e25a4ed464547bdd0e7c3a44d0ccc~tplv-k3u1fbpfcp-watermark.awebp" style="zoom:50%;" />

#### setState原理揭秘

- 底层逻辑

  调用 setState 方法，实际上是 React 底层调用 Updater 对象上的 enqueueSetState 方法

  ```js
  // enqueueSetState 做了什么
  // react-reconciler/src/ReactFiberClassComponent.js
  enqueueSetState(){
       /* 每一次调用`setState`，react 都会创建一个 update 里面保存了 */
       const update = createUpdate(expirationTime, suspenseConfig);
       /* callback 可以理解为 setState 回调函数，第二个参数 */
       callback && (update.callback = callback) 
       /* enqueueUpdate 把当前的update 传入当前fiber，待更新队列中 */
       enqueueUpdate(fiber, update); 
       /* 开始调度更新 */
       scheduleUpdateOnFiber(fiber, expirationTime);
  }
  ```

- 批量更新

  ```js
  // react-dom/src/events/DOMLegacyEventPluginSystem.js
  /* 在`legacy`模式下，所有的事件都将经过此函数同一处理 */
  function dispatchEventForLegacyPluginEventSystem(){
      // handleTopLevel 事件处理函数
      batchedEventUpdates(handleTopLevel, bookKeeping);
  }
  
  // react-dom/src/events/ReactDOMUpdateBatching.js
  function batchedEventUpdates(fn,a){
      /* 开启批量更新  */
     isBatchingEventUpdates = true;
    try {
      /* 这里执行了的事件处理函数， 比如在一次点击事件中触发setState,那么它将在这个函数内执行 */
      return batchedEventUpdatesImpl(fn, a, b);
    } finally {
      /* try 里面 return 不会影响 finally 执行  */
      /* 完成一次事件，批量更新  */
      isBatchingEventUpdates = false;
    }
  }
  
  ```

  <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/478aef991b4146c898095b83fe3dc0e7~tplv-k3u1fbpfcp-watermark.awebp" style="zoom: 35%;" />

  异步操作里面的批量更新规则会被打破

  <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48e730fc687c4ce087e5c0eab2832273~tplv-k3u1fbpfcp-watermark.awebp" style="zoom:43%;" />

  **异步环境下，继续开启批量更新模式**

  React-Dom 中提供了批量更新方法 `unstable_batchedUpdates`

  **如何提升更新优先级**

  React-dom 提供了 flushSync ，flushSync 可以将回调函数中的更新任务，放在一个较高的优先级中

### 类组件中的 `setState` 和函数组件中的 `useState` 有什么异同

**相同点：**

- 更新视图时底层都调用了 scheduleUpdateOnFiber 方法，而且事件驱动情况下都有批量更新规则

**不同点：**

- 在不是 pureComponent 组件模式下， setState 不会浅比较两次 state 的值，只要调用 setState，在没有其他优化手段的前提下，就会执行更新。但是 useState 中的 dispatchAction 会默认比较两次 state 是否相同，然后决定是否更新组件。
- setState 有专门监听 state 变化的回调函数 callback，可以获取最新state；但是在函数组件中，只能通过 useEffect 来执行 state 变化引起的副作用。
- setState 在底层处理逻辑上主要是和老 state 进行合并处理，而 useState 更倾向于重新赋值。