```
通过该命令可获取 react 所有版本
npm info react versions
```

# [Hook](https://zh-hans.reactjs.org/docs/hooks-intro.html)

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
