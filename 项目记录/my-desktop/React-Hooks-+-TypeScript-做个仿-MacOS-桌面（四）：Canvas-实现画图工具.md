这是我的项目记录系列文章第四篇，[上一篇](https://zhuanlan.zhihu.com/p/147974188) 主要介绍了 Dock 弹框等的实现，同时提到了此次主角 drawing 画板。

画板是目前实现的功能里较为典型的 Hooks 用例，本篇就来详细介绍下，画板最终的效果如图题所示，同时你可以在我的项目 [代码（欢迎 watch 和 star）](https://github.com/Adashuai5/my-desktop)体验。

### Canvas 实现画布（译文）

实现画布部分基本参考 [React Component to draw on a page using Hooks and Typescript](https://dev.to/ankursheel/react-component-to-fraw-on-a-page-using-hooks-and-typescript-2ahp) 该文提供完整代码及介绍，十分详细，如果你的英文不错，你可以直接看这篇文章跳过本节译文。

#### 创建组件

我们需要做的第一件事是创建一个 Canvas 组件。 画布需要占用一些空间，我们希望任何父组件都能够覆盖这些空间，所以我们将添加宽度和高度属性。

同时我们将 window.innerWidth 和 window.innerHeight 分别设置为 Canvas 的宽度和高度 defaultProps。

```
import React from 'react';

interface CanvasProps {
    width: number;
    height: number;
}

const Canvas = ({ width, height }: CanvasProps) => {
     return <canvas height={height} width={width} />;
};

Canvas.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight,
};

export default Canvas;
```

#### 让我们画画吧

因为我们需要修改 canvas 元素，所以我们需要为它添加一个 ref。 我们可以通过使用 useRef 钩子修改我们的 canvas 来实现这一点：

```
const canvasRef = useRef<HTMLCanvasElement>(null);
return <canvas ref={canvasRef} height={height} width={width} />;
```

#### 设置状态

我们需要跟踪一些变量:

- 鼠标位置
- 我们是否在画画

我们可以通过添加 useState 钩子来做到这一点。Coordinate 是鼠标位置坐标的类型。

```
type Coordinate = {
    x: number;
    y: number;
};

const Canvas = ({ width, height }: CanvasProps) => {
const [isPainting, setIsPainting] = useState(false);
const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);
// ... other stuff here
```

#### 当鼠标按下时开始绘图

我们将在 useEffect 钩子中添加事件侦听器。 如果我们有一个对画布的有效引用，那么我们将向 mouseDown 事件添加一个事件侦听器。 在 unmount 时，我们需要删除该事件侦听器。

```
 useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousedown', startPaint);
        return () => {
            canvas.removeEventListener('mousedown', startPaint);
        };
    }, [startPaint]);
```

Startpaint 需要获取鼠标的当前坐标并将 isPainting 设置为 true。 我们还将把它包装在一个 useCallback 钩子中，这样我们就可以在 useCallback 钩子中使用它。

```
 const startPaint = useCallback((event: MouseEvent) => {
        const coordinates = getCoordinates(event);
        if (coordinates) {
            setIsPainting(true);
            setMousePosition(coordinates);
        }
    }, []);

// ...other stuff here

const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
        return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    return {event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop};
};
```

#### 随鼠标移动画线

与 mouseDown 事件侦听器类似，我们将使用 useEffect hook 来添加 mousemove 事件。

```
useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousemove', paint);
        return () => {
            canvas.removeEventListener('mousemove', paint);
        };
    }, [paint]);
```

paint 需要：

- 检查一下我们是否在 paint
- 获取新鼠标坐标
- 通过从画布获取呈现上下文，将新旧坐标连线
- 更新旧坐标

```
const paint = useCallback(
        (event: MouseEvent) => {
            if (isPainting) {
                const newMousePosition = getCoordinates(event);
                if (mousePosition && newMousePosition) {
                    drawLine(mousePosition, newMousePosition);
                    setMousePosition(newMousePosition);
                }
            }
        },
        [isPainting, mousePosition]
    );

// ...other stuff here

const drawLine = (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context) {
            context.strokeStyle = 'red';
            context.lineJoin = 'round';
            context.lineWidth = 5;

            context.beginPath();
            context.moveTo(originalMousePosition.x, originalMousePosition.y);
            context.lineTo(newMousePosition.x, newMousePosition.y);
            context.closePath();

            context.stroke();
        }
    };
```

#### 鼠标放开则停止绘制

当用户释放鼠标或者将鼠标移出画布区域时，我们希望停止绘制：

```
useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mouseup', exitPaint);
        canvas.addEventListener('mouseleave', exitPaint);
        return () => {
            canvas.removeEventListener('mouseup', exitPaint);
            canvas.removeEventListener('mouseleave', exitPaint);
        };
    }, [exitPaint]);
```

在 exitPaint 中，我们只是将 isPainting 设置为 false

```
const exitPaint = useCallback(() => {
        setIsPainting(false);
    }, []);
```

译文完

### 优化画板：添加功能

画板已经可以画画了，但是作为一个独立工具，只是能够画画是远远不够的，接下来我们为其添加功能面板：

![image](https://upload-images.jianshu.io/upload_images/7094266-1f27cc994e37b30b?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 封装 Iconfont 组件

功能面板用到了很多图标，后续项目也会用到，因此我封装了一个 Iconfont 组件
，图标来源是 iconfont，每次我们修改或增加图标等，只需要修改 scriptElem.src 即可

![image](https://upload-images.jianshu.io/upload_images/7094266-f90cd3f40a5c4d26?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
// src/components/iconfont/index.tsx
import React, { CSSProperties, RefObject } from "react";
import "./index.scss";

const scriptElem = document.createElement("script");
scriptElem.src = "//at.alicdn.com/t/font_1848517_ds8sk573mfk.js";
document.body.appendChild(scriptElem);

interface PropsTypes {
  className?: string;
  type: string;
  style?: object;
  svgRef?: RefObject<SVGSVGElement>;
  clickEvent?: (T: any) => void;
}

export const Iconfont = ({
  className,
  type,
  style,
  svgRef,
  clickEvent,
}: PropsTypes) => {
  return (
    <svg
      ref={svgRef}
      className={className ? "icon-font " + className : "icon-font"}
      aria-hidden="true"
      style={style as CSSProperties}
      onClick={clickEvent}
    >
      <use xlinkHref={`#${type}`} />
    </svg>
  );
};

// ./index.scss
.icon-font {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
```

#### 功能面板结构

功能面板结构如下，对应本节开头图片：

```
import { Iconfont } from "../iconfont";
import { CSSTransition } from "react-transition-group";

return (
    <React.Fragment>
      <canvas id="canvas" ref={canvasRef} height={height} width={width} />
      <div
        id="toolbox-open"
        style={
          {
            borderRadius: isToolboxOpen ? null : 5,
          } as CSSProperties
        }
      >
        <Iconfont
          type={isToolboxOpen ? "icon-upward_flat" : "icon-downward_flat"}
          style={{
            width: "100%",
            fontSize: 32,
          }}
          clickEvent={toolboxOpenClick}
        />
      </div>
      <CSSTransition
        in={isToolboxOpen} //用于判断是否出现的状态
        timeout={300} //动画持续时间
        classNames="toolbox" //className值，防止重复
        unmountOnExit
      >
        <div id="toolbox">
              <span>Options</span>
              <div className="options">
                ...
              </div>
              <span>Toolbox</span>
              <div className="tools">
                ...
          </div>
          <div className="sizes">
            ...
          </div>
          <ol className="colors">
            ...
          </ol>
        </div>
      </CSSTransition>
    </React.Fragment>
  )

```

通过 isToolboxOpen 设定功能面板是否收缩，引入 CSSTransition 添加展开收缩动画。

```
const [isToolboxOpen, setToolboxOpen] = useState(true);
  const toolboxOpenClick = useCallback(
    (e) => {
      setToolboxOpen(!isToolboxOpen);
    },
    [isToolboxOpen]
  );
```

#### 下面我们依次介绍各个功能模块：

##### tools 面板：

![image](https://upload-images.jianshu.io/upload_images/7094266-867a1490a29a8274?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

主要用来选择是画笔还是橡皮擦：

```
const toolsMap = ["canvas_paint", "canvas_eraser"];
const [eraserEnabled, setEraserEnabled] = useState(false);
```

```
<div className="tools">
  {toolsMap.map((tool, index) => {
    return (
      <Iconfont
        key={index + tool}
        className={
          tool === "canvas_eraser"
            ? eraserEnabled
              ? "active"
              : ""
            : !eraserEnabled
            ? "active"
            : ""
        }
        type={"icon-" + tool}
        style={{ fontSize: 50 }}
        clickEvent={(e) => onToolsClick([e, tool])}
      />
    );
  })}
</div>
```

```
const onToolsClick = useCallback(([e, toolName]) => {
  const el = e.currentTarget;
  if (el.classList[1]) return;
  toolName === "canvas_eraser"
    ? setEraserEnabled(true)
    : setEraserEnabled(false);
  el.classList.add("active");
  el.parentNode.childNodes.forEach((item: HTMLLIElement) => {
    if (!item.matches("svg") || item === el) return;
    item.classList.remove("active");
  });
}, []);
```

修改 paint 函数，通过 eraserEnabled 判断是 clearRect 还是 drawLine：

```
if (mousePosition && newMousePosition) {
  if (eraserEnabled) {
    clearRect({
      x: newMousePosition.x - lineWidth / 2,
      y: newMousePosition.y - lineWidth / 2,
      width: lineWidth,
      height: lineWidth,
    });
  } else {
    drawLine(mousePosition, newMousePosition);
    setMousePosition(newMousePosition);
  }
}
```

---

##### sizes/colors 面板：

![image](https://upload-images.jianshu.io/upload_images/7094266-4f803da20f795f2c?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

colors 面板列出了几种常用颜色，增加了原生颜色选择器，可改变画笔颜色：

```
<ol className="colors">
  {colorMap.map((color, index) => {
    return (
      <li
        className={color === strokeStyle ? color + " active" : color}
        key={index + color}
        onClick={(e) => onColorsClick([e, "li", color])}
      ></li>
    );
  })}
  <input
    type="color"
    value={strokeStyle}
    onChange={onColorsChange}
    id="currentColor"
  />
</ol>
```

```
const [strokeStyle, setStrokeStyle] = useState("black");

const onColorsClick = useCallback(([e, selector, color]) => {
  const el = e.target;
  if (el.className.includes("active")) return;
  setStrokeStyle(color);
  el.classList.add("active");
  el.parentNode.childNodes.forEach((item: HTMLLIElement) => {
    if (!item.matches(selector) || item === el) return;
    item.classList.remove("active");
  });
}, []);
```

sizes 主要用来修改画笔或橡皮檫粗细：

```
<div className="sizes">
  <input
    style={
      {
        backgroundColor: eraserEnabled ? "#ebeff4" : strokeStyle,
      } as CSSProperties
    }
    type="range"
    id="range"
    name="range"
    min="1"
    max="20"
    value={lineWidth}
    onChange={onSizesChange}
  />
</div>
```

```
const [lineWidth, setLineWidth] = useState(5);

const onSizesChange = useCallback((e) => {
  setLineWidth(e.target.value);
}, []);
```

---

##### options 面板：

![image](https://upload-images.jianshu.io/upload_images/7094266-856b72c57f443e8f?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

主要有保存、清空、回退及前进功能：

```
const optionsMap = [
  "canvas_save",
  "canvas_clear",
  "turn_left_flat",
  "turn_right_flat",
];
```

```
<div className="options">
  {optionsMap.map((option, index) => {
    return (
      <Iconfont
        svgRef={
          option === "turn_right_flat"
            ? goRef
            : option === "turn_left_flat"
            ? backRef
            : undefined
        }
        key={index + option}
        className={option}
        type={"icon-" + option}
        style={{ fontSize: 50 }}
        clickEvent={(e) => onOptionsClick([e, option])}
      />
    );
  })}
</div>
```

```
const onOptionsClick = useCallback(
  ([e, toolName]) => {
    switch (toolName) {
      case "canvas_clear":
        setClearDialogOpen(true);
        break;
      case "canvas_save":
        saveCanvas();
        break;
      case "turn_left_flat":
        changeCanvas("back");
        break;
      case "turn_right_flat":
        changeCanvas("go");
        break;
    }
  },
  [saveCanvas, changeCanvas]
);
```

首先我们介绍 回退及前进：

```
const backRef = useRef<SVGSVGElement>(null);
const goRef = useRef<SVGSVGElement>(null);
const [step, setStep] = useState(-1);
const [canvasHistory, setCanvasHistory] = useState<string[]>([]);
```

我们在每次画笔或橡皮 mouseup 时，记录下 canvas 片段（saveFragment），值得注意的是，这里我们的 mouseleave 还应该是上文原来的 exitPaint（无 saveFragment）：

```
const exitPaint = useCallback(() => {
  setIsPainting(false);
  setMousePosition(undefined);
  saveFragment();
}, [saveFragment]);
```

```
const saveFragment = useCallback(() => {
  setStep(step + 1);
  if (!canvasRef.current) {
    return;
  }
  const canvas: HTMLCanvasElement = canvasRef.current;
  canvasHistory.push(canvas.toDataURL());
  setCanvasHistory(canvasHistory);

  if (!backRef.current || !goRef.current) {
    return;
  }
  const back: SVGSVGElement = backRef.current;
  const go: SVGSVGElement = goRef.current;
  back.classList.add("active");
  go.classList.remove("active");
}, [step, canvasHistory]);
```

当我们点击这两个按钮就会触发 changeCanvas，获取 step 从而得到对应 canvasHistory 内 url，根据它我们能生成一个片段图片画到画布上下文内。

```
const changeCanvas = useCallback(
  (type) => {
    if (!canvasRef.current || !backRef.current || !goRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");
    const back: SVGSVGElement = backRef.current;
    const go: SVGSVGElement = goRef.current;
    if (context) {
      let currentStep = -1;
      if (type === "back" && step >= 0) {
        currentStep = step - 1;
        go.classList.add("active");
        if (currentStep < 0) {
          back.classList.remove("active");
        }
      } else if (type === "go" && step < canvasHistory.length - 1) {
        currentStep = step + 1;
        back.classList.add("active");
        if (currentStep === canvasHistory.length - 1) {
          go.classList.remove("active");
        }
      } else {
        return;
      }
      context.clearRect(0, 0, width, height);
      const canvasPic = new Image();
      canvasPic.src = canvasHistory[currentStep];
      canvasPic.addEventListener("load", () => {
        context.drawImage(canvasPic, 0, 0);
      });
      setStep(currentStep);
    }
  },
  [canvasHistory, step, width, height]
);
```

接着我们来看下 保存按钮的实现：

```
const saveCanvas = useCallback(() => {
  if (!canvasRef.current) {
    return;
  }
  const canvas: HTMLCanvasElement = canvasRef.current;
  const context = canvas.getContext("2d");
  if (context) {
    // 用于记录当前 context.globalCompositeOperation ——（合成或混合模式）
    const compositeOperation = context.globalCompositeOperation;、
    // 设置为 “在现有的画布内容后面绘制新的图形”
    context.globalCompositeOperation = "destination-over";
    context.fillStyle = "#fff";
    context.fillRect(0, 0, width, height);
    const imageData = canvas.toDataURL("image/png");
    // 将数据从已有的 ImageData 对象绘制到位图
    context.putImageData(context.getImageData(0, 0, width, height), 0, 0);
    // 复原 context.globalCompositeOperation
    context.globalCompositeOperation = compositeOperation;
    // 下载操作
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = imageData;
    a.download = "myPaint";
    a.target = "_blank";
    a.click();
  }
}, [width, height]);
```

最后我们来讲讲清空按钮：

清空按钮的实现其实十分简单，但是点击直接删除的话交互太不友好，我们需要给他来个确认弹框，

根据第三篇讲到的 UseModel 组件我们可以快速写出一个弹框：

```
import React, { useMemo, useState, CSSProperties } from "react";
import { Dialog, Button } from "react-desktop/macOs";
/// <reference path="react-desktop.d.ts" />

interface DialogProps {
  width: number;
  height: number;
  id: string;
  title?: string;
  message?: string;
  imgSrc?: string;
  onCheck: (T: any) => void;
  onClose: (T: any) => void;
}

export const useDialog = () => {
  const [isVisible, setIsVisible] = useState(false);
  const openDialog = () => setIsVisible(true);
  const closeDialog = () => setIsVisible(false);
  const RenderDialog = ({
    width,
    height,
    id,
    title,
    message,
    imgSrc,
    onCheck,
    onClose,
  }: DialogProps) => {
    const styles = useMemo(
      () => ({
        width: width,
        height: height,
        left: `calc(50vw - ${width / 2}px)`,
        top: `calc(50vh - ${height}px)`,
        borderRadius: 4,
      }),
      [width, height]
    );

    const renderIcon = () => {
      if (!imgSrc) return;
      return (
        <img
          src={require("../footer/image/" + imgSrc)}
          width="52"
          height="52"
          alt="tip"
        />
      );
    };
    return (
      <React.Fragment>
        {isVisible && (
          <div id={id} style={styles as CSSProperties}>
            <Dialog
              title={title}
              message={message}
              icon={renderIcon()}
              buttons={[
                <Button onClick={onClose}>取消</Button>,
                <Button color="blue" onClick={onCheck}>
                  确认
                </Button>,
              ]}
            />
          </div>
        )}
      </React.Fragment>
    );
  };

  return {
    openDialog,
    closeDialog,
    RenderDialog,
  };
};
```

使用也是一样的十分简单：

```
import { useDialog } from "../dialog/index";

...

const { openDialog, closeDialog, RenderDialog } = useDialog();
const [isClearDialogOpen, setClearDialogOpen] = useState(false);
useEffect(isClearDialogOpen ? openDialog : closeDialog, [isClearDialogOpen]);

return (
  <React.Fragment>
    ...
    <RenderDialog
      width={300}
      height={120}
      id="clear-dialog"
      title="您确定要清空该画布吗？"
      message="一旦清空将无法撤回。"
      imgSrc={"Drawing.png"}
      onCheck={checkClearDialog}
      onClose={closeClearDialog}
    ></RenderDialog>
  </React.Fragment>
);
```

效果如下图：

![image](https://upload-images.jianshu.io/upload_images/7094266-131d24964ff76e17?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
// 确认清空
const checkClearDialog = useCallback(
  (e) => {
    clearRect({
      x: 0,
      y: 0,
      width,
      height,
    });
    setCanvasHistory([]);
    setStep(-1);
    closeClearDialog(e);
    if (!backRef.current || !goRef.current) {
      return;
    }
    const back: SVGSVGElement = backRef.current;
    const go: SVGSVGElement = goRef.current;
    back.classList.remove("active");
    go.classList.remove("active");
  },
  [closeClearDialog, clearRect, width, height]
);
// 取消
const closeClearDialog = useCallback(
  (e) => {
    setClearDialogOpen(false);
  },
  [setClearDialogOpen]
);
```

功能面板完。

至此，一个简约而不简单的画板就完成了。

### 小结

本篇文章梳理了仿 MacOS 桌面中画图工具的实现过程，代码及功能并不复杂但有很多值得注意的细节，希望通过该文章你能够掌握 React Hooks 基本用法及对 Canvas 有一定了解。

如果你喜欢这篇文章，不要忘了给我点赞（收藏永远比点赞多，可以像 B 站一样三连啊哈哈）。🍮
