``` html
<body>
	<div id="canvas"></div>
</body>
```
``` css
#canvas {
  height: 100vh;
  background-color: #fff;
}
```
``` js
let div = document.getElementById('canvas')
div.onmousedown = (x)=>{
 console.log(x)
}
```
![](https://upload-images.jianshu.io/upload_images/7094266-908d7b5a64dc1a73.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
