# 面向对象程序设计：Object-oriented programming(OOP)

**命名空间：name space**
什么是命名空间？我们来看看 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4) 的例子
```
// 全局命名空间
var MYAPP = MYAPP || {};
```
---
**这里补充有关逻辑运算符的知识**
逻辑运算符：且（&&）、或（||）
**&& 运算符返回第一个 falsy 值（停止运算），若无 falsy 值，则返回最后一个 truthy 值**
只有（0；NaN；null；undefined；空字符串(' ')）五个是 falsy 值，除此之外其他都是 truthy 值
```
console.log(1) && 0 // 1
```
注意这里 console.log(1) 是返回值是 undefined （falsy 值），因此直接返回打印结果 1
而不是返回第二个 falsy 值 0
```
0 && console.log(n) // 0
```
注意这里不会报错说 Uncaught ReferenceError: n is not defined
因为 0 已经是 falsy 值所以直接返回，运算停止后面代码不再执行

**|| 运算符返回第一个 truthy 值（停止运算），若无 truthy 值，则返回最后一个 falsy 值**
---

因此上面代码等价于
```
// 首先检查MYAPP是否已经被定义
var MYAPP
// 是的话，那么使用现有的MYAPP全局对象
if(MYAPP){
  MYAPP = MYAPP;
// 创建一个名为MYAPP的空对象用来封装方法，函数，变量和对象
}else{
  MYAPP = {};
}
```
然后可以基于 MYAPP 这一 name 的空间来放置所有与 MYAPP 相关的子命名
```
// 子命名空间
MYAPP.event = {};
MYAPP.commonMethod = {}
```
***在JavaScript中，命名空间只是另一个包含 方法，属性，对象 的对象***
我们常见的文件夹就类似一个命名空间

---
**构造函数：constructor（类：class）**
JavaScript 基于原型，没有类的概念；但是我们可以定义一个类
下面代码就是一个新的类 Person 
```
function Person() { } 
// 或
var Person = function(){ }
```
JavaScript 中类的本质是函数，只是它有两个特点：
**1.函数体内部使用了this关键字，代表了所要生成的对象实例。
2.生成对象的时候，必须使用new命令
这两个特点就形成了所谓的构造函数**
*为了与普通函数区别，构造函数名字的第一个字母通常大写，如这里的Person*

**对象（类的实例）**
```
function Person() { }
var person1 = new Person();
var person2 = new Person();
```
以 Person 为类（模版），person1 和 person2 是 Person 新的实例：person1、person2 可以调用函数 Person

