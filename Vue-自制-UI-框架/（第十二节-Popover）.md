气泡卡片
#两种方式
![](https://upload-images.jianshu.io/upload_images/7094266-d5ec65d7b51644e9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们选用上面一种：当用户写出这样的代码，我们做到页面有一个按钮，点击出现 content 部分

设置 inline-block 不让 button 占一行
```
.popover {
    display: inline-block;
}
```
#思路
slot 无法加 class 和监听等
```
<template>
    <div class="popover" @click="xxx">
        <div class="content-wrapper" v-if="visible">
            <slot name="content"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "WheelsPopover",
        data() {
            return {visible: false}
        },
        methods: {
            xxx() {
                this.visible = !this.visible
            }
        }
    }
</script>

<style scoped lang="scss">
    .popover {
        display: inline-block;
        position: relative;
        vertical-align: top;
        .content-wrapper {
            position: absolute;
            bottom: 100%;
            left: 0;
            border: 1px solid #ddd;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.75);
        }
    }
</style>
```
##点击其他地方应该关闭
**1. 监听 body**
```
xxx() {
    this.visible = !this.visible
    console.log('切换 visible');
    if (this.visible = true) {
        document.body.addEventListener('click', () => {
            this.visible = false
            console.log('点击body关闭popover');
        })
    }
}
```
**问题：事件冒泡机制，点击 button 没 popover**

![](https://upload-images.jianshu.io/upload_images/7094266-1ae2905550d02cdd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**2. 加上异步，同时改监听body为监听document本身**
```
xxx() {
    this.visible = !this.visible
    console.log('切换 visible');
    if (this.visible === true) {
        this.$nextTick(() => {
            document.addEventListener('click', () => {
                this.visible = false
                console.log('点击body关闭popover');
            })
        })
    }
}
```
**问题：每次点击都在 document 上监听却没关闭**

![](https://upload-images.jianshu.io/upload_images/7094266-c6d35d8ebc49a2bf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**3. 使用完立即移除监听器**
但是 removeEventListener 需要知道监听器名字，因此把箭头函数改成 function x()，但是此时需要 bind(this) 避免this与函数外不一致
```
document.addEventListener('click', function x() {
  this.visible = false
  console.log('点击body关闭popover');
  document.removeEventListener('click',x)
  console.log('点击删除监听器');
}.bind(this))
```
**问题：popover 只出现一次**
```
if (this.visible === true) {
    this.$nextTick(() => {
        console.log('新增 document click 监听器');
        document.addEventListener('click', function x() {
            this.visible = false
            console.log('点击body关闭popover');
            document.removeEventListener('click',x)
            console.log('点击删除监听器');
        }.bind(this))
    })
}
```
'新增 document click 监听器' 在删除后
![](https://upload-images.jianshu.io/upload_images/7094266-911d7dcf57ac3311.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**由于我们 bind(this) 了，被删除的监听器是 x，未正确删除 bind(this) 后的函数**
**4. 另一种给移除监听器方式（不要bind）**
```
if (this.visible === true) {
    this.$nextTick(() => {
        console.log('新增 document click 监听器');
        let eventHandler = () => {
            this.visible = false
            console.log('点击body关闭popover');
            document.removeEventListener('click', eventHandler)
            console.log('点击删除监听器');
        }
        document.addEventListener('click', eventHandler)
    })
}
```
**问题：1.点击 popover 不应该隐藏**
```
if (this.visible === true) {
    this.$nextTick(() => {
        let x = () => {
            this.visible = false
            console.log('document 隐藏 popover');
            document.removeEventListener('click', x)
        }
        document.addEventListener('click', x)
    })
}else {
    console.log('vm 隐藏 popover');
}
```
**2.由于冒泡，点击 button 关闭 popover 时会隐藏两次**

![](https://upload-images.jianshu.io/upload_images/7094266-23db87ed635911f6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**5. 阻止冒泡**
```
<div class="popover" @click.stop="xxx">
    <div class="content-wrapper" v-if="visible" @click.stop>
```
第一个 @click.stop 是阻止组件冒泡，解决问题2；第二个 @click.stop 是阻止 popover 冒泡，解决问题1

![](https://upload-images.jianshu.io/upload_images/7094266-64ca6fe547a22f6a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#三个问题
##1. overflow:hidden
如果用户在 w-popover 外层使用了 overflow:hidden，就会出现如下 bug

![](https://upload-images.jianshu.io/upload_images/7094266-475efdeb1b71f753.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**解决方法：将 contentWrapper 直接加到 body 里**

![](https://upload-images.jianshu.io/upload_images/7094266-4c970d1f5be09542.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**1.v-if 和 v-show 的区别**
v-show 只改变样式，v-if 会影响元素是否存在着在 DOM树

**将contentWrapper 加到 body，这样做只影响元素位置，不影响其功能**
```
document.body.appendChild(this.$refs.contentWrapper)
```
![](https://upload-images.jianshu.io/upload_images/7094266-7cb6619f6259c443.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

v-show 会将元素显示在页面（只是变成 display:none），这样不好，还是用 v-if，我们在用户点击时再将元素 appendChild 到 body

**2.slot 不能加 ref，外面包个span**
```
<span ref="triggerWrapper">
    <slot></slot>
</span>
```
**3.添加四行代码**
```
if (this.visible === true) {
    this.$nextTick(() => {
        document.body.appendChild(this.$refs.contentWrapper)
        let {top, left, right, bottom} = this.$refs.triggerWrapper.getBoundingClientRect()
        this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
        this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
        let x = () => {
            this.visible = false
            console.log('document 隐藏 popover');
            document.removeEventListener('click', x)
        }
        document.addEventListener('click', x)
    })
}
```
**为何加 window.scroll，防止在组件前有 div 将 button 顶出 window 等的情况，页面高度就应该是 getBoundingClientRect() + window.scroll**

![](https://upload-images.jianshu.io/upload_images/7094266-81eec92baaee19fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**4.CSS作用域**
我们将 content-wrapper 移出了 popover，其就不应该CSS就不应该包裹在popover内部

![](https://upload-images.jianshu.io/upload_images/7094266-0075d5f1e5e3f3c5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
##2. @click.stop
**@click.stop 虽然能够成功阻止当前冒泡，但是同时也将其他可添加的冒泡事件阻止的，这是一个非常不好的行为**
**用判断 e.target 替代 @click.stop**
```
methods: {
  onClick(event) {
    if (this.$refs.triggerWrapper.contains(event.target)) {
      this.visible = !this.visible
      if (this.visible === true) {
        this.$nextTick(() => {
          document.body.appendChild(this.$refs.contentWrapper)
          let {top, left, right, bottom} = this.$refs.triggerWrapper.getBoundingClientRect()
          this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
          this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
          let x = (e) => {
          if(this.$refs.contentWrapper.contains(e.target)){ return }
          else{
           this.visible = false
           document.removeEventListener('click', x)
          }
         }
         document.addEventListener('click', x)
        })
      }
    }
  }
}
```
重构上面代码
```
methods: {
    positionConetent() {
        document.body.appendChild(this.$refs.contentWrapper)
        let {top, left, right, bottom} = this.$refs.triggerWrapper.getBoundingClientRect()
        this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
        this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
    },
    listenToDocument() {
        let eventHandler = (e) => {
            if (this.$refs.contentWrapper && this.$refs.contentWrapper.contains(e.target)) {
                return
            } else {
                this.visible = false
                document.removeEventListener('click', eventHandler)
            }
        }
        document.addEventListener('click', eventHandler)
    },
    onShow() {
        this.positionConetent()
        this.listenToDocument()
    },
    onClick(event) {
        if (this.$refs.triggerWrapper.contains(event.target)) {
            this.visible = !this.visible
            if (this.visible === true) {
                this.$nextTick(() => {
                    this.onShow()
                })
            }
        }
    }
}
```
打 log 发现，点 button 会关闭两次，冒泡未解决

![](https://upload-images.jianshu.io/upload_images/7094266-6e5c00c6ab85f59e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

解决办法：让 popover 自己判断，即 popover 上加一个 ref
```
<div class="popover" @click="onClick" ref="popover"></div>

if (this.$refs.popover &&
    (this.$refs.popover === e.target || this.$refs.popover.contains(e.target))
) { return }
// 因为我们自己把 contentWrapper 放 popover 外面，所以要单独判断一次
if (this.$refs.contentWrapper &&
    (this.$refs.contentWrapper === e.target || this.$refs.popover.contentWrapper(e.target))
) { return }
else {}
```
新问题：忘记取消监听 document

![](https://upload-images.jianshu.io/upload_images/7094266-2a34e06b77917b6a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**高内聚：将重要代码聚在一起，不要分散开**

![](https://upload-images.jianshu.io/upload_images/7094266-bb6e224840502320.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

神奇的 Vue，当我们监听 document 时，this应该是 document，而在 Vue 里面不是

![](https://upload-images.jianshu.io/upload_images/7094266-e4ff78b636510b1b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
methods: {
    positionConetent() {
        document.body.appendChild(this.$refs.contentWrapper)
        let {top, left, right, bottom} = this.$refs.triggerWrapper.getBoundingClientRect()
        this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
        this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
    },
    onClickDocument(e) {
        if (this.$refs.popover &&
            (this.$refs.popover === e.target || this.$refs.popover.contains(e.target))
        ) { return }
        this.close()
    },
    close() {
        this.visible = false
        document.removeEventListener('click', this.onClickDocument)
    },
    open() {
        this.visible = true
        this.$nextTick(() => {
            this.positionConetent()
            document.addEventListener('click', this.onClickDocument)
        })
    },
    onClick(event) {
        if (this.$refs.triggerWrapper.contains(event.target)) {
            if (this.visible === true) {
                this.close()
            } else {
                this.open()
            }
        }
    }
}
```
#总结思路
![](https://upload-images.jianshu.io/upload_images/7094266-1ba7b8e3268bc532.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#CSS
```
.content-wrapper {
        position: absolute;
        transform: translateY(-100%);
        border: 1px solid $border-color;
        border-radius: $border-radius;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
        margin-top: -10px;
        padding: .5em 1em;
        max-width: 20em; // 防止内容过多不好看
        word-break: break-all; // 防止英文单词过长不换行（国内向）
        // 如何生成 三角
        &::before, &::after {
            content: '';
            display: block;
            position: absolute;
            border: 10px solid transparent;
            width: 0;
            height: 0;
            left: 10px;
        }
        &::before { border-top: 10px solid $border-color;
            top: 100%;
        }
        &::after { border-top: 10px solid #fff;
            top: calc(100% - 1px);
        }
    }
```
![](https://upload-images.jianshu.io/upload_images/7094266-5b022d94b85f97cb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

三角没有 shadow，用 drop-shadow 但是 filter 兼容性差一些
```
filter: drop-Shadow(0 1px 1px rgba(0, 0, 0, 0.5));
background: #fff;
```
同时要设置 background，不然如下

![image.png](https://upload-images.jianshu.io/upload_images/7094266-3115575f34e5c3ad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#四个方向的 popover
用表驱动编程优化下面代码

![](https://upload-images.jianshu.io/upload_images/7094266-0e1b21a0c18a2a92.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/7094266-e7d116e96512e3a6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**slot 本身可以传 HTML，因此我们的组件可以实现在 popover 浮层添加链接、按钮等**

**如何在popover浮层里添加关闭事件**

![](https://upload-images.jianshu.io/upload_images/7094266-86a7b05e8e906f5d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

使用 [slot-scope](https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD)：暴露组件内部给插槽使用

```
<slot name="content" :close="close"></slot>
```
![使用方法](https://upload-images.jianshu.io/upload_images/7094266-7510042ca4fa1fe3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#测试
**两个 ref：vm.\$refs.el.$refs**
```
describe('Popover', () => {
    it('存在.', () => {
        expect(Popover).to.exist
    })
    it('可以设置position.', (done) => {
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
        <w-popover position="left" ref="el">
            <template slot="content">
                内容
            </template>
            <button>点我</button>
        </w-popover>
        `
        const vm = new Vue({
            el: div
        })
        vm.$el.querySelector('button').click()
        vm.$nextTick(() => {
            const {contentWrapper} = vm.$refs.el.$refs
            expect(contentWrapper.classList.contains('position-left')).to.be.true
            done()
            vm.$el.remove()
            vm.$destroy()
        })
    })
})
```
测试 trigger 失败
自定义事件的可用性 [dispatchEvent](https://jsbin.com/bifoyinale/edit?html,js,output)
自定义事件是可行的，但是
