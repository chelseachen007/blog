# 简易项目

```cmd
cnpm init egg --type=simple
npx create-nuxt-app front
```

## 项目规范

commitlint，eslint，prettier，

husky 验证

git flow actions 验证

## 登录权限

图片验证码 svg-captcha

密码加密 md5

session 模式 后端 setCookie 前端无需操作鉴权， redis 存储 取值

jwt 模式 前端登录后 后端将登录信息和过期时间加密成一个 token，前端存入 localstorage 并在 axios 为每个请求携带上 jsonwebtoken

middleware 验证头部 header.authorization 的 token

邮箱验证 nodemailer

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

## FileReader

`**FileReader**` 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 或 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象指定要读取的文件或数据。

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

### 不同事件上传 + 进度条

拖拽上传

```js
drag.addEventListener("dragover", () => {});
drag.addEventListener("dragleave", () => {});
drag.addEventListener("drop", () => {});
```
