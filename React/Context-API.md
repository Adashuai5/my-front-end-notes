# 四层函数传递值
```
// js
function f1(n) {
  console.log(1, n);
  f2(n);
}

function f2(n) {
  console.log(2, n);
  f3(n);
}

function f3(n) {
  console.log(3, n);
  f4(n);
}

function f4(n) {
  console.log(4, n);
}

{
  let n = 100;
  f1(n);
  console.log("done");
}
// 1 100
// 2 100
// 3 100
// 4 100
// done
```
将上面的 js 版本改为 react 版本
```
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
function F1(props) {
  return (
    <div>
      1, {props.n}
      <F2 n={props.n} />
    </div>
  );
}
function F2(props) {
  return (
    <div>
      2, {props.n}
      <F3 n={props.n} />
    </div>
  );
}
function F3(props) {
  return (
    <div>
      3, {props.n}
      <F4 n={props.n} />
    </div>
  );
}
function F4(props) {
  return <div>4, {props.n}</div>;
}
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      n: 100
    };
  }
  render() {
    return (
      <div className="App">
        <F1 n={this.state.n}>1</F1>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```
## 如何不四层传值直接让 F4 获取到 n 的值
通过一个全局的局部变量 x
```
// js
{
  let x = {};
  window.setx = function(key, value) {
    x[key] = value;
  };
  window.f1 = function f1() {
    console.log(1);
    f2();
  };

  function f2() {
    console.log(2);
    f3();
  }

  function f3() {
    console.log(3);
    f4();
  }

  function f4() {
    console.log(4, x.n);
  }
}

{
  window.setx("n", 100);
  window.f1();
  console.log("done");
}
// 1
// 2
// 3
// 4 100
// done
```
# [React context](https://react.docschina.org/docs/context.html#when-to-use-context) 就是局部的全局变量
[React-context 版本](https://codesandbox.io/s/busy-tree-drj7d)

# 1.  Provider
```    
<nContext.Provider value="99">
  <F1 />
</nContext.Provider>
```
# 2.  Consumer
```    
<nContext.Consumer>
  {(x) => <F4 n4 = {x} />}
</nContext.Consumer>
```
## JSX 内容的真正涵义

![](https://upload-images.jianshu.io/upload_images/7094266-cd917744ae7cb3f2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### F1的四种写法

![](https://upload-images.jianshu.io/upload_images/7094266-c7445f91bb53a989.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### <F1></F1> 是传一个对象

子组件可以通过 React 内置的 props.children 获取父组件内部 solt 的内容

![this.props.children](https://upload-images.jianshu.io/upload_images/7094266-c57aab1229882bc8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### {F1} 是传函数本身

![](https://upload-images.jianshu.io/upload_images/7094266-e7cf6090bf422ab2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

两个 {F1} {F1} 会显示数组形式

![props.children](https://upload-images.jianshu.io/upload_images/7094266-111bd688cf3186c0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

那么下面代码就好懂了，就是执行{}里面的函数
```    
<nContext.Consumer>
  {(x) => <F4 n4 = {x} />}
</nContext.Consumer>
```
```
import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function Consumer(props) {
  console.log(props.children);
  let x = 100
  props.children(x);
  return <div>{props.children}</div>;
}

function App() {
  return (
    <div className="App">
      <Consumer>{(n) => console.log("我是一个箭头函数,我被调用了", n)}</Consumer>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// function () {}
// 我是一个箭头函数,我被调用了  100
```
## 通过 Context 实现子组件改变父组件值

[value 为对象：子组件更改 value 的值](https://codesandbox.io/s/amazing-goldberg- vhuoo?fontsize=14&hidenavigation=1&theme=dark)

# why context

React 学习 React-redux 有了 context

![](https://upload-images.jianshu.io/upload_images/7094266-e71c19448ee27dc9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



