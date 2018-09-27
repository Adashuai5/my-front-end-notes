##完善已登录状态
新建两个跳转（绝对路径）
```
// 1.返回首页 /
<h1 :title="'回到首页'"><router-link to="/">Let's share</router-link></h1>
// 2.新建博客 /create
<router-link to="/create"><i class="edit el-icon-edit"  :title="'新建博客'"></i></router-link>
```
并做一下优化
如这里需要去掉 a 标签默认格式，在common.less 里
```
text-decoration:none;
```
##继续页面完善
####create 页面
主要用到 UI 组件
```
<template>
  <div id="create">
    <h1>创建文章</h1>
    <h3>文章标题</h3>
    <el-input v-model="title" @input="titleInput" placeholder="输入您的标题" maxlength="20"></el-input>
    <p class="msg"><span>限{{titleMax}}/20个字</span></p>
    <h3>内容简介</h3>
    <!-- 自适应高度组件：添加 autosize 属性 -->
    <el-input type="textarea" @input="descriptInput" v-model="description" :autosize="{ minRows: 2, maxRows: 4}" placeholder="展示博客简介" maxlength="100"></el-input>
    <p class="msg"><span>限{{descriptMax}}/100个字</span></p>
    <h3>文章内容</h3>
    <el-input type="textarea" @input="contentInput" v-model="content" :autosize="{ minRows: 6, maxRows: 30}" placeholder="请输入内容"></el-input>
    <p class="msg"><span>已输入{{contentLength}}个字</span></p>
    <!-- 添加 atIndex 开关 -->
    <p>
      <label>是否展示到首页</label>
      <el-switch v-model="atIndex" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
    </p>
    <el-button @click="onCreate">确定</el-button>
  </div>
</template>
<script src="./template.js"></script>
<style src="./template.less" lang="less"></style>
```
**tamplate.js 代码**
```
// 博客间无联系，不用 vuex ，直接用 api
import blog from "@/api/blog";

export default {
  data() {
    return {
      title: '',
      description: '',
      content: '',
      atIndex: false,
      titleMax: 20,
      descriptMax: 100,
      contentLength: 0
    }
  },

  methods: {
    onCreate() {
      blog.createBlog({
          title: this.title,
          description: this.description,
          content: this.content,
          atIndex: this.atIndex
        })
        .then(res => {
          this.$message.success(res.msg) // 创建成功
          this.$router.push({
            path: `/detail/${res.data.id}`
          }) // 跳转页面至对应博客详情页
        })
    },
    // 添加文本框输入实时计数功能
    titleInput() {
      var txtVal = this.title.length
      this.titleMax = 20 - txtVal
      if (this.titleMax === 0) {
        this.$message.warning("字数太多了哦")
      }
    },
    descriptInput() {
      var txtVal = this.description.length
      this.descriptMax = 100 - txtVal
      if (this.descriptMax === 0) {
        this.$message.warning("字数太多了哦")
      }
    },
    contentInput() {
      this.contentLength = this.content.length
    }
  }
};
```
输入框优化
[实时记录](https://blog.csdn.net/aaa333qwe/article/details/80286247)

####优化 index 首页

出现的问题：[v-for](https://vuejs.org/v2/guide/list.html#key)：key不是必须的，仅仅是warning [详情](https://blog.csdn.net/nongweiyilady/article/details/79065652)
```
<template>
  <div id="index">
    <section class="blog-posts">
      <!-- 列表渲染，指定博客对应路径 -->
      <router-link class="item" v-for="(blog,index) in blogs" :key="index" :to="`/detail/${blog.id}`">
        <figure class="avatar">
          <img :src="blog.user.avatar" :alt="blog.user.username">
          <figcaption>{{blog.user.username}}</figcaption>
        </figure>
        <h3>{{blog.title}}<span> {{blog.createdAt}}</span></h3> 
        <p>{{blog.user.description}}</p>
      </router-link>
    </section>
    <section class="pagination">
      <el-pagination
        @current-change="onPageChange"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </section>
  </div> 
</template>
<script src="./template.js"></script>
<style scoped lang="less" src="./template.less"></style>
```
**js 部分代码**
```
import blog from "@/api/blog.js"
export default {
  data() {
    return {
      blogs: [],
      total: 0,
      page: 1
    }
  },
  // 在创建博客的时候直接读取博客 data等信息
  created() {
    // 判断当前页面页码 注意是 $route
    this.page = parseInt(this.$route.query.page) || 1
    blog.getIndexBlogs({ page: this.page }).then(res => {
      this.blogs = res.data
      this.total = res.total
      this.page = res.page
    })
  },

  methods: {
    onPageChange(newPage) {
      blog.getIndexBlogs({
        page: newPage
      }).then(res => {
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
        // 将当前分页链接引入路由，使得刷新页面不发生改变
        this.$router.push({ path: '/',query: {page: newPage }})
      })
    }
  }
}
```

####完善 detail 页面

[marked](https://www.npmjs.com/package/marked) markdown 编译器引入
```
npm install --save marked
```
**vue 部分**
```
<template>
  <div id="detail">
    <section class="user-info">
      <img :src="user.avatar" :alt="user.username" :title="user.username" class="avatar">
      <h3>{{title}}</h3>
      <p><router-link :to="`/user/${user.id}`">{{user.username}}</router-link> {{createAt}}</p>
    </section>
    <!-- 用 v-html 转换 html 为 markdown -->
    <section class="article" v-html="markdown"></section>
  </div>
</template>

<script src="./template.js"></script>
<style src="./template.less" lang="less"></style>
```
**js 代码**
```
// 引入 maked
import marked from 'marked'
import blog from '@/api/blog'

export default {
  data() {
    return {
      title: '',
      rawContent: '',
      user: {},
      createAt: ''
    }
  },

  created() {
    // params：参数数组
    this.blogId = this.$route.params.blogId
    blog.getDetail({ blogId: this.blogId }).then(res =>{
      this.title = res.data.title
      this.rawContent = res.data.content
      this.user = res.data.user
      this.creatAt = res.data.creatAt
    })
  },
  // computed 计算属性
  computed: {
    markdown() {
      return marked(this.rawContent)
    }
  }
}
```
##添加 util.js 组件：通用信息
在 helpers 目录（辅助）添加（之前helpers 里已经创建过一个 请求组件）
####在 util.js 组件中新建一个显示友好日期的组件 friendlyDate
```
function friendlyDate(datsStr) {
  // 判断是否需要 friendlyDate
  let dateObj = typeof datsStr === 'object' ? datsStr : new Date(datsStr)
  let time = dateObj.getTime()
  let now = Date.now()
  let space = now - time
  let str = ''

  switch (true) {
    case space < 60000:
      str = '刚刚'
      break
    case space < 3600 * 1000:
      // Math.floor() 返回小于或等于一个给定数字的最大整数
      str = Math.floor(space / 60000) + '分钟前'
      break
    case space < 3600 * 1000 * 24:
      str = Math.floor(space / (3600 * 1000)) + '小时前'
      break
    default:
      str = Math.floor(space / (3600 * 1000 * 24)) + '天前'
  }
  return str
}

// 一个 vue 的插件：属性为 install 对象，默认参数 vue，提供 friendlyDate 功能
export default {
  install(vue, options) {
    vue.prototype.friendlyDate = friendlyDate
  }
}
```
**在 main.js 里引入**
```
import Util from '@/helpers/util.js'
Vue.use(Util)
```
**替换日期**
```
// createdAt
friendlyDate(createdAt)
// blog.createdAt
friendlyDate(blog.createdAt)
```
发布时间成功变成相对时间![](https://upload-images.jianshu.io/upload_images/7094266-3e088fae192d9e03.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
import blog from "@/api/blog";

export default {
  data() {
    return {
      blogId: null,
      title: '',
      description: '',
      content: '',
      atIndex: false,
      titleMax: 20,
      descriptMax: 100,
      contentLength: 0
    }
  },

    // 添加文本框输入实时计数功能
    titleInput() {
      var txtVal = this.title.length
      this.titleMax = 20 - txtVal
      if (this.titleMax === 0) {
        this.$message.warning("字数太多了哦")
      }
    },
    descriptInput() {
      var txtVal = this.description.length
      this.descriptMax = 100 - txtVal
      if (this.descriptMax === 0) {
        this.$message.warning("字数太多了哦")
      }
    },
    contentInput() {
      this.contentLength = this.content.length
    }
  }
};
```
```
<el-input v-model="title" @input="titleInput" placeholder=
"输入您的标题" maxlength="20">
</el-input>
    <p class="msg"><span>{{titleMax}}/20</span></p>

```
