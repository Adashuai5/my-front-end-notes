在项目目录创建 .gitignore 文件就可以指定「哪些文件不上传到远程仓库」，比如

[.gitignroe help](https://help.github.com/articles/ignoring-files/)
```
/node_modules/
/.vscode/
```
这样就可以避免 node_modules/ 和 .vscode/ 目录被上传到 github 了。
如果文件已经被跟踪且被推送到远程，把本地这些文件删除再提交到远端。
---
代码回滚
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
