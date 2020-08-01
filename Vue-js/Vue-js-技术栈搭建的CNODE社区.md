# 一

[Vue 全覆盖笔记](https://xiedaimala.com/tasks/e7d37034-39a9-4652-a011-c53bdbac2b9f/text_tutorials/d34d6f7f-b390-45ca-a7b2-b49a368be31a)

## Vue.js 特性：

1.轻量级 2.双向数据绑定 3.指令 4.组件化

# MVVM

MVC=>MVP=>MVVM
视图层和数据层的双向绑定
**View<=>ViewModel<=>Model**
##1. 请简述 MVVM
参考答案：

1. MVVM 是 Model-View-ViewModel 的缩写。MVVM 是一种设计思想。Model 层代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑；View 代表 UI 组件，它负责将数据模型转化成 UI 展现出来，ViewModel 是一个同步 View 和 Model 的对象。

2. 在 MVVM 架构下，View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互，Model 和 ViewModel 之间的交互是双向的， 因此 View 数据的变化会同步到 Model 中，而 Model 数据的变化也会立即反应到 View 上。

3. ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而 View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作 DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。
   ##2. 请简述 Vue.js 的优点
   参考答案：
4. 低耦合。视图（View）可以独立于 Model 变化和修改，一个 ViewModel 可以绑定到不同的"View"上，当 View 变化的时候 Model 可以不变，当 Model 变化的时候 View 也可以不变。
5. 可重用性。你可以把一些视图逻辑放在一个 ViewModel 里面，让很多 view 重用这段视图逻辑。
6. 独立开发。开发人员可以专注于业务逻辑和数据的开发（ViewModel），设计人员可以专注于页面设计。
7. 可测试。界面素来是比较难于测试的，而现在测试可以针对 ViewModel 来写
8. 易用灵活高效

我的：

- 渐进式、轻量级，对于简单的项目可以又好又快的开发，同时如果项目复杂度提升，可以有相应的周边库如 Vuex vue-rounter 提供渐进式的开发环境。
- 支持双向数据绑定，无需调用难用的 DOM，使得开发变得简单便捷，让我们能够将更多精力放在数据和业务逻辑上，同时内置虚拟 DOM，有效改善 DOM 重复渲染的效率低问题。
  文档及周边完善，易上手，同时技术强大。
