这是我的项目记录系列文章第二篇，在上一篇我简单介绍了项目的初衷和流程等。现在这个项目已经做了一段时间，对 Hooks 和 TypeScript 也有了一定认识，相信优化和记录能有更多理解，同时可能收获大家的指导。

本篇文章我将梳理 Mac 的 Dock 动效的实现过程，你可以在我的项目 [代码（欢迎 watch 和 star）](https://github.com/Adashuai5/my-desktop)体验，同时本文完整代码均在 [sandbox](https://codesandbox.io/s/jovial-johnson-2rjnl?file=/src/Docker.tsx) 供你把玩。


### 基础结构搭建

我们会在 app 文件下创建 footer，在其内部引入我们的 Docker 组件，我们找到几张图标 png ，以图标名组成 dockList 通过 require 引入在 Docker 内部，它们就是本次主角，同时通过使用 useRef 钩子给它们的父亲 div 绑定一个 ref，便于后续操作。

我们给每个图标一个默认宽度 defaultWidth，由此可得到背景 div 的宽度和高度。

这里背景 div 的宽度通过内部元素撑开，因此我们不必单独计算设定，原来我就又计算并设置了一遍宽度，多此一举，影响性能和体验。

但是高度需要设置一下，因为图标的高度会变化，我们需要保持背景高度不变。当然这里可以直接设置，setDockStyle 用不到，如 sandbox 里一样，但如需更改 Docker 位置，就需要用到 setDockStyle，在变换到左右侧时 height 更改为 width。

```
import React, { useState, useRef } from "react";

export const Docker = () => {
  const [defaultWidth] = useState(76);
  const [dockList] = useState<string[]>([
    "Finder.png",
    "Launchpad.png",
    "PrefApp.png",
    "Chrome.png",
    "Terminal.png",
    "Calculator.png",
    "Drawing.png"
  ]);
  const [dockStyle, setDockStyle] = useState({ height: defaultWidth });
  const dockRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={dockRef} style={dockStyle}>
      {dockList.map((item, index) => {
        return (
          <img src={require("./image/" + item)} alt={item} key={index + item} />
        );
      })}
    </div>
  );
};
```

### 初始化样式

这里主要是设定每个图片的默认宽度和背景 div 的宽度和高度

同时这里用了 mouseleave，事实上也是鼠标离开 Dock 事件所需函数（看下面就懂了）。

```
const mouseleave = useCallback(() => {
  if (!dockRef.current) {
    return;
  }

  const imgList = dockRef.current.childNodes;
  for (let i = 0; i < imgList.length; i++) {
    const img = imgList[i] as HTMLImageElement;
    img.width = defaultWidth;
  }
}, [defaultWidth, dockList]);

useEffect(() => {
  mouseleave();
}, [mouseleave]);
```

css 如下

```
.App {
  footer{
    position: fixed;
    bottom: 0;
    width: 100vw;
    display: flex;
    justify-content: center;
    div{
      display: flex;
      align-items: flex-end;
      background-color: rgba(222, 223, 227, 0.7);
      box-shadow: rgba(0, 0, 0, 0.31) 0px 0px 1px, rgba(0, 0, 0, 0.18) 0px 0px 5px,
        rgba(0, 0, 0, 0.3) 0px 8px 50px;
      border-top-left-radius: 0.4rem;
      border-top-right-radius: 0.4rem;
    }
  }
}
```

默认效果已经有了

![](https://upload-images.jianshu.io/upload_images/7094266-48beb72925a7cbf1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 事件逻辑

我们需要通过监听 Docker div 的鼠标进入和离开事件，一般我们使用 useCallback 缓存事件，同时使用 useEffect 作事件变化监听处理。mouseleave 我们已经在上面展示，不作展开。

```
const mousemove = useCallback(e => {
  console.log(e);
}, []);
const mouseleave = useCallback(e => {
  console.log(e);
}, []);

useEffect(() => {
  if (!dockRef.current) {
    return;
  }
  const dockBackground: HTMLDivElement = dockRef.current;
  dockBackground.addEventListener("mousemove", mousemove);
  dockBackground.addEventListener("mouseleave", mouseleave);
  return () => {
    dockBackground.removeEventListener("mousemove", mousemove);
    dockBackground.removeEventListener("mouseleave", mouseleave);
  };
}, [mousemove, mouseleave]);
```

Docker 动效思路

![](https://upload-images.jianshu.io/upload_images/7094266-9f3abba016d89cfb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如图箭头，我们根据鼠标事件位置与各图标中心点距离来调整图标大小，通过该差值与设定宽度（这里我使用 Docker 的初始宽度）比值作为图标放大参考，这里我使用的放大倍数为 2，直接看代码：

```
const getOffset = useCallback(
  (el: HTMLElement, offset: "top" | "left"): number => {
    const elOffset = offset === "top" ? el.offsetTop : el.offsetLeft;
    if (el.offsetParent == null) {
      return elOffset;
    }
    return elOffset + getOffset(el.offsetParent as HTMLElement, offset);
  },
  []
);

const mousemove = useCallback(
  ({ clientX, clientY }) => {
    if (!dockRef.current) {
      return;
    }
    const imgList = dockRef.current.childNodes;
    for (let i = 0; i < imgList.length; i++) {
      const img = imgList[i] as HTMLImageElement;
      const x = img.offsetLeft + defaultWidth / 2 - clientX;
      const y =
        img.offsetTop +
        getOffset(dockRef.current, "top") +
        img.offsetHeight / 2 -
        clientY;
      let imgScale =
        1 - Math.sqrt(x * x + y * y) / (imgList.length * defaultWidth);
      if (imgScale < 0.5) {
        imgScale = 0.5;
      }
      img.width = defaultWidth * 2 * imgScale;
    }
  },
  [defaultWidth, getOffset]
);
```

至此，Docker 动效就完成了。我们还可以通过修改 defaultWidth 来调整图标大小，当然还有动效放大倍数 imgScale，甚至 Docker 位置，做到与 Mac 桌面一样，这也正式我的项目在做的东西。

### 小结

在写这篇文章的同时，也对代码和过程有了梳理，目前该项目已完成部分功能，包括简单设置，基础计算器，基础画板等，即使是这些已有功能也有很多需要完善的地方。

后续我会慢慢优化，并在相应模块代码优化到一定程度时不定时更新系列文章。

如果你喜欢这篇文章，不要忘了给我点赞。🍮


**本文参考**：
[Mac Dock 效果及原理（勾股定理）](https://www.cnblogs.com/milly/p/dock-effect.html)
