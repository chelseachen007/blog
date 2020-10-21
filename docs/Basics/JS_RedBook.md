# 红宝书第四版

## 数组

- array.keys()
- array.values()
- array.entries()
- array.fill(0)
- array.copyWithin() // 批量复制
- slice()
- concat()
- splice()
- every() 
- filter() 
- find() 
- findIndex()
- forEach()
- indexOf() 
- join() 
- lastIndexOf() 
- length 
- map() 
- reduce() 
- reduceRight() 
- reverse() 
- some() 
-  sort() 
-  toLocaleString() 
-  toString() 

## Map

### api

- get
- set
- has
- size
- delete

### object 和 map

- 内存大小

给定固定大小的内存，Map 大约可以比 Object 多存储 50%的键/值对。

- 插入性能

Map稍快

- 查找速度

Object稍快

- 删除性能

object的delete 一直值得诟病，所以map完胜

## WeakMap

弱映射中的键只能是 Object 或者继承自 Object 的类型，尝试使用非对象设置键会抛出 TypeError。值的类型没有限制。

### 弱键

WeakMap 中“weak”表示弱映射的键是“弱弱地拿着”的。意思就是，这些键不属于正式的引用， 不会阻止垃圾回收。但要注意的是，弱映射中值的引用可不是“弱弱地拿着”的。**只要键存在，键/值 对就会存在于映射中**，并被当作对值的引用，因此就不会被当作垃圾回收。

可以用来创建一些 **私有变量**

## Set

添加元素 set.add()

其他都和map，weakmap类似



## 迭代器与生成器 

**迭代器模式**（特别是在 ECMAScript 这个语境下）描述了一个方案，即可以把有些结构称为“可迭代对象”（iterable），因为它们实现了正式的 Iterable 接口，而且可以通过迭代器 `Iterator `消费

很多内置类型都实现了 Iterable 接口：

- 字符串
- 数组
- 映射
- 集合
- arguments 对象 
-  NodeList 等 DOM 集合类型

```js
// 这两种类型没有实现迭代器工厂函数
console.log(num[Symbol.iterator]); // undefined
console.log(obj[Symbol.iterator]); // undefined 
```

### 自定义迭代器

```js
class Counter {
  constructor(limit) {
    this.limit = limit;
  }

  [Symbol.iterator]() {
    let count = 1,
        limit = this.limit;
    return {
      next() {
        if (count <= limit) {
          return { done: false, value: count++ };
        } else {
          return { done: true };
        }
      },
      return() {
        console.log('Exiting early');
        return { done: true };
      }
    };
  }
}
```

### generator

generator就是一个实现了 Iterator 接口的函数，因此具有next方法

#### yield 中断执行

yield 关键字可以让生成器停止和开始执行，也是生成器最有用的地方。

#### 使用 yield 实现输入和输出

 除了可以作为函数的中间返回语句使用，yield 关键字还可以作为函数的中间参数使用。上一次让 生成器函数暂停的 yield 关键字会接收到传给 next()方法的第一个值。

#### throw

## 对象

### 属性的类型

- [[Configurable]]：表示属性是否可以通过 delete 删除并重新定义，是否可以修改它的特性，以及是否可以把它改为访问器属性。默认为 true，
- [[Enumerable]]：表示属性是否可以通过 for-in 循环返回。默认为 true，
-  [[Writable]]：表示属性的值是否可以被修改。默认为 true，
-  [[Value]]：包含属性实际的值。这就是前面提到的那个读取和写入属性值的位置。这个特性 的默认值为 undefined。

### API

-  Object.getOwnPropertyDescriptors()  ：会在每个自有属性上调用 Object.getOwnPropertyDescriptor()并在一个新对象中返回它们
- Object.assign()：将每个源对象中可枚举（Object.propertyIsEnumerable()返回 true） 和自有（Object.hasOwnProperty()返回 true）属性复制到目标对象。对每个符合条件的属性，这个方法会使用源对象上的[[Get]]取得属性的值，然后使用目标 对象上的[[Set]]设置属性的值。
- Object.is() 正确的 -0,0，+0和NaN判断

### 创建对象

#### 工厂模式

```js
function createPerson(name, age, job) {
 let o = new Object();
 o.name = name;
 o.age = age;
 o.job = job;
 o.sayName = function() {
 console.log(this.name);
 };
 return o;
}
let person1 = createPerson("Nicholas", 29, "Software Engineer");
let person2 = createPerson("Greg", 27, "Doctor"); 
```

#### 构造函数模式

