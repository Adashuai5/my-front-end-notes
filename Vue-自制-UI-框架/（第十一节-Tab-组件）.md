#[UI](https://www.yuque.com/u29422/gulu/268970 "null")
#用例
![](https://upload-images.jianshu.io/upload_images/7094266-e6ba52db101a0064.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#代码
###ant UI 结构
![](https://upload-images.jianshu.io/upload_images/7094266-9fa57146eb1a83cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

label 作为选择器，如果加 icon，用 template

![](https://upload-images.jianshu.io/upload_images/7094266-bb5b8c7bb8bca0f4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/7094266-2576ecea6e203dda.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###我们的结构
![](https://upload-images.jianshu.io/upload_images/7094266-383e4a67acc86b21.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/7094266-1f641d087988f2c0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**这样做的目的：有三层结构，可以便于独立更改 tab item或content 的背景样式**
同时我们规定用户需对对应的 item 和 content 传同一个 name，便于 selected 作为选择器选择
