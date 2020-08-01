[官方](https://vuejs.org/)

# 介绍

一套用于构建用户界面的渐进式框架。
数据驱动：响应用户操作，反应到后台，数据更新到 model ，model 和 view 双向绑定（MVVM）
**特征** 1.轻量级 2.双向数据绑定 3.指令 4.组件化

## 声明式渲染

命令式渲染 ： 命令我们的程序去做什么，程序就会跟着你的命令去一步一步执行
声明式渲染 ： 我们只需要告诉程序我们想要什么效果，其他的交给程序来做。

**Vue.js 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统**
相关博客 [Vue.js 声明式渲染](https://segmentfault.com/a/1190000011962150)

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
v-model：双向数据绑定 ##组件化应用构建
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

# Vue 实例

## 创建一个 Vue 实例

```
var vm = new Vue({
  // 选项
})
```

所有的 Vue 组件都是 Vue 实例，并且接受相同的选项对象 (一些根实例特有的选项除外)。

## 数据与方法

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
**Vue 已经给的实例属性有前缀 \$**

## 实例生命周期钩子

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

生命周期钩子的 this 上下文指向调用它的 Vue 实例

## 生命周期

![待深入](https://upload-images.jianshu.io/upload_images/7094266-e96014e0aa70dfee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

---

#模板语法
Vue.js 使用了基于 HTML 的模板语法,Vue 底层通过将模版编译为虚拟 DOM 渲染

## 插值

#### 文本

“Mustache（胡子）”语法 (双大括号) 的文本插值

```
<span>Message: {{ msg }}</span>
```

v-once 指令可以固定内容不变

```
<span v-once>这个将不会改变: {{ msg }}</span>
```

#### 原始 HTML

v-html 指令可以设定数据为 HTML
这个指令在使用时应考虑 XSS 攻击

#### 特性

可以通过使用 v-bind 指令添加 HTML 特性

#### 使用 JavaScript 表达式

对于所有的数据绑定，Vue.js 都提供了完全的 JavaScript 表达式支持
表达式可在所属 Vue 实例的数据作用域下作为 JavaScript 被解析。**注意每个绑定都只能包含单个表达式，否则不会生效。**

## 指令

指令 (Directives) 是带有 v- 前缀的特殊特性。指令特性的值预期是单个 JavaScript 表达式 (v-for 除外)。
其作用是当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM

#### 参数

在指令后以冒号表示为指令的“参数”。
如 v-bind:href、v-on:click

#### 修饰符 (Modifiers)

以 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。

#### 缩写

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

# 计算属性和侦听器

## 计算属性

模版内表达式不应该放入复杂的逻辑，计算属性就是为了复杂逻辑设计的。

### 计算属性缓存 vs 方法

计算属性（computed）是基于它们的依赖进行缓存的，只在依赖变化时才重新求值
而调用方法（methods）会

### 计算属性 vs 侦听属性

通过 computed 而不是 watch 来监听 Vue 实例的数据变动。

### 计算属性 setter

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

## 侦听器

大多数情况下，计算属性能满足要求，但当需要响应数据变化时，如当需要在数据变化时执行异步或开销较大的操作时，我们需要设置监听器

---

# Class 与 Style 绑定

v-bind 绑定 class 列表 和 style（样式）时，表达式结果的类型除了字符串，Vue.js 针对性得提供了 对象或数组。 ##绑定 Class

#### class 绑定对象

我们可以传给 v-bind:class 一个对象，可以在对象中传入多个属性来动态切换多个 class
此外，v-bind:class 指令也可以与普通的 class 属性共存。
对象属性可以内联、也可以直接写 对象名，而将属性写在 data 中，同时可以绑定一个返回对象的**计算属性**

#### class 绑定数组

同样可以把一个数组传给 v-bind:class，以应用一个 class 列表
根据条件切换列表中的 class，可以用三元表达式
还可以在数组语法中使用对象语法

#### class 用在组件上

你声明了这个组件

```
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```

在使用它的时候添加一些 class

```
<my-component class="baz boo"></my-component>
```

```
<p class="foo bar baz boo">Hi</p>
```

同样

```
<my-component v-bind:class="{ active: isActive }"></my-component>
```

`isActive`  为 truthy 时，HTML 将被渲染成为

```
<p class="foo bar active">Hi</p>
```

## 绑定内联样式

#### style 对象语法

方法

```
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```
data: {
  activeColor: 'red',
  fontSize: 30
}
```

与绑定 class 对象一样，内联样式也可以直接绑定样式对象以及结合**计算属性**使用 ####数组语法
`v-bind:style`  的数组语法可以将多个样式对象应用到同一个元素上：

```
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

#### 自动添加前缀

当  `v-bind:style`  使用需要添加[浏览器引擎前缀](https://developer.mozilla.org/zh-CN/docs/Glossary/Vendor_Prefix)的 CSS 属性时，如  `transform`，Vue.js 会自动侦测并添加相应的前缀 ####多重值从 2.3.0 起你可以为  `style`  绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：

```
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染  `display: flex`

---

# 条件渲染

## v-if

v-if 是一个指令，所以必须将它添加到一个元素上
但是如果想切换多个元素呢？此时可以把一个 <template> 元素当做不可见的包裹元素，并在上面使用 v-if。最终的渲染结果将不包含 <template> 元素
v-else
v-else 元素必须紧跟在带 v-if 或者 v-else-if 的元素的后面，下同
v-else-if(2.1.0)
充当 v-if 的“else-if 块”，可以连续使用

#### 用  `key`  管理可复用的元素

Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染这样使 Vue 更快，而在 v-if 下其作用是允许用户在不同的登录方式之间切换。我们可以通过添加一个具有唯一值的 key 属性来去掉这个功能

## v-show

另一个用于根据条件展示元素的选项是 v-show 指令。用法大致一样

```
<h1 v-show="ok">Hello!</h1>
```

v-show 不支持 <template> 元素，也不支持 v-else

## `v-if` vs `v-show`

- `v-if`  是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
- `v-if`  也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
- 相比之下，`v-show`  就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
- 一般来说，`v-if`  有更高的切换开销，而  `v-show`  有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用  `v-show`  较好；如果在运行时条件很少改变，则使用  `v-if`  较好。
  **当 v-for 和 v-if 同时使用时，前者优先级高，但不推荐这种做法，[详情](https://cn.vuejs.org/v2/style-guide/#%E9%81%BF%E5%85%8D-v-if-%E5%92%8C-v-for-%E7%94%A8%E5%9C%A8%E4%B8%80%E8%B5%B7-%E5%BF%85%E8%A6%81)**

---

#列表渲染 ##用 v-for 把数组对应为一组元素
在 v-for 块中，我们拥有对父作用域属性的完全访问权限。v-for 还支持一个可选的第二个参数为当前项的索引

```
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>

var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

![](https://upload-images.jianshu.io/upload_images/7094266-514602a1f8fadc8e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
可以用 of 替代 in 作为分隔符 ##[一个对象的  v-for](https://cn.vuejs.org/v2/guide/list.html#%E4%B8%80%E4%B8%AA%E5%AF%B9%E8%B1%A1%E7%9A%84-v-for "一个对象的 v-for")

## v-for 的 key

建议尽可能在使用 v-for 时提供 key
当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素
[就地复用](https://www.zhihu.com/question/61078310/answer/361261031)

```
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

## 数组更新检测

#### 变异方法

Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。这些方法如下：

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

#### 替换数组

变异方法 (mutation method)，顾名思义，会改变被这些方法调用的原始数组。相比之下，也有非变异 (non-mutating method) 方法，例如：`filter()`, `concat()`  和  `slice()` 。这些不会改变原始数组，但**总是返回一个新数组**。当使用非变异方法时，可以用新数组替换旧数组
Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的、启发式的方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作

## 注意事项

由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

1.  当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`
2.  当你修改数组的长度时，例如：`vm.items.length = newLength`

```
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

第一类问题：两种解决方法

```
// Vue.set(object, key, value)
Vue.set(vm.items, indexOfItem, newValue)
vm.$set(vm.items, indexOfItem, newValue)
// Array.prototype.splice(start[, deleteCount[, item1[, item2[, ...]]]])
vm.items.splice(indexOfItem, 1, newValue)
```

第二类问题：

```
vm.items.splice(newLength)
```

## [对象更改检测注意事项](https://cn.vuejs.org/v2/guide/list.html#%E5%AF%B9%E8%B1%A1%E6%9B%B4%E6%94%B9%E6%A3%80%E6%B5%8B%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9 "对象更改检测注意事项")

**与上述情况相同，对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。但是，可以使用 Vue.set(object, key, value) 方法向嵌套对象添加响应式属性。
有时你可能需要为已有对象赋予多个新属性，比如使用 Object.assign() 或 \_.extend()。在这种情况下，你应该用两个对象的属性创建一个新的对象。**

```
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

## 显示过滤/排序结果

通过**计算属性**过滤或排序数组

```
<li v-for="n in evenNumbers">{{ n }}</li>

data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

在计算属性不适用的情况下 (例如，在嵌套 v-for 循环中) 你可以使用一个 method 方法

```
<li v-for="n in even(numbers)">{{ n }}</li>

data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

## 一段取值范围 v-for

v-for 也可以取整数。在这种情况下，它将重复多次模板

```
<div>
  <span v-for="n in 10">{{ n }} </span>
</div>

1 2 3 4 5 6 7 8 9 10
```

## `v-for` on a `<template>`

类似于  `v-if`，你也可以利用带有  `v-for`  的  `<template>`  渲染多个元素。

## v-for 和 v-if 一起

v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。 ##[一个组件的  v-for](https://cn.vuejs.org/v2/guide/list.html#%E4%B8%80%E4%B8%AA%E7%BB%84%E4%BB%B6%E7%9A%84-v-for)

---

# 事件处理

v-on ##监听事件

# 表单输入绑定

v-model #组件基础

## 基本示例

```
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

组件是可复用的 Vue 实例，且带有一个名字：在这个例子中是 <button-counter>。我们可以在一个通过 new Vue 创建的 Vue 根实例中，把这个组件作为自定义元素来使用
因为组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。**例外是像 el 这样根实例特有的选项。** ##组件的复用
可以将组件进行任意次数的复用，每用一次组件，就会有一个它的新实例被创建
**`data`  必须是一个函数**
如果 Vue 没有这条规则，点击一个按钮就可能会影响到其它所有实例
