# 泛型

泛型就是用一个东西表示广泛的类型。
我在使用时才确定定义的类型

```
function returnIt<T>(arg: T): T{
    return arg;
}

let s = returnIt<string>('hi')
```

# 泛型约束

就是给泛型添加一些约束。

```
function returnIt<T>(arg: T): T{
    console.log(arg.length) // error
    return arg;
}

```

添加约束之后

```
interface HasLength{
    length: number
}

function returnIt<T extends HasLength>(arg: T): T{
    console.log(arg.length) // no error
    return arg;
}

```

1. this 是上下文？那什么是上下文？
this 就是靠猜的，怎么猜？联系上下文。上下文是什么？上下文是你需要知道的所有知识。

2. 规定 this 参数的类型

```
interface Human {
  name: string;
  age: number;
  move(): void;
}

function ada(this: Human) {
  console.log(this);
}

ada.call({ name: "ada", age: 18 });
```

# 重载
```
 function add(n1: number, n2: number);
 function add(n1: string, n2: string);
 function add(n1, n2) {
 return n1 + n2;
 }

 function add2<T>(n1: T, n2: T): T {
 return n1
 }

 add(1, 2); // 3
 add('ada', 'jack'); // 'adajack'

 add2(new Date(), new Date())
```

# 类型推断

# 类型兼容

# soundness（可靠性）

TS 允许程序有一定的 unsound，以追求效率
