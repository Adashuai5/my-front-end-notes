这是我的项目记录系列文章第三篇，目前项目进度有些停滞，主要是最近其他事情比较多加懒，于是我强行让自己在这几天对点击图标跳出弹窗这一过程进行优化，及时总结和记录，同时让大家知道我还活着。

本篇将介绍目前项目当中，点击 Dock 图标所产生的系列效果，如生成可拖住的弹窗等，目前只有计算器和画板等四个图标可用。

本文所有代码均在 [项目代码](https://github.com/Adashuai5/my-desktop)，项目会一直优化，欢迎 watch 和 star。

### 过程分析

上篇我们已经实现 Dock 的动态效果，接下来我们肯定会不由自主想点图标。当我们点击图标，首先会出现图标弹跳的动效，然后出现图标对应应用弹框，并同时在图标下方出现高亮小圆点。接下来我会用画板 drawing 作为例子展示代码，关于画板的详细内容本篇暂不作介绍，预计会成为第四篇主角。

本文出现代码内容对应目录：

![](https://upload-images.jianshu.io/upload_images/7094266-7efb9c6b79e2ac6f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 图标点击交互

#### 动效实现

当我们初次点击图标使其变成激活状态时，应该有交互动画：

这里我参考了 [animate-css 的 bounce.css](https://github.com/animate-css/animate.css/blob/master/source/attention_seekers/bounce.css) 

```
// footer/index.scss
@keyframes bounce {
  from,
  20%,
  53%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -35px, 0) scaleY(1.1);
  }

  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -35px, 0) scaleY(1.05);
  }

  80% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0) scaleY(0.95);
  }

  90% {
    transform: translate3d(0, -6px, 0) scaleY(1.02);
  }
}
.bounce {
  animation-duration: 2s;
  animation-name: top; 
}
```

#### isDrawingOpen（应用开启、关闭）和 isDrawingShow（应用展示、最小化）

给图标加上点击事件，通过其名字判断是哪个图标。每一个图标我们给到一个布尔值对象，如这里的 isDrawingOpen，它是个对象，里面记录一个布尔值 type，作为弹框开关（只有在打开和关闭应用时使用）；一个 index 记录图标对应顺序。

点击后给对应图标增加 .bounce，此时图标开始 bounce 动画，同时我们在 2.5s 后改变 type （画板出现）和记录 index，并且将类选择器移除，便于下次重新点击使用。

```
// Footer.tsx
interface OpenTypes {
  type: boolean;
  index?: number;
}

const [isDrawingOpen, setDrawingOpen] = useState<OpenTypes>({
  type: false
});

const [isDrawingShow, setDrawingShow] = useState(true);

const dockItemClick = useCallback(
  (item: string, index: number) => {
    if (!dockRef.current) {
      return;
    }
    const imgList = dockRef.current.childNodes;
    const img = imgList[index] as HTMLDivElement;
    switch (item) {
      case "PrefApp.png":
        if (!isDrawingOpen.type) {
          img.classList.add("bounce");
          setTimeout(() => {
            setDrawingOpen({ type: !isDrawingOpen.type, index });
            img.classList.remove("bounce");
          }, 2500);
          return;
        }
        setDrawingShow(!isDrawingShow);
        return;
    }
  },
  [isDrawingOpen, isDrawingShow]
);
```

与此同时可以看到有一个单独的布尔值：isDrawingShow，它的作用是在应用激活时点击图标或最小化按钮时切换展示状态。

```
useEffect(() => {
  if (!dockRef.current) {
    return;
  }
  const imgList = dockRef.current.childNodes;
  [isDrawingOpen].forEach((item) => {
    if (item.index) {
      const img = imgList[item.index] as HTMLDivElement;
      !item.type
        ? setTimeout(() => {
            img?.classList.remove("active");
          }, 1000)
        : img.classList.add("active");
    }
  });
}, [isDrawingOpen]);
```

上面就是我们记录 index 的作用，由于关闭应用不受 Dock 控制，我们需要监听 isDrawingOpen 来判断是否加类选择器 active，它的作用主要是图标高亮小圆点的开关

#### 小圆点的实现

```
// footer/index.scss

#DockItem {
  position: relative;
  display: flex;
  &.active {
    &::after {
      content: "●";
      font-size: 0.1em;
      position: absolute;
      bottom: -7px;
    }
  }
}
```

#### createContext 实现组件通信：

这里我们的画板组件肯定是单独成文件的，因此开启和关闭弹窗操作就要用到组件通信。

```
export const FooterContext = createContext<any>([]);
...
return (
   <React.Fragment>
    <FooterContext.Provider
      value={[isDrawingOpen, setDrawingOpen, isDrawingShow, setDrawingShow]}
      >
      <Drawing />
    </FooterContext.Provider>
    <div ref={dockRef} style={{ height: defaultWidth }}>
      {dockList.map((item, index) => {
        return (
          <div
            id="DockItem"
            style={
              {
                backgroundImage: "url(" + require("./image/" + item) + ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              } as CSSProperties
            }
            key={index + item}
            onClick={() => dockItemClick(item, index)}
          />
        );
      })}
    </div>
  </React.Fragment>
);
```

看过该系列 [第二篇](https://zhuanlan.zhihu.com/p/145449585) 的朋友或许还记得，之前我们的图标均为 img ，而现在改为了 div，其主要目的是为了配合 active 下的伪元素使用（img 使用 ::after 无效）。

我们通过 createContext 生成一个 FooterContext，像我们的 Drawing 子组件传递 [isDrawingOpen, setDrawingOpen, isDrawingShow, setDrawingShow] ，同时子组件可以调用 FooterContext，改变应用状态。

下面是子组件 Drawing 使用 FooterContext 的完整代码：

```
// drawing/index.tsx
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useModal } from "../modal/UseModal";
import { FooterContext } from "../footer/Footer";
import { TitleBar } from "react-desktop/macOs";
import Canvas from "./Canvas";
import "./index.scss";
/// <reference path="react-desktop.d.ts" />

export const Drawing = React.memo(() => {
  const { open, close, RenderModal } = useModal();
  const [
    isDrawingOpen,
    setDrawingOpen,
    isDrawingShow,
    setDrawingShow,
  ] = useContext(FooterContext);
  const [style, setStyle] = useState({ width: 1200, height: 800 });
  const [isFullscreen, setFullscreen] = useState(false);

  useEffect(isDrawingOpen.type ? open : close, [isDrawingOpen]);
  const maximizeClick = useCallback(() => {
    if (isFullscreen) {
      setStyle({ width: 1200, height: 800 });
    } else {
      setStyle({ width: -1, height: -1 });
    }
    setFullscreen(!isFullscreen);
  }, [isFullscreen]);

  return (
    <RenderModal
      data={{
        width: style.width,
        height: style.height,
        id: "DrawingView",
        moveId: "DrawingMove",
        isShow: isDrawingShow,
      }}
    >
      <div className="drawing-wrapper">
        <TitleBar
          controls
          id="DrawingMove"
          isFullscreen={isFullscreen}
          onCloseClick={() => {
            close();
            setDrawingOpen({ ...isDrawingOpen, type: false });
          }}
          onMinimizeClick={() => {
            setDrawingShow(false);
          }}
          onMaximizeClick={maximizeClick}
          onResizeClick={maximizeClick}
        ></TitleBar>
        <Canvas
          height={isFullscreen ? document.body.clientHeight - 32 : style.height}
          width={isFullscreen ? document.body.clientWidth : style.width}
        />
      </div>
    </RenderModal>
  );
});
```

这里的 useModal 是一个弹框组件，下文详解。Canvas 是 drawing 的主体，这里我们不过多介绍。

#### react-desktop/macOs 的使用及自定义声明文件

可以看到我使用了 [react-desktop/macOs](https://reactdesktop.js.org/docs/mac-os/title-bar) 组件，一个 react 的桌面 UI ，但是这个库没有 @types ，需要自己写 .d.ts:

```
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./",
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": ["src", "typings"] // 主要是这里加了 typings
}
```
```
// typings/react-desktop.d.ts
declare module "react-desktop/macOs" {
  export const View: JSX;
  export const Radio: JSX;
  export const TitleBar: JSX;
  export const Toolbar: JSX;
  export const Text: JSX;
  export const Box: JSX;
  export const ListView: JSX;
  export const ListViewRow: JSX;
  export const Window: JSX;
  export const Dialog: JSX;
  export const Button: JSX;
}
```

然后通过下面方式引入，就可以在 TypeScript 内使用了

```
/// <reference path="react-desktop.d.ts" />
```

#### TitleBar 

我们继续看我们的 drawing/index.tsx，这里主要用到了 TitleBar 

![](https://upload-images.jianshu.io/upload_images/7094266-743fed1cf7f3cde0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到 useModal 里释出了 open, close, RenderModal，其中 RenderModal 就是一会讲到的 弹窗，前两个就是控制弹窗的开关。

我们点击红色的关闭时，会调用父组件传过来的 isDrawingOpen, setDrawingOpen；而黄色的最小化按钮则调用 setDrawingShow(false)，这里我们直接设置为 false 因为再次展示是通过点击图标，最小化时高亮点不应该去除；maximizeClick 函数用于绿色最大化按钮，其中我用 width 和 height 是 -1 告诉 Modal 全屏，弹窗及其拖拽需要包括他俩再内的 data 所传递过去的值。

### 用 Portal 实现弹窗组件

项目的每个小应用本质上是个弹窗，因此实现一个可复用的组件十分必要，得益于 Portal ，我们能快速实现。
我直接复用了 [这篇文章](https://juejin.im/post/5e774a1ae51d4527271ebc92#heading-7) 里的 React Hooks 版本 Portal 实现方式。

#### 可拖拽弹窗：

```
// 代码篇幅较长，可以先看上面参考博客内版本
// Modal.tsx
import ReactDOM from "react-dom";
import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  CSSProperties,
} from "react";

type Props = {
  children: React.ReactChild;
  closeModal: () => void;
  onDrag: (T: any) => void;
  onDragEnd: () => void;
  data: {
    width: number;
    height: number;
    id: string;
    moveId: string;
    isShow: boolean;
  };
};

const Modal = React.memo(
  ({ children, closeModal, onDrag, onDragEnd, data }: Props) => {
    const domEl = document.getElementById("main-view") as HTMLDivElement;
    if (!domEl) return null;
    const dragEl = document.getElementById(data.id) as HTMLDivElement;
    const moveEl = document.getElementById(data.moveId) as HTMLDivElement;
    const localPosition = localStorage.getItem(data.id) || null;
    const initPosition = localPosition
      ? JSON.parse(localPosition)
      : {
          x: data.width === -1 ? 0 : (window.innerWidth - data.width) / 2,
          y: data.height === -1 ? 0 : (window.innerHeight - data.height) / 2,
        };
    const [state, setState] = useState({
      isDragging: false,
      origin: { x: 0, y: 0 },
      position: initPosition,
    });

    const handleMouseDown = useCallback(({ clientX, clientY }) => {
      setState((state) => ({
        ...state,
        isDragging: true,
        origin: {
          x: clientX - state.position.x,
          y: clientY - state.position.y,
        },
      }));
    }, []);

    const handleMouseMove = useCallback(
      ({ clientX, clientY, target }) => {
        if (!state.isDragging || (moveEl && target !== moveEl)) return;
        let x = clientX - state.origin.x;
        let y = clientY - state.origin.y;
        if (x <= 0) {
          x = 0;
        } else if (x > window.innerWidth - dragEl.offsetWidth) {
          x = window.innerWidth - dragEl.offsetWidth;
        }
        if (y <= 0) {
          y = 0;
        } else if (y > window.innerHeight - dragEl.offsetHeight) {
          y = window.innerHeight - dragEl.offsetHeight;
        }
        const newPosition = { x, y };
        setState((state) => ({
          ...state,
          position: newPosition,
        }));
        onDrag({ newPosition, domEl });
      },
      [state.isDragging, state.origin, moveEl, dragEl, onDrag, domEl]
    );

    const handleMouseUp = useCallback(() => {
      if (state.isDragging) {
        setState((state) => ({
          ...state,
          isDragging: false,
        }));

        onDragEnd();
      }
    }, [state.isDragging, onDragEnd]);

    useEffect(() => {
      if (data.width === -1) {
        setState({
          isDragging: false,
          origin: { x: 0, y: 0 },
          position: { x: 0, y: 0 },
        });
      }
    }, [data.width]);

    useEffect(() => {
      if (!domEl) return;
      domEl.addEventListener("mousemove", handleMouseMove);
      domEl.addEventListener("mouseup", handleMouseUp);
      return () => {
        domEl.removeEventListener("mousemove", handleMouseMove);
        domEl.removeEventListener("mouseup", handleMouseUp);
        if (data.width !== -1) {
          localStorage.setItem(data.id, JSON.stringify(state.position));
        }
      };
    }, [
      domEl,
      handleMouseMove,
      handleMouseUp,
      data.id,
      data.width,
      state.position,
    ]);

    const styles = useMemo(
      () => ({
        left: `${state.position.x}px`,
        top: `${state.position.y}px`,
        zIndex: state.isDragging ? 2 : 1,
        display: data.isShow ? "block" : "none",
        position: "absolute",
      }),
      [state.isDragging, state.position, data.isShow]
    );

    return ReactDOM.createPortal(
      <div
        style={styles as CSSProperties}
        onMouseDown={handleMouseDown}
        id={data.id}
      >
        {children}
      </div>,
      domEl
    );
  }
);
```

可以看到我在 Modal.tsx 中加入了拖拽的功能，代码篇幅很长，但原理其实比较简单，可以先看参考博客中的纯 Modal 版本后在看加入拖拽代码的版本。

这里我直接展示了完整代码，原本打算像第二篇讲动效那样介绍，但事实上两者思路十分相似，都是通过 useEffect 监听鼠标事件，那么我简单介绍下思路，便于理解：

首先我们看到有三个 dom元素 domEl、dragEl 、moveEl：domEl 和参考文章中一样，主要是弹窗出现的 dom，我将它加在了 APP.tsx 内；dragEl 就代表了 应用主体 dom（这里就是 Drawing）；moveEl 则是应用组件内部可拖拽部分，一般是 TitleBar。

由于模拟应用，我们需要记录应用当前位置，所以用到了 localStorage，initPosition 初始化应用位置，通过 -1 判断是否全屏。

state 用于记录鼠标数据及是否可拖拽；handleMouseDown 记录下当前鼠标坐标，并开启拖拽；handleMouseMove 计算出移动位移，赋值给 position，需要注意边界情况，当然这里我简化了操作，直接不允许出屏了；handleMouseUp 关闭拖拽；closeModal, onDrag, onDragEnd 分别是弹窗内部关闭函数，可附加的拖拽事件和停止事件。
以上就是弹框组件及拖拽的主要思路了。

#### UseModal

UseModal 基本和文中一致：

```
// UseModal.tsx
import React, { useState } from "react";

import Modal from "./Modal";

// Modal组件最基础的两个事件，open/close
export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const open = () => setIsVisible(true);
  const close = () => setIsVisible(false);

  const RenderModal = ({
    children,
    data,
  }: {
    children: React.ReactChild;
    data: {
      width: number;
      height: number;
      id: string;
      moveId: string;
      isShow: boolean;
    };
  }) => (
    <React.Fragment>
      {isVisible && (
        <Modal
          data={data}
          closeModal={close}
          onDrag={() => console.log("onDrag")}
          onDragEnd={() => console.log("onDragEnd")}
        >
          {children}
        </Modal>
      )}
    </React.Fragment>
  );

  return {
    open,
    close,
    RenderModal,
  };
};
```
如何使用该组件我们上文已讲到，如果你忘了可以回看。

至此，我们已经完成了开篇的过程分析了。

### 小结

本篇文章介绍了项目从点击 Dock 呈现应用到关闭应用的过程实现，里面有较多细节，值得反复回味与优化。

此篇相对前两篇较长，能看到这里都是真爱（学习和我）。既然如此，不如给我点个赞吧🍮。

目前该项目已完成部分功能，包括简单设置，基础计算器，基础画板等，即使是这些已有功能也有很多需要完善的地方。

后续我会慢慢优化，并在相应模块代码优化到一定程度时不定时更新系列文章。
