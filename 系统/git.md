# 最佳实践

[三年 Git 使用心得 & 常见问题整理](https://juejin.im/post/5ee649ff51882542ea2b5108#heading-0)

[Git 在实际开发中创建分支与分支合并到 master 的经验](http://www.tonitech.com/2399.html)

# 教程

[git 官方中文教程](https://git-scm.com/book/zh/v2/)
[阮一峰 git 教程](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)
[Git 教程（廖雪峰）](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/)

# 清单

[常用 Git 命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

# 规范

[Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

# 自定义 git

```
git config --global color.ui true
```

## gitignore

[gitignore 官方](https://github.com/github/gitignore)
忽略文件的原则是：

1. 忽略操作系统自动生成的文件，比如缩略图等；
2. 忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如 Java 编译产生的.class 文件；
3. 忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。

# [git 内部原理](https://www.bilibili.com/video/BV1RJ411X7kh)

[PPT](https://www.lzane.com/slide/git-under-the-hood/#/2)

[这才是真正的 GIT——分支合并](https://www.lzane.com/tech/git-merge/)

# git 的暂存区

Git 的版本库里存了很多东西，其中最重要的就是称为 stage（或者叫 index）的暂存区，还有 Git 为我们自动创建的第一个分支 master，以及指向 master 的一个指针叫 HEAD

![](https://upload-images.jianshu.io/upload_images/7094266-fc9e10aeb77010a2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/7094266-d084de94974c65c0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/7094266-2b168ca50ae9881f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 一些命令

```
git remote // 查看远程库的信息
git remote -v // 显示更详细的信息
git checkout -- 文件名 // 用版本库里的版本替换工作区的版本
git rm 文件名 // 从版本库中删除该文件
git log --pretty=oneline // 一行显示 git log
git reflog 查看命令历史
```

# 分支创建与合并

```
git branch // 查看分支
git branch <name> // 创建分支
git checkout <name> // 切换分支
git checkout -b <name> // 创建+切换分支
git merge <name> // 合并某分支到当前分支
git branch -d <name> // 删除分支
git branch -D <name> // 要丢弃一个没有被合并过的分支，可以通过 -D 强行删除
```

# 图示日志

```
git log --graph --pretty=oneline --abbrev-commit // 图示、一行、缩写形式显示 git log
```

![](https://upload-images.jianshu.io/upload_images/7094266-83523ba0414eb9bf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 分支管理策略

合并分支时，如果可能，Git 会用 Fast forward （快进）模式。
合并分支时，加上--no-ff 参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而 fast forward 合并就看不出来曾经做过合并。

```
git merge --no-ff -m "<message>" <name>
```

# 多人协作

```
// 查看远程库信息，使用
git remote -v；

// 本地新建的分支如果不推送到远程，对其他人就是不可见的；

// 从本地推送分支，使用
git push origin branch-name
// 如果推送失败，先用git pull抓取远程的新提交；

// 在本地创建和远程分支对应的分支，使用
git checkout -b branch-name origin/branch-name
// 本地和远程分支的名称最好一致；

// 建立本地分支和远程分支的关联，使用
git branch --set-upstream branch-name origin/branch-name；

// 从远程抓取分支，使用git pull，如果有冲突，要先处理冲突
```

# Rebase 合并提交

```
git rebase -i [startpoint]  [endpoint]
```

**其中-i 的意思是--interactive，即弹出交互式的界面让用户编辑完成合并操作，[startpoint][endpoint]则指定了一个编辑区间，如果不指定[endpoint]，则该区间的终点默认是当前分支 HEAD 所指向的 commit(注：该区间指定的是一个前开后闭的区间)。**
注意提交顺序是上面的 hard 为前一次 commit

```
pick：保留该commit（缩写:p）
reword：保留该commit，但我需要修改该commit的注释（缩写:r）
edit：保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）
squash：将该commit和前一个commit合并（缩写:s）
fixup：将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）
exec：执行shell命令（缩写:x）
drop：我要丢弃该commit（缩写:d）
```

```
git rebase --abort 取消h'b
```

# 标签管理

发布一个版本时，我们通常先在版本库中打一个标签（tag）
Git 的标签虽然是版本库的快照，但其实它就是指向某个 commit 的指针

```
git tag <name> // 创建标签，默认为 HEAD，也可以指定一个 commit id
git tag // 查看所有标签
git tag -a <tagname> -m "blablabla..." // 可以指定标签信息

git push origin <tagname> // 可以推送一个本地标签；
git push origin --tags // 可以推送全部未推送过的本地标签；

// 如果标签已经推送到远程，要先从本地删除，然后从远程删除
git tag -d <tagname> // 可以删除一个本地标签；
git push origin :refs/tags/<tagname> // 可以删除一个远程标签。
```

# 踩过的坑

```
git reflog
git reset --hard
```

代码强制推送远程

```
git push -f
```

- 自己的分支回滚直接用 reset
- 公共分支回滚用 revert
- 错的太远了直接将代码全部删掉，用正确代码替代
  [git 远程仓库版本](https://blog.csdn.net/fuchaosz/article/details/52170105)
  [相关博客](https://juejin.im/entry/5ae9706d51882567327809d0)
  [HEAD 游离的问题](https://www.jianshu.com/p/1802aaf896a2)

---

[关于 git 大小写问题的解决办法](https://blog.csdn.net/u013707249/article/details/79135639?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.nonecase)

# github 历史图示

github-history 功能：快速浏览 git push 历史
ref
