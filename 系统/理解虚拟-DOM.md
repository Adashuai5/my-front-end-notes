#DOM 和 Virtual DOM
**DOM：Document Object Model 把文档变成对象的模型
在没有 DOM 之前，JavaScript 想要操作页面（文档）内的元素比较麻烦，于是有了 DOM API 把文档变成对象的模型，可以通过操作这些 API，直接操作元素，而不需要经过麻烦的遍历等基本操作。有了 DOM 写代码的人是舒服了（当然我们知道 DOM 也比较麻烦），但是事实上它的速度自然没有原生 js 的对象来得快。
问题：在需要操作大量页面元素的时候，每当发生更改，有什么办法能够快速生成新页面？
你可以很快想到用模版引擎重新渲染整个视图，而这样会产生很多问题，首要问题就是慢。DOM 内部含有大量数据结构，而我们有时只对其中一部分元素内容进行增删改查，但却需要对整个页面进行重复渲染。
方法：通过创建与 DOM 的数据结构映射的 Virtual DOM 虚拟数据结构，我们只操作虚拟数据结构，先比较虚拟 DOM 的异同，再将最终操作结果反应到 真实 DOM 中。
在整个过程中，DOM 只操作了一次，其他改变的操作，我们都通过操作虚拟 DOM：当页面元素需要发生变化，原本我们需要通过 DOM 操作，重新渲染页面，而现在，我们只需要操作虚拟 DOM ，由虚拟 DOM 对比之前操作，把页面变化部分反馈给 DOM，此时 DOM 只需要渲染变化的一部分，不用再次渲染整个页面，大大提高效率和性能。**

`
Virtual DOM 本质上就是在 JS 和 DOM 之间做了一个缓存。可以类比 CPU 和硬盘，既然硬盘这么慢，我们就在它们之间加个缓存：既然 DOM 这么慢，我们就在它们 JS 和 DOM 之间加个缓存。CPU（JS）只操作内存（Virtual DOM），最后的时候再把变更写入硬盘（DOM）
`

##过程实现

文档界面
```
<body>
    <div id="root"></div>
    <script src="./v-dom.js"></script>
</body>
```
```
// 定义一个 VNode 类
class VNode {
    constructor(tag, children, text) {
        this.tag = tag
        this.children = children
        this.text = text
    }

    render() { // render 方法，创建子元素
        if (this.tag === '#text') {
            return document.createTextNode(this.text)
        }
        let el = document.createElement(this.tag)
        this.children.forEach(vChild => {
            el.appendChild(vChild.render())
        })
        return el
    }
}
// v 构造函数，判断子元素类型
function v(tag, children, text) {
    if (typeof children === 'string') {
        text = children
        children = []
    }
    return new VNode(tag, children, text)
}
```

```
let vNode = v('div', [
    v('p', [
        v('span', [v('#text', 'Ada')])
    ]),
    v('span', [v('#text', 'shuai')])
])
const root = document.querySelector('#root')
root.appendChild(vNode.render())
```
通过上述代码，我们构建了一个简单的虚拟 DOM 树，可以通过它构建一个真正的 DOM 树，渲染到页面中
![](https://upload-images.jianshu.io/upload_images/7094266-762ab26eabd2e04e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**精髓：通过对比新旧虚拟 DOM 树，其原生对象判断页面增删改查了哪些部分，而后单独渲染差异部分。没有这个 patchElement 就失去了虚拟 DOM 的意义，和原始 DOM 效果无异了**
```
function patchElement(parent, newVNode, oldVNode, index = 0) {
    if (!oldVNode) {
        parent.appendChild(newVNode.render())
    } else if (!newVNode) {
        parent.removeChild(parent.childNodes[index])
    } else if (newVNode.tag !== oldVNode.tag || newVNode.text !== oldVNode.text) {
        parent.replaceChild(newVNode.render(), parent.childNodes[index])
    } else {
        for (let i = 0; i < newVNode.children.length || i < oldVNode.children.length; i++) {
            patchElement(parent.childNodes[index], newVNode.children[i], oldVNode.children[i], i)
        }
    }
}
```
当然，上述只是简单的算法判断逻辑，但是也能让我们理解其相应过程和原理。

整个状态变更的过程如下
```
// 1. 构建虚拟DOM
let vNode = v('div', [
    v('p', [
        v('span', [v('#text', 'Ada')])
    ]),
    v('span', [v('#text', 'shuai')])
])
// 3. 生成新的虚拟DOM
let vNode1 = v('div', [
    v('p', [
        v('span', [v('#text', 'Ada')])
    ]),
    v('span', [v('#text', 'shuai')]),
    v('p', [v('#text', 'upload')])
])
// 2. 通过虚拟DOM构建真正的DOM
const root = document.querySelector('#root')
patchElement(root, vNode)
var n = 0
// 4. 比较两次虚拟DOM树的不同，在真正的DOM元素上应用变更
document.querySelector('.btn').onclick = function () {
    if (n % 2 == 0) {
        patchElement(root, vNode1, vNode)
    } else {
        patchElement(root, vNode, vNode1)
    }
    n += 1
}
```

本文仅供个人学习使用

---
主要参考：[深度剖析：如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)