# 为什么会有面向对象编程？
你写了一个 person1 ，又写了一个 person2 ，然后又写了一个 person3 。。。
它们有很多重复的代码：这些代码结构一致（如我们之前的 [MVC 设计模式](https://zhuanlan.zhihu.com/p/42366912)），简直浪费内存（内存条那么贵）
**于是就有了 Person 这个构造函数作为对象的模板：把所有相同结构的代码用一个函数封装起来
可以让 person1 等只需要用 new 的方法调用这个 Person 传入参数来使用它的模版，person1 自身属性，再单独罗列即可**

**下面以之前有关MVC 的 [博客](https://zhuanlan.zhihu.com/p/42366912) 中的代码为例**
原来代码
```
! function () {
    // MVC 的 V
    var view = document.querySelector('section.message')
    //添加 M
    var model = {
        init: function () {
            var APP_ID = '2zeITbbU6cgHT0mdBscQtmp0-gzGzoHsz'
            var APP_KEY = 'iByF5Dy55tJodAoxC4cxwAwx'

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            })
        },
        //获取所有数据
        fetch: function () {
            var query = new AV.Query('Message')
            return query.find() //Promise 对象
        },
        //创建数据
        save: function (name,content) {
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({ //Promise 对象
                name: name,
                content: content
            })
        }
    }
    // MVC 的 C
    var controller = {
        view: null,
        model: null,
        messageList: null,
        init: function (view, model) {
            this.view = view
            this.model = model
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },
        loadMessages: function () {
            this.model.fetch().then((messages) => {
                let array = messages.map((item) => item.attributes)
                array.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = `${item.name} : ${item.content}`
                    this.messageList.appendChild(li)
                })
            })
        },
        bindEvents: function () {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault()
                this.saveMessage()
            })
        },
        saveMessage: function () {
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            this.model.save(name, content).then(function (object) {
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name} : ${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                myForm.querySelector('input[name=content]').value = ''
                console.log(object)
            })
        }
    }
    controller.init(view, model)
}.call()
```
**把 M、V、C 三个模版单独分出**
M 的模版
```
// Model 办事，我放心
// 通过全局函数 window 引入 Model 便于所有 model 调用
// 提供三个参数：Options、resourceName 和 object
window.Model = function (Options) {
    let resourceName = Options.resourceName
    return {
        init: function () {
            var APP_ID = '2zeITbbU6cgHT0mdBscQtmp0-gzGzoHsz'
            var APP_KEY = 'iByF5Dy55tJodAoxC4cxwAwx'

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            })
        },
        fetch: function () {
            var query = new AV.Query(resourceName)
            return query.find()
        },
        //创建数据
        save: function (object) {
            var X = AV.Object.extend(resourceName)
            var x = new X();
            return x.save(object)
        }
    }
}
```
V 就比较简单了，就一句话，但是封装后也可以调用以便减少代码
```
window.View = function(Selector){
    return document.querySelector(Selector)
}
```
这里 C 是有一定难点的，需要对 this 的概念有所理解
```
window.Controller = function (options) {
    var init = options.init //这个 init 就是 controller 传进来的，记为 initB
    // 4-21 return 一个 object
    let object = {
        view: null,
        model: null,
        init: function (view, model) { // 注意这里的 init 是 object 的属性,记为 initA
            this.view = view
            this.model = model
            this.model.init()
            // 3.initB.call(this)
            init.call(this, view, model) // 这里的 init 当然是 initB，写成这样 init(view,model) 你就懂了
            this.bindEvents.call(this)
        },
    }
    // 把除 init 外的所有 options 的参数传给 object
    // init 是公共参数，而其他实例独有的参数需要传进来
    for (let key in options) {
        if (key !== 'init') {
            object[key] = options[key]
        }
    }
    return object
}
```
实例代码：现在可以直接调用 M、V、C 了，其他实例也是一样的
```
! function () {
	// MVC 的 V
	// 这里 window.View 的 window 可以省略，是默认的
	var view = View('section.message')
	//添加 M
	var model = Model({
		resourceName: 'Message'
	})
	// MVC 的 C
	// 1.controller === object
	var controller = Controller({
		init: function () {
			this.messageList = view.querySelector('#messageList')
			this.form = view.querySelector('form')
			this.loadMessages()
			// 这里的 this 是 object，但是 object 没有上面参数
			// 所以才要 for...in...遍历一下，让 object 有这些 controller 独有的参数
		},
		loadMessages: function () {
			this.model.fetch().then((messages) => {
				let array = messages.map((item) => item.attributes)
				array.forEach((item) => {
					let li = document.createElement('li')
					li.innerText = `${item.name} : ${item.content}`
					this.messageList.appendChild(li)
				})
			})
		},
		bindEvents: function () {
			this.form.addEventListener('submit', (e) => {
				e.preventDefault()
				this.saveMessage()
			})
		},
		saveMessage: function () {
			let myForm = this.form
			let content = myForm.querySelector('input[name=content]').value
			let name = myForm.querySelector('input[name=name]').value
			this.model.save({
				name: name,
				content: content
			}).then(function (object) {
				let li = document.createElement('li')
				li.innerText = `${object.attributes.name} : ${object.attributes.content}`
				let messageList = document.querySelector('#messageList')
				messageList.appendChild(li)
				myForm.querySelector('input[name=content]').value = ''
				console.log(object)
			})
		}
	})
	// 2.controller.init(view, model)
	controller.init(view, model)
}.call()
```
# 关于 this
我们以 C：controller 部分封装的代码的 this 为例：所有内容已经在代码中注明，我们来总结一下
```
1.controller === object
2.controller.init(view, model)
  写成 call 的形式：controller.init.call(controller, view, model)
 // MDN 里 this 文档告诉我们：this 是 call 的第一个参数
  显然 controller.init 里面的 this 当然是 controller
  那它还是 object：即 controller.init 里面的 this 就是 object
  相当于 object.init 里面的 this 是 object
3.initB.call(this)
  initB 里面的 this === call 后面的this
  call 后面 this === 第二条里的 this
  第二条里面的 this === object
  => initB 里面的 this 就是 object
```
想了解更多有关 this 知识，移步 [搞懂这些 你就理解 this 了](https://www.jianshu.com/p/bd9d8bd248ab)

---
本文仅供个人学习使用

**未完待续。。**
