# 异常监控系统

## 异常类型

### js异常

- **try-catch**

  缺点：无法捕获异步错误

- **window.error**

  可捕获异步，信息全面

  *返回true 就不会被上抛了。不然控制台中还会看到错误日志。*

  缺点：无法捕获网络请求错误

- **监听error事件**

  ```js
  window.addEventListener('error',() => {}）
  ```

- **Promise错误**

  ```js
  window.addEventListener("unhandledrejection", e => {
    throw e.reason
  });
  ```

- **Async/await 错误**

  本质就是Promise  监听 unhandledrejection 向上抛出错误即可

- **总结**

  我们可以将unhandledrejection事件抛出的异常再次抛出就可以统一通过error事件进行处理了。

  ```js
  window.addEventListener("unhandledrejection", e => {
    throw e.reason
  });
  window.addEventListener('error', args => {
    console.log('error event:', args);
    return true;
  }, 	true);
  ```

### Vue

```js
Vue.config.errorHandler = (err, vm, info) => {
    let { message, name, script = '', line = 0, column = 0, stack } = err
    console.log('errorHandler:', err)
}
```

### React

**错误边界仅可以捕获其子组件的错误**。错误边界无法捕获其自身的错误。如果一个错误边界无法渲染错误信息，则错误会向上冒泡至最接近的错误边界。

```js
import React from 'react'; 
export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
    }
  
    componentDidCatch(error, info) {
      // 发生异常时打印错误
      console.log('componentDidCatch',error)
    }
  
    render() {
      return this.props.children;
    }
  }
```



## 错误上报

### img上报

动态创建标签方式。因为这种方式**无需加载任何通讯库，而且页面是无需刷新的**。基本上目前包括百度统计 Google统计都是基于这个原理做的埋点。而且可以**通过标签来避免跨域**

```js
new Image().src = 'http://localhost:7001/monitor/error'
```

### ajax上报

```js
axios.post('http://localhost:7001/monitor/error')
```

### 上报数据

![image-20201119171440046](Project_monitorr.assets/image-20201119171440046.png)

```js
// 分别是错误信息，错误地址，lineno，colno，error.message,error.stack
```

```js
// 将info信息序列化后上传
const str = window.btoa(JSON.stringify(info))
const host = 'http://localhost:7001/monitor/error'
new Image().src = `${host}?info=${str}`
```

## 异常收集

这里使用egg 进行异常收集

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

## 日志分析

日志分析的关键在于 webpack打包时将打包完成的sourceMap进行上传

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

### 反序列化Error

使用error-stack-parser 将上传的

