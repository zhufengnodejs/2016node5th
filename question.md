##  同步和异步 阻塞与非阻塞 是什么区别和联系

## --save --save-dev
--save
生产环境依赖，线上环境依赖
--save-dev
开发环境依赖


## 本地安装和全局安装
本地安装
如果你需要在代码里require这个模块，就需要本地安装

全局安装
如果你要在命令执行一些命令，可以全局安装
查看全局安装路径 
```
npm root -g
C:\Users\Administrator\AppData\Roaming\npm\node_modules
```

npm install mime -g 
有两个功能
1. 会把此模块安装到npm\node_modules\mime下面
2. 会在npm下面生成一个快捷方式，或者叫可执行命令，指向


如果需要在命令行中执行命令，装全局
如果需要在代码中通过require加载这个模块装本地


切换盘符 用  d:
在盘下面切换路径  cd ..   .   abc


# Max-Age
1. 当客户端请求服务器的时候，服务器可以返回 Cache-Control Max-Age= 30
2. 当客户端收到响应后，会把此文件缓存在本地硬盘上，那么如果再次请求对应资源的时候，如果此缓存没有过期，则直接使用缓存数据，不再向服务器发请求


stat
mtime modify time 最后修改时间
ctime change time 最后改变时间
brithtime 创建时间
atime access time 最后访问时间

刷新按钮
浏览器不管缓存是否过期，都会向服务器发起请求询问此缓存是否是最新的
直接浏览器中输入
如果缓存未过期，直接使用，如果已过期，则询问服务器此缓存是否可用
ctrl+f5 
会忽略所有缓存

# 为什么需要用etag
1. 不够精确 只能精确到秒，如果一秒变好几次，那么会出现误差
2. 如果有CDN content distribution network

# etag

#编码
在node中指定编码要写成 utf8
在网页中指定编码要写入 utf-8