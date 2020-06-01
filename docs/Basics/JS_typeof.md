# 类型检测

## 基本类型和引用类型

JS 有两种类型，分别是基本类型和引用类型。

基本数据类型:

1. Number
2. Boolean
3. String
4. undefined
5. null
6. Symbol(ES6 新增 表示唯一值)

引用数据类型：
统称 `Object` 对象,包括对象`Object`、数组 `Array` 和函数 `Function`

值得一提的是基本类型存储在栈中（stack），引用类型将在栈中存储了指针，并将指针指向堆中实体的实际地址。

## 如何判断是什么类型

### typeof

typeof 可以返回一个表示数据类型的字符串，返回结果包括： `number` , `boolean` , `string` , `symbol` , `object` , `undefined` , `function` 7 种数据类型 ，但是不能判断 null 和 array（也属于 object）等
<img :src="$withBase('/JavaScript/typeof.png')" alt="typeof">

Array 属于 Object 我可以理解，为什么 null 也是呢？

这就涉及到了 typeoof 的设计原理了，他是通过判断底层类型的二进制

- null：所有机器码均为 0
- undefined：用 −2^30 整数来表示
- 000：对象
- 010：浮点数
- 100：字符串
- 110：布尔
- 1：整数

`typeof` 判断前三位都是 0 的就是对象，所以全是 0 的 `Null` 自然也被判断为 `object` 了

### instanceof

**instanceof** 运算符用于检测构造函数的 **prototype** 属性是否出现在某个实例对象的原型链上。

但这种方式弊端比较多

1. 对于基本数据类型来说，字面量方式创建出来的结果和实例方式创建出来的是有区别的

```JavaScript
1 instanceof Number //false
new Number(1) instanceof Number //true
```

2. 只要在当前实例的原型链上，我们用其检测出来的结果都是 true。在类的原型继承中，我们最后检测出来的结果未必准确。

```JavaScript
let fn= function(){}
fn instanceof Function //false
fn instanceof Object //true
```

3. 对于特殊的数据类型 `null` 和 `undefined`，他们的所属类是 Null 和 Undefined，但是浏览器把这两个类保护起来了，不允许我们在外面访问使用

```JavaScript
undefined instanceof undefined
null instanceof null
// Uncaught TypeError: Right-hand side of 'instanceof' is not an object
```

#### 原理

instanceof 检测一个对象 A 是不是另一个对象 B 的实例的原理是：
查看 对象 B 的 `prototype` 指向的对象是否在 对象 A 的 [[prototype]] 链上。
如果在，则返回 `true`, 如果不在则返回 `false`。

```Js
let myinstanceof = function(left, right) {
  let target = left.prototype;
  while (target) {
    if (target.__proto__ === right.prototype) return true;
    target = target.__proto__;
  }
  return false;
};
```

### constructor

**constructor** 是每个构造函数都会有的属性，但可想而知 `Null` 和 `undefined` 没有构造函数 所以无法判断，另外在类的原型在重写过程中容易把 `constructor` 覆盖掉，所以这种检测结果是不稳定的

### Object.prototype.toString.call()

```JavaScript
Object.prototype.toString.call({})              // '[object Object]'
Object.prototype.toString.call([])              // '[object Array]'
Object.prototype.toString.call(() => {})        // '[object Function]'
Object.prototype.toString.call('seymoe')        // '[object String]'
Object.prototype.toString.call(1)               // '[object Number]'
Object.prototype.toString.call(true)            // '[object Boolean]'
Object.prototype.toString.call(Symbol())        // '[object Symbol]'
Object.prototype.toString.call(null)            // '[object Null]'
Object.prototype.toString.call(undefined)       // '[object Undefined]'

Object.prototype.toString.call(new Date())      // '[object Date]'
Object.prototype.toString.call(Math)            // '[object Math]'
Object.prototype.toString.call(new Set())       // '[object Set]'
Object.prototype.toString.call(new WeakSet())   // '[object WeakSet]'
Object.prototype.toString.call(new Map())       // '[object Map]'
Object.prototype.toString.call(new WeakMap())   // '[object WeakMap]'

```

`Object` 上的 toString()方法，它的作用是返回当前方法执行的主体（方法中的 this ）所属类的详细信息即 “[object Object]”， 其中第一个 object 代表当前实例是对象数据类型的（这个是固定死的，不会改变），第二个 Object 代表的是 this 所属的类是 Object。

#### 原理

在 toString 方法被调用时,会执行下面的操作步骤:

1.  如果 this 未定义时，返回“[object Undefined]”
2.  如果 this 为 null 时，返回“[object Null]”
3.  定义 O，并且让 O=ToObject(this)
4.  获取 this 对象的 [[Class]] 属性的值.
5.  计算出三个字符串"[object ", 第一步的操作结果 Result(1), 以及 "]"连接后的新字符串.
6.  返回第二步的操作结果 Result(2).

[[Class]] 是一个内部属性,所有的对象(原生对象和宿主对象)都拥有该属性.在规范中, [[Class]] 是这么定义的：**一个字符串值,表明了该对象的类型.**

可以清晰的得出 `toString()`是在以特殊的字符串形式输出 `this` 的类型，不管你传入什么参数，该方法都是执行了 **window.toString()** 方法，`this` 一直指向了 `window` **对象**，
所以在判断类型时也可以直接使用 **toString.call(arr)**

#### isArray

ES6 的 isArray 也是通过 toString 实现的

```JavaScript
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```

#### 封装函数

```JavaScript
    var type = function(data) {
      var toString = Object.prototype.toString;
      var dataType = toString
              .call(data)
              .replace(/\[object\s(.+)\]/, "$1")
              .toLowerCase()
      return dataType
};
```

## 总结

`typeof` 适合用来判断基本类型
`instanceof` 和 `constructor` 虽然也能判断类型，但是弊端比较多不推荐使用
最后，`toString` 大法好
