##1.React 的初衷
原生JS：DOM API

![](https://upload-images.jianshu.io/upload_images/7094266-e996765616bd5756.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**缺点：过程智障**
要经过页面到 JS ，再由 JS 到页面的过程

![](https://upload-images.jianshu.io/upload_images/7094266-fad1c928c4c99cf7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**React 的想法：直接由 React 的 JS 部分（虚拟DOM）控制页面**

![](https://upload-images.jianshu.io/upload_images/7094266-c6d45166daeb5d90.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**理念：永远往页面填对象，而不需要先取过来再填进去**
## 工具 [BootCDN](https://www.bootcdn.cn/)
BootCDN 是Bootstrap 中文网支持并维护的前端开源项目免费 CDN 服务，致力于为 Bootstrap、jQuery、Angular、Vuejs 一样优秀的前端开源项目提供稳定、快速的免费 CDN 加速服务。BootCDN 所收录的开源项目主要同步于cdnjs仓库。
尝试用 React 写上面代码

![](https://upload-images.jianshu.io/upload_images/7094266-fbd0ea4e00d1ab03.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

（React 是局部更新）
# JSX（JavaScript XML）的出现
JSX 其实就是用 html 的形式写 JS
虚拟 DOM：非真正实的 DOM，即表示 DOM 节点的对象
我们用 h 替代重复的 React.createElement；这些变量都只用了一次，不用 let 什么的，直接嵌套进去
```
function render(){
  let span = React.createElement('span',{className:'red'},number)
  let button = React.createElement('button',{onClick:onClickButton},'+')
  let button1 = React.createElement('button',{onClick:onClickButton1},'-')
  let div = React.createElement('div',{className:'parent'},span,button,button1)
  ReactDOM.render(div,document.querySelector('#root'))
}
// 简化
let h = React.createElement
function render(){
  ReactDOM.render(h(
    'div',
    {className:'parent'},
      h('span',{className:'red'},number),
      h('button',{onClick:onClickButton},'+'),
      h('button',{onClick:onClickButton1},'-')),
    document.querySelector('#root'))
}
```
发现上面格式完全和 html 形式一样，那我们能不能以 html 形式写出来？可以，于是有了 JSX
```
// JSX形式
<div className='parent'>
   // 变量要用{}，如下面 number，因为默认是字符串
   <span className='red'>{number}</span>
   <button onClick={onClickButton}>+</button>
   <button onClick={onClickButton1}>-</button>
</div>
```
**可以用 BABEL 转换**![](https://upload-images.jianshu.io/upload_images/7094266-1ae5122bc5e4c6dc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)**jsbin 有 JSX(React)**![](https://upload-images.jianshu.io/upload_images/7094266-342d0d47735be448.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

[最终代码](https://jsbin.com/zuleyep/edit?html,js,output)

