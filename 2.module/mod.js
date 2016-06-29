var mod1 = require('http');
var mod2 = require('./math');
/**
 * 查找第三方模块的查询规则
 * 1. 在当前的node_modules目录下查找 mime这个文件并加载，如果找不到加.js后缀加载。
 * 2. 把这个mime作为一个文件夹来查找
 * 3. 首先会找 package.json 配置文件,里的main的配置项对应的JS文件。
 * 4. 会在文件夹下尝试查找index.js的文件
 */
var mod3 = require('mime');
mod3();