```js
function Person(name, age, job){
 this.name = name;
 this.age = age;
 this.job = job;
 this.sayName = function() {
 console.log(this.name);
 };
}
let person1 = new Person("Nicholas", 29, "Software Engineer"); 
```

Person()构造函数代替了 createPerson()工厂函数。

但是有以下区别：

- 没有显性创造对象
- 属性和方法直接赋值给了 this。
- 没有 return。

new 的操作过程：

- (1)在内存中创建一个新对象。
- (2) 这个新对象内部的[[Prototype]]特性被赋值为构造函数的 prototype 属性。
- (3) 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。 
- (4) 执行构造函数内部的代码（给新对象添加属性）。
- (5) 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

缺点：每一个构造函数 都会重新创造一个sayName方法，

#### 原型模式

```js
function Person () { }
  Person.prototype.name = "Nicholas"
  Person.prototype.age = 29
  Person.prototype.job = "Software Engineer"
  Person.prototype.sayName = function () {
  console.log(this.name);
}; 
```

缺点：虽然原型模式将方法公用了，但是同时也将属性共用，这会导致属性混乱，

#### 组合继承

**组合继承**（有时候也叫伪经典继承）综合了原型链和盗用构造函数，将两者的优点集中了起来。基 本的思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。

```js
function SuperType(name){
 this.name = name;
 this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
 console.log(this.name);
};
function SubType(name, age){
 // 继承属性
 SuperType.call(this, name);  // 第二次调用
 this.age = age;
}
// 继承方法
SubType.prototype = new SuperType(); // 第一次调用
SubType.prototype.sayAge = function() {
 console.log(this.age);
};
let instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors); // "red,blue,green,black"
instance1.sayName(); // "Nicholas";
instance1.sayAge(); // 29

let instance2 = new SubType("Greg", 27);
console.log(instance2.colors); // "red,blue,green"
instance2.sayName(); // "Greg";
instance2.sayAge(); // 27 
```

#### 原型式继承

```js
function object(o) {
 function F() {}
 F.prototype = o;
 return new F();
} 
```

原型式继承非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合。但要记住， 属性中包含的引用值始终会在相关对象间共享，跟使用原型模式是一样的。

#### 寄生式继承

```js
function createAnother(original){
 let clone = object(original); // 通过调用函数创建一个新对象
 clone.sayHi = function() { // 以某种方式增强这个对象
 console.log("hi");
 };
 return clone; // 返回这个对象
} 
```

寄生式继承同样适合主要关注对象，而不在乎类型和构造函数的场景。object()函数不是寄生式 继承所必需的，任何返回新对象的函数都可以在这里使用

#### 寄生式组合继承

组合继承其实也存在效率问题。最主要的效率问题就是父类构造函数始终会被调用两次：一次在是 创建子类原型时调用，另一次是在子类构造函数中调用。

```js
function inheritPrototype(subType, superType) {
 let prototype = object(superType.prototype); // 创建对象
 prototype.constructor = subType; // 增强对象
 subType.prototype = prototype; // 赋值对象
}
```

使用

```js
function SuperType(name) {
 this.name = name;
 this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
 console.log(this.name);
};
function SubType(name, age) {
 SuperType.call(this, name); 
 this.age = age;
}
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function() {
 console.log(this.age);
}; 
```

#### 类构造函数

constructor 关键字用于在类定义块内部创建类的构造函数。方法名 constructor 会告诉解释器 在使用 new 操作符创建类的新实例时，应该调用这个函数。构造函数的定义不是必需的，不定义构造函数相当于将构造函数定义为空函数。

## Proxy

#### 可撤销

revocable()

#### 反射API

对象的方法 对应的反射 API 方法在 Reflect都有相应的实现

#### 数据绑定与可观察对象

通过代理可以把运行时中原本不相关的部分联系到一起。这样就可以实现各种模式，从而让不同的 代码互操作。 比如，可以将被代理的类绑定到一个全局实例集合，让所有创建的实例都被添加到这个集合中：

```js
const userList = [];
class User {
 constructor(name) {
 this.name_ = name;
 }
}
const proxy = new Proxy(User, {
 construct() {
 const newUser = Reflect.construct(...arguments);
 userList.push(newUser);
 return newUser;
 }
});
new proxy('John');
new proxy('Jacob');
new proxy('Jingleheimerschmidt');
console.log(userList); // [User {}, User {}, User{}] 
```

#### 用途

