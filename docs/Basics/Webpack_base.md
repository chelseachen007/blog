# webpack

## 基础概念

__webpack_require__

webpack_exports

### hash chunkhash  contenthash 区别

- hash 代码发生改变 hash就会改变

- contenthash 自身内容发生改变 才会改变

- chunkhash 同一个chunk有发生改变，都会改变

### bundle、module、chunk的区别

- bundle：一个入口文件打包后的文件，

- 每一个文件都是一个module

- bundle里的eval都是一个chunk，

  

### loader

loader 用于对模块的源代码进行转换。loader 可以使你在 `import` 或"加载"模块时预处理文件

#### 使用

举一个less-loader使用例子

```js
 rules: [
      {
        test: /\.less$/, //  匹配规则
        // use可对象，可以<string,object>数组 
        //使用对象时，可通过options传参,通过this.query获取
        use: ["my-style-loader", "my-css-loader", {
          loader: "my-less-loader",
          options: {
            name: "scssloader",
          },
        }], //多个loader从右向左
      },
    ],
```

#### 自定义loader

```js
// 函数 声明式函数 不可以是箭头函数
// 函数 必须有返回值
// 如何返回多值
// 如何处理异步逻辑
module.exports = function (source) {
  console.log(this.query);
  console.log(source);
  // 异步回调
  const callback = this.async();
  setTimeout(() => {
    const result = source.replace("webpack", this.query.name);
    callback(null, result);
  }, 2000);
  //  同步回调
  //   this.callback(null, result);
};
//this.callback(  err: Error | null,  content: string | Buffer,  sourceMap?: SourceMap,  meta?: any );
```

#### 重命名自定义loader

```js
 resolveLoader: {
    modules: ["./node_modules", "./myLoaders"],
  },
```

#### 常用loader



### plugins

插件是 webpack 的[支柱](https://github.com/webpack/tapable)功能。webpack 自身也是构建于，你在 webpack 配置中用到的**相同的插件系统**之上！

插件目的在于解决 [loader](https://www.webpackjs.com/concepts/loaders) 无法实现的**其他事**。

#### 使用

使用相当简单，具体传入参数看文档就好

```js
const HtmlWebpakcPlugin = require("html-webpack-plugin");
  
plugins: [new HtmlWebpakcPlugin(), new CleanWebpackPlugin(), new fileWebpackPlugin()],
```

#### 自定义Plugins

```js
class fileWebpackPlugin {
  //   constructor(options) {
  //     console.log(options);
  //   }
  //如何钩入hooks
  apply (compiler) {
    compiler.hooks.emit.tapAsync("fileWebpackPlugin", (compilation, cb) => {
      const len = Object.keys(compilation.assets).length;
      let content = `文件的数量：${len}`;
      for (let filename in compilation.assets) {
        content += `\n ${filename}`;
      }
      compilation.assets[`file.txt`] = {
        source: function () {
          return content;
        },
        size: function () {
          return 1024;
        },
      };
      cb();
    });
  }
}
module.exports = fileWebpackPlugin;
```

在插件开发中最重要的两个资源就是 `compiler` 和 `compilation` 对象。理解它们的角色是扩展 webpack 引擎重要的第一步。

- `compiler` 对象代表了**完整的 webpack 环境配置**。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。
- `compilation` 对象代表了一次资源版本构建。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组**新的编译资源**。一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。

####  查看配置的webpack周期

```js
const compiler = webpack(config);
Object.keys(compiler.hooks).forEach((hookName) => {
  compiler.hooks[hookName].tap("xxxx", () => {
    console.log(`run====> ${hookName}`);
  });
});

compiler.run();
```

### sourceMap 

- eval:速度最快，使用eval包裹代码
- source-map：产生`.map`文件，外部产生错误代码的位置和信息
- cheap：较快，不包含列信息
- Module：第三方模块，包含loader的sourceMap
- inline：将`.map`文件作为dateURI嵌入，不单独生成

*验证 devtool 名称时， 我们期望使用某种模式， 注意不要混淆 devtool 字符串的顺序， 模式是：* `[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map`*.*

![img](Webpack_base.assets/clipboard.png)

#### 推荐配置

vuecli  production采用 source-map

development 采用 cheap-module-eval-source-map

### 热更新

启动一个websocket 监听文件id变化，执行除以js，并重新执行

```js
if (module.hot) {
  module.hot.accept("./number", function () {
    document.body.removeChild(document.getElementById("number"));
    number();
  });
}
```

热更新插件也就是通过对每个文件进行监听

### babel

#### 预设

1.babel-loader是webpack 与 babel的通信桥梁，不会做把es6转成es5的⼯作，这部分⼯作需要⽤到 **@babel/preset-env**来做 2.@babel/preset-env⾥包含了es，6，7，8转es5的转换规则

#### polyfill

默认的Babel只⽀持let等⼀些基础的特性转换，Promise等⼀些还有转换过 来，这时候需要借助@babel/polyfill，把es的新特性都装进来，来弥补低版本浏览器中缺失的特性

```js
//index.js 顶部
import "@babel/polyfill";
```

#### 按需加载

```js
//.babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          //目标环境
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11"
        },
        "corejs": 2,//新版本需要指定核⼼库版本
        "useBuiltIns": "usage"
      }
    ],
    "@babel/preset-react"
  ]
}

```

useBuiltIns 选项是 babel 7 的新功能，这个选项告诉 babel 如何配置 @babel/polyfill 。 它有三 个参数可以使⽤： 

①entry: 需要在 webpack 的⼊⼝⽂件⾥ import "@babel/polyfill" ⼀ 次。 babel 会根据你的使⽤情况导⼊垫⽚，没有使⽤的功能不会被导⼊相应的垫⽚。

 ②usage: 不需要 import ，全⾃动检测，但是要安装 @babel/polyfill 。（试验阶段） 

③false: 如果你 import "@babel/polyfill" ，它不会排除掉没有使⽤的垫⽚，程序体积会庞⼤。(不推荐)

## tree-shaking

webpack4 的production 默认开启了 treeshking

如果是webpack2 ，可能会不起作用，因为babel会将代码转化成commonjs 模块，而treeshaking不支持

```
options:{presets:[["es2015",{module:false}]]}
```

### 副作用side effects

side effects是指那些当import 的时候会执行一些动作，但是不一定会有任何export。比如ployfill

tree-shaking不能自动的识别那些代码属于side effcets 所以，有些需要手动指定

```json
## pagejson
{
    name:'tree-shaking',
    "sideEffects":false,
    // sideEffects:[
    // './src/common/ployfill.js'
    // ]
}
```



