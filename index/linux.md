## linux install

```
sudo apt install
```

## open

```
// Mac
open
// Linux
gnome-open
```

## FQ

浏览器fq
```
sslocal -c .ssconf.json // ss
```
命令行翻墙
```
proxychains4 -f ~/.proxychains.conf // pc
```

## Lnux ~/.bashrc

**nano:** 是一个字符终端的文本编辑器，有点像DOS下的editor程序。它比[vi](http://man.linuxde.net/vi "vi命令")/vim要简单得多，比较适合Linux初学者使用。某些Linux发行版的默认编辑器就是nano。

```
nano ~/.bashrc
```
type 命令可以查看缩写命令对应的 alias
启用配置
```
source ~/.bashrc
```

## 命令行小工具

1.  z
    方便实现快速目录跳转，[下载在此](https://github.com/rupa/z "null")
如何用命令行下载
找到 z.sh 目录然后 curl
![](https://upload-images.jianshu.io/upload_images/7094266-d6999a36691ebff2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
curl -L https://github.com/rupa/z/blob/master/z.sh > z.sh
vi ~/.bashrc
source ~/Desktop/z.sh
```
2.  fzf
    方便快速搜索文件或目录，[官网在此](https://github.com/junegunn/fzf#installation "null")

```

# ~/.bashrc 配置

source ~/Desktop/z.sh
export PATH="$PATH:/c/users/ada"
export SASS_BINARY_SITE="https://npm.taobao.org/mirrors/node-sass"
export PATH="$PATH:/c/GnuWin32/bin/"
 alias la='ls -a'
 alias ll='ls -l'
 alias gst='git status'
 alias gv='git commit' 
 alias ga='git add'
 alias ga.='git add .'
 alias gc='git commit'
 alias gc.='git commit .'
 alias gp='git push'
 alias gpl='git pull'
 alias open='start'
 alias ada="echo 'ada'"
 alias t='tree'
 alias lg= "git log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit" 
```

```
# cmder/config/user_aliases.cmd
;= @echo off
;= rem Call DOSKEY and use this file as the macrofile
;= %SystemRoot%\system32\doskey /listsize=1000 /macrofile=%0%
;= rem In batch mode, jump to the end of the file
;= goto:eof
;= Add aliases below here
e.=explorer .
gl=git log --oneline --all --graph --decorate  $*
ls=ls --show-control-chars -F --color $*
pwd=cd
clear=cls
history=cat -n "%CMDER_ROOT%\config\.history"
unalias=alias /d $1
vi=vim $*
cmderr=cd /d "%CMDER_ROOT%"
source ~/Desktop/z.sh
export PATH="$PATH:/c/GnuWin32/bin/"

gst=git status -sb
gv=git commit -v
ga=git add
ga.=git add .
gc=git commit
gc.=git commit .
gp=git push
gpl=git pull
gcl=git clone
open=start
ada=echo ada is awesome
t=tree
lg=git log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commitla=ls -a  
la=ls -a
```

[Win下必备神器之Cmder](https://www.jeffjade.com/2016/01/13/2016-01-13-windows-software-cmder/)
