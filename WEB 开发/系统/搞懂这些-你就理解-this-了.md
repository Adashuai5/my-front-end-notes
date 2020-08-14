新人推荐先看阮大大的书的：[相关章节](https://wangdoc.com/javascript/oop/this.html#%E6%B6%B5%E4%B9%89)
有关 this 的理解，方老师的这篇 [文章](https://zhuanlan.zhihu.com/p/23804247) 已经很完美了

**你应该已经知道并熟记 this 是 call 的第一个参数**
下面是一些 this 的特殊情况

```
// 例 1
button.onclick = function f1(){
    console.log(this) // 触发事件的元素。  button
}
```

1 结果：
f1.call(???)
this 是什么？去看 onclick 的源码呀 -> 做不到
MDN 的开发者知道 onclick 的源码
MDN 的开发者写了文档
看文档呀

```
// 例 2
button.addEventListener('click', function(){
    console.log(this) // 该元素的引用 button
}
```

2 结果：
去看 addEventListener 的源码呀 -> 做不到
MDN 的开发者知道 addEventListener 的源码
MDN 的开发者写了文档
看文档呀

```
// 例 3
$('ul').on('click', 'li' /*selector*/, function(){
    console.log(this) //this 则代表了与 selector 相匹配的元素。
    // li 元素
})
```

3 结果：
去看 on 的源码呀 -> 做不到
jQuery 的开发者知道 onclick 的源码
jQuery 的开发者写了文档
看文档呀

**特例：我可以传一个 this 给它**

```
button.onclick.call({name: 'ada'})
```

由于 this 是 call 的第一个参数
这样子 button.onclick 的 this 就变成了 {name:'ada'}

**终极例题**
理解下面例子，基本上 this 就明白得差不多了

```
function X(){
    return object = {
        name: 'object',
        options: null,
        f1(x){
            // 3 下面的 this ？不就是 f1.call()的 this，就是 2 里面的 this：object
            this.options = x // 4 这里 x 是 options
            this.f2() // 5 this.f2.call() 显然这里 this 也是 object
        },
        f2(){
            this.options.f2.call(this) // 6 这句代码4告诉我们是 options.f2.call(this) 我们把 this：object 传给了 options （特例）
        }
    }
}

var options = {
    name: 'options',
    f1(){},
    f2(){
        console.log(this) // 问 this 是啥 ? // 7  传过来的 object 啊
    }
}

var x = X() // 1 这里的 x 是啥？X() return 的 object
x.f1(options) // 2 x.f1.call(x,options) 显然这里 this 就是 x === object
```

问题：上面代码打印的 this 是什么？
正确答案：object ，思路已经在注释里，按数字顺序理解

---

参考：
[你怎么还没搞懂 this？](https://zhuanlan.zhihu.com/p/25991271)
