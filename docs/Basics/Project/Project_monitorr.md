# 异常监控系统

## 异常类型

### js 异常

- **try-catch**

  缺点：无法捕获异步错误

- **window.error**

  可捕获异步，信息全面

  _返回 true 就不会被上抛了。不然控制台中还会看到错误日志。_

  缺点：无法捕获网络请求错误

- **监听 error 事件**

  ```js
  window.addEventListener('error',() => {}）
  ```

- **Promise 错误**

  ```js
  window.addEventListener("unhandledrejection", (e) => {
    throw e.reason;
  });
  ```

- **Async/await 错误**

  本质就是 Promise 监听 unhandledrejection 向上抛出错误即可

- **总结**

  我们可以将 unhandledrejection 事件抛出的异常再次抛出就可以统一通过 error 事件进行处理了。

  ```js
  window.addEventListener("unhandledrejection", (e) => {
    throw e.reason;
  });
  window.addEventListener(
    "error",
    (args) => {
      console.log("error event:", args);
      return true;
    },
    true
  );
  ```

### Vue

```js
Vue.config.errorHandler = (err, vm, info) => {
  let { message, name, script = "", line = 0, column = 0, stack } = err;
  console.log("errorHandler:", err);
};
```

### React

**错误边界仅可以捕获其子组件的错误**。错误边界无法捕获其自身的错误。如果一个错误边界无法渲染错误信息，则错误会向上冒泡至最接近的错误边界。

```js
import React from "react";
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidCatch(error, info) {
    // 发生异常时打印错误
    console.log("componentDidCatch", error);
  }

  render() {
    return this.props.children;
  }
}
```

## 错误上报

### img 上报

动态创建标签方式。因为这种方式**无需加载任何通讯库，而且页面是无需刷新的**。基本上目前包括百度统计 Google 统计都是基于这个原理做的埋点。而且可以**通过标签来避免跨域**

```js
new Image().src = "http://localhost:7001/monitor/error";
```

### ajax 上报

```js
axios.post("http://localhost:7001/monitor/error");
```

### 上报数据

![image-20201119171440046](./images/image-20201119171440046.png)

```js
// 分别是错误信息，错误地址，lineno，colno，error.message,error.stack
```

```js
// 将info信息序列化后上传
const str = window.btoa(JSON.stringify(info));
const host = "http://localhost:7001/monitor/error";
new Image().src = `${host}?info=${str}`;
```

## 异常收集

这里使用 egg 进行异常收集

将错误接收并转码写入到日志中

```js
async index() {
    const { ctx } = this;
    const { info } = ctx.query
    const json = JSON.parse(Buffer.from(info, 'base64').toString('utf-8'))
    console.log('fronterror:', json)
    // 记入错误日志
    this.ctx.getLogger('frontendLogger').error(json)
    ctx.body = '';
  }
```

## **整理与上报方案**

除了异常报错信息本身，我们还需要记录用户操作日志，以实现场景复原。这就涉及到上报的量和频率问题。如果任何日志都立即上报，这无异于自造的DDOS攻击。因此，我们需要合理的上报方案。

### **前端存储日志**

|              |        |              |                |            |        |
| ------------ | ------ | ------------ | -------------- | ---------- | ------ |
| **存储方式** | cookie | localStorage | sessionStorage | IndexedDB  | webSQL |
| **类型**     |        | key-value    | key-value      | NoSQL      | SQL    |
| **数据格式** | string | string       | string         | object     |        |
| **容量**     | 4k     | 5M           | 5M             | 500M       | 60M    |
| **进程**     | 同步   | 同步         | 同步           | 异步       | 异步   |
| **检索**     |        | key          | key            | key, index | field  |
| **性能**     |        | 读快写慢     |                | 读慢写快   |        |

综合之后，IndexedDB是最好的选择，它具有容量大、异步的优势，异步的特性保证它不会对界面的渲染产生阻塞。缺点，就是api非常复杂，不像localStorage那么简单直接。针对这一点，我们可以使用**hello-indexeddb**这个工具

当一个事件、变动、异常被捕获之后，形成一条初始日志，被立即放入暂存区（indexedDB的一个store），之后主程序就结束了收集过程，**后续的事只在webworker中发生**。在一个webworker中，一个循环任务不断从暂存区中取出日志，对日志进行分类，将分类结果存储到索引区中，并对日志记录的信息进行丰富，将最终将会上报到服务端的日志记录转存到归档区

## 日志分析

日志分析的关键在于 webpack 打包时将打包完成的 sourceMap 进行上传

### webpack Plugins

```js
apply(compiler) {
    console.log('UploadSourceMapWebPackPlugin apply')
    // 定义在打包后执行
    compiler.hooks.done.tap('upload-sourecemap-plugin', async status => {
        // 读取sourcemap文件
        const list = glob.sync(path.join(status.compilation.outputOptions.path, `./**/*.{js.map,}`))
        // console.log('list:', list)
        for (let filename of list) {
            await this.upload(this.options.uploadUrl, filename)
        }
    })
}
```

