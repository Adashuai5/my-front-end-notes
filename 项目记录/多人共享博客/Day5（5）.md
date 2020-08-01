##登录和注册
两者相似
**以登录 login 为例**

./pages/Login/template.vue 代码
```
<template>
  <div id="login">
    <h4>用户名</h4>
    <!-- 这里未用UI组件，input 样式在 common.less 里新增 -->
    <input v-model="username" placeholder="用户名">
    <h4>密码</h4>
    <input v-model="password" type="password" placeholder="密码" @keyup.enter="onLogin"> <!-- 回车登录 -->
    <el-button size="medium" @click="onLogin">立即登录</el-button>
    <p class="notice">没有帐号？<router-link to="/register">注册新用户</router-link></p>
  </div>
</template>

<script src="./template.js"></script>

<style src="./template.less" lang="less"></style>
```
**./pages/Login/template.js 代码**
看似简单的步骤，事实上 vuex 以及帮我们做了很多
```
import { mapActions } from 'vuex'
// 用户输入的用户名和密码
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    // 首先取到 Actions 里的 login
    ...mapActions(['login']),

    onLogin() {
      // 把用户输入的内容赋值给 login
      this.login({
          username: this.username,
          password: this.password
        })
        // 跳转路径
        .then(() => {
          this.$router.push({ path: '/' })
        })
    }
  }
}
```
**./pages/Login/template.less 代码**
```
@import url('../../assets/base.less');

// 布局同样用 grid
#login, #register {
  display: grid;
  justify-content: center;
  padding-top: 30px;
  
  h4 {
    margin: 10px 0 5px;
  }

  p {
    margin: 5px 0;
  }

  input {
    width: 400px;
  }

  button {
    margin-top: 30px;
    justify-self: start;
  }

  .notice {
    font-size: 12px;
    color: @textLighterColor;
    text-align: center;
    margin-top: 30px;

    a {
      color: @themeColor;
    }
  }
}
```
以及 common.less 新增 input 相关 less 属性
```
input {
    line-height: 40px;
    border: 1px solid #eaeaea;
    border-radius: 4px; 
    padding: 0 4px;
    outline: none;
}
input:focus {
    border-color: @themeLighterColor;
}
```
register 部分和 login 部分基本上是一致的，只是对应的路径和接口改成了 register