代理的应用场景是不可限量的。开发者使用它可以创建出各种编码模式，比如（但远远不限于）跟 踪属性访问、隐藏属性、阻止修改或删除属性、函数参数验证、构造函数参数验证、数据绑定，以及可 观察对象。

## 函数

**函数实际上是对象。**每个函数都是Function 类型的实例，而 Function 也有属性和方法，跟其他引用类型一样。

### 箭头函数

箭头函数虽然语法简洁，但也有很多场合不适用。箭头函数不能使用 arguments、super 和 new.target，也不能用作构造函数。此外，箭头函数也没有 prototype 属性。

### 函数声明和函数表达式

**在执行代码时，JavaScript 引擎会先执行一遍扫描， 把发现的函数声明提升到源代码树的顶部。因此即使函数定义出现在调用它们的代码之后，引擎也会把函数声明提升到顶部。**

### 函数内部

在 ECMAScript 5 中，函数内部存在两个特殊的对象：arguments 和 this。ECMAScript 6 又新增 了 new.target 属性。

#### arguments

它是一个类数组对象，包含调用函数时传入的所有参数。

虽然主要用于包含函数参数，但 arguments 对象其实还有一个 **callee** 属性，是一个指向 arguments 对象所在函数的指针。

#### this

在标准函数中，this 引用的是把函数当成方法调用的上下文对象。

this 到底引用哪个对象必须到 **函数被调用时才能确定**。因此这个值在代码执行的过程中可能会变。

#### new.target

ECMAScript 6 新增了检测函数是否使用 new 关键字调用的 new.target 属性。如果函数是正常调用的，则 new.target 的值是 **undefined**；如果是使用 new 关键字调用的，则 new.target 将引用被调用的 **构造函数**。

### 函数属性与方法

- length :保存函数定义的命名参数个数
- prototype:保存引用类型所有实例 方法的地方
  - apply: 改变this指向的方法, 只接受两个参数
  - call : 改变this指向的方法, 可以接受无限多的参数
  - bind:创建一个新的函数实例， 其 this 值会被绑定到传给 bind()的对象

### 尾调用优化

如果函数的逻辑允许基于尾调用将其销毁，则引擎就会无论调用多少次嵌套函数，都只维护一个栈帧。

条件如下：

- 代码在严格模式下执行； 
- 外部函数的返回值是对尾调用函数的调用；
- 尾调用函数返回后不需要执行额外的逻辑；
- 尾调用函数不是引用外部函数作用域中自由变量的闭包

#### 举个栗子

优化前：

```js
function fib(n) {
 if (n < 2) {
 return n;
 }
 return fib(n - 1) + fib(n - 2);
} 
```

优化后:

```js
// 基础框架
function fib(n) {
 return fibImpl(0, 1, n);
}
// 执行递归
function fibImpl(a, b, n) {
 if (n === 0) {
 return a;
 }
 return fibImpl(b, a + b, n - 1);
} 
```

### 闭包

闭包指的是那些**引用了另一个函数作用域中变量**的函数，通常是在嵌套函数中实现的

正常情况下，函数内部的代码在访问变量时，就会使用给定的名称从作用域链中查找变量。函数执行完毕后，局部活动对象会被销毁，内存中就只剩下全局作用域。不过，闭包就不一样了。因为函数还保存着外部作用域链中的变量的引用，它就不能直接销毁，将它的活动对象仍然会保留在内存中，直到函数销毁。

#### this 对象

```js
window.identity = 'The Window';
let object = {
  identity: 'My Object',
  getIdentityFunc () {
    return function () {
      return this.identity;
    };
  }
};
console.log(object.getIdentityFunc()()); // 'The Window' 
```

因为object.getIdentityFunc() 执行返回了 一个匿名函数 ，而当这个匿名函数执行时，他的this才生成，也就是这里的window

## Promise

### Promises/A+规范

为弥合现有实现之间的差异，2012 年 Promises/A+组织分叉（fork） 了 CommonJS 的 Promises/A 建议，并以相同的名字制定了 Promises/A+规范。这个规范最终成为了 ECMAScript 6 规范实现的范本。

### promise 状态机

- pending
- resolved
- rejected

重要的是，Promise的状态是私有的，不能直接通过 JavaScript 检测到。这主要是为了避免根据读取到 的期约状态，以同步方式处理Promise对象。另外，Promise的状态也不能被外部 JavaScript 代码修改。这与不 能读取该状态的原因是一样的：Promise故意将异步行为封装起来，从而隔离外部的同步代码。

