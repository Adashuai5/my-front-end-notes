[async function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)

```
promise.all
promise.race
```

**`Promise.all(iterable)`** 方法返回一个  `Promise`实例，此实例在  `iterable`  参数内所有的  `promise`  都“完成（resolved）”或参数中不包含  `promise`  时回调完成（resolve）；如果参数中   `promise`  有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败  `promise`  的结果。

**`Promise.race(iterable)`** 方法返回一个  `Promise`实例，一旦迭代器中的某个  `promise`  解决或拒绝，返回的  `promise`  就会解决或拒绝。

