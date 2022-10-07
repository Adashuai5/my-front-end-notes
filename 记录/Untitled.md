# Ant Design

抽象=>复用=>组件化（模块化、模版化）

用户体验（交互性）

###### 设计价值观

- 自然

  - [「人机自然交互」Ant Design 设计价值观解析](https://zhuanlan.zhihu.com/p/44809866)

    人和机互动的**过程**

    自然人机交互：无需意识的人机交互行为

    保证产品视觉和交互的一致性、易学习性

- 确定性

  - 无可删减的设计/面向对象的方法/模块化
  - 用户确定：外观交互等一致性

- 意义感

  - 明确目标，有结果即时反馈
  - 让用户能够持续全情投入在工作心流中

- 生长性

  - 在价值和需求间建立连接
  - 人机共生、动态发展的共同体

###### 设计模式

围绕设计价值观的一套解决方案

# Umi

![img](https://img.alicdn.com/tfs/TB1hE8ywrr1gK0jSZFDXXb9yVXa-1227-620.png)

```
.
├── package.json // 插件和插件集
├── .umirc.ts // umi 内置功能和插件的配置
├── .env
├── dist
├── mock
├── public // 此目录下所有文件会被 copy 到输出路径
└── src
    ├── .umi // 临时文件目录
    ├── layouts/index.tsx // 全局布局文件
    ├── pages
        ├── index.less
        └── index.tsx
    └── app.ts // 运行时配置文件
```

# Ant Design Pro

可以认为是一个适合企业后台快速开发的较为完整的前端脚手架

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59b73354d1bd4b84a9ab5de35d4dd057~tplv-k3u1fbpfcp-watermark.image?" alt="image-20210831232727999.png" style="zoom:50%;" />

### 后端集成

###### OpenAPI

有效降低前后端分离后端维护文档的成本

对于前端：

- 自动载入注释，节省查文档，便于全情开发
- 生成 typings.d.ts 基于 ts 高效定义和查看数据描述
- 快速 CURD，便捷 mock

特点：自动化，约定大于配置

###### 网络请求

- **配置化**

- **接口结构规范**；**接口解析、错误处理**

- useRequest

  useRequest 是 ahooks 的一个 [a

  [pi](https://ahooks.js.org/zh-CN/hooks/async#userequest)，基于 [umi-request](https://github.com/umijs/umi-request/blob/master/README_zh-CN.md) 做了封装

特点：请求封装、统一处理、约定化、规范化

###### 代理

基于 http-proxy-middleware

###### 调试

chroma devtool

### 质量

###### Lint

###### TypeScript

###### 测试