因为Promise的状态只能改变一次，所以这里的超时拒绝逻辑中可以放心地设置让Promise处于待定状态的 最长时间。如果执行器中的代码在超时之前已经解决或拒绝，那么超时回调再尝试拒绝也会静默失败。

###  同步/异步执行的二元性

```js
try {
 throw new Error('foo');
} catch(e) {
 console.log(e); // Error: foo
}
try {
 Promise.reject(new Error('bar'));
} catch(e) {
 console.log(e);
}
// Uncaught (in promise) Error: bar
```

这里的同步代码之所以没有捕获期约抛出的错误，是因为它没有通过异步模式捕获错误。从这 里就可以看出Promise真正的异步特性：它们是**同步对象**（在同步执行模式中使用），但也是**异步执行模式 的媒介**。

在前面的例子中，拒绝Promise的错误并没有抛到执行同步代码的线程里，而是通过浏览器异步消息队列来处理的。因此，try/catch 块并不能捕获该错误。**代码一旦开始以异步模式执行，则唯一与之交互 的方式就是使用异步结构——更具体地说，就是Promise的方法。**

### 拒绝Promise与拒绝错误处理

拒绝Promise类似于 throw()表达式，因为它们都代表一种程序状态，即需要中断或者特殊处理。在Promise的执行函数或处理程序中抛出错误会导致拒绝，对应的错误对象会成为拒绝的理由。因此以下这些Promise都会以一个错误对象为由被拒绝：

```js
let p1 = new Promise((resolve, reject) => reject(Error('foo')));
let p2 = new Promise((resolve, reject) => { throw Error('foo'); });
let p3 = Promise.resolve().then(() => { throw Error('foo'); });
let p4 = Promise.reject(Error('foo'));
setTimeout(console.log, 0, p1); // Promise <rejected>: Error: foo 
```

**在Promise中抛出错误时，因为错误实际上是从消息队列中异步抛出的，所以并不会阻止运行时继续执行同步指令：**

```js
Promise.reject(Error('foo'));
console.log('bar');
// bar
// Uncaught (in promise) Error: foo 
```

**onRejected 处理程序的任务应该是在捕获异步错误之后返回一个解决的Promise。**

```js
new Promise((resolve, reject) => {
 console.log('begin asynchronous execution');
 reject(Error('bar'));
}).catch((e) => {
 console.log('caught error', e);
}).then(() => {
 console.log('continue asynchronous execution');
});
// begin asynchronous execution
// caught error Error: bar
// continue asynchronous execution
```

### Promise取消

```js
class CancelToken {
  constructor(cancelFn) {
    this.promise = new Promise((resolve, reject) => {
      cancelFn(() => {
        setTimeout(console.log, 0, "delay cancelled");
        resolve();
      });
    });
  }
}
const startButton = document.querySelector('#start');
const cancelButton = document.querySelector('#cancel');
function cancellableDelayedResolve (delay) {
  setTimeout(console.log, 0, "set delay");
  return new Promise((resolve, reject) => {
    const id = setTimeout((() => {
      setTimeout(console.log, 0, "delayed resolve");
      resolve();
    }), delay);
    const cancelToken = new CancelToken((cancelCallback) =>
      cancelButton.addEventListener("click", cancelCallback));
    cancelToken.promise.then(() => clearTimeout(id));
  });
}
startButton.addEventListener("click", () => cancellableDelayedResolve(1000)); 
```

### Promise进度通知

```js
class TrackablePromise extends Promise {
  constructor(executor) {
    const notifyHandlers = [];
    super((resolve, reject) => {
      return executor(resolve, reject, (status) => {
        notifyHandlers.map((handler) => handler(status));
      });
    });
    this.notifyHandlers = notifyHandlers;
  }
  notify (notifyHandler) {
    this.notifyHandlers.push(notifyHandler);
    return this;
  }
}
let p = new TrackablePromise((resolve, reject, notify) => {
  function countdown (x) {
    if (x > 0) {
      notify(`${20 * x}% remaining`);
      setTimeout(() => countdown(x - 1), 1000);
    } else {
      resolve();
    }
  }
  countdown(5);
});
p.notify((x) => setTimeout(console.log, 0, 'progress:', x));
p.then(() => setTimeout(console.log, 0, 'completed')); 
```

## async/await

### 抛出错误

等待会抛出错误的同步操作，会返回拒绝的期约：

```js
async function foo() {
 console.log(1);
 await (() => { throw 3; })();
}
// 给返回的期约添加一个拒绝处理程序
foo().catch(console.log);
console.log(2);
// 1
// 2
// 3 
```

