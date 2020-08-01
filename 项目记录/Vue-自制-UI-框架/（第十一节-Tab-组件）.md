# [UI](https://www.yuque.com/u29422/gulu/268970 "null")

# 用例

![](https://upload-images.jianshu.io/upload_images/7094266-e6ba52db101a0064.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 代码

### ant UI 结构

![](https://upload-images.jianshu.io/upload_images/7094266-9fa57146eb1a83cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

label 作为选择器，如果加 icon，用 template

![](https://upload-images.jianshu.io/upload_images/7094266-bb5b8c7bb8bca0f4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/7094266-2576ecea6e203dda.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 我们的结构

![](https://upload-images.jianshu.io/upload_images/7094266-383e4a67acc86b21.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/7094266-1f641d087988f2c0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**这样做的目的：有三层结构，可以便于独立更改 tab item 或 content 的背景样式**
同时我们规定用户需对对应的 item 和 content 传同一个 name，便于 selected 作为选择器选择

## 添加 tabs 相关组件及基本 props

### 1. [.sync](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)的使用

update:myPropName 的语法糖

```
<g-tabs :selected.sync="selectedTab"></g-tabs>
<g-tabs :selected="selectedTab" v-on:update:selected="selectedTab = $event"></g-tabs>
```

用于父组件可以监听那个事件并根据需要更新一个本地的数据属性

### 2. Vue 设定只有 class 和 :style 会默认合并属性，其他都是覆盖

## tabs 切换过程思路

![](https://upload-images.jianshu.io/upload_images/7094266-613a80e39b0d832f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 引入事件中心——用发布订阅模式

![](https://upload-images.jianshu.io/upload_images/7094266-98990d85f24f93d8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
通过 Vue 的[provide/inject](https://cn.vuejs.org/v2/api/#provide-inject)

结合 Vue 实例的全局调用功能，当然也可以直接用 this，但是这样会从 tabs 组件传到整个 app，所以我们 new Vue() 与 #app 区分开来

![](https://upload-images.jianshu.io/upload_images/7094266-6c6c874b69c8db5c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1. tabs 组件 provide

![tabs 组件](https://upload-images.jianshu.io/upload_images/7094266-059ce1e5b6d94f52.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2. 所有子组件和孙组件 inject

```
export default {
  name: "WheelsTabsXxx",
  inject: ['eventBus'],
  created(){
  }
}
```

3. \$emit 和 \$on

![](https://upload-images.jianshu.io/upload_images/7094266-01a59f28dbf6fb06.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 注意点

1. 要注意事件调用对象的不同，调用对象与监听对象一致
   调用 eventBus 时，监听的是 this.eventBus.\$emit 对象
   @update:selected 监听的是 this.\$emit 对象
2. Vue 的事件不会冒泡

## 如何 active

这里的 active 是 tabs 组件内部获取的，无需传值，因此 data 更好

![](https://upload-images.jianshu.io/upload_images/7094266-3add530b10dde416.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 引申

![](https://upload-images.jianshu.io/upload_images/7094266-be52f2eac91b3db6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 如何添加 bottom 高亮

```
export default {
    name: "WheelsTabs",
    ...
    mounted() {
        this.$children.forEach((vm) => {
            if (vm.$options.name === 'WheelsTabsHead') {
                vm.$children.forEach((item) => {
                    if (item.$options.name === 'WheelsTabsItem'
                        && item.name === this.selected) {
                        console.log(item.$el);
                        this.eventBus.$emit('update:selected', this.selected, item)
                    }
                })
            }
        })
    }
}
```

通过上述代码找到当前 selected item 的 div

![](https://upload-images.jianshu.io/upload_images/7094266-757002730ded1fd5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### left 和 tansform

left 会影响 CSS 渲染，transform 更好，推荐先使用 transform

![](https://upload-images.jianshu.io/upload_images/7094266-8b1170157b82ccbe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这里我们由 left 改成 transform 之后，由于 item 一开始 translate 为 0，会有进场动画（item 位置不是 0 时）
我们通过上面 v-if 的方法以及 \$nextTick 希望隐藏此 bug，但是未成功
因此改回 left（这里已经用了 width，所以改不改 left 问题不大了），放弃性能

## 优化样式，添加 disabled

## 测试

#### 1. 测试子组件存在且为 tabs-head 和 tabs-body

![](https://upload-images.jianshu.io/upload_images/7094266-bab0fa69493561de.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/7094266-406946d6faa1dd18.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

但是失败了，因为 mounted 里的 throw 是异步的报错，无法被捕捉，所以测试不出来
退而求其次，改成 warn

![](https://upload-images.jianshu.io/upload_images/7094266-f0b6d9a8373abe6a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/7094266-9c7de75d43834974.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 2.

```
it('接收 selected 属性.', (done) => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    div.innerHTML = `
    <g-tabs selected="sports">
        <g-tabs-head>
            <g-tabs-item name="woman"> 美女 </g-tabs-item>
            <g-tabs-item name="finance"> 财经 </g-tabs-item>
            <g-tabs-item name="sports"> 体育 </g-tabs-item>
        </g-tabs-head>
        <g-tabs-body>
            <g-tabs-pane name="woman"> 美女对应新闻 </g-tabs-pane>
            <g-tabs-pane name="sports"> 体育对应新闻 </g-tabs-pane>
            <g-tabs-pane name="finance"> 财经对应新闻 </g-tabs-pane>
        </g-tabs-body>
    </g-tabs>
    `
    const vm = new Vue({
        el: div
    })
    vm.$nextTick(() => {
        const x = vm.$el.querySelector('.tabs-item:nth-child(3)')
        expect(x.classList.contains('active')).to.be.true
        done()
    })
})
```

**编写可测试代码**：这里测试需要顺序

```
const x = vm.$el.querySelector('.tabs-item:nth-child(3)')
```

我们给 tabs-item 加一个 data-name

```
<div class="tabs-item" @click="onClick" :class="classes" :data-name="name">
```

#### 3. 测试 tabs-item

**防御性编程**

![](https://upload-images.jianshu.io/upload_images/7094266-42c87c9f885304d7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/7094266-099d288dcec1ff07.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**防御性编程 + 编写可测试代码**

![](https://upload-images.jianshu.io/upload_images/7094266-3513215c262ee2c0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/7094266-6e93239312341518.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 解决 active 的一个 bug

如果组件不在左上角，active 会有 bug，所以

![](https://upload-images.jianshu.io/upload_images/7094266-72833ab5d597124e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
