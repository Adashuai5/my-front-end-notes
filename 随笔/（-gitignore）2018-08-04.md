在项目目录创建 .gitignore 文件就可以指定「哪些文件不上传到远程仓库」，比如

[.gitignroe help](https://help.github.com/articles/ignoring-files/)
```
/node_modules/
/.vscode/
```
这样就可以避免 node_modules/ 和 .vscode/ 目录被上传到 github 了。
如果文件已经被跟踪且被推送到远程，把本地这些文件删除再提交到远端。