单独的 Promise.reject()不会被异步函数捕获，而会抛出未捕获错误。不 过，对拒绝的期约使用 await 则会释放（unwrap）错误值（将拒绝Promise返回）：

```js
async function foo() {
 console.log(1);
 await Promise.reject(3);
 console.log(4); // 这行代码不会执行
}
// 给返回的期约添加一个拒绝处理程序
foo().catch(console.log);
console.log(2);
// 1
// 2
// 3 
```

### 异步策略

#### 实现sleep

```js
async function sleep(delay){
    return new Promise((resolve)=> setTimeout(resolve, delay))
}
```

####  利用平行执行

正常串行写法，在不需要保证顺序的情况下属于需要优化的地方

```js
async function randomDelay (id) {
  // 延迟 0~1000 毫秒
  const delay = Math.random() * 1000;
  return new Promise((resolve) => setTimeout(() => {
    console.log(`${id} finished`);
    resolve();
  }, delay));
}
async function foo () {
  const t0 = Date.now();
  await randomDelay(0);
  await randomDelay(1);
  await randomDelay(2);
  await randomDelay(3);
  await randomDelay(4);
  console.log(`${Date.now() - t0}ms elapsed`);
}
foo();

// 0 finished
// 1 finished
// 2 finished
// 3 finished
// 4 finished
// 1570ms elapsed
```

*for循环写法*

```js
async function foo () {
  const t0 = Date.now();
  for (let i = 0; i < 5; ++i) {
    await randomDelay(i);
  }
  console.log(`${Date.now() - t0}ms elapsed`);
}
foo();

// 0 finished
// 1 finished
// 2 finished
// 3 finished
// 4 finished
// 2494ms elapsed
```

就算这些期约之间没有依赖，异步函数也会依次暂停，等待每个超时完成。这样可以保证执行顺序， 但总执行时间会变长。

 **如果顺序不是必需保证的，那么可以先一次性初始化所有期约**，然后再分别等待它们的结果。

```js
async function foo () {
  const t0 = Date.now();
  const promises = Array(5).fill(null).map((_, i) => randomDelay(i));
  for (const p of promises) {
    await p;
  }
  console.log(`${Date.now() - t0}ms elapsed`);
}
foo();
```

**虽然Promise没有按照顺序执行，但 await 按顺序收到了每个Promise的值**

```js
 function foo () {
  const t0 = Date.now();
  const promises = Array(5).fill(null).map((_, i) => randomDelay(i));
  for (const p of promises) {
    console.log(`awaited ${await p}`);
  }
  console.log(`${Date.now() - t0}ms elapsed`);
}
foo();

// 1 finished
// 3 finished
// 0 finished
// awaited 0
// awaited 1
// 2 finished
// awaited 2
// awaited 3
// 4 finished
// awaited 4
// 958ms elapsed
```

## BOM

BOM 的核心是 window 对象，表示浏览器的实例。window 对象在浏览器中有两重身份，一个是 ECMAScript 中的 Global 对象，另一个就是浏览器窗口的 JavaScript 接口。这意味着网页中定义的所有 对象、变量和函数都以 window 作为其 Global 对象，都可以访问其上定义的 parseInt()等全局方法

### Window对象

#### 窗口关系

top 对象始终指向最上层（最外层）窗口，即浏览器窗口本身。而 parent 对象则始终指向当前窗 口的父窗口。如果当前窗口是最上层窗口，则 parent 等于 top（都等于 window）。

#### 像素比

window.devicePixelRatio 实际上与每英寸像素数（DPI，dots per inch）是对应的。DPI 表示单 位像素密度，而 window.devicePixelRatio 表示物理像素与逻辑像素之间的缩放系数。

#### 窗口大小

所有现代浏览器都支持 4 个属性： innerWidth、innerHeight、outerWidth 和 outerHeight。

outerWidth 和 outerHeight 返回浏览器窗口自身的大小

innerWidth 和 innerHeight 返回浏览器窗口中页面视口的大小（不包含浏览器边框和工具栏）。

document.documentElement.clientWidth 和 document.documentElement.clientHeight 返回页面视口的宽度和高度。

因为桌面浏览器的差异，所以需要先确定用户是不是在使用移动设备，然后再决定使用哪个属性。

#### 视口位置

度量文档相对于视口滚动距离的属性有两对，返回相等的值：window.pageXoffset/window. scrollX 和 window.pageYoffset/window.scrollY。

