**之前写过博客 [JavaScript原型和原型链](https://www.jianshu.com/p/93441c4e8f48) 介绍了一下原型的知识**
今天来学习 new 的知识，理解 new 和原型之间的关系，了解其本质


**当你使用 new 关键字，事实上是下面过程：**
1.创建一个空对象，作为将要返回的对象实例。
2.将这个空对象的原型，指向构造函数的prototype属性。
3.将这个空对象赋值给函数内部的this关键字。
4.开始执行构造函数内部的代码。
```
function _new(/* 构造函数 */ constructor, /* 构造函数参数 */ params) {
  // 将 arguments 对象转为数组
  var args = [].slice.call(arguments);
  // 取出构造函数
  var constructor = args.shift();
  // 创建一个空对象，继承构造函数的 prototype 属性
  var context = Object.create(constructor.prototype);
  // 执行构造函数
  var result = constructor.apply(context, args);
  // 如果返回结果是对象，就直接返回，否则返回 context 对象
  return (typeof result === 'object' && result != null) ? result : context;
}

// 实例
var actor = _new(Person, '张三', 28);
```
**new命令总是返回一个对象，要么是实例对象，要么是return语句指定的对象**
使用 new :
1.不用创建临时对象，因为 new 会帮你做（你使用「this」就可以访问到临时对象）；
2.不用绑定原型，因为 new 会帮你做（new 为了知道原型在哪，所以指定原型的名字为 prototype）；
3.不用 return 临时对象，因为 new 会帮你做；
4.不要给原型想名字了，因为 new 指定名字为prototype***
有关原型链可以我
```
var object = new Object()
自有属性 空
object.__proto__ === Object.prototype

var array = new Array('a','b','c')
自有属性 0:'a' 1:'b' 2:'c',length:3
array.__proto__ === Array.prototype
Array.prototype.__proto__ === Object.prototype

var fn = new Function('x', 'y', 'return x+y')
自有属性 length:2, 不可见的函数体: 'return x+y'
fn.__proto___ === Function.prototype

Array is a function
Array = function(){...}
Array.__proto__ === Function.prototype
```
当我们没有模版，希望以某个实例作为模版时可以用 Object.create() 创建实例对象

---
[「每日一题」什么是 JS 原型链？](https://zhuanlan.zhihu.com/p/23090041?refer=study-fe)
[this 的值到底是什么？一次说清楚](https://zhuanlan.zhihu.com/p/23987456 "null")
