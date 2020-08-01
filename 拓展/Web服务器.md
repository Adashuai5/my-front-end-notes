[从输入 URL 到页面加载发生了什么](https://segmentfault.com/a/1190000006879700)

## 什么是 Web 服务器

Web 服务器就是一个软件，这个软件监听某个端口。当一个 HTTP 请求到达这个端口后这个软件会接收到，根据请求的 url 和参数发送响应数据，这些数据可以是：1. 本机文件； 2. 通过可执行程序从数据库获取数据后组装的页面

**让我们用 node 搭建一个简单的服务器**

[代码相关 HTTP 文档](https://nodejs.org/dist/latest-v10.x/docs/api/http.html#http_request_end_data_encoding_callback) 遇到相应 API 再看，不用一个个看，看不完的
新建一个名为 server1.js 的代码

```
//通过 require('http') 来让服务器支持HTTP协议
var http = require('http')
//创建服务器请求和响应的函数
var server = http.createServer(function(request, response){
  //设置一个2秒的计时器
  setTimeout(function(){
    //.setHeader设置文件类型编码等
    response.setHeader('Content-Type','text/html; charset=utf-8')
    //.writeHead返回状态码
    response.writeHead(404, 'Not Found')
    response.write('<html><head><meta charset="gbk" /></head>')
    response.write('<body>')
    response.write('<h1>你好</h1>')
    response.write('</body>')
    response.write('</html>')
    //事件'关闭'
    response.end()
  },2000);
})
console.log('open http://localhost:8080')
//listen(端口)产生HTTP服务器监听链接
server.listen(8080)
```

用命令行打开 server1.js 所在目录，node 开启服务器![](https://upload-images.jianshu.io/upload_images/7094266-59e81063d440a373.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
用浏览器打开http://localhost:8080，2秒后就返回页面拉![](https://upload-images.jianshu.io/upload_images/7094266-7bf0b304614ce83f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
至此，你已经用 node.js 完成了一个简单的服务器搭建，并用浏览器以http://localhost:8080向你的服务器发起请求并成功得到响应了

### 静态服务器

页面不会变化，展示静态页面![image](http://upload-images.jianshu.io/upload_images/7094266-19e00ec3472ba838.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**同样用 node 尝试一个简单的静态服务器**

```
var http = require('http')
//用来读取内容
var fs = require('fs')

var server = http.createServer(function(req, res){
  try{
    //.readFileSync 用于同步读取文件:当前目录下的 hi 文件 下的 目标
    var fileContent = fs.readFileSync(__dirname + '/hi' + req.url)
    res.write(fileContent)
  }catch(e){
    res.writeHead(404, 'not found')
  }
  res.end()
})

server.listen(8080)
console.log('visit http://localhost:8080' )
```

我在 hi 文件下新建了一个 html 文件![](https://upload-images.jianshu.io/upload_images/7094266-f1c53aa1769fd9ad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

命令行![](https://upload-images.jianshu.io/upload_images/7094266-9dcba127af327a67.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这次输入的就是http://localhost:8080/index.html![](https://upload-images.jianshu.io/upload_images/7094266-986cc0ea222a9586.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)成功拉

### 动态服务器

有个动态软件，可执行动态页面![image](http://upload-images.jianshu.io/upload_images/7094266-47d1ffd2b592f7e1.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
这一部分涉及的知识就多了，无法用简单的小示例完整展现，后续应该会有相关博客

### 以上例子均为 url 同源

当浏览器向服务器发送请求时，会遇到**不同源**的情况：（有关浏览器同源的详细概念可以参考[阮一峰博客](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)）
不同源两种情况下的规避方法： 1.服务器同意请求：
JSONP：需要后端支持（附上我学习 JSONP 的相关[博客](https://www.jianshu.com/p/2a2fe02917e7)）
CORS(Cross-Origin Resource Sharing)：跨域资源共享（AJAX 相关[博客](https://www.jianshu.com/p/4591a66c50f5)） 2.服务器不同意请求：
利用服务器中转：自己搭建一个服务器，由于服务器访问服务器没有同源要求，可直接访问，自己服务器作为中转，把自己服务器变为情况 1，即可通过访问自己服务器再访问到其他服务器相关内容
这方面的知识同样可以参考
[饥人谷博客-跨域](http://book.jirengu.com/fe/%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A1%80/Javascript/%E8%B7%A8%E5%9F%9F.html)

---

本文仅供个人学习使用

相关参考及资源链接已在文中标注
