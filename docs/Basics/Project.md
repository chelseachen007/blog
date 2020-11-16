# 项目总结

## 虚拟滚动列表

虚拟滚动简单的说就是渲染在浏览器中当前可见的范围内的内容，通过用户滑动滚动条的位置动态地来计算显示内容，其余部分用空白填充来给用户造成一个长列表的假象。

## 文件上传

浏览器选择文件 => 上传到服务器 => 返回上传进度 => 保存到服务器

### 为什么要用 multipart/form-data

因为`application/x-www-form-urlencoded`不适合用于传输大型二进制数据或者包含非ASCII字符的数据。平常我们使用这个类型都是把表单数据使用url编码后传送给后端，二进制文件无法一起编码进去。

而使用`application/json`,后端需要对文本进行特殊的解析，效率较低

### 多种格式上传

#### FormData

```js
const file = document.getElementById('file').files[0];
var form = new FormData();
form.append('file', file);
```

#### Blob

```js
const json = { hello: "world" };
const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    
const form = new FormData();
form.append('file', blob, '1.json');
axios.post('http://localhost:7787/files', form);
```

#### ArrayBuffer

```js

const bufferArrary = [137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,1,0,0,0,1,1,3,0,0,0,37,219,86,202,0,0,0,6,80,76,84,69,0,0,255,128,128,128,76,108,191,213,0,0,0,9,112,72,89,115,0,0,14,196,0,0,14,196,1,149,43,14,27,0,0,0,10,73,68,65,84,8,153,99,96,0,0,0,2,0,1,244,113,100,166,0,0,0,0,73,69,78,68,174,66,96,130];
const array = Uint8Array.from(bufferArrary);
const blob = new Blob([array], {type: 'image/png'});
const form = new FormData();
form.append('file', blob, '1.png');
axios.post('http://localhost:7787/files', form)
```

#### Base64

```js
const base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABlBMVEUAAP+AgIBMbL/VAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAACklEQVQImWNgAAAAAgAB9HFkpgAAAABJRU5ErkJggg==';
const byteCharacters = atob(base64);
const byteNumbers = new Array(byteCharacters.length);
for (let i = 0; i < byteCharacters.length; i++) {
	byteNumbers[i] = byteCharacters.charCodeAt(i);
}
const array = Uint8Array.from(byteNumbers);
const blob = new Blob([array], {type: 'image/png'});
const form = new FormData();
form.append('file', blob, '1.png');
axios.post('http://localhost:7787/files', form);
```

base64编解码

```js
//解码
var decodedData = window.atob(encodedData);
//编码
var encodedData = window.btoa(stringToEncode);
```



### 如何做出亮点

1. 上传文件格式验证
   - 验证后缀，但是无法防范恶意改名文件
   - 二进制流验证 （hexdunm） 一个可靠的文件校验
2. 断点续传
   - 对文件进行切片，计算 md5 然后按数组上传
3. 秒传，计算 Md5 然后进行比较
   - 大文件 使用 webwork 计算
   - fiber 架构，利用空闲时间计算
   - 对文件进行抽样数据再计算 md5
4. 并发数控制+错误重试
   - 并发 + tcp 冷启动
5. 思考
   - 碎片清理
   - 文件碎片存储在多个机器上
   - 文件碎片备份
   - 兼容性更好的 requestidleCallback
   - 抽样 hash + 全量 hash 双重判断
   - websocket 推送
   - cdn
   - ...

## 异常监控插件

### sourceMap上传

```js
let mapKeys = Object.keys(compilation.assets).filter(item => /.map$/.test(item.toLowerCase()))
let promiseList = []
for (let item in mapKeys) {
    promiseList.push(
        getClient(
            appKeys,
            appVersion,
            mapKeys[item].substr(mapKeys[item].lastIndexOf('/') + 1),
            compilation.assets[mapKeys[item]].source().toString()
        )
    )
}
Promise.all(promiseList)
```

### 文件监听

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { type } = require('os')
const { resolve } = require('path')
const { compilation } = require('webpack')
class HtmlAddAttrPlugins {
    constructor(options = {}) {
        this.options = options
    }

