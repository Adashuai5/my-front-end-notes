## 静态页面

![](https://upload-images.jianshu.io/upload_images/7094266-7167a8b2bb66ea1f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

grid 布局技巧，下面三种写法等价

```
grid-row: 1; // Less 语法 代表第一行
grid-row: 1 / 2;   //  代表第一根横线到第二根横线之间
grid-row: 1 /span 1; // 代表
```

## [Vuex](https://vuex.vuejs.org/zh/guide/)

是一个为 Vue.js 开发的状态管理模式：采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。（便于不同组件之间的数据沟通）

#### 在 store (存储)内有下列核心概念

**State()：核心原始数据** 展示
**Getter：计算属性，根据所依赖的数据的变化计算自身变化** 存储
**Mutation(转变)：提交 mutation 才能改变存储状态**（devtools 会捕捉前一状态与后一状态的快照）
**Action：**Action 类似于 mutation，不同在于：
**Action 提交的是 mutation**，而不是直接变更状态。
Action 可以包含任意**异步操作**。
**Module：可以将将 store 分割**
![mapstate](https://upload-images.jianshu.io/upload_images/7094266-70f12af44765e745.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**安装 Vuex**

```
npm install --save vuex
```

#### 在 src 目录下 创建 store 文件夹，里面有![](https://upload-images.jianshu.io/upload_images/7094266-22ac1c10c66709b2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**./src/store/index.js**

```
import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import blog from './modules/blog'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        blog
    }
})
```

**记得在 main.js 里面引入 store**

```
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from './store' // here

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  el: '#app',
  router,
  store, // here
  components: { App },
  template: '<App/>'
})
```

使用 vuex 完善 auth.js

```
import auth from '@/api/auth'

const state = {
  user: null,
  isLogin: false
}
// 这里是个技巧，即并未改变数据，使用getters 只是为了数据传出
const getters = {
  user: state => state.user,
  isLogin: state => state.isLogin
}

const mutations = {
  setUser(state, played) {
    state.user = played.user
  },

  setLogin(state, played) {
    state.isLogin = played.isLogin
  }
}

const actions = {
  login({ commit }, { username, password }) {
    return auth.login({ username, password })
      .then(res => {
      commit('setUser', { user: res.data })
      commit('setLogin', { isLogin: true })
    })
  },
  // ES6语法：async 是 promise 的改进，可以理解为另一种写法
  async register({ commit }, { username, password }) {
    let res = await auth.register({ username, password })
    commit('setUser', { user: res.data })
    commit('setLogin', { isLogin: true })
    return res.data
  },

  async logout({ commit, state }) {
    await auth.logout()
    commit('setUser', { user: null })
    commit('setLogin', { isLogin: false })
  },

  async checkLogin({ commit, state }) {
    if (state.isLogin) return true
    let res = await auth.getInfo()
    commit('setLogin', { isLogin: res.isLogin })
    if (!res.isLogin) return false
    commit('setUser', { user: res.data })
    return true
  }
}

export default ({
  state,
  getters,
  mutations,
  actions
})
```

**./src/components/header.vue 添加代码** 1.添加 vuex ： auth.js 中组件 2.头像登录个性化，并添加下拉菜单：我的 和 注销（跳转） 3.添加 登录页面 和 注册页面 按钮跳转（链接包裹按钮）

```
<template>
  <header :class="{login: isLogin, 'no-login': !isLogin}">
    <template v-if="!isLogin">
      <h1>Let's share</h1>
      <p>精品博客汇聚</p>
      <div class="btns">
        <router-link to="login"><el-button >立即登录</el-button></router-link>
        <router-link to="register"><el-button>注册账号</el-button></router-link>
      </div>
    </template>
    <template v-if="isLogin">
      <h1>Let's share</h1>
      <i class="edit el-icon-edit"></i>
      <div class="user">
        <img class="avatar" :src="user.avatar" :alt="user.username" :title="user.username">
        <ul>
          <li><router-link to="my">我的</router-link></li>
          <li><a href="#" @click="onLogout">注销</a></li>
        </ul>
      </div>
    </template>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

// 测试
// import auth from "@/api/auth";
// window.auth = auth;

export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["isLogin", "user"])
  },

  created() {
    this.checkLogin();
  },

  methods: {
    ...mapActions([
      "checkLogin",
      'logout'
      ]),

    onLogout() {
      this.logout()
    }
  }
};
</script>

<style lang="less">
```

```
@import "../assets/base.less";

header.no-login {
  padding: 0 12% 30px 12%;
  background: @bgColor;
  display: grid;
  justify-items: center;

  h1 {
    color: #fff;
    font-size: 40px;
    margin: 60px 0 0 0;
    text-transform: uppercase;
  }

  p {
    margin: 15px 0 0 0;
    color: #fff;
  }

  .btns {
    margin-top: 20px;
  }

  button {
    margin: 20px 50px 0;
  }
}

header.login {
  display: flex;
  align-items: center;
  background: @bgColor;

  h1 {
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 40px;
    text-transform: uppercase;
    flex: 1;
  }

  .edit {
    color: #fff;
    font-size: 30px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    border-radius: 50%;
    margin-left: 15px;
  }

  .user {
    position: relative;

    ul {
      display: none;
      position: absolute;
      right: 0;
      list-style: none;
      border: 1px solid #eaeaea;
      margin:0;
      padding: 0;
      background-color: #fff;

      a {
        text-decoration: none;
        color: #333;
        font-size: 12px;
        display: block;
        padding: 5px 10px;

        &:hover {
          background-color: #eaeaea;
        }
      }

    }

    &:hover ul {
      display: block;
    }
  }
}
</style>
```

测试效果![](https://upload-images.jianshu.io/upload_images/7094266-be8050e1169a69f3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
