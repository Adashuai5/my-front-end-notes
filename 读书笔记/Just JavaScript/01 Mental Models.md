Mental Models（心智模型）

### Coding, Fast and Slow

人会以两种不同的“系统”思考：

- “fast” system
- “slow” system

```javascript
function duplicateSpreadsheet(original) {
  if (original.hasPendingChanges) {
    throw new Error('You need to save the file before you can duplicate it.');
  }
  let copy = {
    created: Date.now(),
    author: original.author,
    cells: original.cells,
    metadata: original.metadata,
  };
  copy.metadata.title = 'Copy of ' + original.metadata.title;
  return copy;
}
```

我们通常使用“快”模型审查代码，往往会忽略其中隐藏的 bug（这段代码同时改变了原始数据的 tile）