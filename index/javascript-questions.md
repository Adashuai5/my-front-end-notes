推荐大家一个好的 JavaScript 进阶题库：[github of javascript-questions](https://github.com/lydiahallie/javascript-questions)
# 下面记录我第一次做错的题目
# 1. What's the output?
```
function sayHi() {
  console.log(name);
  console.log(age);
  var name = "Lydia";
  let age = 21;
}

sayHi();
```
- A: Lydia and undefined
- B: Lydia and ReferenceError
- C: ReferenceError and 21
- D: undefined and ReferenceError

Answer: D
