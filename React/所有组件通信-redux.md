# 单向数据流和 eventHub

![](https://upload-images.jianshu.io/upload_images/7094266-f804b8629d3684af.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

用 eventHub 作为组件通信方式代替原来的 props 父子组件通信
用单向数据流准则防止每个组件的单独 render

[eventHub 版本](https://codesandbox.io/s/kind-hellman-bp1uq)

# store

多个如 money 出现时，每个共有数据单独传递十分不便，引入 store，作为这些数据的公用库
[eventHub 引入 store](https://jsbin.com/decamay/1/edit?js,output)

# 使用 redux

（如何通过官方源码引入，视频 8 分钟开始）

[引入 redux](https://jsbin.com/pixayuqago/edit?js,output)

redux 其实就是用发布订阅模式进行所有组件通信
redux 就是 eventHub，但是更复杂，把一些名字改了，具体看文档
store
subscribe
reducer：数组 reduce 的形式，表示对数据的变化
action(type,payload)：发布
其作用是防呆：防止傻逼代码”

1. 强制事件名字归类即 reducer，防止重复 store

![](https://upload-images.jianshu.io/upload_images/7094266-f08b0b20e771cd05.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2. 强制数据只读：但是 redux 有这个想法却无法彻底解决（但是有一定的传递信息效果）

![](https://upload-images.jianshu.io/upload_images/7094266-a7ba5ac83a7505ce.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3. 踢走英语差的
