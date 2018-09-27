
[leancloud](https://leancloud.cn/ "null") :自带数据库和增删改查（CRUD）功能的后台系统

**使用方法 CRM(Copy-Run-Modify)，所有新东西都是这样使用的**

第一步：创建一个应用![](https://upload-images.jianshu.io/upload_images/7094266-911b2691820426db.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)第二步：点击快速入门，选择对应语言，引入 av-min.js，得到 window.AV

三：初始化 AV 对象（直接 Copy 代码）
```
var APP_ID = '2zeITbbU6cgHT0mdBscQtmp0-gzGzoHsz';
var APP_KEY = 'iByF5Dy55tJodAoxC4cxwAwx';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
```
run 一下看看成功没
四：新建一条数据（同样 Copy）
```
//创建 TestObject 表
var TestObject = AV.Object.extend('TestObject');
//在表中创建一行数据
var testObject = new TestObject();
//数据内容是 words:'Hello World'
//若保存成功，则运行 alert('')
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})
```
Run 一下看看成功没
然后去 Modify(修改) - Run - Modify -Run ...
直到你理解所有代码
---
留言系统
用 form
```
<form id="postMessageForm" style="width: 1000px;margin: 50px auto;">
    <input type="text" name="content">
    <input type="submit" value="提交">
</form>
```
**监听 form 表单：**监听 submit 事件而不是提交按钮，因为用户可以不点击按钮而*使用回车*
代码如下：整合进数据库
```
let myForm = document.querySelector('#postMessageForm')
myForm.addEventListener('submit', function (e) {
  //首先阻止默认事件
  e.preventDefault()
  //content 就是用户输入的文本
  let content = myForm.querySelector('input[name=content]').value
  var Message = AV.Object.extend('Message');
  var message = new Message();
  message.save({
    content: content
  }).then(function (object) {
    alert('提交成功');
    console.log(object)
  })
})
```
提交内容后数据库的效果如图![](https://upload-images.jianshu.io/upload_images/7094266-6dd1c7f1e4be86b8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**在网页中显示留言：**用户能够看到自己提交的内容
同样用CRM
找到 leanCloud API文档中的 批量操作,抄![](https://upload-images.jianshu.io/upload_images/7094266-79648fd5b65b10cf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
var query = new AV.Query('Todo');
  query.find().then(function (todos) {
    todos.forEach(function(todo) {
      todo.set('status', 1);
    });
    return AV.Object.saveAll(todos);
  }).then(function(todos) {
    // 更新成功
  }, function (error) {
    // 异常处理
  });
```
**Tode 没有，换成我们自己的 Message**
```
var query = new AV.Query('Message');
  query.find().then(function (messages) {
    messages.forEach(function(message) {
      message.set('status', 1);
    });
    return AV.Object.saveAll(messages);
  }).then(function(messages) {
    // 更新成功
  }, function (error) {
    // 异常处理
  });
```
得到我们的数据记录，说明成功了![](https://upload-images.jianshu.io/upload_images/7094266-7d15bdf41d3baf59.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**console.log 妙用：console.log(messages)**![](https://upload-images.jianshu.io/upload_images/7094266-69cc0f435e75a9fe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)发现我们的提交内容都保存在 attributes 里面
那就好办了
```
//html
<ol id="messageList"></ol>
//js
var query = new AV.Query('Message');
query.find().then(function (messages) {
  let array = messages.map((item) => item.attributes)
  array.forEach((item) => {
    let li = document.createElement('li')
    li.innerText = item.content
    let messageList = document.querySelector('#messageList') 
    messageList.appendChild(li)
  })
})
```
html里自动添加了li，有留言了![](https://upload-images.jianshu.io/upload_images/7094266-4b9263c50680d71d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
但是提交后要刷新页面才能显示新留言
那我们只能帮用户刷新了,把弹出框改成下面代码
```
//alert('提交成功');
window.location.reload()
```
更好的方法：不刷新页面，直接让 .then(function(object){} 执行添加 li 的代码
```
//alert('提交成功');
let li = document.createElement('li')
//这里 content 要改成 object.attributes.content
li.innerText = object.attributes.content
let messageList = document.querySelector('#messageList')
messageList.appendChild(li)
```
然后清除输入的文字：让 content 的 value 为空
```
myForm.querySelector('input[name=content]').value = ''
```
**MVC 的 M(model)**
之前在 [MVC 初尝试之 V 和 C](https://www.jianshu.com/p/e4d9f7ef403c) 中已经介绍了 view 和 controller
现在我们给代码添加 model
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
完整代码可见 [github](https://link.zhihu.com/?target=https%3A//github.com/Adashuai5/My-resume)

**对 MVC （这里应该是 MVP 模式，但是为了方便直接用了 Controller ，并不影响我们学习这一思想，MVP 可以说是 MVC 的演变， MVC 和 MVP 的主要区别在于 M 和 V 是否交互，有兴趣可以查看相关[博客](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)）的总结：**![2018-08-18_002333.jpg](https://upload-images.jianshu.io/upload_images/7094266-4cc147985383849d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

将原本混乱的 js 代码分成三个模块
1.View：用户界面
2.Controller：业务逻辑
3.Model：数据保存

当用户点击 View ，View 就会传送指令到 Controller
Controller 完成业务逻辑后，要求 Model 改变状态
Model 向 Server（服务器）发起请求，服务器返回响应
Model 将新的数据发送到 Controller，Controller 更新 View ，用户得到反馈
---
本文仅供个人学习使用
