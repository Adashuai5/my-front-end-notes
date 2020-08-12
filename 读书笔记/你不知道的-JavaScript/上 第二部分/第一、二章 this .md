### 1.1 为什么要用 this

this 提供更优雅的方式来隐式“传递”一个对象引用，避免显示传递上下文

### 1.2 误解

this 的错误解释

###### 1.2.1 指向自身

自有在 fn.call(fn) 时才指向自身

 ###### 1.2.2 指向它的作用域

作用域“对象”无法通过 JavaScript代码访问，它存在于 JavaScript 引擎内部

### 1.3 this 到底是什么

this 在运行时进行绑定，取决于函数的调用方式

> 当一个函数被调用时，会创建一个活动记录（执行上下文）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方式、传入的参数等信息。this 就是这个记录的一个属性，会在函数执行的过程中用到

### 2.1 调用位置

调用栈和调用位置

```javascript
function baz() {
	// 当前调用栈是：baz
	// 因此，当前调用位置是全局作用域
	console.log( "baz" );
	bar(); // <-- bar 的调用位置
}
function bar() {
	// 当前调用栈是 baz -> bar
	// 因此，当前调用位置在 baz 中
	console.log( "bar" );
	foo(); // <-- foo 的调用位置
}
function foo() {
	// 当前调用栈是 baz -> bar -> foo
	// 因此，当前调用位置在 bar 中
	console.log( "foo" );
}
baz(); // <-- baz 的调用位置
```

通过 [开发者工具](https://developers.google.com/web/tools/chrome-devtools/javascript/step-code?hl=zh-cn) 查看调用栈

![](https://upload-images.jianshu.io/upload_images/7094266-25af302d38c824b0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 绑定规则

