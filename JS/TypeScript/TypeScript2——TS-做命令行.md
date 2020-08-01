# [shebang](https://stackoverflow.com/questions/10376206/what-is-the-preferred-bash-shebang/10383546)

新建 1.ts

```
#!/usr/bin/env ts-node
console.log('hello world');
```

运行 ./1.ts 打印出 hello world

# process.argv

该属性返回一个数组，其中包含当启动 Node.js 进程时传入的命令行参数

```
#!/usr/bin/env ts-node
let a = process.argv
console.log(a)
console.log('hello world');
```

现在运行 ./1.ts xxx

如果报错

```
# 初始化项目的 package.json
npm init -y
# 安装 node 相关的类型定义
npm install @types/node
# 再次运行 ./1.ts xxx
[ 'C:\\Users\\ada\\AppData\\Roaming\\npm\\node_modules\\ts-node\\dist\\bin.js',
  'C:\\Users\\ada\\Desktop\\ada\\TypeScript-demo\\tsdemo\\1.ts',
  'xxx' ] // [node,1.ts,xxx]
hello world
```

# 做一个 add 的命令行工具

```
#!/usr/bin/env ts-node
let a = process.argv[2]
let b = process.argv[3]
console.log(a + b)
# 运行 ./add.ts 1 2
// '12'
```

vscode 可以通过 ctrl + 鼠标右键点击 argv ，进入 globals.d.ts 对应地方（我们刚刚下载 @types/node 生成的）

![argv 默认为 string](https://upload-images.jianshu.io/upload_images/7094266-3c13174dd7f9ff80.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## tsconfig.json

可以通过扩展添加 ts 当前不支持的版本

```
{
  "compilerOptions": {
    "lib": ["es2015", "es2016", "es2017", "es2018", "DOM"] // 增加不支持的版本
  }
}
```

## process.exit() 退出程序

```
#!/usr/bin/env ts-node
let aaa: number = parseInt(process.argv[2]);
let bbb: number = parseInt(process.argv[3]);
if (Number.isNaN(aaa) || Number.isNaN(bbb)) {
  console.log("请输入整数");
  process.exit(1) // 非 0 为出错退出
}
console.log(aaa + bbb);
process.exit(0) // 程序正常退出
```
