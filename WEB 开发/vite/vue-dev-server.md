[掘金原文](https://juejin.cn/post/7021306258057592862?utm_source=gold_browser_extension#heading-0)

[vue-dev-server](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue-dev-server) 是尤雨溪几年前写的“玩具 vite”

### 工作原理

- 浏览器请求导入作为原生 ES 模块导入 - 没有 bundling。
- 服务器拦截对 *.vue 文件的请求，即时编译，然后将它们作为 JavaScript 发回。
- 对于在浏览器中工作的提供 ES 模块构建的库，只需直接从 CDN 导入它们。
- 导入到 .js 文件中的 npm 包（仅包名称）会即时重写以指向本地安装的文件。目前，仅支持 vue 作为特例。 其他包可能需要进行转换才能作为本地浏览器目标 ES 模块公开。

