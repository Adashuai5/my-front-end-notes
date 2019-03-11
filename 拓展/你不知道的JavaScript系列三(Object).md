# 题目1
用尽量多的方法实现如下select 函数
```
const obj = {a: 1, b: 2, c:3}
function select(obj, arr) {
    //实现该函数
}
select(obj, ['a', 'c'])
//输出 {a: 1, c: 3}
```
[代码](http://js.jirengu.com/nuleg/2/edit?html,js,output)
# 题目2
用最短的代码补全renderTpl 函数
```
let p1 = {
    '姓名': 'jirengu',
    '性别': '男',
    '年纪': 4,
    //... 可能有更多属性
}
function renderTpl(p) {
    //用最短的代码实现功能
}
let result = renderTpl(p1)
/*
  <dl><dt>姓名</dt><dd>jirengu</dd><dt>性别</dt><dd>男</dd><dt>年纪</dt><dd>4</dd>
*/
```
[代码](http://js.jirengu.com/nuleg/3/edit?js,console,output)
# Object 常用 API

## Object.assign(target, ...sources)

[MDN: Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign "null")
**Object.assign()** 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
## Object.keys(obj)

[MDN: Object.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys "null")
**Object.keys()** 方法会**返回**一个由一个给定对象的自身可枚举属性组成的**数组**，数组为排序后的字符串形式的属性

## Object.entries(obj)

[MDN: Object.entires](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries "null")
`**Object.entries()**`方法**返回**一个给定对象自身可枚举属性的**键值对数组**，其排列与使用 [`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in "for...in语句以任意顺序遍历一个对象的可枚举属性。对于每个不同的属性，语句都会被执行。") 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环也枚举原型链中的属性）

## Object.create(proto, [propertiesObject])

[MDN: Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create "null")
Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的 \_\_proto\_\_

## Object.defineProperty(obj, prop, descriptor)

[MDN: Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty "null")
Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

## Object.freeze(obj)

[MDN: Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze "null")
The Object.freeze() method freezes an object. A frozen object can no longer be changed; freezing an object prevents new properties from being added to it, existing properties from being removed, prevents changing the enumerability, configurability, or writability of existing properties, and prevents the values of existing properties from being changed. In addition, freezing an object also prevents its prototype from being changed. freeze() returns the same object that was passed in.

## arr.reduce(callback[, initialValue])
[MDN: Array.reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
