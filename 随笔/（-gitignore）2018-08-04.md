在项目目录创建 .gitignore 文件就可以指定「哪些文件不上传到远程仓库」，比如

[.gitignroe help](https://help.github.com/articles/ignoring-files/)
```
/node_modules/
/.vscode/
```
这样就可以避免 node_modules/ 和 .vscode/ 目录被上传到 github 了。
如果文件已经被跟踪且被推送到远程，把本地这些文件删除再提交到远端。
---
#代码回滚
```
git reflog
git reset --hard 
```
代码强制推送远程
```
git push -f
```

- 自己的分支回滚直接用reset
- 公共分支回滚用revert
- 错的太远了直接将代码全部删掉，用正确代码替代
[git 远程仓库版本](https://blog.csdn.net/fuchaosz/article/details/52170105)
---
#合并提交
```
git rebase -i [startpoint]  [endpoint]
```
**其中-i的意思是--interactive，即弹出交互式的界面让用户编辑完成合并操作，[startpoint] [endpoint]则指定了一个编辑区间，如果不指定[endpoint]，则该区间的终点默认是当前分支HEAD所指向的commit(注：该区间指定的是一个前开后闭的区间)。**
```
pick：保留该commit（缩写:p）
reword：保留该commit，但我需要修改该commit的注释（缩写:r）
edit：保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）
squash：将该commit和前一个commit合并（缩写:s）
fixup：将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）
exec：执行shell命令（缩写:x）
drop：我要丢弃该commit（缩写:d）
```
[相关博客](https://juejin.im/entry/5ae9706d51882567327809d0)
