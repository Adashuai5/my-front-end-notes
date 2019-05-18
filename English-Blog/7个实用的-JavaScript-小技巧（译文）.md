本文为译文，第一次尝试翻译英文博客，很多地方翻译得不好。本文内容十分简单，可直接查看英文原文，或直接看代码部分。文章每一部分都有拓展（暂未翻译），可点击查看。
原文：[7 Useful JavaScript Tricks](https://davidwalsh.name/javascript-tricks)
以下为译文：
和其他编程语言一样，JavaScript 有着许多技巧来解决一些简单的、亦或是困难的任务。其中有大家所熟知的部分，但也有一些技巧可能超乎你的想象。现在让我们来看一下这七个你随即可用的 JavaScript 小技巧！
# 数组去重
获取[数组的唯一值](https://davidwalsh.name/array-unique)可能比你想象中要简单：
```
var j = [...new Set([1, 2, 3, 3])]
>> [1, 2, 3]
```
我超爱（...）和 Set！
# 数组配合布尔
要从一个数组中[过滤falsy值](https://davidwalsh.name/array-boolean)？你或许不知道有这种技巧：
```
myArray
    .map(item => {
        // ... 
        // 记得 return
    })
    // 摆脱这些空值
    .filter(Boolean);
```
只需传递 Boolean 就能去除这些 falsy 值！
# 创建一个空的对象
当然，似乎你可以通过像 {} 这样来创建一个空对象，但实际上这样创建的对象还是有\_\_proto__、hasOwnProperty 以及其他对象的方法。下面是一种[创造一个纯对象](https://davidwalsh.name/object-create-null)的方法：
```
let dict = Object.create(null);

// dict.__proto__ === "undefined"
// 在你添加动态属性之前为空
```
这个对象上绝对没有你没有放入的键或方法！
# 合并对象
JavaScript [合并多个对象](https://davidwalsh.name/merge-objects)的需求由来已久，尤其是当我们创建带有选项的类和小部件时：
```
const person = { name: 'David Walsh', gender: 'Male' };
const tools = { computer: 'Mac', editor: 'Atom' };
const attributes = { handsomeness: 'Extreme', hair: 'Brown', eyes: 'Blue' };

const summary = {...person, ...tools, ...attributes};
/*
Object {
  "computer": "Mac",
  "editor": "Atom",
  "eyes": "Blue",
  "gender": "Male",
  "hair": "Brown",
  "handsomeness": "Extreme",
  "name": "David Walsh",
}
*/
```
这三个点让任务变得简单多了！
# 强制函数传参
能够为函数参数设置默认值是 JavaScript 的一个很棒的补充。请查看这个技巧，[要求为给定的参数]([https://davidwalsh.name/javascript-function-parameters](https://davidwalsh.name/javascript-function-parameters)
)传递值：
```
const isRequired = () => { throw new Error('param is required'); };

const hello = (name = isRequired()) => { console.log(`hello ${name}`) };

// 由于没给 hello() 传 name，该代码会报错

// 下面代码也会报错
hello(undefined);

// 来看看符合要求的写法
hello(null);
hello('David');
```
这是某种下级验证和 JavaScript 惯用方法！
# 解构别名
[解构赋值](https://davidwalsh.name/destructuring-alias)是一个非常受欢迎的 JavaScript 升级，但有时我们更喜欢用其他名称引用这些属性，所以我们可以利用别名：
```
const obj = { x: 1 };

// Grabs obj.x as { x }
const { x } = obj;

// Grabs obj.x as { otherName }
const { x: otherName } = obj;
```
有效避免了与现有变量的命名冲突！
# 获取查询字符串参数
多年来，我们编写了大量正则表达式来获取查询字符串值，但那些日子已经一去不复返了——我们拥有了令人惊叹的 [URLSearchParams]([https://davidwalsh.name/query-string-javascript](https://davidwalsh.name/query-string-javascript)
) API 
```
// 假设 "?post=1234&action=edit"

var urlParams = new URLSearchParams(window.location.search);

console.log(urlParams.has('post')); // true
console.log(urlParams.get('action')); // "edit"
console.log(urlParams.getAll('action')); // ["edit"]
console.log(urlParams.toString()); // "?post=1234&action=edit"
console.log(urlParams.append('active', '1')); // "?post=1234&action=edit&active=1"
```
是不是比之前简单多了。

这些年 JavaScript 已经发生了很大的变化，但我最喜欢的部分是我们现在看到 JavaScript 语言改进的速度。尽管 JavaScript 在不断动态变化，我们仍然需要使用一些不错的技巧;把这些技巧放在你的工具箱里，以备不时之需!

你最喜欢的 JavaScript 技巧是什么呢？