可以使用 scroll()、scrollTo()和 scrollBy()方法滚动页面。这 3 个方法都接收表示相对视口距 离的 x 和 y 坐标，这两个参数在前两个方法中表示要滚动到的坐标，在最后一个方法中表示滚动的距离。

#### 定时器

JavaScript 在浏览器中是**单线程执行**的，但允许使用定时器指定在某个时间之后或每隔一段时间就 执行相应的代码。setTimeout()用于指定在一定时间后执行某些代码，而 setInterval()用于指定 每隔一段时间执行某些代码。

setIntervale()在实践中很少会在生产环境下使用，**因为一个任务结束和下一个任务开始之间的时间间隔是无法保证的**，有些循环定时任务可能会因此而被跳过。

### location 对象

location 是最有用的 BOM 对象之一，提供了当前窗口中加载文档的信息，以及通常的导航功能。

| 属 性           | 值   | 说 明 |
| --------------- | ---- | ----- |
| location.hash " | "#contents"                                               | URL 散列值（井号后跟零或多个字符），如果没有则 为空字符串 |
|      location.host           | "www.wrox.com:80" | 服务器名及端口号 |
|     location.hostname            | "www.wrox.com"  | 服务器名 |
|      location.href            | "http://www.wrox.com:80/WileyCDA/ ?q=javascript#contents" | 当前加载页面的完整 URL。location 的 toString()方法返回这个值 |
|          location.pathname       |   "/WileyCDA/"   |  "/WileyCDA/" URL 中的路径和（或）文件名      |
|          location.port       | "80" |     "80" 请求的端口。如果 URL中没有端口，则返回空字符串   |
|          location.protocol       |    "http:"   |  "http:" 页面使用的协议。通常是"http:"或"https:"      |
|          location.search       |   "?q=javascript"   |    "?q=javascript" URL 的查询字符串。这个字符串以问号开头   |
|         location.username        |  "foouser"    |   "foouser" 域名前指定的用户名     |
|location.password | "barpassword"|"barpassword" 域名前指定的密码 |
|location.origin | "http://www.wrox.com" | "http://www.wrox.com" URL 的源地址。只读 |

### navigator 对象

属性和方法太多就不列了，navigator 对象的属性通常用于确定浏览器的类型。

#### 检测插件

```js
// 插件检测，IE10 及更低版本无效
let hasPlugin = function (name) {
  name = name.toLowerCase();
  for (let plugin of window.navigator.plugins) {
    if (plugin.name.toLowerCase().indexOf(name) > -1) {
      return true;
    }
  }
  return false;
}
// 检测 Flash
alert(hasPlugin("Flash"));
// 检测 QuickTime
alert(hasPlugin("QuickTime")); 
```

### screen 对象

这个对象中保存的纯粹是客户端能力信息，也就是浏览器窗口外面的客户端显示器的信息，比如像素宽度和像素高度。

### history 对象

history 对象表示当前窗口首次使用以来用户的导航历史记录。因为 history 是 window 的属性， 所以每个 window 都有自己的 history 对象。出于安全考虑，这个对象不会暴露用户访问过的 URL， 但可以通过它在不知道实际 URL 的情况下前进和后退。

```js
// 后退一页
history.go(-1);
// 前进一页
history.go(1); 
// 导航到最近的 wrox.com 页面
history.go("wrox.com"); 
// 后退一页
history.back();
// 前进一页
history.forward();
```

## 客户端检测

### 浏览器检测

想要知道自己代码运行在什么浏览器上，大部分开发者会分析 window.navigator.userAgent 返回的字符串值。所有浏览器都会提供这个值，如果相信这些返回值并基于给定的一组浏览器检测这个 字符串，最终会得到关于浏览器和操作系统的比较精确的结果。

1. 伪造用户代理

   有些浏览器提供伪私有的__defineGetter__方法， 利用它可以篡改用户代理字符串：

2. 分析浏览器

   -  浏览器 
   -  浏览器版本 
   - 浏览器渲染引擎 
   - 设备类型（桌面/移动） 
   - 设备生产商
   -  设备型号 
   -  操作系统 
   - 操作系统版本

   第三方用户代理解析程序：Bowser 、 UAParser.js 、 Platform.js 、 CURRENT-DEVICE 、Google Closure、 Mootools 

### 网络检测

```js
const connectionStateChange = () => console.log(navigator.onLine);
window.addEventListener('online', connectionStateChange);
window.addEventListener('offline', connectionStateChange); 
```

**NetworkInformation** API : 可以通过 navigator.connection 属性使用。 这个 API 提供了一些只读属性，并为连接属性变化事件处理程序定义了一个事件对象。

