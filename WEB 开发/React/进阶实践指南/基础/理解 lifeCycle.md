### 类组件生命周期介绍

render 阶段，类组件处理逻辑（发现了一个 `fiber tag = 1 `类组件）

```js
// react-reconciler/src/ReactFiberBeginWork.js
/* workloop React 处理类组件的主要功能方法 */
function updateClassComponent(){
    let shouldUpdate
    const instance = workInProgress.stateNode // stateNode 是 fiber 指向 类组件实例的指针。
     if (instance === null) { // instance 为组件实例,如果组件实例不存在，证明该类组件没有被挂载过，那么会走初始化流程
        constructClassInstance(workInProgress, Component, nextProps); // 组件实例将在这个方法中被new。
        mountClassInstance(  workInProgress,Component, nextProps,renderExpirationTime ); //初始化挂载组件流程
        shouldUpdate = true; // shouldUpdate 标识用来证明 组件是否需要更新。
     }else{  
        shouldUpdate = updateClassInstance(current, workInProgress, Component, nextProps, renderExpirationTime) // 更新组件流程
     }
     if(shouldUpdate){
         nextChildren = instance.render(); /* 执行render函数 ，得到子节点 */
        reconcileChildren(current,workInProgress,nextChildren,renderExpirationTime) /* 继续调和子节点 */
     }
}
```

- ① `instance` 类组件对应实例。
- ② `workInProgress` 树，当前正在调和的 fiber 树 ，一次更新中，React 会自上而下深度遍历子代 fiber ，如果遍历到一个 fiber ，会把当前 fiber 指向 workInProgress。
- ③ `current` 树，在初始化更新中，current = null ，在第一次 fiber 调和之后，会将 workInProgress 树赋值给 current 树。React 来用workInProgress 和 current 来确保一次更新中，快速构建，并且状态不丢失。
- ④ `Component` 就是项目中的 class 组件。
- ⑤ `nextProps` 作为组件在一次更新中新的 props 。
- ⑥ `renderExpirationTime` 作为下一次渲染的过期时间。

在组件实例上可以通过 `_reactInternals` 属性来访问组件对应的 fiber 对象。在 fiber 对象上，可以通过 `stateNode` 来访问当前 fiber 对应的组件实例

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/018a9cbd20df478a955b84beba770674~tplv-k3u1fbpfcp-watermark.awebp" style="zoom:50%;" />

#### 初始化阶段

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de17c24547b040b9a93b01706d9e585b~tplv-k3u1fbpfcp-watermark.awebp" style="zoom:40%;" />

**① constructor 执行**（render 阶段）

首先执行的 constructClassInstance 函数，用来实例化 React 组件

实例化组件之后，会调用 mountClassInstance 组件初始化

```js
// react-reconciler/src/ReactFiberClassComponent.js
function mountClassInstance(workInProgress,ctor,newProps,renderExpirationTime){
    const instance = workInProgress.stateNode;
     ② const getDerivedStateFromProps = ctor.getDerivedStateFromProps;
  if (typeof getDerivedStateFromProps === 'function') { /* ctor 就是我们写的类组件，获取类组件的静态防范 */
     const partialState = getDerivedStateFromProps(nextProps, prevState); /* 这个时候执行 getDerivedStateFromProps 生命周期 ，得到将合并的state */
     const memoizedState = partialState === null || partialState === undefined ? prevState : Object.assign({}, prevState, partialState); // 合并state
     workInProgress.memoizedState = memoizedState;
     instance.state = workInProgress.memoizedState; /* 将state 赋值给我们实例上，instance.state  就是我们在组件中 this.state获取的state*/
  }
  if(typeof ctor.getDerivedStateFromProps !== 'function' &&   typeof instance.getSnapshotBeforeUpdate !== 'function' && typeof instance.componentWillMount === 'function' ){
     ③ instance.componentWillMount(); /* 当 getDerivedStateFromProps 和 getSnapshotBeforeUpdate 不存在的时候 ，执行 componentWillMount*/
  }
}
```

**② getDerivedStateFromProps 执行**（render 阶段）

`getDerivedStateFromProps` 是第二个执行的生命周期，值得注意的是它是从 ctor 类上直接绑定的静态方法，传入 props ，state 。 返回值将和之前的 state 合并，作为新的 state ，传递给组件实例使用。

**③ componentWillMount 执行**（render 阶段）

如果存在 `getDerivedStateFromProps` 和 `getSnapshotBeforeUpdate` 就不会执行生命周期`componentWillMount`。

**④ render 函数执行**（render 阶段）

到此为止 `mountClassInstancec` 函数完成，但是开头 `updateClassComponent` 函数， 在执行完 `mountClassInstancec` 后，执行了 render 渲染函数，形成了 children ， 接下来 React 调用 reconcileChildren 方法深度调和 children 。

