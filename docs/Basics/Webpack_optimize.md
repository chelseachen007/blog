# Webpack优化

## 速度分析 

```js
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

let webpackProdOut = webpackMerge(webpackBase, webpackProd)
if (process.env.SMP_OPEN) {
  webpackProdOut = smp.wrap(webpackProdOut);
}
```

检查那个插件或者loader时间过长，可以配合缓存进行优化

```cmd
 SMP  ⏱
General output time took 1.52 secs

 SMP  ⏱  Plugins
TerserPlugin took 0.269 secs
HtmlWebpackPlugin took 0.161 secs
UglifyJsPlugin took 0.141 secs
Object took 0.03 secs
CompressionPlugin took 0.021 secs
OptimizeCssAssetsWebpackPlugin took 0.002 secs
MiniCssExtractPlugin took 0.001 secs
HashedModuleIdsPlugin took 0 secs

 SMP  ⏱  Loaders
babel-loader took 0.746 secs
  module count = 2
html-webpack-plugin took 0.021 secs
  module count = 2
```

## 体积分析

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

if (WATCH_ANALYZER) {
  plugins.push(new BundleAnalyzerPlugin())
}
```

就会生成一个可视化的体积页面，进行分析优化，将大包进行分包，不常更新的包进行CDN引入，或者打成DLL包

## 多进程打包

`thread-loader` 会将你的 `loader` 放置在一个 `worker` 池里面运行，以达到多线程构建。

```js
rules: [
      {
        test: /\.js$/,
        include: path.resolve("src"),
        use: [
          "thread-loader",
          // your expensive loader (e.g babel-loader)
        ]
      }
    ]
```

## 代码压缩

webpack4 已经默认支持 ES6语法的压缩。所以不用uglyjs 该用webpack官方的 terser-webpack-plugin

```js
optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4,
      }),
    ],
  },
```

## DLL打包

在使用`webpack`进行打包时候，对于依赖的第三方库，比如`vue`，`vuex`等这些不会修改的依赖，我们可以让它和我们自己编写的代码分开打包，这样做的好处是每次更改我本地代码的文件的时候，`webpack`只需要打包我项目本身的文件代码，而不会再去编译第三方库。

那么第三方库在第一次打包的时候只打包一次，以后只要我们不升级第三方包的时候，那么`webpack`就不会对这些库去打包，这样的可以快速的提高打包的速度。其实也就是`预编译资源模块`。

### DllPlugin

`DLLPlugin` 插件是在一个额外独立的`webpack`设置中创建一个只有`dll`的`bundle`，也就是说我们在项目根目录下除了有`webpack.config.js`，还会新建一个`webpack.dll.js`文件。

`webpack.dll.js`的作用是把所有的第三方库依赖打包到一个`bundle`的`dll`文件里面，还会生成一个名为 `manifest.json`文件。该`manifest.json`的作用是用来让 `DllReferencePlugin` 映射到相关的依赖上去的。

### DllReferencePlugin

这个插件是在`webpack.config.js`中使用的，该插件的作用是把刚刚在`webpack.dll.js`中打包生成的`dll`文件引用到需要的预编译的依赖上来。

`vendor-manifest.json`文件就是一个第三方库的映射而已。

```js
//* webpack.dll.js

const path = require('path');
const webpack = require('webpack');
module.exports = {
  mode: 'production',
  entry: {
    vendors: ['lodash'],
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dll'),
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '../dll/[name].manifest.json')
    })
  ]
}
```



```js
// webpack.config.base.js
const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
files.forEach(file => {
  if (/.*\.dll.js/.test(file)) {
    plugins.push(new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll', file)
    }))
  }
  if (/.*\.manifest.json/.test(file)) {
    plugins.push(new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll', file)
    }))
  }
})
```

## 利用缓存

### babel-loader

```js
 {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [{
      loader: "babel-loader",
      options: {
        cacheDirectory: true
      }
    }],
  },
```

### cache-loader

```js
        use: [
          'cache-loader',
          ...loaders
        ],
```

请注意，保存和读取这些缓存文件会有一些时间开销，所以请只对性能开销较大的 `loader` 使用此 `loader`。可以结合smp分析

### hard-source-webpack-plugin

```js
// webpack.config.js
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  output: // ...
  plugins: [
    new HardSourceWebpackPlugin()
  ]
}
```

构建速度提升50%以上 `webpack5`中会内置`hard-source-webpack-plugin`。

## 缩小构建范围

```js
      {
        test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'font/[name]-[hash:8].[ext]',
          },
        }],
        include,
        exclude,
      },
```

