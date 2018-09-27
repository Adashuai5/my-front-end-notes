#什么是[MVC](http://www.ruanyifeng.com/blog/2007/11/mvc.html)![](https://upload-images.jianshu.io/upload_images/7094266-bd2a358032410034.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
视图（View）：用户界面。
控制器（Controller）：业务逻辑
模型（Model）：数据保存
![](https://upload-images.jianshu.io/upload_images/7094266-6f849f9b1d7762be.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
View 传送指令到 Controller
Controller 完成业务逻辑后，要求 Model 改变状态
Model 将新的数据发送到 View，用户得到反馈
#那么怎么做呢

**1.模块化你的js代码**
将同一模块的js代码放在同一个文件夹里并正确命名，用立即执行函数[相关博客](https://www.jianshu.com/p/d880bacbc0e9)封装代码，防止出现全局变量
```
<!-- 模块化 -->
    <script src="./js/init-swiper.js"></script>
    <script src="./js/auto-slide-up.js"></script>
    <script src="./js/sticky-topbar.js"></script>
    <script src="./js/smoothly-navigation.js"></script>
```
**2.设置 V 和 C**

2.1.首先简单区分出 V 和 C
找到 js 模块对应的 html 模块，即是 view
view 的作用是告诉js哪一部分是对应模块的 view
以轮播模块为例
```
<!-- 这就是 view ，用户可以看到 -->
<div id="mySlides">
    <!-- Slider main container -->
    <div class="swiper-container">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
            <!-- Slides -->
            <img src="./img/works/nav-page.jpg" class="swiper-slide">
            <img src="./img/works/canvas.jpg" class="swiper-slide">
            <img src="./img/works/apple-style-slides.jpg" class="swiper-slide">
        </div>
        <!-- If we need pagination -->
        <div class="swiper-pagination"></div>
    </div>
    <!-- If we need navigation buttons -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
</div>
```
2.1.1.在 js 中声明一个 view 作为 js 模块的 view，如轮播模块的 view 为 #mySlides
2.1.2.声明一个 controller 他是 view 的函数
```
!function(){
    var view = document.querySelector('#mySlides')
    var controller = function(view){
        var mySwiper = new Swiper(view.querySelector('.swiper-container'), {
            loop: true,
            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
            },
        
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        })
    }
    controller(view)
}.call()
```
2.2.再简化一下
用另一个模块 topNavBar 举例（可以看到每个模块结构是一致的）
```
! function () {
    var view = document.querySelector('#topNavBar')
    //把 controller 变成对象
    var controller = {
        //把函数放到 init 里（init 即是初始化）
        init: function (view) {
            window.addEventListener('scroll', function (x) {
                if (window.scrollY > 0) {
                    topNavBar.classList.add('sticky')
                } else {
                    topNavBar.classList.remove('sticky')
                }
            })
        }
    }
    //此时 controller(view) 就变成了 controller.init(view)
    controller.init(view)
}.call()
```
下面是关键
```
! function () {
    var view = document.querySelector('#topNavBar')
    var controller = {
        //开始 controller 有个空的 view     
        view: null,
        //有个初始化函数
        init: function (view) {
            //把 view 存到 controller 的 view 里
            this.view = view
            //下面代码 this.bindEvents.call(this)
            this.bindEvents()
        },
        //绑定事件
        bindEvents: function () {
            //所以这里的 this 就是上面的 this
            //上面的 this 就等于 controller.init(view)
            //controller.init(view) 的 this 就是 controller
            var view = this.view
            window.addEventListener('scroll', function (x) {
                if (window.scrollY > 0) {
                    topNavBar.classList.add('sticky')
                } else {
                    topNavBar.classList.remove('sticky')
                }
            })
        }
    }
    //下面代码等价于controller.init.call(controller,view) 即 this 就是controller
    controller.init(view)
}.call()
```
controller 有个 view，有个初始化函数，并可以绑定事件
下面优化绑定事件函数内部代码，让其只起绑定事件的作用
```
window.addEventListener('scroll', function (x) {
    if (window.scrollY > 0) {
        topNavBar.classList.add('sticky')
    } else {
        topNavBar.classList.remove('sticky')
    }
})
```
由于 addEventListener 里面的 this 代表用户触发的元素
但是我们希望 this 与原来一致
**解决方法一：用 bind()**
```
window.addEventListener('scroll', function (x) {
    if (window.scrollY > 0) {
        topNavBar.classList.add('sticky')
    } else {
        topNavBar.classList.remove('sticky')
    }
}).bind(this)
```
**解决方法二：**
用箭头函数，由于箭头函数没有 this ，所以当我们在其内部使用 this 默认就是外部的 this。
**可以说箭头函数内外 this 不变，我们的目的就是让函数内外 this 不变**

然后将 addClass 和 remove Class 事件也用各自的函数分隔开，同样用 this 和 view 串起来
完整代码
```
! function () {
    var view = document.querySelector('#topNavBar')
    var controller = {
        view: null,
        init: function (view) {
            this.view = view
            this.bindEvents()
        },
        bindEvents: function () {
            var view = this.view
            window.addEventListener('scroll', (x) =>{
                if (window.scrollY > 0) {
                    this.active()
                } else {
                    this.deactive()
                }
            })
        },
        active:function(){
            this.view.classList.add('sticky')
        },
        deactive:function(){
            this.view.classList.remove('sticky')
        }
    }
    controller.init(view)
}.call()
```
轮播完整代码
```
! function () {
    var view = document.querySelector('#mySlides')
    var controller = {
        view: null,
        swiper: null,
        swiperOptions: {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        },
        init: function (view) {
            this.view = view
            this.initSwiper()
        },
        initSwiper: function () {
            this.swiper = new Swiper(
                this.view.querySelector('.swiper-container'), 
                this.swiperOptions
            )
        },
    }
    controller.init(view)
}.call()
```
smoothly-navigation.js 模块代码
```
! function () {
    var view = document.querySelector('nav.menu')
    var controller = {
        view: null,
        aTags: null,
        init: function (view) {
            this.view = view
            this.initAnimation()
            this.bindEvents()
        },
        initAnimation: function () {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
        },
        scrollToElement: function (element) {
            let top = element.offsetTop
            let currentTop = window.scrollY
            let targetTop = top - 80
            let s = targetTop - currentTop //路程
            var coords = {
                y: currentTop
            }; //起始位置
            var t = Math.abs(s / 100) * 300;
            if (t > 500) {
                t = 500
            } //时间
            var tween = new TWEEN.Tween(coords) //起始位置
                .to({
                    y: targetTop
                }, t) //结束位置和时间
                .easing(TWEEN.Easing.Quadratic.InOut) //缓动类型
                .onUpdate(function () {
                    //coords.y 已经变了
                    window.scrollTo(0, coords.y) //如何更新界面
                })
                .start(); //开始缓动
        },
        bindEvents: function () {
            let aTags = this.view.querySelectorAll('nav.menu > ul > li > a')
            for (let i = 0; i < aTags.length; i++) {
                aTags[i].onclick = (x) =>{
                    x.preventDefault()
                    let a = x.currentTarget
                    let href = a.getAttribute('href') //'#siteAbout'
                    let element = document.querySelector(href)
                    this.scrollToElement(element)
                }
            }
        }
    }
    controller.init(view)
}.call()
```
#总结
所有模块结构：
**在立即执行函数内部**
**有个 view** 
**有个 controller**
**controller 操作 view**
将复杂的代码模块化，然后通过对象 controller 将 view 的函数通过 this 串起来，使得每一个 view 的函数都可以被 controller 操控

**后续：MVC 的 M：[做一个简单的留言——leancloud数据库](https://www.jianshu.com/p/039f910539d8)**

---
本文仅供个人学习使用

