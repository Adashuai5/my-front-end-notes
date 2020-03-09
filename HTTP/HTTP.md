[阮一峰 HTTP 入门](https://www.ruanyifeng.com/blog/2016/08/http.html)

[HTTP的前世今生](https://coolshell.cn/articles/19840.html)

互联网：网络，很早出现（1950-1960）

万维网：网页，1990才有，**Tim Berners-Lee** 发明

* * *

**WWW（World Wide Web）**，一种适用于全世界的网络。

主要包含三个概念

**URI（Uniform Resource Identifier）**统一资源标识符，俗称网址

URI可被视为定位符**URL（Uniform Resource Locator统一资源定位符）**，名称**URN（Uniform Resource Name统一资源名称）**或两者兼备。（URN）如同一个人的名称，而（URL）代表一个人的住址。

**HTTP（HyperText Transfer Protocol）**超文本传输协议，两个电脑之间传输内容的协议

**HTML（HyperText Markup Language）**超文本标记语言，主要用来做页面跳转

**URL**作用是能让你访问一个页面，HTTP 的作用是让你能下载这个页面，HTML 的作用是让你能看懂这个页面

**DNS（Domain Name System）**域名系统 **作用**：输入域名，输出对应的 IP

* * *

![image](https://upload-images.jianshu.io/upload_images/7094266-5bf8ad1c1e4653ce.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

一个URL由协议、域名、路径、查询参数、锚点以及端口组成

（二级域名）** baidu**.com 和（三级域名） www.**baidu**.com 是不同域名，它们共享一个二级域名

* * *

# 响应

**状态码是服务器对浏览器说的话**

**[http状态码](https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81)**

**1xx**不常用

**2xx** 表示成功（**200**成功；**204**创建成功）

**3xx** 表示滚吧（**301**永久搬走了；**302**临时搬走；**304**和原来一样）

**4xx** 表示你丫错了（访问者出错如**404**）

**5xx** 表示好吧，我错了（服务器出错如**502**）
