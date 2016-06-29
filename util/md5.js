/**
 * 将任意长度的输入转换成固定长度的输出 32个字符
 * 1. 不管多长的输入输出的长度是一样的。
 * 2. 不同的输入会产生不同的输出
 * 3. 不能从输出的内容推算出输入的内容
 *
 * 1. 加密密码
 * 2. 签名
 **/
var crypto = require('crypto');
var hash = crypto.createHash('md5');//指定摘要算法
var hashed = hash.update('11');//指定要加密的字符串
hashed = hashed.update('22');
var result = hashed.digest('hex');//输出摘要值 hex 十六进制
console.log(result);//输出结果
// 6512bd43d9caa6e02c990b0a82652dca