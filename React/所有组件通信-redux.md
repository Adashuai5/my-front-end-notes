redux其实就是用发布订阅模式进行所有组件通信
redux 就是 eventHub，但是更复杂，把一些名字改了，具体看文档
store：
subscribe：
reducer：数组 reduce 的形式
action(type,payload)
其作用是防呆：防止傻逼代码”
1. 强制事件名字归类即 reducer，防止重复store 
2. 强制数据只读：但是redux有这个想法却无法彻底解决（但是有一定的传递信息效果）
3. 踢走英语差的
[eventHub](https://jsbin.com/decamay/1/edit?js,output)
[redux](https://jsbin.com/noxopeg/2/edit?js,output)
