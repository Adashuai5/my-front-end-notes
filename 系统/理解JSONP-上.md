#我们用node来做一个简易服务器理解JSONP，从而了解在没有Ajax的时代的前端是如何绞尽脑汁做好页面交互的
有关node搭建服务器的学习可以参考我的[另一篇博客](https://www.jianshu.com/p/ba728fb4edb4)
**node 服务器及页面完整代码 [参考](https://github.com/Adashuai5/node-demo/tree/master/JSONP-demo)**

**首先做一个简单的付款界面**
点击按钮数字减1（点击按钮金额每次减少1）
```
<h5>您的余额是
    <span id="amount">100</span>
</h5>
<button id="button">付款一块钱</button>
<script>
    button.addEventListener('click', (e) => {
        let n = amount.innerText
        let number = parseInt(n, 10)
        let newNumber = number - 1
        amount.innerText = newNumber
    })
</script>
```
Node代码：
```
if(path == '/'){
    var string = fs.readFileSync('./index.html','utf8')
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.write(string)
    response.end()
  }else{
    response.statusCode = 404
    response.end()
  }  
```
![](https://upload-images.jianshu.io/upload_images/7094266-a1ec91f18d1456c2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这种方法没有后台数据，刷新页面就恢复100
***数据库**是什么鬼
**只要能长久地存数据，就是数据库**
1.文件系统是一种数据库
2.MySQL 是一种数据库*

**那我们给它一个数据库来存储金额呗（命令行操作）**
```
//创建一个名为db的文件作为数据库
touch db
//用 vim 打开 db
vi db
//只写入100
i 100 :wq
```
用&&&amount&&&替代html里的100（这什么意思？没什么意思，不容易重复啊）这时前端就可以不管后端数据库里的具体内容了
```
<h5>您的余额是
    <span id="amount">&&&amount&&&</span>
</h5>
<button id="button">付款一块钱</button>
<form action="/pay" method="POST">
    <input type="text" name="number" value="1">
    <input type="submit" value="付款">
</form>
```
```
var string = fs.readFileSync('./index.html','utf8')
//引入db，赋值给变量amout，文件都是字符串类型，所以amount得到的是一个字符串
    var amount = fs.readFileSync('./db','utf8')
//将html里的那个占位符，替换为db里的内容
    string = string.replace('&&&amount&&&',amount)
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.write(string)
    response.end()
```
Node代码
```
//判断路径和post请求
if (path === '/pay' && method.toUpperCase() === 'POST') {
  //引入db这个文件
  var amount = fs.readFileSync('./db', 'utf8')
  //每提交一次db里面的数字就减去1
  var newAmount = amount - 1
  //模拟失败，如果产生的随机数大于0.5就成功
  if (Math.random() > 0.5) {
    //成功后将db文件里写入新的数值
    fs.writeFileSync('./db', newAmount)
    response.write('success')
  } else {
    response.write('fail')
  }
  response.end()
}
```
这种方法，由于有了后台数据库（db文件）就能每次得到的新的数值都会存在里面，即使页面刷新也不会变，缺点：需要返回上一个页面才能看到现在的数值
原因是：form表单提交后一定会刷新当前页面，并且会打开一个新的页面
###想要不刷新当前页面的方法：
**经典：用iframe**
```
<form action="/pay" method="POST" target="result">
    <input type="submit" value="付款">
</form>
<iframe name="result" src="about:blank" frameborder="0" height="200"></iframe>
```
这样做的好处是用户可以直接通过 iframe 看到是否付款成功，提升用户体验
![](https://upload-images.jianshu.io/upload_images/7094266-4bc794416aa7fcaf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**能不能不用iframe？**
1.用图片造 get 请求
```
<h5>您的余额是<span id="amount">&&&amount&&&</span></h5>
<button id="button">打钱</button>
<script>
button.addEventListener('click',(e)=>{
  let image = document.createElement('img')
  //指定路径
  image.src = '/pay'
  //image加载成功后执行
  image.onload= function(){
    alert('打钱成功')
    //Window.location.reload() 是刷新页面，更好的方法是直接减一
    amount.innerText = amount.innerText-1;
  }
  //image加载失败后执行
  image.onerror = function(){
    alert('打钱失败')
  }
})
</script>
```
Node代码:
```
//因为imgae只能是get请求，所以只需判断路径
if(path==='/pay'){
  var amount = fs.readFileSync('./db','utf8')
  var newAmount = amount-1
  if(Math.random()>0.5){
    fs.writeFileSync('./db',newAmount)
    response.setHeader('Content-Type','image/jpg')
    //返回图片，状态码 200 成功
    response.statusCode = 200
    //需要真的传一张图片才能成功
    response.write(fs.readFileSync('./dog.jpg'))
 }else{
    //状态码 400 页面显示失败
    response.statusCode = 400
    response.write('fail')
 }
 response.end()
}

```
点击打钱按钮，若随机数大于0.5，则状态码显示200.并且返回dog.jpg，alert 打钱成功，点击确定，余额自动减一且页面不刷新。
![](https://upload-images.jianshu.io/upload_images/7094266-8f026f51f1be16ab.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

缺点是这种办法不支持post请求，只能是get请求

2.用 script 造 get 请求
```
<h5>您的余额是
  <span id="amount">&&&amount&&&</span>
</h5>
<button id="button">打钱</button>
<script>
  button.addEventListener('click', (e) => {
    let script = document.createElement('script')
    script.src = '/pay'
    //一定要把script放入body中，才有效
    document.body.appendChild(script)
  // script.onload= function(){
  //   alert('打钱成功')
  //   amount.innerText = amount.innerText-1
  // }
  script.onerror = function () {
    alert('打钱失败')
  }
})
</script>
```
Node代码：
```
if (path === '/pay') {
    var amount = fs.readFileSync('./db', 'utf8')
    var newAmount = amount - 1
    if (Math.random() > 0.5) {
      fs.writeFileSync('./db', newAmount)
      response.setHeader('Content-Type','application/javascript')
      response.statusCode = 200
      //直接在 response 里 返回cuccess并且减一
      response.write(`alert("success")
      amount.innerText = amount.innerText-1`)
    } else {
      response.statusCode = 400
      response.write('fail')
    }
    response.end()
```
Script 请求需要放入页面中才有效，由于本身script会给页面添加效果，那何必用 onload ，直接在node端写代码。
这种技术叫做 **SRJ （Server rendered javascript）**：服务器返回 javascript ，AJAX出现前的无刷新更新页面内容的方案。
![](https://upload-images.jianshu.io/upload_images/7094266-b0040fe7c5d83bd7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)这样已经达到和第一种方法img一样的效果，而且不用返回图片
一直给页面添加Script也不好，如何去除？用下面方法无论成功还是失败，script标签均去掉
```
script.onload= function(e){
    e.currentTarget.remove()
  }
  script.onerror = function () {
    alert('打钱失败')
    e.currentTarget.remove()
  }
```
---
本文主要用于个人学习使用
[理解JSONP 下](https://www.jianshu.com/p/38a72bd0e37d)
