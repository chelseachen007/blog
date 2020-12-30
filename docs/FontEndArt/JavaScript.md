# JavaScript 专题

## 判断数组的方法？

```JavaScript
const arr = []

Array.isArray(arr)

Object.prototype.toString.call(arr) === '[object Array]'

toString.call(arr) === '[object Array]'

arr instanceof Array

arr.constructor===Array

```

1. ES6 新增的 `isArray` 方法
2. 通过 `Object` 类型的副属性 class 判断
3. 判断是否在 `Array` 的原型链上
4. 判断 `constructor` 是不是 `Array`

#### toString 不是对象原型链上的方法吗，为什么可以直接 toString()

而常量是没有方法的，为什么能够调用方法呢？答案是这样的，五种基本类型除了 `null`、`undefined` ` 以外都有与之对应的特殊的引用类型——包装类型。当代码被解释执行时，底层会对基本类型做一个类型转换，即将基本类型转换成引用类型，这样就可以调用相应引用类型有权访问到的方法。

#### isArray 是怎么实现的

```JavaScript
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```

其实就是**方法二**的一种封装，所以总结下 通过 **原型链**、**构造函数**和 **Object 副属性**三种方法判断

说到这里，我去写下如何判断各种类型。

## 前端模块化发展了解吗

最先有的是 CommonJS，为了是让 JS 可以运行在浏览器之外，得到了 NodeJS 的完美支持，但是因为浏览器同步加载文件会造成性能问题，所以 AMD 和 CMD 作为异步加载的规范诞生了，他们很类似，但是 AMD 推崇**依赖前置，提前执行**，CMD 则推崇**依赖就近，延迟执行**。但是，ES6 的 module 通过静态编译实现比 ComonJS 更佳的性能，借鉴了 AMD 的异步却拥有更高的灵活度，所以我们应该拥抱 ESmodule，现代的 snowPack 和 Vite 都是通过静态编译大幅度提升了打包速度。

## 解决 0.1 + 0.2 !=0.3

产生原因：js 中的数字是采用双精度 64 位浮点数存储，计算使用二进制，呈现结果时才会转换成十进制，当十进制小数的二进制表示的有限数字超过 52 位时，在 JavaScript 里是不能精确存储的，这时候就存在舍入误差

```js
//0.1+0.2==0.3
function FixAdd(nums1, nums2) {
  return (nums1 * 1000 + nums2 * 1000) / 1000;
}
function FixAdd(nums1, nums2) {
  return (nums1 + nums2).toFixed(1);
}
```

## this 指向

## 下一道幸运题目
