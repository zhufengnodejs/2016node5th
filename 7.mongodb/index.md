# 命令
mongod   用于启动服务器 
mongo  用于启动客户端

mongod --dbpath=d:/data 
dbpath表示数据库文件的存放路径，要求目标路径必须存在，不存在则无法启动
waiting for connections on port 27017
表示启动成功


## 数据库相关的命令
 show dbs 显示当前的所有数据库
 use person 切换到指定的数据库下面
 如果原来有这个数据库则切换到此数据库下面，如果没有此数据库则创建此数据库
 db  查看当前正在使用的数据库
 db.dropDatabase()  删除当前正在使用的数据库
 exit 退出
 
##  集合
当你向集合里面插入一个文档的时候，如果没有指定ID的话，mongodb
会自动帮你为你的文档生成一个唯一的ID

 ##
 insert 如果插入文档的时候ID已经存在，则保存失败
 save 如果插入的文档的时候ID已经存在，则根据ID更新原文档
 
 $set 直接设置更新后的值
 $inc 在原来基础上累加 
 
 db.users.find().skip(2).limit(2).sort(id:-1);
 查询所有记录 跳过2条 查2条 以id字段倒序排列