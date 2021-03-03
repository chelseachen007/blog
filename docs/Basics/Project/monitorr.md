# 监控系统文档

## 全局 config

最终希望可以通过服务端下发，但是这样要考虑跨域问题(优先级低)

config 列表

- 版本
- 过滤次数
- 过滤某些错误
- 请求路径
- ...

## RRWEB 问题

1. MutationObserver API 不能监听 DOM 大小变化和颜色等变化（待验证）

2. 当前方案直接将前 20S 操作上传，会造成请求包体太大，导致超过 Get 请求限制而无法上传，

   准备将其改造成时间数组（切片为 1S）单独定时定长的上传，而错误只上传发生时对应的秒数，由后端计算后返回前几秒的数组

   - 问题 1 上报时间数组 需要 id 识别身份？

## Http 劫持

1. 准备改成保留原始请求一份，像上报接口使用原始请求，不做劫持，不然会死循环

2. 使用 new Images(.../1\*1.gif) 上报

3. 适配器模式

   - 如果是浏览器环境引入`xhr`，是`node`环境则引入`http`。

     ```JavaScript
     function getDefaultAdapter() {
       var adapter;
       // 根据 XMLHttpRequest 判断
       if (typeof XMLHttpRequest !== 'undefined') {
         // For browsers use XHR adapter
         adapter = require('./adapters/xhr');
         // 根据 process 判断
       } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
         // For node use HTTP adapter
         adapter = require('./adapters/http');
       }
       return adapter;
     }
     var defaults = {
       adapter: getDefaultAdapter(),
       // ...
     };
     ```

-

4.

## 重构问题

发现大部分代码冗余重复较多，比如每个请求都进行了 baseMsg，type，获取错误 event 的，想要改造成，通过事件中心统一进行数据的存储和上报

存储事件准备改造成统一函数，例如：

```JavaScript
function saveTo(){
    if(wx) wx.localstroage
    if(indexDB) indexDB...
    window.localstroage
}
```

但这种改造不容易扩展，另外如果做取数据函数同样也要判断环境，先想好兼容形式怎么做

Report Class 大概

```JavaScript
//去重
//过滤错误
//存储错误
[jserror,promiseError,resError].forEach(v=>{
    // saveTo
})
// 定时上报
```

## 打包

webpack => rollup

## 测试

现在自己测试太麻烦，思考做成单元测试（不优先）

js 问题

- undefined
- promise
- referror

网络请求

- xml
- fetch

vue

- 组件声明
- 未响应式
- key 相等

待补充...

## 做这个系统的收益

缩短可交互 js 时间
