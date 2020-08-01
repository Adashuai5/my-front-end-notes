[算法讲义](https://jirengu.github.io/algorithm-you-should-know/zh-cn/)

[Math.random()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
[splice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
[slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

# 快速排序

```
function Quicksort(arr){
    if(arr<=1){
        return arr
    }
    var leftArr = []
    var rightArr = []
    for(let i=1;i<arr.length;i++){
       if(arr[i]>=arr[0]){
           leftArr.push(arr[i])
       }else{
           rightArr.push(arr[i])
       }
    }
    newarr = Quicksort(leftArr).concat(arr[0]).concat(Quicksort(rightArr))
    return newarr
}
var arr = [10,5,1,2,321,2,11,-2]
Quicksort(arr)
console.log(newarr)
```
