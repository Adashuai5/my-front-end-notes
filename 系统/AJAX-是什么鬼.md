之前写了一篇博客[理解JSONP 上](https://www.jianshu.com/p/2a2fe02917e7)关于AJAX出现之前如何发请求
简单回顾一下：
#### 1.用 form 可以发请求，缺点是会刷新页面或新开页面 
form发送get请求：![](https://upload-images.jianshu.io/upload_images/7094266-8a9a80cde134701d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
输入密码后，点击提交，打开开发者工具可以看到一个get请求，点开找到Request Headers点击**view source** ![](https://upload-images.jianshu.io/upload_images/7094266-2f497d2ed697fabb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
同样可以用form发送post请求，与get请求区别是post请求没有查询参数![](https://upload-images.jianshu.io/upload_images/7094266-2a9955c21d5904d5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


post请求的第四部分 password在下面的 Form Data 的**view source** 里![](https://upload-images.jianshu.io/upload_images/7094266-c10130216b9836f7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#### 2.用 a 可以发 get 请求，但是也会刷新页面或新开页面
点击click就发送请求![](https://upload-images.jianshu.io/upload_images/7094266-e8ecdf0d63d5c019.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
<a id="ada" href="/ada">click</a>
//运行一个脚本，让网页自己点击（但是依然会刷新页面）
<script>
  ada.click()
</script>
```
#### 3.用 img 可以发 get 请求，它不会刷新页面，但是只能以图片的形式展示
```
<script>
  var image = document.createElement('img')
  image.src = '/ada'
  image.onload = function(){
    console.log('succsee')
  }
  image.onerror = function(){
    console.log('fail')
  }
</script>
```
![](https://upload-images.jianshu.io/upload_images/7094266-9b2b91b49a0575b4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 4.用 link 可以发 get 请求，但是只能以 CSS、favicon 的形式展示
```
<script>
  var link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = '/ada'
  //需要将link放到页面中才能发送请求
  document.head.appendChild(link)
</script>
```
![](https://upload-images.jianshu.io/upload_images/7094266-ff9dc05b89603af5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 5.用 script 可以发 get 请求，但是只能以脚本的形式运行
```
<script>
  var script = document.createElement('script')
  script.src = "/ada"
  //需要将script放到页面中才能发送请求
  document.head.appendChild(script)
</script>
```
当然还有其他方法

---
有关AJAX的学习推荐[阮一峰博客](http://javascript.ruanyifeng.com/bom/ajax.html#toc0)
**微软的突破**
IE 5 率先在 JS 中引入 ActiveX 对象（API），使得 JS 可以直接发起 HTTP 请求。
随后 Mozilla、 Safari、 Opera 也跟进了，取名 XMLHttpRequest，并被纳入 W3C 规范
**AJAX**
Jesse James Garrett 将如下技术取名叫做 AJAX（Asynchronous JavaScript and XML）：异步的 JavaScript 和 XML
***1.使用 XMLHttpRequest 发请求
2.服务器返回 XML 格式的字符串
3.JS 解析 XML，并更新局部页面***

#### 同样我们用node服务器来尝试一下这三个条件(AJAX)
新建html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    hi
</body>
</html>
```
Node代码
```
console.log('含查询字符串的路径\n' + pathWithQuery)
  if (path === '/') {
    var string = fs.readFileSync('./index.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.write(string)
    response.end()
  } else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.write('找不到服务器')
    response.end()
  }
```
对于HTTP来说，响应的第四部分始终是string![](https://upload-images.jianshu.io/upload_images/7094266-01746a588b0abc36.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
在 html 里创建一个button，引入当前目录下的 js 文件
```
<body>
    <button id="myButton">点我</button>
    <script src="./main.js"></script>
</body>
```
Node代码//在原Node代码中插入，下同
```
//注意这里是 /main.js 而不是 ./main.js，因为HTTP请求永远是绝对路径
else if (path === '/main.js') {
//这里当然是./main.js
    var string = fs.readFileSync('./main.js', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
    response.write(string)
    response.end()
} 
```
**首先满足1.使用 XMLHttpRequest 发请求**
```
myButton.addEventListener('click', (e) => {
    let request = new XMLHttpRequest()
    //初始化请求，参数为:method,url,async(异步状态下才是AJAX),user,password(后三个参数一般默认)
    request.open('GET', '/ada')
    request.send()
})
```
**2.服务器返回 XML 格式的字符串**
XML已经不流行了，但是我们依然可以尝试一下
找一个一个XML example
```
else if (path === '/ada') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/xml; charset=utf-8')
    response.write(`
    <?xml version="1.0" encoding="UTF-8"?>
    <note>
    <to>Tove</to>
    <from>Jani</from>
    <heading>Reminder</heading>
    <body>Don't forget me this weekend!</body>
</note>`)
    response.end()
}
```
![](https://upload-images.jianshu.io/upload_images/7094266-d5529f18c6d6d036.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**3.JS 解析 XML，并更新局部页面**
浏览器是分步下载响应的，一般只要记住 **readyState === 4** 表示请求完成![](https://upload-images.jianshu.io/upload_images/7094266-a27d3791360b1d30.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以用 **onreadystatechange** 监听 readyState
```
myButton.addEventListener('click', (e) => {
    let request = new XMLHttpRequest()
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            console.log('请求响应都完成了')

            if (request.status >= 200 && request.status < 300) {
                console.log('success')
                //响应值在300-400之间浏览器会重新发送请求
            } else if (request.status >= 400) {
                console.log('fail')
            }

        }
    }
    //初始化请求，参数为:method,url,async(异步状态下才是AJAX),user,password(后三个参数一般默认)
    request.open('GET', '/ada')
    request.send()
})
```
![](https://upload-images.jianshu.io/upload_images/7094266-6159a07fdb534df4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
如果把(path === '/ada'){}里改成400  //注意不要改错地方
```
response.statusCode = 400
```
当然会返回 fail，可以看到 readyState 是不受状态码影响的![](https://upload-images.jianshu.io/upload_images/7094266-dc4181f8240aa1b7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
JS 是可以解析 XML的，但是现在XML已经被JSON取代了，我们可以简单打印出来
```
console.log(request.responseText)
```
![](https://upload-images.jianshu.io/upload_images/7094266-beb53639db92273c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

---
[JSON](https://www.json.org/)
JSON是道格拉斯基于JavaScript发明的数据交换语言
- 特点：
  - 
  - 只有 object、array、string、number、true、false、null 这几种类型
  - 字符串首尾必须为双引号
```
JS         VS         JSON
undefined/symbel      无
null                  null
['a','b']             ["a","b"]
function f(){}        无
{a:b}                 {"a","b"}
'hello world'         "hello world"
var a = {}
a.self = a            无法做到{无变量等形式}
{__proto__}           没有原型链
```

**用JSON替换XML**
Node代码：
```
else if (path === '/ada') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/xml; charset=utf-8')
//变XML为JSON，key和value都可以替换成自己喜欢的
    response.write(`
    {
        "note":{
        "to": "reader",
        "from": "Ada",
        "heading": "greet",
        "content": "hello word!"
    }`)
    response.end()
```
js完整代码
```
myButton.addEventListener('click', (e) => {
    let request = new XMLHttpRequest()
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            console.log('请求响应都完成了')

            if (request.status >= 200 && request.status < 300) {
                console.log('success')
                console.log(typeof request.responseText)
                console.log(request.responseText)
                let string = request.responseText
                // 把符合 JSON 语法的字符串转换成 JS 对应的值
                let object = window.JSON.parse(string)
                // JSON.parse 是浏览器提供的
                //响应值在300-400之间浏览器会重新发送请求
            } else if (request.status >= 400) {
                console.log('fail')
            }

        }
    }
    //初始化请求，参数为:method,url,async(异步状态下才是AJAX),user,password(后三个参数一般默认)
    request.open('GET', '/ada')
    request.send()
})
```
![](https://upload-images.jianshu.io/upload_images/7094266-4f376b146466e10d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

---
## 同源政策
同源政策规定，AJAX请求只能发给同源的网址，否则就报错。
同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。
文章开头提到的 form 和 a 等发送请求是没有同源政策的，而AJAX是可以读取响应内容的。
**因此只有 协议+端口+域名 一模一样（同源）才允许发 AJAX 请求**
---
## 如何规避同源政策？跨域
有关JSONP跨域在文章开头提供我的博客举过例子
这次我们用 **CORS 跨域**
什么是 CORS:**Cross-Origin Resource Sharing(跨域资源共享)**
---
同样用[理解JSONP 下](https://www.jianshu.com/p/38a72bd0e37d)博客中创建过的网站来举例子
首先打开服务器端口![](https://upload-images.jianshu.io/upload_images/7094266-49fcd7432b2c7d59.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
把请求路径改为
```
request.open('GET', 'http://jack.com:8002/ada')
```
![](https://upload-images.jianshu.io/upload_images/7094266-706af4f9ecdace99.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
点击点我![](https://upload-images.jianshu.io/upload_images/7094266-7a4b7e5d44756b7e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)报错了，因为不是同源，响应完成却得不到任何内容

**解决方法，在Node代码中加入一句**
```
//允许 http://ada.com:8001 访问我
response.setHeader('Access-Control-Allow-Origin','http://ada.com:8001')
```
点击点我，即可向 ada.com:8001 发送请求并返回 jack.com:8002/ada 的响应内容![](https://upload-images.jianshu.io/upload_images/7094266-1797c104e4b05d76.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
这就是用CORS实现AJAX跨域的过程

完整代码详见 [github](https://github.com/Adashuai5/node-demo/tree/master/AJAX-demo)

---
本文仅供个人学习使用


