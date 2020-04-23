# 类

[文档](https://www.tslang.cn/docs/handbook/classes.html "null")

类就是用来创造对象的东西。
有一些语言（如 Java，存疑）创建对象必须先声明一个类，而有的语言（JS）则不需要。
对于使用过 TS 的 JS 程序员来说，类可以让你的系统更加「可预测」

# 语法

1. 声明类
2. 声明对象的非函数属性
3. 声明对象的函数属性
4. 使用 constructor
5. 声明类的属性（static）
这些属性存在于类本身上面而不是类的实例上
6. 使用 this 代指当前对象（注意不要以为 this 永远都代指当前对象，JS 的 this 有更多功能，而且默认 this 为 window）

```
class Human {
  name: string;
  age: number;
  constructor(name = "ada", age = 18) {
    this.name = name;
    this.age = age;
  }
  move(): void {
    console.log("我可以动");
  }
}

let ada = new Human();
console.log(ada);

// interface 函数需要在实例化时声明
interface Human2 {
  name: string;
  age: number;
  move(): void;
}
```

# 类继承类

使用 super

```
class Animal {
  move(): void {
    console.log("我可以动");
  }
}
class Human extends Animal {
  name: string;
  age: number;
  constructor(name = "ada", age = 18) {
    super(); // 继承时必须在 constructor 属性上调用 super 才能继承父类属性
    this.name = name;
    this.age = age;
  }
}
```

# 修饰符

## public 

默认为 public，可以自由的访问程序里定义的成员

## private 

当成员被标记成 private 时，它就不能在声明它的类的外部访问 （相当于一个作用域）

```
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // 错误: 'name' 是私有的.
```

## protected

protected 修饰符与 private 修饰符的行为很相似，但有一点不同， protected 成员在派生类中仍然可以访问

# 访问器（存取器）

getters 和 setters 设计模式

```
// ES5+
class Human {
  name: string;
  _age: number;
  get age() {
    return this._age;
  }
  set age(value: number) {
    if (value < 0) {
      this._age = 0;
    } else {
      this._age = value;
    }
  }
  constructor(name = "ada", age = 18) {
    super(); // 继承时必须在 constructor 属性上调用 super 才能继承父类属性
    this.name = name;
    this.age = age;
  }
}
```

# 抽象类

也可以叫做「爸爸类」：专门当别的类的爸爸的类。
也可以叫做「没有写完的类」：只描述有什么方法，并没有完全实现这些方法。

由于这个类没有写完，所以不能创建出对象。（会报错）

```
abstract class Animal {
    abstract makeSound(): void; // 没有实现的方法
    move(): void {
        console.log('roaming the earch...');
    }
}
```

## 区别

interface 的方法都是没有实现的
class 的方法可以实现
abstract class 必须含有一个 abstract 方法
