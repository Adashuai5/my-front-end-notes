对于前端来说， flutter 学习的难点在于环境搭建
在跟随 [技术胖：Flutter 开发环境搭建 Windows 版](https://jspang.com/posts/2019/01/20/flutter-base.html#%E7%AC%AC02%E8%8A%82%EF%BC%9Aflutter%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BAwindows%E7%89%88) 时
出现以下 ✗ Android license status unknown 的环境错误

![](https://upload-images.jianshu.io/upload_images/7094266-e2d7d273e10ecf41.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在 [✗ Android license status unknown.](https://github.com/flutter/flutter/issues/16025#) issue 内找到答案

# 解决思路

在下方路径内找到 sdkmanager.bat 文件

```
C:\Users\Administrator\AppData\Local\Android\Sdk\tools\bin
```

在以下区域加入如 17 行所示 set JAVA_HOME="xxx\Android Studio\jre"

```
16 @rem Add default JVM options here. You can also use JAVA_OPTS and SDKMANAGER_OPTS to pass JVM options to this script.
+17 set JAVA_HOME="F:\ada\Android Studio\jre" // 你的 Android Studio\jre 路径
18 set DEFAULT_JVM_OPTS="-Dcom.android.sdklib.toolsdir=%~dp0\.."
```

再运行 flutter doctor

![](https://upload-images.jianshu.io/upload_images/7094266-49d92a6402463517.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

根据提示运行 flutter doctor --android-licenses
然后一直 y 就可以了

![](https://upload-images.jianshu.io/upload_images/7094266-d8ba85e97083d9cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以继续愉快得学习拉！
