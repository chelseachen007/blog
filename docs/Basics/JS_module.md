# 前端模块化

`CommonJS`、`AMD`、`CMD`都是社区对模块定义的规范，而`NodeJS`、`RequireJS`，`seaJS`则分别是对这三种规范的实现。

以下按时间线了解这几种规范

## CommonJS

commonJs**规范**通过简单的 API 声明服务器的模块，目标是让 JavaScript 可以运行在**浏览器之外**的所有地方。Node.js 就是借鉴 ComminJs 实现了一套非常易用的模块系统，以及 NPM 对模块规范的完美支持是的 Node.js 应用开发事半功倍。

- require：用来引用模块
- export:用来导出模块
  - module.exoirts:对外导出一个对象
  - exports.xxx:可以对外导出多个对象

**注意：核心是 module.exports，exports 只是 module.exports 的引用而已**

在每个模块代码执行之前，Node.js 都会将它包裹在这样一个函数里

```js
(function (exports, require, module, __filename, __dirname) {});
```

## AMD 和 require.js

AMD 是为了弥补 commonjs 规范在浏览器中目前无法支持 ES6 的一种**异步解决方案**。异步模块定义规范（AMD）制定了定义模块的规则，这样模块和模块的依赖可以被异步加载。这和浏览器的异步加载模块的环境刚好适应（浏览器同步加载模块会导致性能、可用性、调试和跨域访问等问题）。

```js
define("alpha", ["require", "exports", "beta"], function (
  require,
  exports,
  beta
) {
  exports.verb = function () {
    return beta.verb();
    //Or:

    return require("beta").verb();
    if (false) {
      // 即便没用到某个模块 ,还是提前执行了
      alpha();
    }
  };
});
```

## CMD 和 Sea.js

CMD 是另一种 js 模块化方案，它与 AMD 很类似，不同点在于：**AMD 推崇依赖前置、提前执行**，**CMD 推崇依赖就近、延迟执行**。

```js
define(function (require, exports, module) {
  var a = require("./a"); //在需要时申明
  a.doSomething();

  if (false) {
    var b = require("./b");
    b.doSomething();
  }
});
```

## ESModule

ES 模块的目标是创建一个同时兼容 `CommonJs` 和 `AMD` 的格式，使语法更加紧凑，通过编译时加载，在编译时就能确定模块的依赖关系，比 `CommonJS` 模块的加载效率更高。而在异步加载和配置模块加载方面，则借鉴 AMD 规范，执行效率、灵活度都远远好于 `CommonJS` 写法。总的来说，ES Module 的优势如下：

- 语法更加紧凑
- 结构更适用于静态编译（静态类型检查、优化等）
- 对循环应用的支持更好。
- 用法简单，不需要关注实现细节
- 采用声明式语法：没有 require 关键字
- 程序化加载 API：可以设置模块如何加载并按需加载

关于循环引用：import 语句的静态加载语义意味着可以确保通过 import 相互依赖的 "foo" 和 "bar" 在其中任何一个运行之前，二者都会被加载、解析和编译。所以它们的环依赖是静态决议的

我们应该大胆拥抱 ESModules,`snowpack` 和 `webpack` 的 `tree-shaking` 通过静态编译进行大幅优化。

## **CommonJS 与 ES6 Modules 规范的区别**

- CommonJS 模块是**运行时加载**，ES6 Modules **是编译时输出接口**
- CommonJS 输出是**值的拷贝**；ES6 Modules 输出的是**值的引用**，被输出模块的内部的改变会影响引用的改变
- CommonJs 导入的模块路径可以是一个表达式，因为它使用的是 require()方法；而 ES6 Modules 只能是字符串
- CommonJS `this` 指向当前模块，ES6 Modules `this` 指向 `undefined`
- 且 ES6 Modules 中没有这些顶层变量：`arguments`、`require`、`module`、`exports`、`filename`、`dirname`