### 电池检测

navigator.getBattery()方法会返回一个Promise实例，解决为一个 BatteryManager 对象。

### 硬件检测

浏览器检测硬件的能力相当有限

1. **处理器核心数** 

   navigator.hardwareConcurrency 属性返回浏览器支持的逻辑处理器核心数量，包含表示核心数的一个整数值（如果核心数无法确定，这个值就是 1）。关键在于，这个值表示浏览器可以并行执行的 最大工作线程数量，不一定是实际的 CPU 核心数。

2. **设备内存大小**

    navigator.deviceMemory 属性返回设备大致的系统内存大小，包含单位为 GB 的浮点数（舍入 为最接近的 2 的幂：512MB 返回 0.5，4GB 返回 4）。

3. **最大触点数**

    navigator.maxTouchPoints 属性返回触摸屏支持的最大关联触点数量，包含一个整数值。

## DOM

### 操纵节点

**appendChild**() 和 **insertBefore**() 在插入节点时不会删除任何已有节点。

相对地， **replaceChild**()方法接收两个参数：要插入的节点和要替换的节点。要替换的节点会被返回并从文档 树中完全移除，要插入的节点会取而代之。

**cloneNode**()方法接收一个布尔值参数，表示是否深复制。在传入 true 参数时，会进行深复制， 即复制节点及其整个子 DOM 树。如果传入 false，则只会复制调用该方法的节点。

### DocumentFragment 类型

在所有节点类型中，DocumentFragment 类型是唯一一个在标记中没有对应表示的类型。DOM 将 文档片段定义为“轻量级”文档，能够包含和操作节点，却没有完整文档那样额外的消耗

假设想给一个元素添加 3 个列表项。如果分 3 次给这个元素添加列表项，浏览器就要重新渲染 3 次页面，以反映新添加的内容。为避免多次渲染，下面的代码示例使用文档片段创建了所有列表项， 然后一次性将它们添加到了：

```js
let fragment = document.createDocumentFragment();
let ul = document.getElementById("myList");
for (let i = 0; i < 3; ++i) {
 let li = document.createElement("li");
 li.appendChild(document.createTextNode(`Item ${i + 1}`));
 fragment.appendChild(li);
}
ul.appendChild(fragment); 
```

### 动态脚本

```js
function loadScript(url) {
 let script = document.createElement("script");
 script.src = url;
 document.body.appendChild(script);
} 
```

### 动态css

```js
function loadStyles(url){
 let link = document.createElement("link");
 link.rel = "stylesheet";
 link.type = "text/css";
 link.href = url;
 let head = document.getElementsByTagName("head")[0];
 head.appendChild(link);
} 
```

### MutationObserver 接口

在 DOM 被修改时异步执行回调。使 用 MutationObserver 可以观察整个文档、DOM 树的一部分，或某个元素.

每个回调都会收到一个 MutationRecord 实例的数组。MutationRecord 实例包含的信息包括发 生了什么变化，以及 DOM 的哪一部分受到了影响。

#### 基本使用：

```js
let observer = new MutationObserver(
 (mutationRecords) => console.log(mutationRecords));
```

#### observe()方法

新创建的 MutationObserver 实例不会关联 DOM 的任何部分。要把这个 observer 与 DOM 关 联起来，需要使用 observe()方法。这个方法接收两个必需的参数：要观察其变化的 DOM 节点，以及 一个 MutationObserverInit 对象。

```js
observer.observe(document.body, { attributes: true });
document.body.className = 'foo';
console.log('Changed body class');
```

#### disconnect()方法

默认情况下，只要被观察的元素不被垃圾回收，MutationObserver 的回调就会响应 DOM 变化事 件，从而被执行。要提前终止执行回调，可以调用 disconnect()方法。下面的例子演示了同步调用 disconnect()之后，不仅会停止此后变化事件的回调，也会抛弃已经加入任务队列要异步执行的回调：

#### 复用 MutationObserver

多次调用 observe()方法，可以复用一个 MutationObserver 对象观察多个不同的目标节点。此 时，MutationRecord 的 target 属性可以标识发生变化事件的目标节点。下面的示例演示了这个过程：

```js
let observer = new MutationObserver(
 (mutationRecords) => console.log(mutationRecords.map((x) =>
x.target)));
// 向页面主体添加两个子节点
let childA = document.createElement('div'),
 childB = document.createElement('span');
document.body.appendChild(childA);
document.body.appendChild(childB);
// 观察两个子节点
observer.observe(childA, { attributes: true });
observer.observe(childB, { attributes: true });
// 修改两个子节点的属性
childA.setAttribute('foo', 'bar');
childB.setAttribute('foo', 'bar'); 
```

