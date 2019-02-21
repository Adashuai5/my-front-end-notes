# [Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)

# mouse事件

理解mouse 事件，当我们的鼠标在文档上点击时，浏览器接收指令有如下三种

![mouse事件](https://upload-images.jianshu.io/upload_images/7094266-dc2293eeb3c2daa1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
鼠标按下：document.onmousedown =function(){}
鼠标移动：document.onmousemove =function(){}
鼠标松开：document.onmouseup =function(){}
```
![](https://upload-images.jianshu.io/upload_images/7094266-7424533c311faf1f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

用 div 画画和用 canvas 的区别：div画线是不连续的，而canvas可以解决这个问题

做一个有画笔的画布，代码如下

![](https://upload-images.jianshu.io/upload_images/7094266-e605b7c59d38aa2b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 如何使画布占据整个页面

canvas 是inline-block元素，有默认属性，且其和 img 属性一样无法更改，但有 width 和 height 属性。无法用 CSS 属性让 canvas 占据整个页面，因为设定宽高只是让它放大而已，就像放大图片一样。

![](https://upload-images.jianshu.io/upload_images/7094266-f7ab425321a2e66f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

上图是使canvas的css属性 的**width = 100vw;height = 100vh;**后画布的效果，虽然视觉上产生了占据整个页面的效果，但其实只是画布放大了，画画的时候鼠标与画的线位置偏离，且线已经放大了

可以用JS来给画布设置页面宽高

下面是其中一种JS获取页面宽高的方法
```
var pageWidth = document.documentElement.clientWidth；
var pageHeight= document.documentElement.clientHeight；
```
然后让画布宽高等于页面宽高
```
canvas.width = pageWidth；canvas.height = pageHeight
```
但是有一个问题，当页面发生改变时，画布无法及时调整

可以用 **window.onresize** 属性解决这一问题

```
window.onresize = function() {
  var pageWidth = document.documentElement.clientWidth；
  var pageHeight= document.documentElement.clientHeight；
  canvas.width = pageWidth；canvas.height = pageHeight
｝
```
**但是给canvas加上述属性后，会出现滚动条**

**解决方法：** 

一、设置canvas元素的CSS属性 —— *display:block;*

二、设置HTML或body的CSS属性 —— *overflow:hidden;*

三、设置canvas元素的CSS属性——vertical-align:top; //默认是baseline

# **手机端**

由于 **手机宽度980** 的历史遗留问题 需要给html加一个 **viewport** 的 **meta** 属性

![](https://upload-images.jianshu.io/upload_images/7094266-7f2785b2b641d8c2.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**与 mouse事件对应，触屏设备为 touch事件**

**如何分析设备是否支持touch事件**

# 特性检测

![](https://upload-images.jianshu.io/upload_images/7094266-78c50409c3ebd62a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

touch事件的**clientx**和**clienty **并不直接给出，而是在**touches[0]**下隐藏，如图所示

![](https://upload-images.jianshu.io/upload_images/7094266-daec13cc8cb3605f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

原因是触屏端可以有多个触点（你可以用多个手指同时触屏你的手机），用**touches**这一**hash**可以有效分辨不同触点

# 如何保存画布
```
download.onclick = function() {
  var url = canvas.toDataURL("image/png");
  var a = document.createElement('a');   
  document.body.appendChild(a);
  a.href = url;
  a.download = "mypaint";
  a.target = '_blank' 
  a.click()
}
```
# 优化画笔形状

虽然用将两个点连线的方法解决了划线不连续的问题，但是线的样子还是不好看

![](https://upload-images.jianshu.io/upload_images/7094266-7fd9851cada212ef.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

通过在 drawLine 的同时添加 drawCricle 的方法优化画笔形状

![](https://upload-images.jianshu.io/upload_images/7094266-d83808b0f95398a7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![优化后](https://upload-images.jianshu.io/upload_images/7094266-4a1e074a127a0f5d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
