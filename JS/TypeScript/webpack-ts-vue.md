```
mkdir ts_webpack_vue_demo
cd ts_webpack_vue_demo
npm init -y
npm install webpack webpack-cli --save-dev
```

# add webpack.config.js

```
const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  }
};

// package.json
  "scripts": {
    "build:dev": "webpack"
  },
```

# 本地服务器： webpack-dev-server

```
npm install webpack-dev-server --save-dev
```
```
// package.json
  "scripts": {
    "start:dev": "webpack-dev-server"
  },
```

# 自动生成 index.html ：使用 html-webpack-plugin

```
npm install --save-dev html-webpack-plugin
```

```
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [new HtmlWebpackPlugin()]
};
```

# 引入 vue

```
npm install -D vue-loader vue-template-compiler
```

```
// webpack.config.js
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  module: {
    rules: [
      // ... other rules
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [new HtmlWebpackPlugin(), new VueLoaderPlugin()]
};
```

```
// Ada.vue
<template>
  <div>I am Ada!</div>
</template>
<script>
export default {
  name: "ada"
};
</script>
```

```
// index.js
import Vue from "vue";
import Ada from "./Ada.vue";

let div = document.createElement("div");
div.id = 'ada'
document.body.appendChild(div);

new Vue({
  render: h => h(Ada)
}).$mount('#ada')
```

# 引入 TypeScript

```
npm install --save-dev typescript ts-loader
```

增加 vuetype

```
// shims-vue.d.ts
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
```

```
// tsconfig.json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true
  },
  "exclude": ["node_modules"]
}
```

# 在 vue 内使用 ts

```
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  module: {
    rules: [
      // ... other rules
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [new HtmlWebpackPlugin(), new VueLoaderPlugin()]
};
```

参考： [Vue + TypeScript + Webpack](https://qiita.com/tofugeek/items/d3ce6bb643e3bdee49d7)