**⑤componentDidMount执行**（commit 阶段）

一旦 React 调和完所有的 fiber 节点，就会到 commit 阶段，在组件初始化 commit 阶段，会调用 `componentDidMount` 生命周期。

```js
// react-reconciler/src/ReactFiberCommitWork.js
function commitLifeCycles(finishedRoot,current,finishedWork){
     switch (finishedWork.tag){                             /* fiber tag 在第一节讲了不同fiber类型 */
        case ClassComponent: {                              /* 如果是 类组件 类型 */
             const instance = finishedWork.stateNode        /* 类实例 */
             if(current === null){                          /* 类组件第一次调和渲染 */
                instance.componentDidMount() 
             }else{                                         /* 类组件更新 */
                instance.componentDidUpdate(prevProps,prevState，instance.__reactInternalSnapshotBeforeUpdate); 
             }
        }
     }
}
```

#### 更新阶段

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de17c24547b040b9a93b01706d9e585b~tplv-k3u1fbpfcp-watermark.awebp" style="zoom:40%;" />

回到开始的 `updateClassComponent` 函数了，当 current 不为 null 时，说明该类组件被挂载过，那么直接按照更新逻辑来处理

```js
// react-reconciler/src/ReactFiberClassComponent.js
function updateClassInstance(current,workInProgress,ctor,newProps,renderExpirationTime){
    const instance = workInProgress.stateNode; // 类组件实例
    const hasNewLifecycles =  typeof ctor.getDerivedStateFromProps === 'function'  // 判断是否具有 getDerivedStateFromProps 生命周期
    if(!hasNewLifecycles && typeof instance.componentWillReceiveProps === 'function' ){
         if (oldProps !== newProps || oldContext !== nextContext) {     // 浅比较 props 不相等
            ① instance.componentWillReceiveProps(newProps, nextContext);  // 执行生命周期 componentWillReceiveProps 
         }
    }
    let newState = (instance.state = oldState);
    if (typeof getDerivedStateFromProps === 'function') {
        ② ctor.getDerivedStateFromProps(nextProps,prevState)  /* 执行生命周期getDerivedStateFromProps  ，逻辑和mounted类似 ，合并state  */
        newState = workInProgress.memoizedState;
    }   
    let shouldUpdate = true
    if(typeof instance.shouldComponentUpdate === 'function' ){ /* 执行生命周期 shouldComponentUpdate 返回值决定是否执行render ，调和子节点 */
       ③ shouldUpdate = instance.shouldComponentUpdate(newProps,newState,nextContext,);
    }
    if(shouldUpdate){
        if (typeof instance.componentWillUpdate === 'function') {
           ④ instance.componentWillUpdate(); /* 执行生命周期 componentWillUpdate  */
        }
    }
    return shouldUpdate
}
```

**①执行生命周期 componentWillReceiveProps**

首先判断 `getDerivedStateFromProps` 生命周期是否存在，如果不存在就执行`componentWillReceiveProps`生命周期。传入该生命周期两个参数，分别是 newProps 和 nextContext 。

**②执行生命周期 getDerivedStateFromProps**

接下来执行生命周期`getDerivedStateFromProps`， 返回的值用于合并state，生成新的state。

**③执行生命周期 shouldComponentUpdate**

接下来执行生命周期`shouldComponentUpdate`，传入新的 props ，新的 state ，和新的 context ，返回值决定是否继续执行 render 函数，调和子节点。这里应该注意一个问题，`getDerivedStateFromProps` 的返回值可以作为新的 state ，传递给 shouldComponentUpdate 。

**④执行生命周期 componentWillUpdate**

接下来执行生命周期 `componentWillUpdate`。updateClassInstance 方法到此执行完毕了。

**⑤执行 render 函数**

接下来会执行 render 函数，得到最新的 React element 元素。然后继续调和子节点。

**⑥执行 getSnapshotBeforeUpdate**

```js
// react-reconciler/src/ReactFiberCommitWork.js
function commitBeforeMutationLifeCycles(current,finishedWork){
     switch (finishedWork.tag) {
          case ClassComponent:{
               const snapshot = instance.getSnapshotBeforeUpdate(prevProps,prevState) /* 执行生命周期 getSnapshotBeforeUpdate   */
                instance.__reactInternalSnapshotBeforeUpdate = snapshot; /* 返回值将作为 __reactInternalSnapshotBeforeUpdate 传递给 componentDidUpdate 生命周期  */
          }
     }
}
```

commit 阶段细分为 `before Mutation`( DOM 修改前)，`Mutation` ( DOM 修改)，`Layout`( DOM 修改后) 三个阶段

`getSnapshotBeforeUpdate` 发生在`before Mutation` 阶段，生命周期的返回值，将作为第三个参数 __reactInternalSnapshotBeforeUpdate 传递给 componentDidUpdate 。

