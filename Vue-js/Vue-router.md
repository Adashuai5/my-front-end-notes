一般放在 router 文件夹下

![](https://upload-images.jianshu.io/upload_images/7094266-21ae6a590fe9dde4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后在 main.js 内引入
[详见](chrome-extension://cdonnmffkdaoajfknoeeecmchibpmkmg/static/pdf/web/viewer.html?file=https%3A%2F%2Fvideo.jirengu.com%2Fxdml%2Ffile%2F48f19bc4-39f9-49a8-99a2-84701e6b8b19%2F2018-5-30-17-7-25.pdf)

当 router-link 只是变化 name。path 不变时，路由检测不到变化

![如图：上面会反生跳转，下面变化不会](https://upload-images.jianshu.io/upload_images/7094266-e936a34963fd4307.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

此时需要用到 watch：侦听器

```
watch:{
    '$route'(to,from){
      this.getArticleData()
    }
}
```
