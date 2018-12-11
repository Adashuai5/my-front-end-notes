# 一
[Vue全覆盖笔记](https://xiedaimala.com/tasks/e7d37034-39a9-4652-a011-c53bdbac2b9f/text_tutorials/d34d6f7f-b390-45ca-a7b2-b49a368be31a)
## Vue.js 特性：
1.轻量级
2.双向数据绑定
3.指令
4.组件化
# MVVM
MVC=>MVP=>MVVM
视图层和数据层的双向绑定
**View<=>ViewModel<=>Model**
##1. 请简述MVVM
参考答案：
1. MVVM是Model-View-ViewModel的缩写。MVVM是一种设计思想。Model 层代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑；View 代表UI 组件，它负责将数据模型转化成UI 展现出来，ViewModel 是一个同步View 和 Model的对象。

2. 在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，Model 和 ViewModel 之间的交互是双向的， 因此View 数据的变化会同步到Model中，而Model 数据的变化也会立即反应到View 上。

3. ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。
##2. 请简述Vue.js的优点
参考答案：
1. 低耦合。视图（View）可以独立于Model变化和修改，一个ViewModel可以绑定到不同的"View"上，当View变化的时候Model可以不变，当Model变化的时候View也可以不变。
2. 可重用性。你可以把一些视图逻辑放在一个ViewModel里面，让很多view重用这段视图逻辑。
3. 独立开发。开发人员可以专注于业务逻辑和数据的开发（ViewModel），设计人员可以专注于页面设计。
4. 可测试。界面素来是比较难于测试的，而现在测试可以针对ViewModel来写
5. 易用灵活高效

我的： 
- 渐进式、轻量级，对于简单的项目可以又好又快的开发，同时如果项目复杂度提升，可以有相应的周边库如Vuex vue-rounter 提供渐进式的开发环境。
- 支持双向数据绑定，无需调用难用的DOM，使得开发变得简单便捷，让我们能够将更多精力放在数据和业务逻辑上，同时内置虚拟DOM，有效改善 DOM 重复渲染的效率低问题。
文档及周边完善，易上手，同时技术强大。
---
# 二
访问 Vue 实例属性 --- app.$el
访问 data 属性 --- app.属性名
# 谈谈你对组件的理解

参考答案：
组件 (Component) 是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素，Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以表现为用 is 特性进行了扩展的原生 HTML 元素。所有的 Vue 组件同时也都是 Vue 的实例，所以可接受相同的选项对象 (除了一些根级特有的选项) 并提供相同的生命周期钩子。

**自定义指令**一章跳过了

---
# render函数
在render函数的方法中，参数必须是createElement，createElement的类型是function render函数的第一个参数可以是 String | Object | Function
