### 项目初衷

0 做个有特点的前端项目，而 MacOS 系统桌面可以实现的东西太多了

1 工作中主要技术栈为 vue2.x，想通过项目实践 react 的学习（hooks 熟练了，react 和 vue3.0 都间接拿下了）

2 熟悉并实践 TypeScript

### 附属

我的电脑其实不是 macOS 系统，所以注定只能低仿。但这不影响我学习 macOS 如 dock 的炫酷效果的实现及达到上述初衷的目的。

通过该 [教程](https://www.bilibili.com/video/BV12t411g7Zv/) 修改了我的桌面，作为参考

[主要软件 mydockfinder](https://www.mydockfinder.com/index.html#time=9&NewVariable1=1&CSUM=1)

### 开发环境搭建

直接使用 create-react-app with typescript 来快速搭建

```
yarn create-react-app my-app --typescript
```

引入 sass 为 css 预处理

```
yarn add node-sass
``` 

### 设置背景图片

删除所有不必要的文件及代码后, 我使用上面教程中获取的文件中的 sierra-4K.jpg 作为 App 界面背景
```
// App.scss
.App {
  min-width: 1500px;
  background: url(../assets/image/sierra-4K.jpg) center/100% no-repeat;
}
```

效果如下

![](https://upload-images.jianshu.io/upload_images/7094266-9b33e3cc2cd4e3d3?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 使用 Github 自动化部署

[Create React App 官方文档提供的部署到 github](https://create-react-app.dev/docs/deployment/#github-pages) 的方法有问题

我使用了 GitHub Actions 代替 [参考](https://frankwang1991.github.io/2019/11/21/use-github-actions-publish-reactapp/)

在 package.json 内添加 homepage

格式：https://{yourGithubName}.github.io/{yourRepositoryName}

```
// package.json
// ...
  ,
  "homepage": "https://adashuai5.github.io/my-desktop"
}
// ...
```

新建项目文件 .github/workflows/ci.yml

```
name: my-desktop
on:
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@master

      - name: Build and Deploy
        uses: JamesIves/github-pages-deploy-action@master
        env:
          ACCESS_TOKEN: ${{ secrets.MY_WINDOW }}
          BRANCH: gh-pages
          FOLDER: build
          BUILD_SCRIPT: npm install && npm run build
```

这里的 ACCESS_TOKEN 是在 Github repo 中 Settings 栏下设置的 Secrets

![](https://upload-images.jianshu.io/upload_images/7094266-f72d9e80d88d5353?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

做好这些，在你每次 push 后 Github 就会自动运行 Actions 形成工作流了

![](https://upload-images.jianshu.io/upload_images/7094266-434d2834287ed33f?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

等你的 push 成功，即可打开 Settings，找到 Github Pages

![](https://upload-images.jianshu.io/upload_images/7094266-d2d3766e96f83718?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

选择 gh-pages branch 此时会出现如上图所示项目浏览链接，如我这个项目 [my-desktop](https://adashuai5.github.io/my-desktop/)

另外，该项目 [代码](https://github.com/Adashuai5/my-desktop)，欢迎 watch 和 star。
### 小结

至此，项目流程算是走了一遍。

目前该项目已完成 dock，简单设置，基础计算器，基础画板等功能，即使是这些已有功能也有很多需要完善的地方。

后续我会慢慢优化，并在相应模块代码优化到一定程度时不定时更新系列文章。🍮
