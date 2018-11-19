# context 就是局部的全局变量
如何使用：context.Provider 暴露局部变量

![](https://upload-images.jianshu.io/upload_images/7094266-bc1620998a8494af.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 1.  Provider
```    
<nContext.Provider value="99">
  <F1 />
</nContext.Provider>
```
## JSX 内容的真正涵义
![](https://upload-images.jianshu.io/upload_images/7094266-cd917744ae7cb3f2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### F1的四种写法
![](https://upload-images.jianshu.io/upload_images/7094266-c7445f91bb53a989.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## <F1></F1> 是传一个对象
![this.props.children](https://upload-images.jianshu.io/upload_images/7094266-c57aab1229882bc8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## {F1} 是传函数本身，会直接调用执行
![image.png](https://upload-images.jianshu.io/upload_images/7094266-e7cf6090bf422ab2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![props.children](https://upload-images.jianshu.io/upload_images/7094266-111bd688cf3186c0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 2.  Consumer
那么下面代码就好懂了，就是执行{}里面的函数
```    
<nContext.Consumer>
  {(x) => <F4 n4 = {x} />}
</nContext.Consumer>
```
![](https://upload-images.jianshu.io/upload_images/7094266-15481710853e1a18.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# why context
![](https://upload-images.jianshu.io/upload_images/7094266-e71c19448ee27dc9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



