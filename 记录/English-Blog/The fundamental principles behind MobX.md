[原文](https://hackernoon.com/the-fundamental-principles-behind-mobx-7a725f71f3e8)

### Why MobX runs all derivations（派生） synchronously

Flux 模式精确处理了规模变大时的**可预测性**

MobX 模式采取了**可透明追踪反应式**的方式

MobX 做了什么（两个约束）：

1. 确保对于给定的 mutations，任何受影响的派生都只运行一次

所谓的 “双执行”。 确保如果一个派生值依赖于另一个派生值的时候，这些派生以正确的顺序进行，以杜绝其中任何一个偶然读取到过时的值

1. 保证派生是新鲜的，其效果对任何 observer 立即可见

引入了一种不同的调度派生的基础手段



现有多数 UI 库派生调度手段：脏标记。**对**于更新难以程序性的读取其数据的 **DOM 合适**；而**不适用**于对数据新鲜度要求较高的**反应式库**



MobX 的同步派生使得调试和回溯变得简单

### 事务 和 Actions

![](https://user-gold-cdn.xitu.io/2018/5/1/1631a6763b974a13?imageslim)

### 计算值 和 reactions

![](https://user-gold-cdn.xitu.io/2018/5/1/1631a66867254e37?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 蓝色为 Observable state，绿色为 computed values，红色为 reactions，浅绿色表示，如果计算值未被 reaction 观察（间接的），就会被延迟。MobX 确保在突变之后，每个派生只以最优的顺序执行一次

*Computed values 应该总是优于 reactions*

1. Computed values 应始终纯粹以其他 observable values 表示。从而得到一个清晰的计算派生图，而不是不清晰的互相触发的 reactions 链。

2. 换句话说，reaction 触发更多 reactions，或者 reactions 更新状态：在 MobX 中这些都被认为是反模式的。**链式 reactions** 将导致一个难以跟踪的事件链，应该**杜绝**。

3. 对于 Computed values，MobX 可以感知它们是否在某处被使用。这意味着其可以被**自动延迟并被垃圾回收**。这节省了大量的引用，并对性能有显著的积极影响。

4. Computed values 被强制执行为无副作用的。因此，MobX 就可以安全的对其执行先后重新排序，以保证重新运行次数的最小化。Computed values 若未被观察，就懒运行其计算。

5. **Computed values 会被自动缓存**。只要其相关的可观察属性不变，就不会重新运行计算。

   