[HTTP 模块.pdf](chrome-extension://cdonnmffkdaoajfknoeeecmchibpmkmg/assets/pdf/web/viewer.html?file=https%3A%2F%2Fstatic.xiedaimala.com%2Fxdml%2Ffile%2F3ac7c224-c23d-491f-84b5-4fabfbeab9b8%2F2019-10-17-1-34-9.pdf)

## vscode 设置
```
ctrl+shift+P

// 设置
autosave=onFocusCange
format on save=true
```

# request 对象 和 response 对象

```
import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";

const server = http.createServer();

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  console.log("有人请求了");
  console.log(request.constructor);
  console.log(response.constructor);

  console.log(request.method);
  console.log(request.headers);
  console.log(request.url);
  
  // 由于 TCP 协议原因，请求体是分多次上传的
  // 获取请求过程中的每一片 chunk ，请求结束时通过 Buffer 连接所有 chunk，获得完整请求体
  const array = [];
  request.on("data", chunk => {
    array.push(chunk);
  });
  request.on("end", () => {
    let body = Buffer.concat(array).toString();
    console.log("body:", body);

    response.statusCode = 404;
    response.setHeader("X-ada", "I am ADA");
    response.write("1\n");
    response.end();
  });
});

server.listen(8888, () => {
  console.log(server.address());
});
```

# 静态服务器

```
import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import * as fs from "fs";
import * as p from "path";
import * as url from "url";

const server = http.createServer();
const publicDir = p.resolve(__dirname, "public");

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  const { method, url: path, headers } = request;

  if (method !== "GET") {
    response.statusCode = 405;
    response.end("该页面为静态页面，不支持此操作！");
    return;
  }

  const { pathname, search } = url.parse(path);
  let filename = pathname.slice(1);
  if (filename === "") {
    filename = "index.html";
  }
  fs.readFile(p.resolve(publicDir, filename), (error, data) => {
    if (error) {
      if (error.errno === -4058) {
        response.statusCode = 404;
        fs.readFile(p.resolve(publicDir, "404.html"), (error, data) => {
          response.end(data);
        });
      } else if (error.errno === -4068) {
        response.statusCode = 403;
        response.end("您未获授权，无法查看此网页。");
      } else {
        response.statusCode = 500;
        response.end("服务器繁忙");
      }
    } else {
      response.setHeader("Cache-Control", "public, max-age=31536000");
      response.end(data);
    }
  });
});

server.listen(8888, () => {
  console.log(server.address());
});
```