**⑦执行 componentDidUpdate**

接下来执行生命周期 componentDidUpdate ，此时 DOM 已经修改完成。可以操作修改之后的 DOM 。到此为止更新阶段的生命周期执行完毕。

#### 销毁阶段

```js
// react-reconciler/src/ReactFiberCommitWork.js
function callComponentWillUnmountWithTimer(){
    instance.componentWillUnmount();
}
```

**执行生命周期 componentWillUnmount**

销毁阶段就比较简单了，在一次调和更新中，如果发现元素被移除，就会打对应的 Deletion 标签 ，然后在 commit 阶段就会调用 `componentWillUnmount` 生命周期，接下来统一卸载组件以及 DOM 元素。

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37d76e8437764f2fb605c03332d5fb0f~tplv-k3u1fbpfcp-watermark.awebp" style="zoom:35%;" />

#### 三个阶段生命周期+无状态组件总览图：

![lifesycyle8.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7066da719fda4a91aa2c432f60c58a48~tplv-k3u1fbpfcp-watermark.awebp)

### React 各阶段生命周期能做些什么

constructor 作用：

- 初始化 state ，比如可以用来截取路由中的参数，赋值给 state 。
- 对类组件的事件做一些处理，比如绑定 this ，节流，防抖等。
- 对类组件进行一些必要生命周期的劫持，渲染劫持，这个功能更适合反向继承的HOC。

getDerivedStateFromProps 作用：

- 代替 componentWillMount 和 componentWillReceiveProps
- 组件初始化或者更新时，将 props 映射到 state。
- 返回值与 state 合并完，可以作为 shouldComponentUpdate 第二个参数 newState ，可以判断是否渲染组件。

为什么要加`UNSAFE`？React 对于执行 render 函数有着像 shouldUpdate 等条件制约，但是对于执行在 render 之前生命周期没有限制，存在一定隐匿风险，如果 updateClassInstance 执行多次，React 开发者滥用这几个生命周期，可能导致生命周期内的上下文多次被执行

- UNSAFE_componentWillMount
- UNSAFE_componentWillReceiveProps
- UNSAFE_componentWillUpdate

render 作用：

- **createElement 创建元素** , **cloneElement 克隆元素** ，**React.children 遍历 children** 的操作。

getSnapshotBeforeUpdate（**获取更新前的快照**）作用：

- getSnapshotBeforeUpdate 这个生命周期意义就是配合componentDidUpdate 一起使用，计算形成一个 snapShot 传递给 componentDidUpdate 。保存一次更新前的信息。

componentDidUpdate 作用：

- componentDidUpdate 生命周期执行，此时 DOM 已经更新，可以直接获取 DOM 最新状态。这个函数里面如果想要使用 setState ，一定要加以限制，否则会引起无限循环。
- 接受 getSnapshotBeforeUpdate 保存的快照信息。

componentDidMount 作用：

- 可以做一些关于 DOM 操作，比如基于 DOM 的事件监听器。
- 对于初始化向服务器请求数据，渲染视图，这个生命周期也是蛮合适的。

shouldComponentUpdate ：

- 一般用于性能优化，shouldComponentUpdate 返回值决定是否重新渲染的类组件。需要重点关注的是第二个参数 newState ，如果有 getDerivedStateFromProps 生命周期 ，它的返回值将合并到 newState ，供 shouldComponentUpdate 使用。

componentWillUnmount 作用：

- 清除延时器，定时器。
- 一些基于 DOM 的操作，比如事件监听器。

## 函数组件生命周期替代方案

#### useEffect 和 useLayoutEffect

对于 useEffect 执行，React 处理逻辑是采用异步调用 ，对于每一个 effect 的 callback， React 会向 `setTimeout`回调函数一样，放入任务队列，等到主线程任务完成，DOM 更新，js 执行完成，视图绘制完毕，才执行。所以 effect 回调函数不会阻塞浏览器绘制视图

useLayoutEffect 和 useEffect 不同的地方是采用了同步执行，那么和useEffect有什么区别呢？

- 首先 useLayoutEffect 是在 DOM 绘制之前，便于修改 DOM，这样浏览器只会绘制一次，如果修改 DOM 布局放在 useEffect ，那 useEffect 执行是在浏览器绘制视图之后，接下来又改 DOM ，就可能会导致浏览器再次回流和重绘。而且由于两次绘制，视图上可能会造成闪现突兀的效果。
- useLayoutEffect callback 中代码执行会阻塞浏览器绘制。

**修改 DOM ，改变布局就用 useLayoutEffect ，其他情况就用 useEffect 。**

在时机上 ，componentDidMount / componentDidUpdate 和 useLayoutEffect 更类似