##项目结构、组件样式

####项目结构
主要在 **router-view** 展示在app![](https://upload-images.jianshu.io/upload_images/7094266-5864bfe7a2d21451.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)相应路径引入各个页面的内容![](https://upload-images.jianshu.io/upload_images/7094266-5f7384989c572f13.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
由于我们每个页面的 header 和 footer 都是一致的，所以可以不必写在每个页面，直接写在 App.vue **即所有共同模版可以放在APP.vue上**
template 和 script 部分完整代码
```
<template>
  <div id="app">
     <!-- Header 和 Footer 不要用小写是为了与原生 html 区别开来 -->
    <Header id="header"></Header>
    <main id="main">
      <router-view/>
    </main>
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";

export default {
  name: "App",
  components: {
    // ES6 语法 相当于 Header：Header
    Header,
    Footer
  }
};
</script>
```
有关 CSS 部分我们用到[ grid 布局](https://zhuanlan.zhihu.com/p/33030746)
布局代码
```
<style lang="less">
// 让页面撑开
html,body,#app {
  height:100%;
}

#app {
  display: grid;
  grid-template-columns: 12% auto 12%;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    ". main ."
    "footer footer footer";
  
  #header {
    grid-area: header;
    padding-left: 12%;
    padding-right: 12%;
  }

  #main {
    grid-area: main;  
  }

  #footer {
    grid-area: footer;
    padding-left: 12%;
    padding-right: 12%;
  }
}
</style>
```
还可以加响应式，别忘记 html 里面要加 viewpoint
```
@media (max-width: 768px) {
  #app {
    grid-template-columns: 10px auto 10px;

    #header,
    #footer {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
}
```
####组件样式
**src 目录下的 assets 文件夹**
创建 bass.less 用来放置共同基础 less 样式
创建 common.less 用来放置共同底层 less 样式

**./assets/bass.less**
```
@themeColor:#ff3300;
@bgColor:#149739;
@textLighterColor:#999;
```
**./assets/common.less**
```
body {
    font:14px/1.6 Arial,"Microsoft YaHei","黑体","宋体",sans-serif;
    color: #333;
    margin: 0;
}

html,
body,
#app {
  height: 100%;
}

.el-button {
    font-size: 13px;
    color: #006600;
    height: 28px;
    line-height: 28px;
    padding: 0 8px;
    border-radius: 4px;
    font-weight: normal;
    border: none;
}
```
**在 APP.vue 的 CSS 里面引入
```
@import url(./assets/common.less);
```
**src 目录下的 components 文件夹**

主要用来设置 header 和 footer 公共属性
**./components/header.vue**
```
<template>
  <header :class="{login: isLogin, 'no-login': !isLogin}">
    <template v-if="!isLogin">
      <h1>Let's share</h1>
      <p>精品博客汇聚</p>
      <div class="btns">
        <el-button>立即登录</el-button>
        <el-button>注册账号</el-button>
      </div>
    </template>
    <template v-if="isLogin">
      <h1>Let's share</h1>
      <i class="edit el-icon-edit"></i>
      <img class="avatar" src="http://cn.gravatar.com/avatar/1?s=128&d=identicon" alt="">          
    </template>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false
    };
  }
};
</script>


<style lang="less">
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
}
</style>
```
**./components/footer.vue**
```
<template>
  <footer>
    <p>ada</p>
  </footer>
</template>

<style scoped>
footer {
  align-self: end;
  background: #d7d7d7;
  color: #666;
  font-size: 13px;
  padding: 10px;
  text-align: center;
}
</style>
```
调试工具
Vue Devtools![](https://upload-images.jianshu.io/upload_images/7094266-4d8ab7bb9391d6a0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
