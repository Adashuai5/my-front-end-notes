解决 shadowsocks 在 windows 7 上打不开的问题

![](https://upload-images.jianshu.io/upload_images/7094266-5b0a239f9f523f2e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

解决方法[参考链接](https://github.com/shadowsocks/shadowsocks-windows/issues/1189)

下载 Microsoft .NET Framework 4.7[下载链接](https://www.microsoft.com/zh-CN/download/details.aspx?id=55170)

---

解决**chrome**网页编码错误问题

因为**Google Chrome**在**55**版本以后删除了手动设置网站编码的功能

而我前几天出现了部分网页编码错误的情况

![](https://upload-images.jianshu.io/upload_images/7094266-2a38c53ad0a92443.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

gihub 编码错误

发现可以用设置网站编码解决，而**chrome **已经移除此功能，因此可用扩展程序

![](https://upload-images.jianshu.io/upload_images/7094266-a0c1211651b74aee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

设置编码扩展程序

右键就有了，和原来一样

![i](https://upload-images.jianshu.io/upload_images/7094266-c46530cbab9e74e2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

网页又恢复该有的样子了

![](https://upload-images.jianshu.io/upload_images/7094266-5426a5777bfa4366.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

---

git bash 出现[方块元素](https://zh.wikipedia.org/wiki/%E6%96%B9%E5%A1%8A%E5%85%83%E7%B4%A0)的问题

![](https://upload-images.jianshu.io/upload_images/7094266-c7ffceb3f9efcf4f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

https://blog.csdn.net/Damon___/article/details/78986660

git log 中文乱码  https://www.zhihu.com/question/57162172

```
git config --global i18n.commitencoding utf-8
git config --global i18n.logoutputencoding **utf-8**
```

git bash 设置快捷键 ctrl+alt+T 后快捷键没反应，重启即可

---

github 提交 commit 不显示绿块问题，原因 邮箱绑定错误，方法 1.改回邮箱为 github 绑定邮箱。2.在 github 上增加之前的邮箱，绿块有了。

---

关于 出现 %APPDATA%文件的问题

若已经上传到 github 代码回滚没用

删除本地文件，git clone 文件，粉碎文件 git push

---

![](https://upload-images.jianshu.io/upload_images/7094266-4fffc2ca77dc273e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

https://blog.csdn.net/zhoucheng05_13/article/details/52831703
