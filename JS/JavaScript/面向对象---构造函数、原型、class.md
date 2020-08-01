# 面向对象解决的问题

并不是：封装、继承、多态

而是写代码的套路问题（定势思维）
为了高效解决问题

## 封装

![封装](https://upload-images.jianshu.io/upload_images/7094266-d8c46df13ca0fa84.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1. 封装：隐藏细节
2. 两种封装方式：
   2.1. A => A 我给自己的代码封装一下，减轻思维负担
   2.2. A => B 我封装出 API 供人使用，多人合作，工业化

### 封装并不是面向对象的特例

可以封装一个函数、封装一个对象、甚至封装一个 URL

## 继承

![继承](https://upload-images.jianshu.io/upload_images/7094266-e42dbe454fac9340.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**继承：复用代码**

### 继承也不是面向对象的特例

类 通过 extend：class 儿子 **extend** 父亲
JS 通过 原型 [[prototype]]

## 多态

**多态：拥有两种及以上属性状态（灵活）**
以 DOM 为例
它为节点 div.childNodes
也可以为元素 div.children

### 多态同样不是面向对象特例

函数的参数可以为各种类型，也可以理解为多态的一种形式

# JS 如何实现面向对象的这些形式

浏览器内的 window 对象有一个 Object 属性， Object 自带 prototype，prototype 指向所有实例的共同属性的一个对象（ES5 规范）
在实例生成时

![prototype](https://upload-images.jianshu.io/upload_images/7094266-d6eba37e5f1bac56.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![prototype](https://upload-images.jianshu.io/upload_images/7094266-c225e3485259b364.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
