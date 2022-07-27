### 1. JSX 最终转化？

jsx -> React Element

```js
// 老版本
React.createElement(
  type,
  [props],
  [...children]
)

// React 17 与 babel合作，不再使用 React.createElement

// 由编译器引入（禁止自己引入！）
import {jsx as _jsx} from 'react/jsx-runtime';

function App() {
  return _jsx('h1', { children: 'Hello world' });
}

// 可用 codemod 自动除未使用的 React 引入
```

![image-20211116113905231.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbd4a82d52194c5fa89a336b81e2d7f0~tplv-k3u1fbpfcp-watermark.image?)

React Element -> fiber tag

```js
export const FunctionComponent = 0;       // 函数组件
export const ClassComponent = 1;          // 类组件
export const IndeterminateComponent = 2;  // 初始化的时候不知道是函数组件还是类组件 
export const HostRoot = 3;                // Root Fiber 可以理解为根元素 ， 通过reactDom.render()产生的根元素
export const HostPortal = 4;              // 对应  ReactDOM.createPortal 产生的 Portal 
export const HostComponent = 5;           // dom 元素 比如 <div>
export const HostText = 6;                // 文本节点
export const Fragment = 7;                // 对应 <React.Fragment> 
export const Mode = 8;                    // 对应 <React.StrictMode>   
export const ContextConsumer = 9;         // 对应 <Context.Consumer>
export const ContextProvider = 10;        // 对应 <Context.Provider>
export const ForwardRef = 11;             // 对应 React.ForwardRef
export const Profiler = 12;               // 对应 <Profiler/ >
export const SuspenseComponent = 13;      // 对应 <Suspense>
export const MemoComponent = 14;          // 对应 React.memo 返回的组件
```

### 进阶实践-可控性 render

`React.Children.toArray` : 扁平化、规范化 React.element 的 children 组成的数组

`React.Children.forEach` = `React.Children.toArray` + `Array.prototype.forEach`

React.cloneElement(reactElement,{} ,...newChildren )