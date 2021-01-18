# Brew安装

### vim

```vim
touch xxx // 创建文件
cd.. // 返回上一级
:wq! // 保存并强制退出

```



### uninstall

https://raw.githubusercontent.com/Homebrew/install/master/uninstall

```js
#!/usr/bin/ruby

STDERR.print <<EOS
Warning: The Ruby Homebrew installer is now deprecated and has been rewritten in
Bash. Please migrate to the following command:
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

EOS

Kernel.exec "/bin/bash", "-c", '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"'
```

然后将网页上的内容保存下来，存储为uninstall的文件名后

chmod 755 uninstall

./uninstall

之后输入密码，卸载完成。

###  install

https://raw.githubusercontent.com/Homebrew/install/master/install 

```js
#!/usr/bin/ruby

STDERR.print <<EOS
Warning: The Ruby Homebrew installer is now deprecated and has been rewritten in
Bash. Please migrate to the following command:
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

EOS

Kernel.exec "/bin/bash", "-c", '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"'
```

还是把网页内容保存下来，命名为brew_install文件名

chmod 755 brew_install

./brew_insatll

输入密码，坐等安装完成。