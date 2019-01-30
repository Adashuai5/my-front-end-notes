几个月前初学 CSS布局，写了一篇关于 [CSS常用布局学习](https://www.jianshu.com/p/59c9477816b8) 的博客，介绍了一些传统的依靠 position 和 float 等实现简单的布局方式的例子，这些布局只能简单得实现基本功能，十分不便。
今天，作为引申，我们用同样例子，来使用上篇中简单提到的 flex 布局的方案实现。与此同时，我将推荐最近学习的 grid 布局，它十分强大，可以方便得解决各种布局方案，且十分便于理解。
### Flex 实现左中右布局

主要是在父元素中使用以下代码
```
display: flex;
flex-direction:row;
```
相对于传统布局，是不是简便得多![Flex 左中右](https://upload-images.jianshu.io/upload_images/7094266-f0d2834c90f115a9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### Flex 实现垂直居中
```
display: flex;
justify-content:center;
align-items:center;
```
![Flex 垂直居中](https://upload-images.jianshu.io/upload_images/7094266-42ece01a2af28519.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到 flex 布局十分方便
想要了解更多 flex 布局相关技巧可以阅读阮大大 [博客](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html) 当然你可以看 MDN

前面介绍的都是一维布局，但是在复杂的二维布局方面，无疑是为解决布局而创建的 CSS 网格布局更为专业
学习网格布局事实上是学习对应英文的过程，所以英语好真的很有优势
### Grid 布局实现左中右
虽然有点大材小用，但是我们是为了和前面的布局方法做对比
你只需用两行代码
```
display: grid;
grid-template-columns: 30% 40% 30%; 
```
grid 布局的代码更省，子元素不需要各自设定，直接在父元素上设定了![Grid 左中右](https://upload-images.jianshu.io/upload_images/7094266-beb5abb9ff73f97d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)当然这里的子元素要与对应的格子相配，即 30% 40% 30% 对应的是 div.container 里面的顺序
### 网格布局
这里的 fr 为分数单位
```
display: grid;
grid-template-columns: 1fr 1fr 1fr; // 3列均分
grid-template-rows: 1fr 1fr 1fr; // 3行均分
```
通过上面代码实现了一个3*3的网格
可以通过下面代码选择对应网格，并添加属性
```
grid-column: 1; // or 2 or 3
grid-row: 1; // or 2 or 3
```
![网格布局示例](https://upload-images.jianshu.io/upload_images/7094266-fe08051eb5cf5c1d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

---
以上只是 flex 布局和 grid 布局的小例子和基本用法
想要了解更多 grid 相关内容可以看这篇 [博客](https://www.jianshu.com/p/d183265a8dad)
通过 flex 和 grid 布局配合使用，基本上可以解决所有 CSS 布局问题

本文仅供个人学习使用
