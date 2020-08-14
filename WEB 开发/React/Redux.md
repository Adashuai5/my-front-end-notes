# 前言

react 发布了 hooks API 可以会取代 redux

# Redux

Redux 文档不适合新人，直接看 [文档-示例](http://cn.redux.js.org/docs/introduction/Examples.html) 部分
（下面的 官方示例 和 [库](https://github.com/reduxjs/redux/tree/master/examples) 均可在此链接找到）

运行  [Counter Vanilla（原生的计数器 demo）](https://github.com/reactjs/redux/tree/master/examples/counter-vanilla) 
_Vanilla（香草；普通的） JS 其实就是 **原生 js**：为了嘲讽只会用框架的开发者_

[仿写 Counter Vanilla](https://jsbin.com/lujucuf/edit?html,output)

# Redux 结合 React 的计数 demo

[方方简化](https://github.com/FrankFang/redux-demos/tree/35b6e18638390d4728dd05b78dbcfeb503191215 "null")
[Counter 在线示例](https://codesandbox.io/s/github/reactjs/redux/tree/master/examples/counter)

**Redux 结合 React 较于 Counter Vanilla 好处（React 优点）：** 只更新改变部分（虚拟 dom 等），无需更新整个 App

**Redux 结合 React 的问题：** Redux 在 react 无法很好得传递（需要层层传递 store 或者层层调用父亲钩子到 App 来使用 dispatch）

![](https://upload-images.jianshu.io/upload_images/7094266-3992827cb2943dcb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# React-Redux

React-Redux 为了解决上述问题

## Provider

通过 provide 将 store 传递给所有组件

```
// subscribe 接收到的新数据
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

## connect()

connect 是个柯里化函数

```
// 柯里化函数
function connect(a) {
  return function fn(b) {
    console.log(a + b)
  }
}
```

```
// 将 state 传入 props
function mapStateToProps(state){
  return {
    n: state.n
  }
}
// this.props.n 这样就任何元素都可以直接获取了

// mapDispatchToProps 可以是函数也可以是一个对象
function mapDispatchToProps(dispatch) {
  return {
    add1: ()=> dispatch({type:'add', payload: 1})
  }
}
// 组件内直接可以调用 this.props.add1()

// 将上面两个数据 connect 到 App 上
export default connect(mapStateToProps,mapDispatchToProps)(App);
```

# 总结

## 1. store.dispatch

```
// dispatch 一个 action
store.dispatch({type:'add', payload: 1})
```

## 2. Reducer

根据旧 state 返回新的

```
const reducer = (state, action)=>{
  if(state === undefined){
    return {n: 0}
  }else{
    if(action.type === 'add'){
      var newState = {n: state.n + action.payload}
      return newState //  2 根据操作生成新的 state 触发一个事件
    }else{
      return state
    }
  }
}
// store
const store = createStore(reducer)
```

## 3. store.subscribe

```
// 3 接收到，重新 render
store.subscribe(()=>{render()})
```

vanilla 版本的 redux 就是上面过程
而在 react 内 redux 优化了渲染
在 react-redux 中，将上述过程进一步简化
由 Provider 和 Connect 将 store 直接传给所有组件，组件 dispatch action 及 重新 render 的动作直接由 this.props 完成
