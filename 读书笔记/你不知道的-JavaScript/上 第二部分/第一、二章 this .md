### 1.1 为什么要用 this

this 提供更优雅的方式来隐式“传递”一个对象引用，避免显示传递上下文

### 1.2 误解

this 的错误解释

###### 1.2.1 指向自身

只有在 fn.call(fn) 时才指向自身

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

### 2.2 绑定规则

函数的执行过程中调用位置决定 this 的绑定对象的四条规则

###### 2.2.1 默认绑定

独立函数调用（全局调用）

需要注意严格模式（this 绑定到 underfind 而不是全局对象）

```javascript
function foo() {
	"use strict";
	console.log( this.a );
}
var a = 2;
foo(); // TypeError: this is undefined
```

###### 2.2.2 隐式绑定

```javascript
function foo() {
	console.log( this.a );
}
var obj2 = {
	a: 42,
	foo: foo
};
var obj1 = {
	a: 2,
	Jobj2: obj2
};
obj1.obj2.foo(); // 42
```

存在 隐式丢失（而应用默认绑定） 的问题

如传入回调函数时

```javascript
function foo() {
	console.log( this.a );
}
function doFoo(fn) {
	// fn 其实引用的是 foo
	fn(); // <-- 调用位置！
}
var obj = {
	a: 2,
	foo: foo
};
var a = "oops, global"; // a 是全局对象的属性
doFoo( obj.foo ); // "oops, global"
```

>在一些流行的 JavaScript 库中事件处理器常会把回调函数的 this 强制绑定到触发事件的 DOM 元素上。这在一些情况下可能很有用，但是有时它可能会让你感到非常郁闷

我们无法控制回调函数的执行方式，因此无法控制调用位置以得到期望的绑定

###### 2.2.3 显式绑定

使用 call(..) 和 apply(..) 方法

>如果你传入了一个原始值（字符串类型、布尔类型或者数字类型）来当作 this 的绑定对象，这个原始值会被转换成它的对象形式（也就是 new String(..)、new Boolean(..) 或者 new Number(..)）。这通常被称为“装箱”

1. 硬绑定

```javascript
function foo() {
	console.log( this.a );
}
function doFoo(fn) {
	fn.call(obj); // <-- 硬绑定！
}
var obj = {
	a: 2,
	foo: foo
};
var a = "oops, global"; 
doFoo( obj.foo ); // 2
```

ES5 提供了内置的方法 Function.prototype.bind

2. API调用的“上下文”

> 第三方库的许多函数，以及 JavaScript 语言和宿主环境中许多新的内置函数，都提供了一个可选的参数，通常被称为“上下文”（context），其作用和 bind(..) 一样，确保你的回调函数使用指定的 this
>
> 这些函数实际上就是通过 call(..) 或者 apply(..) 实现了显式绑定

2.2.4 new 绑定

实际上并不存在所谓的“构造函数”，只有对于函数的“构造调用”

1. 创建（或者说构造）一个全新的对象。
2. 这个新对象会被执行 [[Prototype]] 连接。
3. 这个新对象会绑定到函数调用的 this。
4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象

```javascript
function foo(a) {
	this.a = a;
}
var bar = new foo(2);
console.log( bar.a ); // 2
```

### 2.3 优先级

1. 函数是否在 new 中调用（new 绑定）？如果是的话 this 绑定的是新创建的对象。
var bar = new foo()
2. 函数是否通过 call、apply（显式绑定）或者硬绑定调用？如果是的话 this 绑定的是指定的对象。
var bar = foo.call(obj2)
3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上下文对象。
var bar = obj1.foo()
4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到全局对象。
var bar = foo()

### 2.4 绑定意外

###### 2.4.1 被忽略的 this

 把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind，会使用默认规则

```javascript
function foo() {
	console.log( this.a );
}
var a = 2;
foo.call( null ); // 2
```

使用场景：

```javascript
function foo(a,b) {
	console.log( "a:" + a + ", b:" + b );
}
// 把数组“展开”成参数
foo.apply( null, [2, 3] ); // a:2, b:3
// ES6 foo(...[2,3])

// 使用 bind(..) 进行柯里化
var bar = foo.bind( null, 2 );
bar( 3 ); // a:2, b:3
```

使用 null 来忽略 this 绑定可能产生一些副作用

>如果某个函数确实使用了 this（比如第三方库中的一个函数），那默认绑定规则会把 this 绑定到全局对象，这将导致不可预计的后果（比如修改全局对象）

**更安全的 this**

在忽略 this 绑定时传入一个“DMZ”（demilitarized zone，非军事区）对象

```javascript
function foo(a,b) {
	console.log( "a:" + a + ", b:" + b );
}
// 我们的 DMZ 空对象
var ø = Object.create( null );
// 把数组展开成参数
foo.apply( ø, [2, 3] ); // a:2, b:3
// 使用 bind(..) 进行柯里化
var bar = foo.bind( ø, 2 );
bar( 3 ); // a:2, b:3
```

###### 2.4.2 间接引用

```javascript
function foo() {
	console.log( this.a );
}
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };
o.foo(); // 3
// 赋值表达式 p.foo = o.foo 的返回值是目标函数的引用
(p.foo = o.foo)(); // 2
```

对于默认绑定来说，决定 this 绑定对象的并不是调用位置是否处于严格模式，而是函数体是否处于严格模式。如果函数体处于严格模式，this 会被绑定到 undefined，否则this 会被绑定到全局对象

###### 2.4.3 软绑定

```javascript
if (!Function.prototype.softBind) {
	Function.prototype.softBind = function(obj) {
		var fn = this;
		// 捕获所有 curried 参数
		var curried = [].slice.call( arguments, 1 );
		var bound = function() {
			return fn.apply(
			(!this || this === (window || global)) ?
			obj : this,
			curried.concat.apply( curried, arguments )
			);
		};
		bound.prototype = Object.create( fn.prototype );
		return bound;
	};
}
```

对指定的函数进行封装，首先检查调用时的 this，如果 this 绑定到全局对象或者 undefined，那就把指定的默认对象 obj 绑定到 this，否则不会修改 this

### 2.5 this 词法

箭头函数用更常见的词法作用域取代了传统的 this 机制

### 2.6 小结

四条规则：

1. 由 new 调用？绑定到新创建的对象。
2. 由 call 或者 apply（或者 bind）调用？绑定到指定的对象。
3. 由上下文对象调用？绑定到那个上下文对象。
4. 默认：在严格模式下绑定到 undefined，否则绑定到全局对象。

用一个 DMZ 对象，比如 ø = Object.create(null)，更安全”地忽略 this 绑
定，以保护全局对象

箭头函数会继承外层函数调用的 this 绑定，并不会使用四条标准的绑定规则