# Vue.js 3.0

将支持 [Proxy](http://es6.ruanyifeng.com/#docs/proxy)
[响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)
当你把一个普通的 JavaScript 对象传给 Vue 实例的  `data`  选项，Vue 将遍历此对象所有的属性，并使用  [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 
把这些属性全部转为  [getter/setter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects#%E5%AE%9A%E4%B9%89_getters_%E4%B8%8E_setters)。
Object.defineProperty 是 ES5 中一个无法 shim（垫片，可以说是向下兼容）的特性，这也就是为什么 Vue 不支持 IE8 以及更低版本浏览器。
每个组件实例都有相应的 watcher 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。
![](https://upload-images.jianshu.io/upload_images/7094266-9cde5ca9b816b4ec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

Vue 不能检测到对象属性的添加或删除。

```
var vm = new Vue({
  data:{
    a:1
  }
})

// `vm.a` 是响应的

vm.b = 2
// `vm.b` 是非响应的
```

Vue 不允许在已经创建的实例上动态添加新的根级响应式属性 (root-level reactive property)。然而它可以使用 `Vue.set(object, key, value)` 方法将响应属性添加到嵌套的对象上：

```
Vue.set(vm.someObject, 'b', 2)
// 全局 Vue.set 方法的别名: vm.$set 实例方法
this.$set(this.someObject,'b',2)
```

因此，在初始化实例前声明根级响应式属性十分必要，及时是空值

```
var vm = new Vue({
  data: {
    // 声明 message 为一个空值字符串
    message: ''
  },
  template: '<div>{{ message }}</div>'
})
// 之后设置 `message`
vm.message = 'Hello!'
```

## Object.defineProperty 缺点

1. Object.defineProperty 的第一个缺陷,无法监听数组变化
2. Object.defineProperty 的第二个缺陷,只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历，如果属性值也是对象那么需要深度遍历,显然能劫持一个完整的对象是更好的选择

**因此有了 proxy 来直接监听对象，并且可以直接监听数组变化**

## Proxy 的其他优势

1. Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的。
2. Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改。
3. Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利。

当然,Proxy 的劣势就是兼容性问题,而且无法用 polyfill 磨平,因此 Vue 的作者才声明需要等到下个大版本(3.0)才能用 Proxy 重写。

[面试官: 实现双向绑定 Proxy 比 defineproperty 优劣如何?](https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf#heading-15)
