### 特点 =>（对比之前）：

1. 值的动态引用 => 值的拷贝

2. 编译时输出接口（可以静态优化）=> 运行时加载

3. 自动采用严格模式 => 无限制

[ES6-Module](http://es6.ruanyifeng.com/#docs/module)

在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS （服务器）和 AMD （浏览器）两种。

**CommonJS 和 AMD 模块**，都只能在 **运行时** 确定这些东西

```
// CommonJS模块
let { stat, exists, readFile } = require('fs');
// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

这种加载称为“运行时加载”

**ES6 模块**的设计思想是尽量的静态化，使得 **编译时** 就能确定模块的依赖关系，以及输入和输出的变量

```
// ES6模块
import { stat, exists, readFile } from 'fs';
```

这种加载称为“编译时加载”或者静态加载

# [export](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export#%E9%BB%98%E8%AE%A4%E5%AF%BC%E5%87%BA)

export 语句用于导出模块内的类，函数，对象，数值等。
export defalut 默认导出

输出的变量可以使用 **as 关键** 重命名
export 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系（输出的是接口名与模块内部变量之间的联系而不是直接输出变量）

```
// 报错
export 1;

// 报错
var m = 1;
export m;

// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};

// 报错
function f() {}
export f;

// 正确
export function f() {};

// 正确
function f() {}
export {f};
```

export 语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值

export 命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错（下一节的 import 命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了）

# [import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)

import 语句用于导入模块内的类，函数，对象，数值等。

import 命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块对外接口的名称相同。
import 命令也可使用 **as 关键字**，将输入的变量重命名
import 命令输入的变量都是 **只读** 的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口
import 后面的 from 指定模块文件的位置，可以是相对路径，也可以是绝对路径，.js 后缀可以省略。如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置
import 命令具有 **提升** 效果，会提升到整个模块的头部，首先执行（因为 import 命令是编译阶段执行的，在代码运行之前）
import 语句会执行所加载的模块，因此可以有下面的写法。

```
import 'lodash'
```

多次重复执行同一句 import 语句，那么只会执行一次

# 整体加载

除了指定加载某个输出值，还可以使用整体加载，即用 **星号**（\*） 指定一个对象，所有输出值都加载在这个对象上面

# export default

可以用 export default 命令，为模块指定默认输出

```
// export-default.js
export default function () {
  console.log('foo');
}
```

其他模块加载默认输出模块时，import 命令可以为该匿名函数指定任意名字
这时 import 命令后面，不使用大括号

```
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```

export default 命令也可以用在非匿名函数前，但加载的时候，视同匿名函数加载

一个模块只能有一个默认输出，因此 export default 命令只能使用一次。所以，import 命令后面才不用加大括号，因为只可能唯一对应 export default 命令

```
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';
```

export default 本质就是输出一个叫做 default 的变量或方法，然后系统允许你为它取任意名字，所以它后面不能跟变量声明语句

```
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;

// 正确 对外接口为 default
export default 42;

// 报错 无对外接口
export 42;
```

同时使用默认模块和其他接口

```
‘lodash’
export default function (obj) {
  // ···
}

export function each(obj, iterator, context) {
  // ···
}

export { each as forEach };
```

```
import _, { each, forEach } from 'lodash';
// 还可以同时输出 forEach 和 each指向同一个方法
```

# export 与 import 的复合写法

```
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```

foo 和 bar 实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，当前模块不能直接使用 foo 和 bar

# [模块继承](http://es6.ruanyifeng.com/#docs/module#%E6%A8%A1%E5%9D%97%E7%9A%84%E7%BB%A7%E6%89%BF)

# [跨模块常量](http://es6.ruanyifeng.com/#docs/module#%E8%B7%A8%E6%A8%A1%E5%9D%97%E5%B8%B8%E9%87%8F)

# import()

为了取代 require 的动态加载功能，引入 import() 函数，完成动态加载

import() 函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行
import() 函数与所加载的模块没有静态连接关系，这点也是与 import 语句不相同
import() 类似于 Node 的 require 方法，区别主要是前者是异步加载，后者是同步加载

## 适用场景

按需加载
条件加载
动态模块路径
