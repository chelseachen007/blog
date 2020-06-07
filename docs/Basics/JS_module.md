# 前端模块化

`CommonJS`、`AMD`、`CMD`都是社区对模块定义的规范，而`NodeJS`、`RequireJS`，`seaJS`则分别是对这三种规范的实现。

以下按时间线了解这几种规范

## CommonJS

commonJs**规范**通过简单的API声明服务器的模块，目标是让JavaScript可以运行在**浏览器之外**的所有地方。Node.js就是借鉴ComminJs实现了一套非常易用的模块系统，以及NPM对模块规范的完美支持是的Node.js应用开发事半功倍。

- require：用来引用模块
- export:用来导出模块
  - module.exoirts:对外导出一个对象
  - exports.xxx:可以对外导出多个对象

**注意：核心是module.exports，exports只是module.exports的引用而已**

在每个模块代码执行之前，Node.js 都会将它包裹在这样一个函数里

```js
(function (exports,require,module,__filename,__dirname){

})
```




## AMD和require.js

AMD是为了弥补commonjs规范在浏览器中目前无法支持ES6的一种解决方案。异步模块定义规范（AMD）制定了定义模块的规则，这样模块和模块的依赖可以被异步加载。这和浏览器的异步加载模块的环境刚好适应（浏览器同步加载模块会导致性能、可用性、调试和跨域访问等问题）。

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



## CMD

CMD是另一种js模块化方案，它与AMD很类似，不同点在于：**AMD 推崇依赖前置、提前执行**，**CMD推崇依赖就近、延迟执行**。

```js
define(function(require, exports, module) {
    var a = require('./a'); //在需要时申明
    a.doSomething();
    
    if (false) {
        var b = require('./b');
        b.doSomething();
    }
});

```



## ESModule

ES模块的目标是创建一个同时兼容CommonJs和AMD的格式，使语法更加紧凑，通过编译时加载，在编译时就能确定模块的依赖关系，比CommonJS模块的加载效率更高。而在异步加载和配置模块加载方面，则借鉴AMD规范，执行效率、灵活度都远远好于CommonJS写法。总的来说，ES的优势如下：

- 语法更加紧凑
- 结构更适用于静态编译（静态类型检查、优化等）
- 对循环应用的支持更好。
- 用法简单，不需要关注实现细节
- 采用声明式语法：没有require关键字
- 程序化加载API：可以设置模块如何加载并按需加载

关于循环引用：import 语句的静态加载语义意味着可以确保通过 import 相互依赖的 "foo" 和 "bar" 在其中任何一个运行之前，二者都会被加载、解析和编译。所以它们的环依赖是静态决议的



我们应该大胆拥抱ESModules，snowpack和webpack的tree-shaking通过静态编译进行大幅优化。

## **CommonJS与ES6 Modules规范的区别**

- CommonJS模块是运行时加载，ES6 Modules是编译时输出接口
- CommonJS输出是值的拷贝；ES6 Modules输出的是值的引用，被输出模块的内部的改变会影响引用的改变
- CommonJs导入的模块路径可以是一个表达式，因为它使用的是require()方法；而ES6 Modules只能是字符串
- CommonJS this指向当前模块，ES6 Modules this指向undefined
- 且ES6 Modules中没有这些顶层变量：arguments、require、module、exports、__filename、__dirname

