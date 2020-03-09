# [Stream 流.pdf](chrome-extension://cdonnmffkdaoajfknoeeecmchibpmkmg/assets/pdf/web/viewer.html?file=https%3A%2F%2Fstatic.xiedaimala.com%2Fxdml%2Ffile%2F3ac7c224-c23d-491f-84b5-4fabfbeab9b8%2F2019-11-19-23-3-45.pdf)

## drain（流干）

```
stream1.on('data',(chunk)=>{
  const flag = stream2.write(chunk)=>{
    if(flag === false) {// do not write}
      stream2.on('drain',()=>{
        go on write
      }
    }
  }
}
stream1.on('end',(chunk)=>{
  stream2.end()
}
```
