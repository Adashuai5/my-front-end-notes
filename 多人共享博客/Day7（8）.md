####user 页面完善

**vue 部分**
其实和其他页面相似
**特殊：
1.v-for 更新： v-for 同样给个 key，但是用 blog.id：指定 key 的好处，让编译器更好得定位到指定元素，效率更高
2.splitDate 函数的使用，将时间分离开来**
```
<template>
  <div id="user">
    <section class="user-info">
      <img :src="user.avatar" :alt="user.username" class="avatar">
      <h3>{{user.username}}</h3>
    </section>
    <section>
      <router-link class="item" v-for="blog in blogs" :key="blog.id" :to="`/detail/${blog.id}`">
        <div class="date">
          <span class="day">{{splitDate(blog.createdAt).date}}</span>
          <span class="month">{{splitDate(blog.createdAt).month}}</span>
          <span class="year">{{splitDate(blog.createdAt).year}}</span>
        </div>
        <h3>{{blog.title}}</h3>
        <p>{{blog.description}}</p>
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
<style src="./template.less" lang="less"></style>
```
**js 部分**
同样与其他页面尤其是 detail 页面 js 类似
```
import blog from '@/api/blog.js'

export default {
  data() {
    return {
      blogs: [],
      user: {},
      page: 1,
      total: 0
    }
  },

  created() {
    // 首先定义 userId，同样用 params
    this.userId = this.$route.params.userId
    this.page = this.$route.query.page || 1
    // 用到之前的 getBlogsByUserId()
    blog.getBlogsByUserId(this.userId, { page: this.page })
      .then(res => {
        console.log(res)
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
        // user 部分在 data 里面有
        if(res.data.length > 0){
          this.user = res.data[0].user
        }
      })
  },

  methods: {
    splitDate(dataStr) {
      let dateObj = typeof dataStr === 'object' ? dataStr : new Date(dataStr)
      return {
        date: dateObj.getDate(),
        // getMouth() 返回值是 0（一月） 到 11（十二月）的一个整数
        month: dateObj.getMonth() + 1,
        year: dateObj.getFullYear()
      }
    },

    onPageChange(newPage) {
      blog.getBlogsByUserId(this.userId,{ page: newPage })
        .then(res => {
          this.blogs = res.data
          this.total = res.total
          this.page = res.page
          // 这里的 path 也要改成 user 对应 示例：/user/1?page=2
          this.$router.push({ path: `/user/${this.userId}`,query: {page: newPage }})
        })
    }
  }
}
```
####my 页面完善
下面这行代码作用是修复页面刷新后分页码变为1的bug
```
// 在分页组件里面加入下面代码
:current-page="page"
```  
**删除键的优化**
```
<!-- vue 部分：通过 preventDefault 阻止页面闪动 -->
<a href="#" @click.prevent="onDelete(blog.id)">删除</a>
```
```
// 引入 弹框组件
onDelete(blogId) {
  this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    blog.deleteBlog({ blogId }).then
    this.$message({
      type: 'success',
      message: '删除成功!'
    })
  })
},
``` 
这样子不好，失去了 promise 的本意：.then 里面嵌套 .then 了，而不是串联形式
```
// 改成真正的 promise 形式
onDelete(blogId) {
  this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => { 
    return blog.deleteBlog({ blogId })
    }) .then
    this.$message.success( '删除成功!')
},
```   
更简洁的异步方法
```
async onDelete(blogId) {
  await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await
    blog.deleteBlog({ blogId })
    this.$message.success('删除成功!')
},
```
但是删除成功后要刷新页面才能显示删除效果，优化方法是
在上面代码后加入
```
    // 从数组里面过滤出已删除的博客
    this.blogs = this.blogs.filter(blog => blog.id != blogId)
```
**vue 部分基本上和 user 一样**
添加了可以 编辑 和 删除
```
<div class="actions">
    <router-link :to="`/edit/${blog.id}`">编辑</router-link>
    <!-- 通过 preventDefault 阻止页面闪动 -->
    <a href="#" @click.prevent="onDelete(blog.id)">删除</a>
</div>
```
**js 部分与 user 页面不同的除了 删除，还有 user 是通过 vuex 组件 加载**
```
import blog from '@/api/blog.js'
// 通过 vuex 组件获取 我的 的 user
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      blogs: [],
      page: 1,
      total: 0
    }
  },
  
  computed: {
    ...mapGetters(['user'])
  },

  created() {
    this.page = parseInt(this.$route.query.page) || 1
    blog.getBlogsByUserId(this.user.id, { page: this.page })
      .then(res => {
        console.log(res)
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
      })
  },

  methods: {
    splitDate(dataStr) {
      let dateObj = typeof dataStr === 'object' ? dataStr : new Date(dataStr)
      return {
        date: dateObj.getDate(),
        // getMouth() 返回值是 0（一月） 到 11（十二月）的一个整数
        month: dateObj.getMonth() + 1,
        year: dateObj.getFullYear()
      }
    },

    // 引入 弹框组件
    async onDelete(blogId) {
      await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await
        blog.deleteBlog({ blogId })
        this.$message.success('删除成功!')
        // 从数组里面过滤出已删除的博客，达到不用刷新页面就去掉已删除博客的优化
        this.blogs = this.blogs.filter(blog => blog.id != blogId)
    },

    onPageChange(newPage) {
      blog.getBlogsByUserId(this.user.id,{ page: newPage })
        .then(res => {
          this.blogs = res.data
          this.total = res.total
          this.page = res.page
          this.$router.push({ path: "/my",query: {page: newPage }})
        })
    }
  }
}
```
---
####edit 页面
测试，编辑成功。但是展示到首页有问题：XML显示我们已经成功修改 atIndex 为 false![](https://upload-images.jianshu.io/upload_images/7094266-f62952df289b0861.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)但是后台显示atIndex 研究为 true![](https://upload-images.jianshu.io/upload_images/7094266-aeac263125266206.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**edit 页面 vue 部分代码与 create 页面基本一致**
```
<template>
  <div id="edit">
    <h1>编辑文章</h1>
    <h3>文章标题</h3>
    <el-input v-model="title" @input="titleInput" placeholder="输入您的标题" maxlength="20"></el-input>
    <p class="msg"><span>{{titleMax}}/20</span></p>
    <h3>内容简介</h3>
    <!-- 自适应高度组件：添加 autosize 属性 -->
    <el-input type="textarea" @input="descriptInput" v-model="description" :autosize="{ minRows: 2, maxRows: 4}" placeholder="展示博客简介" maxlength="100"></el-input>
    <p class="msg"><span>{{descriptMax}}/100</span></p>
    <h3>文章内容</h3>
    <el-input type="textarea" @input="contentInput" v-model="content" :autosize="{ minRows: 6, maxRows: 30}" placeholder="请输入内容"></el-input>
    <p class="msg"><span>已输入{{contentLength}}个字</span></p>
    <!-- 添加 atIndex 开关 -->
    <p>
      <label>是否展示到首页</label>
      <el-switch v-model="atIndex" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
    </p>
    <el-button @click="onEdit">确定</el-button>
  </div>
</template>

<script src="./template.js"></script>
<style src="./template.less" lang="less"></style>
```
**Vue 部分同样与 create 部分相同，当然 edit 需要获取 create 的数据**
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
      titleMax: '',
      descriptMax: '',
      contentLength: ''
    }
  },

  created() {
    this.blogId = this.$route.params.blogId
    blog.getDetail({ blogId: this.blogId }).then(res =>{
      this.title = res.data.title
      this.content = res.data.content
      this.description = res.data.description
      this.atIndex = res.data.atIndex
      this.titleMax = 20-res.data.title.length
      this.descriptMax = 100-res.data.description.length
      this.contentLength = res.data.content.length
    })
  },

  methods: {
    onEdit() {
      blog.updateBlog({ blogId: this.blogId },{
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
####发布
##dist 文件 
```
npm run build
cd dist
git init
ga.
git commit -v
// github 创建新仓库
// git remote add origin
// git push -u origin master
```
可以用工程化的方式放到 package.json 里面 
新建 ''upload'' 属性，注意最后用 -f 而不是 -u是因为不是源码![](https://upload-images.jianshu.io/upload_images/7094266-4cdad2bd0d46a439.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
服务端跨域限制：由于原接口为 http 而不是 https![](https://upload-images.jianshu.io/upload_images/7094266-e6049c1f52bbe0ad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)那么我们可以改成 https（当然要后端已提供 https 数据）![https](https://upload-images.jianshu.io/upload_images/7094266-408fd9d778d87f82.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
