```
通过该命令可获取 react 所有版本
npm info react versions
```

### why hooks

为什么 Effect 拿到的总是定义它的那次渲染中的 props 和 state？

React中函数式组件和类组件之间的[巨大差别](https://overreacted.io/zh-hans/how-are-function-components-different-from-classes/)

**函数式组件捕获了渲染所使用的值**

函数式组件无法改变state和props，hooks 提供了这个功能

useRef 提供了在 hooks 内部获取**最新的 props 和 state** 的能力

## 副作用

```
// 1.无作用
function fn() {}

// 2.有副作用：不知道 console 哪里来的，可能出现意外
function fn() { console.log(1) }

// 3.无副作用（纯函数）
function fn(a,b) { return a+b }
```

useEffect 执行副作用操作

### `useMemo` vs `useCallback`

`useCallback`是根据依赖(deps)缓存第一个入参的(callback)。`useMemo`是根据依赖(deps)缓存第一个入参(callback)执行后的值

```
// 注：为了方便理解我省去了一些flow语法

function updateCallback(callback, deps) {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;
  if (prevState !== null) {
    if (nextDeps !== null) {
      const prevDeps = prevState[1];
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
    }
  }
  hook.memoizedState = [callback, nextDeps];
  return callback;
}

function updateMemo(nextCreate, deps) {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;
  if (prevState !== null) {
    if (nextDeps !== null) {
      const prevDeps = prevState[1];
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
    }
  }
  const nextValue = nextCreate(); // 🤩
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}

```