    addAttr (tag, key, val) {
        if (!tag || !tag.length) return
        tag.forEach((tag, index) => {
            let value = val
            if (typeof val === 'function') {
                value = val(tag, compilation, index)
            }
            !tag.attributes && (tag.attributes = {})
            tag.attributes[key] = value
        })
    }
    apply (compiler) {
        let _self = this
        compiler.hooks.compilation.tap('htmlPlugin', compilation => {
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroup.tapAysnc('htmlPlugin',
                (data, cb) => {
                    let options = Object.assign({}, null, _self.options.attributes)
                    Object.keys(options).forEach((key) => {
                        let val = options[key]
                        if (typeof value != "string" && typeof value != 'function') return
                        _self.addAttr(data.headTags, key, value)
                        _self.addAttr(data.bodyTags, key, value)
                    })
                    if (typeof cb === 'function') {
                        cb(null, data)
                    } else {
                        return new Promise(resolve => resolve(data))
                    }
                })
        })
    }
}
```

### 参考文章

[使用vue+node搭建前端异常监控系统](https://mp.weixin.qq.com/s?__biz=MzAwMDY2OTU3NQ==&mid=2247483938&idx=1&sn=071276a967d289cd6fc52599da7099fc&chksm=9ae420caad93a9dc3338077c4ebec113ce3815b107182792312d39d3dd58a6da42f86f2d94e7&mpshare=1&scene=1&srcid=1012eLPZMNk9ggaxTGm2Ofgi&sharer_sharetime=1602485080984&sharer_shareid=12302458a55e6884c1bb1c47ff44880d&key=e916915e2e1878497a86d937dde233c512320fc8e640b974e1f6c8c394c152aad3a254e5a4afe776e24633c05a376f0859850be412fb70d735aee1c4f2c332918e39756025b36355e5ce41ffc21e4190f8b32f8a56f9edc97078f44646c9e857c3fba9fdf680b5e4f92e9cffd766a34a0f91a8b579ea96b3beaddc2db079c7e5&ascene=1&uin=MTIwOTc2NTAyMQ%3D%3D&devicetype=Windows+10+x64&version=6300002f&lang=zh_CN&exportkey=AbhxOcEv5LRRnJfJpOYk54M%3D&pass_ticket=RBJLbuhFUaC7C9iLpQ3G0QWDO%2FARo9ozdYLpRAv%2BPLVGoUhb9Vsl%2FpuWtmjHagMs&wx_header=0)

[深入理解前端性能监控](https://mp.weixin.qq.com/s?__biz=MzUzNjk5MTE1OQ==&mid=2247487964&idx=1&sn=bd50e0b48efc9a26c733e76c4159762c&chksm=faec9504cd9b1c1222b63267a27939c567cd0306a1db227eb77132be1d467be008d344cf1d04&mpshare=1&scene=1&srcid=0913rGwXFrCN0r0Sw4dlB9eI&sharer_sharetime=1600002595509&sharer_shareid=12302458a55e6884c1bb1c47ff44880d&key=2feebe5847c6e0bc331f0531a0062a22c6a77e1714978022748867c3e6f7fdf3572cc4b0f1cefc7209b4ee272f0b306f520eb065c223c2e0a75e06144b45c94decfae44e4e2efd1cef22401d277069cf0f643807b04cb9e6840b48abcb43e9235449e0abc1e91d9bdfcf71c6f95545a19135a8486191820fde8c7da86053ae2b&ascene=1&uin=MTIwOTc2NTAyMQ%3D%3D&devicetype=Windows+10+x64&version=6300002f&lang=zh_CN&exportkey=AYK1gS0QZbiyqzYZK1AxjSY%3D&pass_ticket=RBJLbuhFUaC7C9iLpQ3G0QWDO%2FARo9ozdYLpRAv%2BPLVGoUhb9Vsl%2FpuWtmjHagMs&wx_header=0)

[一文从零彻底搞懂前端的内存监控、异常、泄漏](https://mp.weixin.qq.com/s?__biz=MzI2NTk2NzUxNg==&mid=2247488384&idx=1&sn=986fa865425162a9ac23259dec41671d&chksm=ea941173dde398654a1840c5abf482e71f69274c70d27bc5aff71caf7b6c04c9984e1fa3e35a&mpshare=1&scene=1&srcid=0911J18opV3TGVyDfVt5Avkw&sharer_sharetime=1599787444615&sharer_shareid=12302458a55e6884c1bb1c47ff44880d&key=c30e52a6f1284ff4350756ad970a6facd60382717dc26f8beb7f9138b3b55be70dbdd831275f3370037525d45d6bf4b9900c7a7e126901013bb62caba32afbb5bd5b86da5997434ea34cc766ac627b280f23b48f703657f0240834d11d0b3cd13c342aa454412dea2853e0ae4059c0a44ceb3d0367d53d5b59229916b7c47b0d&ascene=1&uin=MTIwOTc2NTAyMQ%3D%3D&devicetype=Windows+10+x64&version=6300002f&lang=zh_CN&exportkey=Af4iBS%2BDgcgsY5FmtNTv1rU%3D&pass_ticket=RBJLbuhFUaC7C9iLpQ3G0QWDO%2FARo9ozdYLpRAv%2BPLVGoUhb9Vsl%2FpuWtmjHagMs&wx_header=0)

[完善的前端异常监控解决方案](https://mp.weixin.qq.com/s?__biz=MzA3MjkwNTM1Mw==&mid=2649140436&idx=1&sn=ee16143bca46329e97f825e4e8018b03&chksm=87052b32b072a224c6748fdee887fed2e674eb8a9e8e56032a5819671bf1b695bda853e5a572&mpshare=1&scene=1&srcid=0819yumnayDisywshbEeNjsy&sharer_sharetime=1597848188765&sharer_shareid=12302458a55e6884c1bb1c47ff44880d&key=e916915e2e187849eea0cdd2d2945d6d3bd32745cf323c23d708dbbfda954aa0ba6305fc22ff9311e7fad83862288bf9aa991c7b3d0c1c5df0605562458b3b4ed28b794fdafa49043d52041a8ed4bade98c6eabe9ffa31369e2e902e7f87ced69a92df3e0fb76c650fb6fbf02e73ad1600f794af1976d463655b7d6b399f38ea&ascene=1&uin=MTIwOTc2NTAyMQ%3D%3D&devicetype=Windows+10+x64&version=6300002f&lang=zh_CN&exportkey=AUHT36tpKw4Y18ZV90c0kEk%3D&pass_ticket=RBJLbuhFUaC7C9iLpQ3G0QWDO%2FARo9ozdYLpRAv%2BPLVGoUhb9Vsl%2FpuWtmjHagMs&wx_header=0)

[搭建前端监控平台之数据上报](https://mp.weixin.qq.com/s?__biz=Mzg5NDAyNjc2MQ==&mid=2247485425&idx=1&sn=c6b9cf30bc5748e5ecfea40d63949499&chksm=c0249297f7531b8196f40c0f2908cc87ff634e0f96d62cbf35ca46d6339c2ed4424ddf111e9e&mpshare=1&scene=1&srcid=1110oDOswZMOEFXzypr3tBUI&sharer_sharetime=1604981995699&sharer_shareid=12302458a55e6884c1bb1c47ff44880d&key=2feebe5847c6e0bc7b1dac79d29ea0e15a1a01f7ba190cd7eae1aa71d893790bd3d1e5299374971282fc0f5574d3e1687084eeb9129ff7b798f0595fc45d84d0def007c84690c5dce423a2c64755d6d39d17e453f7c8e003e59a53a9d14ce4ac24219b06782354121fdebe48c66b20e8195a48c44aea4d87ab3bbf7e51a7a4b4&ascene=1&uin=MTIwOTc2NTAyMQ%3D%3D&devicetype=Windows+10+x64&version=6300002f&lang=zh_CN&exportkey=ARrT%2FYtgK3GYB%2FsKP1kiQ1k%3D&pass_ticket=RBJLbuhFUaC7C9iLpQ3G0QWDO%2FARo9ozdYLpRAv%2BPLVGoUhb9Vsl%2FpuWtmjHagMs&wx_header=0)

## 大数据优化

## webpack 优化

## 代码规范和自动化监测
