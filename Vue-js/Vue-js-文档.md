[英文](https://vuejs.org/)
[中文](https://cn.vuejs.org/index.html)
#介绍
一套用于构建用户界面的渐进式框架，
##声明式渲染
命令式渲染 ： 命令我们的程序去做什么，程序就会跟着你的命令去一步一步执行
声明式渲染 ： 我们只需要告诉程序我们想要什么效果，其他的交给程序来做。

**Vue.js 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统**
相关博客 [Vue.js声明式渲染](https://segmentfault.com/a/1190000011962150)

**指令** 带有前缀 v-：举例
v-bind：绑定
我希望 span 的 title 是 data.message 的值，如何使用 v-bind
```
v-bind:title="message"
v-bind:title='message'
v-bind:title="this.message"
v-bind:title=message
```
v-if：判断
data 的 key 的值为真值时，页面中会出现这个 p 元素
v-on：添加事件监听
v-model：双向数据绑定
##组件化应用构建
组件系统：Vue 允许我们使用小型、独立和通常可复用的组件构建大型应用

![应用界面 => 组件树](https://upload-images.jianshu.io/upload_images/7094266-af73cf610ad0d4de.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

Vue 组件非常类似于 [自定义元素](https://www.html5rocks.com/zh/tutorials/webcomponents/customelements/) 
- 使用 document.registerElement() 可以创建一个自定义元素
```
var XFoo = document.registerElement('x-foo');
document.body.appendChild(new XFoo());
```
- 现在你可以在页面中使用 <x-foo></x-foo>这个元素标签了

Vue 的组件语法部分参考了自定义元素对应的 web 规范
1. Vue 组件不需要任何 polyfill，并且在所有支持的浏览器 (IE9 及更高版本) 之下表现一致。Vue 组件也可以包装于原生自定义元素之内。

2. Vue 组件提供了纯自定义元素所不具备的一些重要功能，最突出的是跨组件数据流、自定义事件通信以及构建工具集成。
---
#Vue 实例
##创建一个 Vue 实例
```
var vm = new Vue({
  // 选项
})
```
所有的 Vue 组件都是 Vue 实例，并且接受相同的选项对象 (一些根实例特有的选项除外)。
##数据与方法
Vue 实例伴随其 data 对象被创建，设置实例属性或 data 属性均可以改变视图（响应式）
```
var data = { a: 1 }
var vm = new Vue({data:data})
vm.a == data.a // => true vm.a 等价于访问 vm.$data.a
vm.a = 2
data.a // => 2
data.a = 3
vm.a // => 3
```
**只有当实例被创建时 data 中存在的属性才是响应式的**
可以设置一些初始值
```
data: {
  newTodoText: '',
  visitCount: 0,
  hideCompletedTodos: false,
  todos: [],
  error: null
}
```
**通过 Object.freeze() 可以阻止修改现有的属性**
**Vue 已经给的实例属性有前缀 $**
##实例生命周期钩子
created 钩子，其他钩子在下文图示中含有
```
new Vue({
  data: {
    a: 1
  },
  created: function () { // 不能用箭头函数
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  }
})
// => "a is: 1"
```
##生命周期
![待深入](https://upload-images.jianshu.io/upload_images/7094266-e96014e0aa70dfee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

---
#模板语法
Vue.js 使用了基于 HTML 的模板语法,Vue 底层通过将模版编译为虚拟 DOM 渲染
##插值
####文本
“Mustache（胡子）”语法 (双大括号) 的文本插值
```
<span>Message: {{ msg }}</span>
```
v-once 指令可以固定内容不变
```
<span v-once>这个将不会改变: {{ msg }}</span>
```
####原始 HTML
v-html 指令可以设定数据为 HTML
这个指令在使用时应考虑 XSS 攻击
####特性
可以通过使用 v-bind 指令添加 HTML 特性
####使用 JavaScript 表达式
对于所有的数据绑定，Vue.js 都提供了完全的 JavaScript 表达式支持
表达式可在所属 Vue 实例的数据作用域下作为 JavaScript 被解析。注意每个绑定都只能包含单个表达式，否则不会生效。
##指令
指令 (Directives) 是带有 v- 前缀的特殊特性。指令特性的值预期是单个 JavaScript 表达式 (v-for 除外)。
其作用是当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM
####参数
在指令后以冒号表示为指令的“参数”。
如 v-bind:href、v-on:click
####修饰符 (Modifiers) 
以 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。
####缩写
为防止繁琐可以把：
**v-bind: 缩写为 :**
```
<!-- 完整语法 -->
<a v-bind:href="url">...</a>
<!-- 缩写 -->
<a :href="url">...</a>
```
**v-on: 缩写为 @**
```
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>
<!-- 缩写 -->
<a @click="doSomething">...</a>
```
---
#计算属性和侦听器
##计算属性
模版内表达式不应该放入复杂的逻辑，计算属性就是为了复杂逻辑设计的。
####计算属性缓存 vs 方法
计算属性（computed）是基于它们的依赖进行缓存的，只在依赖变化时才重新求值
而调用方法（methods）会
####计算属性 vs 侦听属性
通过 computed 而不是 watch 来监听 Vue 实例的数据变动。
####计算属性 setter
计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter
```
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```
##侦听器
大多数情况下，计算属性能满足要求，但当需要响应数据变化时，如当需要在数据变化时执行异步或开销较大的操作时，我们需要设置监听器
#Class 与 Style 绑定
