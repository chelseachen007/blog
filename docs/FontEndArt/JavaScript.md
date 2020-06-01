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

## 下一道幸运题目
