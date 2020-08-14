# 什么是继承

根据维基百科解释，可以简单概括为：
继承是类与类之间的关系，其作用是使得子类具有父类别的各种属性和方法。

# JS 里的原型继承模型

JS：不好意思，我没有类。（即使是 ES6 中的类也是语法糖）
JavaScript 是基于原型实现面向对象的，那么在 JS 中，面向对象概念中的继承自然也是基于原型。

> 当谈到继承时，JavaScript  只有一种结构：对象。每个实例对象（object ）都有一个私有属性（称之为[[prototype]]）指向它的原型对象（**prototype**）。该原型对象也有一个自己的原型对象  ，层层向上直到一个对象的原型对象为  `null`。根据定义，`null`  没有原型，并作为这个**原型链**中的最后一个环节。

> 几乎所有 JavaScript 中的对象都是位于原型链顶端的 **Object** 的实例。

有关原型之前写过博客[JavaScript 原型和原型链](https://www.jianshu.com/p/93441c4e8f48)，对理解下面内容有帮助。
虽然没有传统语言意义上的类，但是 JS 语言 使用构造函数生成对象，实现面向对象程序设计。

# 说了这么多，JS 中的继承到底是什么？

**可以简单理解为：两次的原型搜索就是继承。
数组 a 从 Array 中原型搜索到 toString 属性，只是实例属性；a 从 Array 中原型搜索到 （Array 从 Object 中原型搜索到的）valueOf 属性，可以称为继承。**

接下来我们用代码实现一下继承

## 1. 使用 prototype 实现继承

**prototype 的作用：为构造函数内添加实例对象之间的共有属性**

**明确 JS 内的继承**
以下面代码为例

```
// 构造一个 人类
function Human(name){
  this.name = name
}
// 给所有 人类 添加一个 跑 的共有属性
Human.prototype.run = function(){
  console.log("我叫"+this.name+"，我在跑")
  return undefined
}
// 构造一个 男人类
function Man(name){
  Human.call(this, name)
  this.gender = '男'
}
// 所有 男人 都有好战属性
Man.prototype.fight = function(){
  console.log('糊你熊脸')
}
```

![](https://upload-images.jianshu.io/upload_images/7094266-c56b1f3dafb9ff8a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到名为 ada 的人只有 name、gender 和 fight 这些 Man 构造函数里面含有的属性，而没有我们希望的 Human 应该有的 run 的属性。
**目标：假如我们有方法让 ada 有了 Man 里面没有的 run 属性，即我们自己实现了 Man 继承 Human 的过程。**
根据我原型知识的博客里面的内容我们知道，我们可以直接：

```
Man.prototype.__proto__ = Human.prototype
```

![](https://upload-images.jianshu.io/upload_images/7094266-3707e4361a656afb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到  Man  指向了  Human  而不是直接指向  Object，ada2  继承了来自  Human  的  run  属性

**但是在实际编程过程中直接操作 ** proto ** 这个非标准但许多浏览器（IE 不支持）实现的属性是不规范的。**

那怎么办？
new 可不可以？

```
Man.prototype = new Human()
```

![](https://upload-images.jianshu.io/upload_images/7094266-4f15ba95a00b7a81.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**直接用上述代码不行，因为在 new 的过程中，虽然 new 内部实现了 `Man.prototype.__proto__ = Human.prototype` 这一个过程，但是由于 new 同时会在内部执行构造函数，而在执行过程中我们未传 name，因此上图中 Human 的 name 属性显示 undefined**

那么我们只要避免这个过程中 Human 执行就可以了

```
var a = function(){}
a.prototype = Human.prototype
Man.prototype = new a()
```

通过上面三行代码，即实现了没有内部执行空函数的 new

![](https://upload-images.jianshu.io/upload_images/7094266-c3c89ccc7f8d8aaf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 2. ES6 实现继承

上面代码的 ES6 版本

```
// ES6 写法
class Human{
     constructor(name){
         this.name = name
     }
     run(){
         console.log("我叫"+this.name+"，我在跑")
         return undefined
     }
 }
 class Man extends Human{ // extends 实现上述继承过程
     constructor(name){
         super(name) // 调用构造函数:'超类'
         this.gender = '男'
     }
     fight(){
         console.log('糊你熊脸')
     }
 }
```

![](https://upload-images.jianshu.io/upload_images/7094266-f81f6522e88774a9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

文章开头已经提到， ES6 的 class 是语法糖，其实质就是函数，而上述用 class 实现继承的过程，还是基于原型链（和 ES5 的是不是完全一致）

# 总结：

JS 继承的原型写法相对 ES6 的写法看上去似乎更复杂，但是事实上更好理解；class 的写法更符合面向对象编程的思维，由于是语法糖因而自然写法简便，但其有一定局限性。

> 原型继承模型本身实际上比经典模型更强大

---

感谢阅读
本文仅供个人学习使用

部分参考：[继承与原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
