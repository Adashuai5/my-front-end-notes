## UI 组件
如 [ElementUI](http://element-cn.eleme.io/#/zh-CN)
**npm 安装**
```
npm i element-ui -S
```
**对照文档添加需要组件**

可以直接在 vue 里面使用 下列 api![](https://upload-images.jianshu.io/upload_images/7094266-e877955c56203fff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 数据请求接口封装
在 src 目录下新建 api 和 helpers 两个目录文件![](https://upload-images.jianshu.io/upload_images/7094266-6fcd488a5018138f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**./helpers 作用：**
通用组件：可以在所以网页使用的文件夹
**./helpers/requset.js 作用：发送接口的底层API**
npm.js.com 搜索 axios
```
npm install axios
```
**封装一个底层接口**
```
import axios from 'axios'
// 给请求失败提供 Message
import { Message } from 'element-ui'

// base路径为 后端接口线上地址根路径
axios.defaults.baseURL = 'http://blog-server.hunger-valley.com'; 
// 默认 POST 请求
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 允许跨域
axios.defaults.withCredentials = true;

// 自己封装一个简单的 axios
export default function request(url,type = 'GET',data = {}){
    return new Promise((resolve,reject) =>{
        let option = {
            url,
            method: type
        }
        // 若 type(小写)是 get 则 params(axios默认) 为 data
        if(type.toLowerCase() ==='get'){
            option.params = data
        }else {
            option.data = data
        }
        axios(option).then(res=>{
            if(res.data.status = 'ok'){
                resolve(res.data)
            }else{
                Message.error(res.data.msg)
                reject(res.data)
            }
        }).catch(err=>{
            Message.error('网络异常')
            reject({msg:'网络异常'})
        })
    })
}
```
**在需要的页面引入**
由于封装使用的是 export default function 因此名字可以随便取，这里用了 requset
```
// @ 就是 src 目录
import request from '@/helpers/request.js'
// 调用 request 的全局对象
window.request = request
```
然后就可以在页面中测试了![](https://upload-images.jianshu.io/upload_images/7094266-a263b9e0a0f94c3b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


**底层封装的好处：接口需要默认配置、方便、出错便于更改**

---
## api 接口封装
**./api/auth.js** 作用：底层接口数据封装
```
import request from '@/helpers/request.js'

const URL = {
    REGISER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    GET_INFO: '/auth'
}

export default {
    register({username,password}) {
        return request(URL.REGISER,'POST',{ username,password})
    },
    login({username,password}) {
        return request(URL.LOGIN,'POST',{ username,password})
    },
    logout() {
        return request(URL.LOGOUT)
    },
    getInfo() {
        return request(URL.GET_INFO)
    }
}
```
页面引入
```
import request from '@/helpers/request.js'
import auth from '@/api/auth.js'

// 同样调用全局变量，当然也是主要为了测试用
window.request = request
window.auth = auth
```
测试![](https://upload-images.jianshu.io/upload_images/7094266-cc2da0980cc7bca3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**./api/blog.js** 
```
import request from '@/helpers/request.js'

const URL = {
  GET_LIST: '/blog',
  GET_DETAIL: '/blog/:blogId',
  CREATE: '/blog',
  UPDATE: '/blog/:blogId',
  DELETE: '/blog/:blogId'
}

export default {
  // 三个参数：默认页码 1，用户ID，首页
  getBlogs({
    page = 1,
    userId,
    atIndex
  } = {
    page: 1
  }) {
    return request(URL.GET_LIST, 'POST', {
      page,
      userId,
      atIndex
    })
  },
  getIndexBlogs({
    page = 1
  } = {
    page: 1
  }) {
    return this.getBlogs({
      page,
      atIndex: true
    })
  },
  getBlogsByUserId(userId, {
    page = 1,
    atIndex
  } = {
    page: 1
  }) {
    return this.getBlogs({
      userId,
      page,
      atIndex
    })
  },
  getDeail({
    blogId
  }) {
    return request(URL.GET_DETAIL.replace(':blogTd', blogId))
  },
  updataBlog({
    blogId
  }, {
    title,
    content,
    description,
    atIndex
  }) {
    return request(URL.UPDATA.replace(':blogTd', blogId), 'PATCH', {
      title,
      content,
      description,
      atIndex
    })
  },
  createBlog({
    title = '',
    content = '',
    description = '',
    atIndex = false
  } = {
    title: '',
    content: '',
    description: '',
    atIndex: false
  }) {
    return request(URL.CREATE, "POST", {
      title,
      content,
      description,
      atIndex
    })
  },
  deleteBlog({
    blogId
  }) {
    return request(URL.DELETE.replace(':blogTd', blogId), 'DELETE')
  }
}
```
页面引入
```
import blog from '@/api/blog.js'

window.blog =blog
```
测试![](https://upload-images.jianshu.io/upload_images/7094266-dfef18607273c07a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
// 博客间无联系，不用 vuex ，直接用 api
import blog from "@/api/blog";

export default {
  data() {
    return {
      title:'',
      description:'',
      content:'',
      atIndex: false
    }
  },

  methods: {
    onCreate() {
      blog.createBlog({ title: this.title, description: this.description, content: this.content, atIndex: this.atIndex })
        .then(res => {
          this.$message.success(res.msg) // 创建成功
          this.$router.push({ path: `/detail/${res.data.id}`}) // 跳转页面至对应博客详情页
        })
    }
  }
};
```
