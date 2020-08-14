```
* { margin: 0; padding: 0; box-sizing: border-box; }
*::after { box-sizing: border-box; }
*::before { box-sizing: border-box; }
```

伪元素

```
::before {
  content: '';
  display: block;
}
```

# Grid 布局

[CSS Grid 系列(上)-Grid 布局完整指南](https://zhuanlan.zhihu.com/p/33030746)

```
<div class="parent">
  <div class="child1">1</div>
  <div class="child2">2</div>
</div>
.parent{
    display: grid;
    grid-template-columns: 40% 60%;
    grid-template-rows: auto auto;
}
.child1{
    grid-column: 1;
    grid-row: 1;
}
.child2{
    grid-column: 2;
    grid-row: 1;
}
```

# Flex 布局

[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

```
display:inline-flex; // 会造成下列bug
```

![bug](https://upload-images.jianshu.io/upload_images/7094266-e820277fef3949a1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

解决方法：改变 [vertical-align](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align) 的默认值：baseline

```
vertical-align: middle;
```

# position:fixed

# transform

CSS transform 属性允许你修改 CSS 视觉格式模型的坐标空间。使用它，元素可以被转换（translate）、旋转（rotate）、缩放（scale）、倾斜（skew）

### 旋转

```
transform:  rotate(angle);       /* an <angle>, e.g.  rotate(30deg) */
```

从原点(由  [`transform-origin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-origin "transform-origin CSS属性让你更改一个元素变形的原点。")  属性指定)开始安装顺时针方向旋转元素一个特定的角度。此操作对象的矩阵是   **[cos(angle) sin(angle) -sin(angle) cos(angle) 0 0] **。

### 缩放

```
transform:  scale(sx[, sy]);     /* one or two unitless <number>s, e.g.  scale(2.1,4) */
```

由**[sx, sy]**描述指定一个二维缩放操作。如果`sy`  未指定，默认认为和 sx 的值相同。

### X 方向缩放

```
transform:  scaleX(sx);          /* a unitless <number>, e.g.  scaleX(2.7) */
```

使用向量**[sx, 1] **完成在 X 方向上的缩放.

### Y 方向缩放

```
transform:  scaleY(sy)           /* a unitless <number>, e.g.  scaleY(0.3) */
```

使用向量**[1, sy] **完成在 Y 方向的缩放.

### 倾斜

```
transform:  skew(ax[, ay])       /* one or two <angle>s, e.g.  skew(30deg,-10deg) */
```

元素在 X 轴和 Y 轴方向以指定的角度倾斜。如果 ay 未提供，在 Y 轴上没有倾斜。

### X 方向倾斜

```
transform:  skewX(angle)         /* an <angle>, e.g.  skewX(-30deg) */
```

绕 X 轴以指定的角度倾斜

### Y 方向倾斜

```
transform:  skewY(angle)         /* an <angle>, e.g.  skewY(4deg) */
```

绕 Y 轴以指定的角度倾斜

### 平移

```
transform:  translate(tx[, ty])  /* one or two <length> values */
```

Specifies a 2D translation by the vector **[tx, ty]**. If `ty` isn't specified, its value is assumed to be zero.
用向量**[tx, ty]**完成 2D 平移。如果 ty 没有指定，它的值默认为 0。

### X 方向平移

```
transform:  translateX(tx)       /* see <length> for possible values */
```

在 X 轴平移指定距离

### Y 方向平移

```
transform:  translateY(ty)       /* see <length> for possible values */
```

在 Y 轴平移指定距离

---

# [个人总结（css3 新特性）](https://segmentfault.com/a/1190000010780991)

## 动画[animation](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation)

CSS generator (CSS 动态效果的搜索方法)

### 语法

animation：动画名称，一个周期花费时间，运动曲线（默认 ease），动画延迟（默认 0），播放次数（默认 1），是否反向播放动画（默认 normal），是否暂停动画（默认 running）

- [@keyframes](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes) 通过在动画序列中定义关键帧

```
// 转圈
@keyframes a{
  0%{transform: rotato(0deg);}
  100%{transform: rotato(360deg);}
}
animation:a 1s infinite liner;
```

## [transition](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)：过渡

### 语法

transition： CSS 属性，花费时间，效果曲线(默认 ease)，延迟时间(默认 0)

```
div {
    transition: <property> <duration> <timing-function> <delay>;
    <!-- 过渡的属性名/ 过渡的时长/ 缓动效果/ 指定延迟 -->
}
```
