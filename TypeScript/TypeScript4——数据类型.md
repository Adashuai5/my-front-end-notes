# 数据类型

JS 七种类型 + 枚举 + any + void + never

```
let a1: null = null;
let b1: undefined = undefined;
let c1: boolean = true;
let d1: string = "111";
let e1: number = 1;
let f1: Object = {};
let g1: symbol = Symbol('111');

let n2: any = 1
n2 = '111'
```

```
// 枚举
enum Gender {
  Man = 'man',
  Woman = 'woman',
}

let gender: Gender = Gender.Man
console.log(gender);
gender = Gender.Woman;
console.log(gender);
```

never 类型表示的是那些永不存在的值的类型。 

- 总是会抛出异常或根本就不会有返回值的函数表达式
- 箭头函数表达式的返回值类型
- 当它们被永不为真的类型保护所约束时的变量。

never 类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是 never的子类型或可以赋值给 never 类型（除了never 本身之外）。 即使 any 也不可以赋值给 never

void 常用于表示函数无明确返回值

默认情况下 null 和 undefined 是任何类型的子类型。 

# 类型断言

```
let someValue: any = "this is a string";
// “尖括号”语法
let strLength: number = (<string>someValue).length;
// as 语法
let strLength: number = (someValue as string).length;
```
当你在 TypeScript 里使用 JSX 时，只有 as 语法断言是被允许的。

# 变量声明

TypeScript 使用 let 和 const。变量用 let，常量用 const

注意 const 常量只是值不可变，如果 const 常量的值是一个地址，那么地址对应的对象的内容是可变的

# 接口

接口就是用代码描述一个对象必须有什么属性（包括方法），但是有没有其他属性就不管了

```
interface Human{
    name: string,
    age: number
}
```

## 只读属性

```
interface Human{
    readonly name: string,
    readonly age: number
}
```

最简单判断该用 readonly 还是 const 的方法是看要把它做为变量使用还是做为一个属性
做为变量使用的话用 const，若做为属性则使用 readonly

## 可选属性

```
interface Shape {
  head: string;
  body: string;
}
interface Human {
  readonly name: string;
  age: number;
  shape: Shape;
  likedGame?: Array<string>; // ? 表示该属性非必要
  say(word: string): void;
}

let ada: Human = {
  name: 'ada',
  age: 18,
  shape: { head: '〇', body: '口' },
  say(word: string) {
    console.log(`${this.name}: ${word}`);
  },
};
```

## 传递 interface 之外的属性

```
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): void {
  // ...
}

let mySquare = createSquare({ color: "red", width: 100, opacity: 0.5 }); // opacity: 0.5 ts 报错
```

想要传入 Interface 之外的属性，可以：

1. 使用类型断言

``` 
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```

2. 使用索引签名

```
 interface SquareConfig {
     color?: string;
     width?: number;
     [propName: string]: any;
 }
```

# interface 函数对象和属性

```
interface Add {
  (a: number, b: number): number;
  minus(a: number, b: number): number;
}

//  ts 如何在函数内生成一个函数属性
let add1: Add = ((): Add => {
  let x: any = function(a: number, b: number): number {
    return a + b;
  };
  x.minus = function(a: number, b: number): number {
    return a - b;
  };
  return x;
})();

console.log(add1(1, 2));
```

# 接口的继承

```
interface Animal {
  walk: boolean;
}

interface Human extends Animal {
  readonly name: string;
  age: number;
}

let ada: Human = {
  name: "ada",
  age: 20,
  walk: true
};
```

## 继承多个 和 继承继承的

```
interface Animal {
  walk: boolean;
}

interface Animal2 extends Animal {
  say: boolean;
}

interface Animal3 {
  eat: boolean;
}

interface Human extends Animal2, Animal3 {
  readonly name: string;
  age: number;
}

let ada: Human = {
  name: "ada",
  age: 20,
  walk: true,
  say: true,
  eat: true
};
```
