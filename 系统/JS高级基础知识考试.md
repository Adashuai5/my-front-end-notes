#题1：
```
var object = {}
object.__proto__ ===  ????填空1????  // 为 true

var fn = function(){}
fn.__proto__ === ????填空2????  // 为 true
fn.__proto__.__proto__ === ????填空3???? // 为 true

var array = []
array.__proto__ === ????填空4???? // 为 true
array.__proto__.__proto__ === ????填空5???? // 为 true

Function.__proto__ === ????填空6???? // 为 true
Array.__proto__ === ????填空7???? // 为 true
Object.__proto__ === ????填空8???? // 为 true

true.__proto__ === ????填空9???? // 为 true

Function.prototype.__proto__ === ????填空10???? // 为 true
```
##答：
```
1. object.__proto__ === Object.prototype
2. fn.__proto__ === Function.prototype
3. fn.__proto__.__proto__ === Object.prototype
4. array.__proto__ === Array.prototype
5. array.__proto__.__proto__ === Object.prototype
6. Function.__proto__ === Function.prototype
7. Array.__proto__ === Function.prototype
8. Object.__proto__ === Function.prototype
9. true.__proto__ === Boolean.prototype
10. Function.prototype.__proto__ === Object.prototype
```
---
#题2：
```
function fn(){
    console.log(this)
}
new fn()
```
new fn() 会执行 fn，并打印出 this，请问这个 this 有哪些属性？这个 this 的原型有哪些属性？
##答：
this 自身没有属性（只有一个隐藏的 __proto__ 属性）
this 的原型是 fn.prototype，只有一个属性 constructor，且 constructor === fn（另外还有一个隐藏属性 __proto__，指向 Object.prototype）
---
#题3：
JSON 和 JavaScript 是什么关系？
JSON 和 JavaScript 的区别有哪些？
##答：
JSON 和 JavaScript 没什么关系，JSON是道格拉斯基于JavaScript发明的数据交换语言
JSON特点：
  - 只有 object、array、string、number、true、false、null 这几种类型
  - 字符串首尾必须为双引号
  
**JSON 和 JavaScript 的区别**
```
JS         VS         JSON
undefined/symbel      无
null                  null
['a','b']             ["a","b"]
function f(){}        无
{a:b}                 {"a","b"}
'hello world'         "hello world"
var a = {}
a.self = a            无法做到{无变量等形式}
{__proto__}           没有原型链
```
区别：JSON 不支持函数、undefined、变量、引用、单引号字符串、对象的key不支持单引号也不支持不加引号、没有内置的 Date、Math、RegExp 等。

---
#题4：
前端 MVC 是什么？
请用代码大概说明 MVC 三个对象分别有哪些重要属性和方法。
##答：
将原本混乱的 js 代码分成三个模块
1.View：用户界面
代码举例，用于 js 匹配对应模块，便于获取用户指令及更新界面
```
var view = document.querySelector(对应的 html 模块)
```
2.Controller：业务逻辑
获取 view 指令，完成业务（绑定事件、下载数据、存储数据等），改变 model 状态
```
var controller = {
        view: null,
        model: null,
        init: function (view, model) {
            this.view = view
            this.model = model
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },
        loadMessages: function () {
            
        },
        bindEvents: function () {
            
        },
        saveMessage: function () {
           
        }
    }
    controller.init(view, model)
}.call()
```
3.Model：数据保存
向服务器发送请求，获取响应，反馈给 controller
```
var model = {
        init: function () {
            
        },
        //获取所有数据
        fetch: function () {
            
        },
        //创建数据
        save: function (object) {
           
        }
    }
```

当用户点击 View ，View 就会传送指令到 Controller
Controller 完成业务逻辑后，要求 Model 改变状态
Model 向 Server（服务器）发起请求，服务器返回响应
Model 将新的数据发送到 Controller，Controller 更新 View ，用户得到反馈
---
#题5：
在 ES5 中如何用函数模拟一个类？
##答：
ES5中我们通过构造函数（constructor）来模拟类
```
// 模拟类
function Foo(属性) {
    this.属性 = x;
}
// 实例（对象）
var fn = new Foo()
```
为了与普通函数区别，构造函数名字的第一个字母通常大写
**构造函数的特点有两个:
函数体内部使用了 this 关键字，代表了所要生成的对象实例。
生成对象的时候，必须使用 new 命令。**
---
#题6：
用过 Promise 吗？举例说明。
如果要你创建一个返回 Promise 对象的函数，你会怎么写？举例说明。
##答：
用过，在 AJAX 异步请求的过程中返回的数据可以用 Promise 
```
 $.ajax({
        url: '/ada',
        method: 'post',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'ada': '18'
        }
    }).then(
        (responseText)=>{console.log(responseText)},
        (request)=>{console.log(request)}
      )
```
返回 Promise 对象的函数
```
function asyncMethod(){
    return new Promise(function(resolve,reject){
        if (/* 异步操作成功 */){
            resolve(success);
        } else { /* 异步操作失败 */
            reject(new Error());
        }
    }
}
```