#### 性能、内存与垃圾回收

-  MutationObserver 的引用

MutationObserver 实例与目标节点之间的引用关系是非对称的。MutationObserver 拥有对要观察的目标节点的弱引用。**因为是弱引用，所以不会妨碍垃圾回收程序回收目标节点**。

 然而，**目标节点却拥有对 MutationObserver 的强引用**。如果目标节点从 DOM 中被移除，随后 被垃圾回收，则关联的 MutationObserver 也会被垃圾回收。

- MutationRecord 的引用

记录队列中的每个 MutationRecord 实例至少包含对已有 DOM 节点的一个引用。如果变化是 childList 类型，则会包含多个节点的引用。记录队列和回调处理的默认行为是耗尽这个队列，处理 每个 MutationRecord，然后让它们超出作用域并被垃圾回收。

### DOM2

// TODO: 东西太多 下次用到再看

### DOM3

## 事件

### 事件冒泡

IE 事件流被称为事件冒泡，这是因为事件被定义为从最具体的元素（文档树中最深的节点）开始触 发，然后向上传播至没有那么具体的元素（文档）。

###  事件捕获

Netscape Communicator 团队提出了另一种名为事件捕获的事件流。事件捕获的意思是最不具体的节 点应该最先收到事件，而最具体的节点应该最后收到事件。事件捕获实际上是为了在事件到达最终目标 前拦截事件。

### DOM 事件流

DOM2 Events 规范规定事件流分为 3 个阶段：**事件捕获**、**到达目标**和**事件冒泡**。事件捕获最先发生， 为提前拦截事件提供了可能。然后，实际的目标元素接收到事件。最后一个阶段是冒泡，最迟要在这个阶段响应事件。

### DOM2 事件处理程序

DOM2 Events 为事件处理程序的赋值和移除定义了两个方法：**addEventListener**()和 **removeEventListener**()。这两个方法暴露在所有 DOM 节点上，它们接收 3 个参数：**事件名**、**事件处理函数**和一个布尔值，true 表示在捕**获阶段调用事件处理程序**，false（默认值）表示在**冒泡阶段调用事件处理程序**。

### 事件类型

- **用户界面事件（UIEvent）**：涉及与 BOM 交互的通用浏览器事件。 
- **焦点事件（FocusEvent）**：在元素获得和失去焦点时触发。 
- **鼠标事件（MouseEvent）**：使用鼠标在页面上执行某些操作时触发。 
- **滚轮事件（WheelEvent）**：使用鼠标滚轮（或类似设备）时触发。 
- **输入事件（InputEvent）**：向文档中输入文本时触发。 
- **键盘事件（KeyboardEvent）**：使用键盘在页面上执行某些操作时触发
- **合成事件（CompositionEvent）**：在使用某种 IME（Input Method Editor，输入法编辑器）输入 字符时触发。

### 事件委托

“过多事件处理程序”的解决方案是使用事件委托。事件委托**利用事件冒泡**，可以只使用一个事件处理程序来管理一种类型的事件。

## 动画与 Canvas 图形

### requestAnimationFrame

这个方法会告诉浏览器要执行动画 了，于是浏览器可以通过最优方式确定重绘的时序。

requestAnimationFrame()方法接收一个参数，此参数是一个要在重绘屏幕前调用的函数。

#### cancelAnimationFrame

与 setTimeout()类似，requestAnimationFrame()也返回一个请求 ID，可以用于通过另一个 方法 cancelAnimationFrame()来取消重绘任务。

```js
let requestID = window.requestAnimationFrame(() => {
 console.log('Repaint!');
});
window.cancelAnimationFrame(requestID); 
```

#### 通过 requestAnimationFrame 节流

这样，计时器可以限制实际的操作执行间隔，而 requestAnimationFrame 控制 在浏览器的哪个渲染周期中执行。下面的例子可以将回调限制为不超过 50 毫秒执行一次:

```js
let enabled = true;
function expensiveOperation() {
 console.log('Invoked at', Date.now());
}
window.addEventListener('scroll', () => {
 if (enabled) {
 enabled = false;
 window.requestAnimationFrame(expensiveOperation);
 window.setTimeout(() => enabled = true, 50);
 }
}); 
```

### Canvas

//TODO： 二次阅读时总结后再写

### WebGL

## JavaScript API



