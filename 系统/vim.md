# 一个程序员应该掌握编辑器

先过一遍 vimtutor

**vim：编辑器之神
Emacs：神的编辑器（操作系统）** 

1. Linux 自带
2. 无需鼠标，不用来回切换速度快
3. 快捷键方便
4. 支持宏、插件，自己配置
# **需要记住的单词**
```
quit ：退出 
write/read ：保存/读
yank（copy） ：复制
paste ：粘帖
delete ：删除
change ：改变
find ：查找
line ：行
word ：查找单词
forward/backward ：向前/向后
up/down ：ctrl+u/ctrl+d 上下翻页
insert/append ：插入前/后
do/undo/redo ：做/撤销/还原
replace ：替换
```
**插入操作**

```
i ：字前插入；
a ：字后插入 ；
I ：行前插入； 
A ：行后插入
```
**四种模式**
```
insert（I）编辑模式
ESC  普通模式
冒号模式（命令模式）
v 模式（编辑选区模式）
```
**复制粘贴**
```
到达你想复制的开头
按v，到达你想复制的结尾
按y复制
按p或P粘贴
```
**删除 delete 和修改 change 操作**
```
delete/change word ：d/cw
delete/change in () ：ci(
delete at () ：da(
delete in/at {} ：d i/a ｛
delete in tag ：dit
change in tag ：cit
```
## [vim常用命令总结](https://blog.csdn.net/ithomer/article/details/5929428)

![](https://upload-images.jianshu.io/upload_images/7094266-3c32e53638cbd121.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# vim 装 emmet
[官方教程](https://github.com/mattn/emmet-vim)

打开或创建一个新文件：
```
vim index.html
```
类型（“_”是光标位置）：

html:5_

然后输入,（Ctrly,），你应该看到：
```
<！DOCTYPE HTML>< html lang = “ en ” >< head > < meta charset = “ UTF-8 ” > < title > < body > _
```
