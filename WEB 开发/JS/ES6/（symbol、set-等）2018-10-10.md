# 1. symbol
基本对象
1.window.Symbol() 返回一个 symbol
2.不能 new Symbol()
3.每一个 symbol 都是独一无二的
4.和字符串一同可作为对象的 key
5.symbol 可以用来创造私有属性

![](https://upload-images.jianshu.io/upload_images/7094266-a23edf7122d7fa12.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 2. set
数组去重

![传统方法：有缺点](https://upload-images.jianshu.io/upload_images/7094266-5781746aa7ab645d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![ES6 SET](https://upload-images.jianshu.io/upload_images/7094266-77904986b4a822ab.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
先 set 再 Array.from 一下

![装逼版](https://upload-images.jianshu.io/upload_images/7094266-d0258270c71e112e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 3. map 是一个特殊对象，可以用任何值作为 key 值
# 垃圾回收（GC）
浏览器把内存里用户不用的对象等清空，释放内存供其他元素等使用
# 4. weakset
特点：1. 可以将对象弱引用（使得浏览器可以方便判断其可以垃圾回收）
   2. weakset 不可枚举
#5. weakmap
特点：1. key 是弱引用的，key 必须是对象
2. 不可枚举
[相关文章](https://zhuanlan.zhihu.com/p/25454328)
