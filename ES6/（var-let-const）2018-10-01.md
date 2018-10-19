推荐先使用 const，如果后面需要变动，用 let 。

a = 1 // 含义不明 - 不用
如果之前未声明，则产生一个全局变量 a

于是有了 var a
var 的缺点 乱提升

于是有了 let
1. 块级作用域，立即执行函数变得不必要了
2. Temp Dead Zone （临时死区）
```
{
  let a =1
  {
    console.log(a) // 报错
    let a =2
    {
       let a =3
    }
  }
}
```
const（常量）只声明一次
let 在作用域内可以多次赋值

![let](https://upload-images.jianshu.io/upload_images/7094266-44fe80c0f5ff5f15.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

当然不能两次 let（var 是可以的）

![let](https://upload-images.jianshu.io/upload_images/7094266-9a118e2a5a2b2349.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![常量，不能赋值两次](https://upload-images.jianshu.io/upload_images/7094266-b43033f93dac1785.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
const 用法
```
 const PI = 3.1415926
```
##总结
1. let 的作用域在最近的 {} 之间
2. 如果你在 let 之前使用 a，报错
3. 重复 let = a，报错

const
1，2，3 同上
4. 只有一次赋值机会，且声明同时一定要赋值


[我用了两个月的时间才理解 let](https://zhuanlan.zhihu.com/p/28140450)
```
var list = document.getElementById("list");

for (let i = 1; i <= 5; i++) {
  var item = document.createElement("LI");
  item.appendChild(document.createTextNode("Item " + i));

  let j = i;
  item.onclick = function (ev) {
    console.log("Item " + j + " is clicked.");
  };
  list.appendChild(item);
}
```
