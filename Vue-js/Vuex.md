一般放在 state 文件夹下

![](https://upload-images.jianshu.io/upload_images/7094266-c1e2d56805eff7e7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### vuex 状态管理的流程

view———­>actions———–>mutations—–>state————­>view

##### state：记录所有公共数据状态的对象

```
// 组件如何获取
this.$store.state.XXX
// 此处的XXX是你在state内定义的数据状态的键名
```

##### mutations：包含所有 操作数据状态的方法 的对象

```
// 组件如何调用
this.$store.commit(XXX)
// 此处的XXX是你在mutations中定义的方法名
```

##### actions：用于操作 mutations 内方法 的对象

actions 提交的是 mutation,而不是直接变更状态 actions 可以包含异步操作，但是 mutation 只能包含同步操作

```
// 如何调用
this.$store.dispatch(XXX)
// 此处的XXX是你在actions中定义的方法名
```

##### getters：定义状态内容的方法 的对象

```
this.$store.getters.XXX
// 此处的XXX是你在getters里定义的方法名
```

##### Module：当应用较大时，store 将变得臃肿，Vuex 允许我们将 store 分割成模块（module）。

每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割

```
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
