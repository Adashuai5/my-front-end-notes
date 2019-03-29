**DOM：（xml）Document Object Model **文档对象模型**

**在没有 DOM 之前，JavaScript 想要操作页面（文档）内的元素比较麻烦，于是有了 DOM 把文档变成对象的模型，可以通过操作这些模型，直接操作元素，而不需要经过麻烦的遍历等基本操作，是 js 提供的 API 。** 

**DOM 是一棵树（tree）** 

**树上有 Node（节点）**

Node 分为 Document（html）、Element（元素）和 Text（文本），以及其他不重要的。

![](https://upload-images.jianshu.io/upload_images/7094266-0132f3815ce661ff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# Node 的接口

**1.属性**

childNodes,firstChild,**innerText**,lastChild,**nextSibling**,nodeName,**nodeType**,nodeValue,outerText,ownerDocument,parentElement,parentNode,previousSibling,**textContent**

nodeName 返回大写，特殊情况是 svg ，返回小写

![](https://upload-images.jianshu.io/upload_images/7094266-774a9ffdb248a081.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

nodeType

![](https://upload-images.jianshu.io/upload_images/7094266-8ea68ba957a71742.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

其中 DocumentFragment 是最重要的，面试会问 DocumentFragment 优化

innerText 和 textContent 效果一样 都是获取文本，区别可以看MDN

**nextSibling：**在两个标签之间（即一个元素的闭合标签之后，下一个元素的起始标签之前）有空白出现时，会有**#text **节点（表示回车）被插入到 DOM 中。

* * *

**2.方法（如果一个属性是函数，那么这个属性就也叫做方法；换言之，方法是函数属性）**

appendChild()

**cloneNode()**

var 深拷贝=node.cloneNode(deep);

无deep 即默认为浅浅拷贝

![image](https://upload-images.jianshu.io/upload_images/7094266-7a5cce7277901800.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

contains()

![](https://upload-images.jianshu.io/upload_images/7094266-de6b1566583eb909.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

hasChildNodes()

insertBefore()

**isEqualNode()**

**相等**

**isSameNode()**

**同一个**

removeChild()

replaceChild()

**normalize() // 常规化**

搞清楚英文单词的意思就知道用法

如果发现知道英文后依然不明白用法，看 MDN 的例子即可，如 [normalize](https://developer.mozilla.org/en-US/docs/Web/API/Node/normalize)

DOM APi 无外乎「增删改查」

* * *

# Document 接口

referrer

![](https://upload-images.jianshu.io/upload_images/7094266-31e92bd294dc10a1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
