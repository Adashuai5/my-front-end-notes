- npm install xxx: 安装项目到项目目录下，不会将模块依赖写入devDependencies或dependencies。

- npm install -g xxx: -g的意思是将模块安装到全局，具体安装到磁盘哪个位置，要看 npm cinfig prefix的位置

- npm install -save xxx （-S）：-save的意思是将模块安装到项目目录下，并在package文件的dependencies节点写入依赖。

- npm install -save-dev xxx （-D）：-save-dev的意思是将模块安装到项目目录下，并在package文件的devDependencies节点写入依赖。