### 服务端接收并保存

```js
async upload() {
    const { ctx } = this
    const stream = ctx.req
    const filename = ctx.query.name
    const dir = path.join(this.config.baseDir, 'uploads')
    // 判断upload目录是否存在
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    const target = path.join(dir, filename)
    const writeStream = fs.createWriteStream(target)
    stream.pipe(writeStream)
}
```

### 反序列化 Error

使用 error-stack-parser 将上传的





## 信息上报

### 用户体验层

 window.performance.timing

```js
timing: {
        // 同一个浏览器上一个页面卸载(unload)结束时的时间戳。如果没有上一个页面，这个值会和fetchStart相同。
	navigationStart: 1543806782096,

	// 上一个页面unload事件抛出时的时间戳。如果没有上一个页面，这个值会返回0。
	unloadEventStart: 1543806782523,

	// 和 unloadEventStart 相对应，unload事件处理完成时的时间戳。如果没有上一个页面,这个值会返回0。
	unloadEventEnd: 1543806782523,

	// 第一个HTTP重定向开始时的时间戳。如果没有重定向，或者重定向中的一个不同源，这个值会返回0。
	redirectStart: 0,

	// 最后一个HTTP重定向完成时（也就是说是HTTP响应的最后一个比特直接被收到的时间）的时间戳。
	// 如果没有重定向，或者重定向中的一个不同源，这个值会返回0. 
	redirectEnd: 0,

	// 浏览器准备好使用HTTP请求来获取(fetch)文档的时间戳。这个时间点会在检查任何应用缓存之前。
	fetchStart: 1543806782096,

	// DNS 域名查询开始的UNIX时间戳。
        //如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和fetchStart一致。
	domainLookupStart: 1543806782096,

	// DNS 域名查询完成的时间.
	//如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
	domainLookupEnd: 1543806782096,

	// HTTP（TCP） 域名查询结束的时间戳。
        //如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和 fetchStart一致。
	connectStart: 1543806782099,

	// HTTP（TCP） 返回浏览器与服务器之间的连接建立时的时间戳。
        // 如果建立的是持久连接，则返回值等同于fetchStart属性的值。连接建立指的是所有握手和认证过程全部结束。
	connectEnd: 1543806782227,

	// HTTPS 返回浏览器与服务器开始安全链接的握手时的时间戳。如果当前网页不要求安全连接，则返回0。
	secureConnectionStart: 1543806782162,

	// 返回浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的时间戳。
	requestStart: 1543806782241,

	// 返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的时间戳。
        //如果传输层在开始请求之后失败并且连接被重开，该属性将会被数制成新的请求的相对应的发起时间。
	responseStart: 1543806782516,

	// 返回浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时
        //（如果在此之前HTTP连接已经关闭，则返回关闭时）的时间戳。
	responseEnd: 1543806782537,

	// 当前网页DOM结构开始解析时（即Document.readyState属性变为“loading”、相应的 readystatechange事件触发时）的时间戳。
	domLoading: 1543806782573,

	// 当前网页DOM结构结束解析、开始加载内嵌资源时（即Document.readyState属性变为“interactive”、相应的readystatechange事件触发时）的时间戳。
	domInteractive: 1543806783203,

	// 当解析器发送DOMContentLoaded 事件，即所有需要被执行的脚本已经被解析时的时间戳。
	domContentLoadedEventStart: 1543806783203,

	// 当所有需要立即执行的脚本已经被执行（不论执行顺序）时的时间戳。
	domContentLoadedEventEnd: 1543806783216,

	// 当前文档解析完成，即Document.readyState 变为 'complete'且相对应的readystatechange 被触发时的时间戳
	domComplete: 1543806783796,

	// load事件被发送时的时间戳。如果这个事件还未被发送，它的值将会是0。
	loadEventStart: 1543806783796,

	// 当load事件结束，即加载事件完成时的时间戳。如果这个事件还未被发送，或者尚未完成，它的值将会是0.
	loadEventEnd: 1543806783802
}
```

通过以上数据，我们可以得到几个有用的时间

```js
// 重定向耗时
redirect: timing.redirectEnd - timing.redirectStart,
// DOM 渲染耗时
dom: timing.domComplete - timing.domLoading,
// 页面加载耗时
load: timing.loadEventEnd - timing.navigationStart,
// 页面卸载耗时
unload: timing.unloadEventEnd - timing.unloadEventStart,
// 请求耗时
request: timing.responseEnd - timing.requestStart,
// 获取性能信息时当前时间
time: new Date().getTime(),
```

### 业务层

- PV(Page View)：页面浏览量或点击量
- UV()：指访问某个站点的不同ip地址的人数
- 页面停留时间：用户在每一个页面的停留时间