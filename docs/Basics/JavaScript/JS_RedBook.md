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

### Streams API 

-  **可读流**：可以通过某个公共接口读取数据块的流。数据在内部从底层源进入流，然后由消费者 （consumer）进行处理。
-  **可写流**：可以通过某个公共接口写入数据块的流。生产者（producer）将数据写入流，数据在内 部传入底层数据槽（sink）。
-  **转换流**：由两种流组成，可写流用于接收数据（可写端），可读流用于输出数据（可读端）。这 两个流之间是转换程序（transformer），可以根据需要检查和修改流内容。

各大浏览器支持度不一，Chrome最新版已经支持，node 尚未支持。

#### 可读流

```js
    // 每 1000 毫秒生成一个递增的整数
    for (let i = 0; i < 5; ++i) {
        yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
    }
}
const readableStream = new ReadableStream({
    async start (controller) {
        for await (let chunk of ints()) {
            // 将值传入控制器
            controller.enqueue(chunk);
        }
        controller.close();
    }
});
console.log(readableStream.locked); // false
const readableStreamDefaultReader = readableStream.getReader();
console.log(readableStream.locked); // true
// 消费者
(async function () {
    while (true) {
        const { done, value } = await readableStreamDefaultReader.read();
        if (done) {
            break;
        } else {
            console.log(value);
        }
    }
})(); 
```

#### 可写流

```js
async function* ints () {
    // 每 1000 毫秒生成一个递增的整数
    for (let i = 0; i < 5; ++i) {
        yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
    }
}
const writableStream = new WritableStream({
    write (value) {
        console.log(value);
    }
});
console.log(writableStream.locked); // false
const writableStreamDefaultWriter = writableStream.getWriter();
console.log(writableStream.locked); // true
// 生产者
(async function () {
    for await (let chunk of ints()) {
        await writableStreamDefaultWriter.ready;
        writableStreamDefaultWriter.write(chunk);
    }
    writableStreamDefaultWriter.close();
})(); 
```

#### 转换流

转换流用于组合可读流和可写流。数据块在两个流之间的转换是通过 **transform()**方法完成的。

```js
async function* ints () {
    // 每 1000 毫秒生成一个递增的整数
    for (let i = 0; i < 5; ++i) {
        yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
    }
}
const { writable, readable } = new TransformStream({
    transform (chunk, controller) {
        controller.enqueue(chunk * 2);
    }
});
const readableStreamDefaultReader = readable.getReader();
const writableStreamDefaultWriter = writable.getWriter();
// 消费者
(async function () {
    while (true) {
        const { done, value } = await readableStreamDefaultReader.read();
        if (done) {
            break;
        } else {
            console.log(value);
        }
    }
})();
// 生产者
(async function () {
    for await (let chunk of ints()) {
        await writableStreamDefaultWriter.ready;
        writableStreamDefaultWriter.write(chunk);
    }
    writableStreamDefaultWriter.close();
})(); 
```

#### 通过管道连接流

流可以通过管道连接成一串。最常见的用例是使用 pipeThrough()方法把 ReadableStream 接入 TransformStream。从内部看，ReadableStream 先把自己的值传给 TransformStream 内部的 WritableStream，然后执行转换，接着转换后的值又在新的 ReadableStream 上出现。

```js
async function* ints () {
    // 每 1000 毫秒生成一个递增的整数
    for (let i = 0; i < 5; ++i) {
        yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
    }
}
const integerStream = new ReadableStream({
    async start (controller) {
        for await (let chunk of ints()) {
            controller.enqueue(chunk);
        }
        controller.close();
    }
});
const doublingStream = new TransformStream({
    transform (chunk, controller) {
        controller.enqueue(chunk * 2);
    }
});
// 通过管道连接流
const pipedStream = integerStream.pipeThrough(doublingStream);
// 从连接流的输出获得读取器
const pipedStreamDefaultReader = pipedStream.getReader();
// 消费者
(async function () {
    while (true) {
        const { done, value } = await pipedStreamDefaultReader.read();
        if (done) {
            break;
        } else {
            console.log(value);
        }
    }
})(); 
```

### Performance Timeline API 

Performance Timeline API 使用一套用于度量客户端延迟的工具扩展了 Performance 接口。性能度 量将会采用计算结束与开始时间差的形式。

浏览器会自动记录各种 PerformanceEntry 对象，而使用 performance.mark()也可以记录自定 义的 PerformanceEntry 对象。在一个执行上下文中被记录的所有性能条目可以通过 **performance.getEntries()**获取

1.  **User Timing API** 

   User Timing API 用于记录和分析自定义性能条目。

   ```js
   performance.mark('foo');
   for (let i = 0; i < 1E6; ++i) {}
   performance.mark('bar'); 
   // 获取最新的标记
   const [endMark, startMark] = performance.getEntriesByType('mark'); 
   
   //自定义名字，和mark区间
   performance.measure('baz', 'foo', 'bar');
   const [differenceMark] = performance.getEntriesByType('measure');
   ```

2.  **Navigation Timing API** 

   Navigation Timing API 提供了高精度时间戳，用于度量当前页面加载速度。浏览器会在导航事件发生时自动记录 PerformanceNavigationTiming 条目。这个对象会捕获大量时间戳，**用于描述页面是何时以及如何加载的。**

   比如load的时间差：

   ```js
   const [performanceNavigationTimingEntry] = performance.getEntriesByType('navigation'); 
   console.log(performanceNavigationTimingEntry.loadEventEnd -performanceNavigationTimingEntry.loadEventStart); 
   ```

3.  **Resource Timing API** 

Resource Timing API 提供了高精度时间戳，用于度量当前页面加载时**请求资源的速度**。浏览器会在加载资源时自动记录 PerformanceResourceTiming。这个对象会捕获大量时间戳，**用于描述资源加载的速度**。

```js
const performanceResourceTimingEntry = performance.getEntriesByType('resource')[0];
console.log(performanceResourceTimingEntry.responseEnd - performanceResourceTimingEntry.requestStart); 
```

### Web 组件

这里所说的 Web 组件指的是一套用于增强 DOM 行为的工具，包括影子 DOM、自定义 元素和 HTML 模板。这一套浏览器 API 特别混乱。 

- 并没有统一的“Web Components”规范：每个 Web 组件都在一个不同的规范中定义。  

- 有些 Web 组件如影子 DOM 和自定义元素，已经出现了向后不兼容的版本问题。 

- 浏览器实现极其不一致

由于存在这些问题，因此使用 Web 组件通常需要引入一个 Web 组件库，比如 Polymer。这种库可以 作为腻子脚本，模拟浏览器中缺失的 Web 组件

#### HTML模板

#### 影子DOM

#### 自定义元素

### Web Cryptography API 

#### 生成随机数

我们平时常用的math.random() 是以**伪随机数生成器PRNG**生成的。所谓“伪”指的是生成值的过程不是真的随机。 PRNG 生成的值只是模拟了随机的特性。浏览器的 PRNG 并未使用真正的随机源，只是对一个内部状态 应用了固定的算法。每次调用 Math.random()，这个内部状态都会被一个算法修改，而结果会被转换 为一个新的随机值。例如，V8 引擎使用了一个名为 xorshift128+的算法来执行这种修改。

由于算法本身是固定的，其输入只是之前的状态，因此随机数顺序也是确定的。xorshift128+使用 128 位内部状态，而算法的设计让任何初始状态在重复自身之前都会产生 2128–1 个伪随机值。这种循环 被称为**置换循环**（permutation cycle），而这个循环的长度被称为一个**周期**（period）。很明显，如果攻击 者知道 PRNG 的内部状态，就可以预测后续生成的伪随机值。如果开发者无意中使用 PRNG 生成了私有 密钥用于加密，则攻击者就可以利用 PRNG 的这个特性算出私有密钥。

伪随机数生成器主要用于快速计算出看起来随机的值。不过并不适合用于加密计算。为解决这个问题，密码学安全伪随机数生成器（CSPRNG，Cryptographically Secure PseudoRandom Number Generator） 额外增加了一个熵作为输入，例如测试硬件时间或其他无法预计行为的系统特性。这样一来，计算速度 明显比常规 PRNG 慢很多，但 CSPRNG 生成的值就很难预测，可以用于加密了。

#### 使用

```js
const array = new Uint8Array(1);
for (let i=0; i<5; ++i) {
 console.log(crypto.getRandomValues(array));
}
// Uint8Array [41]
// Uint8Array [250]
// Uint8Array [51]
// Uint8Array [129]
// Uint8Array [35] 
```

### 小结

除了定义新标签，HTML5 还定义了一些 JavaScript API。这些 API 可以为开发者提供更便捷的 Web 接口，暴露堪比桌面应用的能力。本章主要介绍了以下 API。 

- Atomics API 用于保护代码在多线程内存访问模式下不发生资源争用。 
-  postMessage() API 支持从不同源跨文档发送消息，同时保证安全和遵循同源策略。 
-  Encoding API 用于实现字符串与缓冲区之间的无缝转换（越来越常见的操作）。 
-  File API 提供了发送、接收和读取大型二进制对象的可靠工具。 
- 媒体元素`<audio>`和`<video>`拥有自己的 API，用于操作音频和视频。并不是每个浏览器都会支
  持所有媒体格式，使用 canPlayType()方法可以检测浏览器支持情况。
- 拖放 API 支持方便地将元素标识为可拖动，并在操作系统完成放置时给出回应。可以利用它创
  建自定义可拖动元素和放置目标。
-   Notifications API 提供了一种浏览器中立的方式，以此向用户展示消通知弹层。
-   Streams API 支持以全新的方式读取、写入和处理数据。
-   Timing API 提供了一组度量数据进出浏览器时间的可靠工具。
-   Web Components API 为元素重用和封装技术向前迈进提供了有力支撑。
-   Web Cryptography API 让生成随机数、加密和签名消息成为一类特性。

## 错误处理和调试

### try/catch

如果 try 块中有代码发生错误，代码会立即退出执行，并跳到 catch 块中。catch 块此时接收到 一个对象，该对象包含发生错误的相关信息。与其他语言不同，即使在 catch 块中不使用错误对象， 也必须为它定义名称。错误对象中暴露的实际信息因浏览器而异，但至少包含保存错误消息的 message 属性。

#### finally

```js
function testFinally(){
 try {
 return 2;
 } catch (error){
 return 1;
 } finally {
 return 0;
 }
} 
```

看起来该函数应该返回 2， 因为它在 try 块中，不会导致错误。但是，finally 块的存在导致 try 块中的 return 语句被忽略。

#### 错误类型

-  **Error**  是基类型，其他错误类型继承该类型.浏览器很少会抛出 Error 类型的错误，该类型主要用于开 发者抛出自定义错误。
-  **InternalError**  类型的错误会在底层 JavaScript 引擎抛出异常时由浏览器抛出。例如，递归过多导 致了栈溢出。这个类型并不是代码中通常要处理的错误，如果真发生了这种错误，很可能代码哪里弄错 了或者有危险了。
-  **EvalError** 类型的错误会在使用 eval()函数发生异常时抛出。
-  **RangeError** 错误会在数值越界时抛出。例如，定义数组时如果设置了并不支持的长度，
-  **ReferenceError** 会在找不到对象时发生。（这就是著名的"object expected"浏览器错误的原 因。）这种错误经常是由访问不存在的变量而导致的
-  **SyntaxError** 经常在给 eval()传入的字符串包含 JavaScript 语法错误时发生
-  **TypeError **在 JavaScript 中很常见，主要发生在变量不是预期类型，或者访问不存在的方法时。很 多原因可能导致这种错误，尤其是在使用类型特定的操作而变量类型不对时。
- **URIError**  只会在使用 encodeURI()或 decodeURI()但传入了格式错误的 URI 时发生。这个错误恐怕是 JavaScript 中难得一见的错误了，因为上面这两个函数非常稳健

####  try/catch 的用法

**try/catch 语句最好用在自己无法控制的错误上**。如果你明确知道自己的代码会发生某种错误，那么就不适合使用 try/catch 语句。例如，如果给 函数传入字符串而不是数值时就会失败，就应该检查该函数的参数类型并采取相应的操作。这种情况下， 没有必要使用 try/catch 语句。

### 抛出错误

与 try/catch 语句对应的一个机制是 throw 操作符，用于在任何时候抛出自定义错误。throw 操 作符必须有一个值，但值的类型不限。

使用 throw 操作符时，代码立即停止执行，除非 try/catch 语句捕获了抛出的值。

可以通过内置的错误类型来模拟浏览器错误。每种错误类型的构造函数都只接收一个参数，就是错误消息。

```js
throw new Error("Something bad happened."); 
// or 
throw new SyntaxError("I don't like your syntax."); 
```

或者通过继承error 自定义一个错误,需要提供 name 属性和 message 属性

```js
class CustomError extends Error {
 constructor(message) {
 super(message);
 this.name = "CustomError";
 this.message = message;
 }
```

#### 何时抛出

一个常见的问题是何时抛出错误，何时使用 try/catch 捕获错误。一般来说，错误要在应用程序 架构的底层抛出，在这个层面上，人们对正在进行的流程知之甚少，因此无法真正地处理错误。

至于抛出错误与捕获错误的区别，可以这样想：应该只在确切知道接下来该做什么的时候捕获错误。捕获错误的目的是阻止浏览器以其默认方式响应；抛出错误的目的是为错误提供有关其发生原因的 说明。

### error事件

**任何没有被 try/catch 语句处理的错误都会在 window 对象上触发 error 事件**。

```js
window.onerror = (message, url, line) => {
// 错误消息、发生错误的 URL 和行号
 console.log(message);
// 可以返回 false 来阻止浏览器默认报告错误的行为，
 return false;
};
```

### 识别错误

错误处理非常重要的部分是首先识别错误可能会在代码中的什么地方发生。因为 JavaScript 是松散 类型的，不会验证函数参数，**所以很多错误只有在代码真正运行起来时才会出现**。通常，需要注意 3 类错误： 

- 类型转换错误 

-  数据类型错误 

-  通信错误 

上面这几种错误会在特定情况下，在没有对值进行充分检测时发生。

#### 静态代码分析器

静态代码分析器要求使用类型、函数签名及其他指令来注解 JavaScript，以此描述程序如何在基本 可执行代码之外运行。分析器会比较注解和 JavaScript 代码的各个部分，对在实际运行时可能出现的潜 在不兼容问题给出提醒。

常用：JSHint、JSLint、Google Closure 和 TypeScript.

#### 类型转换错误

类型转换错误的主要原因是使用了会自动改变某个值的数据类型的操作符或语言构造。使用了 == 或 ！=、以及在 if、for 或 while 等流控制语句中使用非布尔值

#### 数据类型错误

因为 JavaScript 是松散类型的，所以变量和函数参数都不能保证会使用正确的数据类型。开发者需 要自己检查数据类型，确保不会发生错误。

一般来说，原始类型的值应该使用 typeof 检测，而对象值应该使用 instanceof 检测。根据函数 的用法，不一定要检查每个参数的数据类型，但对外的任何 API 都应该做类型检查以保证正确执行。

#### 通信错误

## JSON

JSON 语法支持表示 3 种类型的值。

+ 简单值：字符串、数值、布尔值和 null 可以在 JSON 中出现，就像在 JavaScript 中一样。特殊 值 **undefined 不可以**。
+ 对象：第一种复杂数据类型，对象表示有序键/值对。每个值可以是简单值，也可以是复杂类型。 
+ 数组：第二种复杂数据类型，数组表示可以通过数值索引访问的值的有序列表。数组的值可以 是任意类型，包括简单值、对象，甚至其他数组。

### JSON 对象

JSON 对象有两个方法：stringify()和 parse()。在简单的情况下，这两个方法分别可以将 JavaScript 序列化为 JSON 字符串，以及将 JSON 解析为原生 JavaScript 值。

实际上，**JSON.stringify()**方法除了要序列化的对象，还可以接收两个参数。这两个参数可以用 于指定其他序列化 JavaScript 对象的方式。**第一个参数是过滤器，可以是数组或函数；第二个参数是用于缩进结果 JSON 字符串的选项。单独或组合使用这些参数可以更好地控制 JSON 序列化。**

有时候，对象需要在 JSON.stringify()之上自定义 JSON 序列化。此时，可以在要序列化的对象 中添加 **toJSON()**方法，序列化时会基于这个方法返回适当的 JSON 表示。

**JSON.parse()**方法也可以接收一个额外的参数，这个函数会针对每个键/值对都调用一次。为区别 于传给 JSON.stringify()的起过滤作用的替代函数（replacer），这个函数被称为还原函数（reviver）。 实际上它们的格式完全一样，即还原函数也接收两个参数，属性名（key）和属性值（value），另外也 需要返回值。

## 网络请求与远程资源

### XHR ( XMLHttpRequest ) 对象

看了下 会用就行了

### 进度事件

Progress Events 是 W3C 的工作草案，定义了客户端服务器端通信。这些事件最初只针对 XHR，现 在也推广到了其他类似的 API。有以下 6 个进度相关的事件。 

- loadstart：在接收到响应的第一个字节时触发。 

-  progress：在接收响应期间反复触发。

-  error：在请求出错时触发。

-  abort：在调用 abort()终止连接时触发。 

-  load：在成功接收完响应时触发。

-  loadend：在通信完成时，且在 error、abort 或 load 之后触发。 

每次请求都会首先触发 loadstart 事件，之后是一个或多个 progress 事件，接着是 error、abort 或 load 中的一个，最后以 loadend 事件结束。

#### load 事件

onload 事件处理程序会收到一个 event 对象，其 target 属性设置为 XHR 实例，在这个实例上 可以访问所有 XHR 对象属性和方法。

#### progress 事件

Mozilla 在 XHR 对象上另一个创新是 progress 事件，在浏览器接收数据期间，这个事件会反复触 发。每次触发时，onprogress 事件处理程序都会收到 event 对象，其 target 属性是 XHR 对象，且 包含 3 个额外属性：**lengthComputable**、**position** 和 **totalSize**。其中

- lengthComputable 是 一个布尔值，表示进度信息是否可用；
- position 是接收到的字节数；
- totalSize 是响应的 ContentLength 头部定义的总字节数

### 跨源资源共享

跨源资源共享（CORS，Cross-Origin Resource Sharing）定义了浏览器与服务器如何实现跨源通信。 CORS 背后的基本思路就是使用自定义的 HTTP 头部允许浏览器和服务器相互了解，以确实请求或响应 应该成功还是失败。

对于简单的请求，比如 **GET 或 POST 请求，没有自定义头部，而且请求体是 text/plain 类型**， 这样的请求在发送时会有一个额外的头部叫 Origin。Origin 头部包含发送请求的页面的源（协议、 域名和端口），以便服务器确定是否为其提供响应。

如果服务器决定响应请求，那么应该发送 Access-Control-Allow-Origin 头部.

#### 预检请求

CORS 通过一种叫预检请求（preflighted request）的服务器验证机制，允许使用自定义头部、除 GET 和 POST 之外的方法，以及不同请求体内容类型。在要发送涉及上述某种高级选项的请求时，会先向服务器发送一个“预检”请求。这个请求使用 OPTIONS 方法发送并包含以下头部。

- **Origin**：与简单请求相同。
-  **Access-Control-Request-Method**：请求希望使用的方法。 
-  **Access-Control-Request-Headers**：（可选）要使用的逗号分隔的自定义头部列表

在这个请求发送后，服务器可以确定是否允许这种类型的请求。服务器会通过在响应中发送如下头部与浏览器沟通这些信息。

- Access-Control-Allow-Origin：与简单请求相同。 
-  Access-Control-Allow-Methods：允许的方法（逗号分隔的列表）。 
-  Access-Control-Allow-Headers：服务器允许的头部（逗号分隔的列表）。 
-  Access-Control-Max-Age：缓存预检请求的秒数。

预检请求返回后，结果会按响应指定的时间缓存一段时间。换句话说，**只有第一次发送这种类型的 请求时才会多发送一次额外的 HTTP 请求。**

#### 凭据请求

**默认情况下，跨源请求不提供凭据（cookie、HTTP 认证和客户端 SSL 证书）。可以通过将 withCredentials 属性设置为 true 来表明请求会发送凭据。**

#### 图片探测

图片探测是利用`<img>`标签实现跨域通信的最早的一种技术。任何页面都可以跨域加载图片而不 必担心限制，因此这也是在线广告跟踪的主要方式。可以动态创建图片，然后通过它们的 onload 和 onerror 事件处理程序得知何时收到响应

图片探测频繁用于跟踪用户在页面上的点击操作或动态显示广告。当然，图片探测的缺点是**只能发送 GET 请求**和**无法获取服务器响应的内容**。这也是只能利用图片探测实现浏览器与服务器单向通信的 原因。

#### JSONP 

JSONP 调用是通过动态创建`<script>`元素并为 src 属性指定跨域 URL 实现的。此时的`<script>`与`<img>`元素类似，能够不受限制地从其他域加载资源。因为 JSONP 是有效的 JavaScript，所以 JSONP响应在被加载完成之后会立即执行。

JSONP 由于其简单易用，在开发者中非常流行。相比于图片探测，使用 JSONP 可以直接访问响应， **实现浏览器与服务器的双向通信**。不过 JSONP 也有一些缺点。 

首先，JSONP 是从不同的域拉取可执行代码。如果这个域并不可信，则可能在响应中加入恶意内容。 此时除了完全删除 JSONP 没有其他办法。在使用不受控的 Web 服务时，一定要保证是可以信任的。 

第二个缺点是不好确定 JSONP 请求是否失败。虽然 HTML5 规定了`<script>`元素的 onerror 事件处理程序，但还没有被任何浏览器实现。为此，开发者经常使用计时器来决定是否放弃等待响应。这种
方式并不准确，毕竟不同用户的网络连接速度和带宽是不一样的。

### fetch 请求

Fetch API 本身是使用 JavaScript 请求资源的优秀工具，同时这个 API 也能够应用在服务线程 （service worker）中，提供拦截、重定向和修改通过 fetch()生成的请求接口。



- 发送 JSON 数据

  ```js
  fetch('/send-me-json', {
   method: 'POST', // 发送请求体时必须使用一种 HTTP 方法
   body: payload,
   headers: jsonHeaders
  })
  ```

  

- 发送跨源请求

- 加载Blob文件

  ```js
  fetch('my-image.png').then((response) => response.blob()) 	
  ```

- 中断请求

  ```js
  包含错误的拒绝。
  let abortController = new AbortController();
  fetch('wikipedia.zip', { signal: abortController.signal })
   .catch(() => console.log('aborted!'); 
  // 10 毫秒后中断请求
  setTimeout(() => abortController.abort(), 10); 
  ```

#### Headers 对象

Headers 与 Map 类型都有 get()、set()、has()和 delete() 等实例方法

Headers 并不是与 Map 处处都一样。在初始化 Headers 对象时，也可以使用键/值对形式的对象， 而 Map 则不可以

#### Request对象

#### Response对象

### Beacon API 

为了把尽量多的页面信息传到服务器，很多分析工具需要**在页面生命周期中尽量晚的时候向服务器 发送遥测或分析数据**。因此，理想的情况下是通过浏览器的 unload 事件发送网络请求。这个事件表示 用户要离开当前页面，不会再生成别的有用信息了。

 unload 事件触发时，分析工具要停止收集信息并把收集到的数据发给服务器。这时候有一个问题， 因为 unload 事件对浏览器意味着没有理由再发送任何结果未知的网络请求（因为页面都要被销毁了）。 例如，在 unload 事件处理程序中创建的任何异步请求都会被浏览器取消。为此，异步 XMLHttpRequest 或 fetch()不适合这个任务。分析工具可以使用同步 XMLHttpRequest 强制发送请求，但这样做会导 致用户体验问题。浏览器会因为要等待 unload 事件处理程序完成而延迟导航到下一个页面。

为解决这个问题，W3C 引入了补充性的 Beacon API。这个 API 给 navigator 对象增加了一个 sendBeacon()方法。这个简单的方法接收一个 URL 和一个数据有效载荷参数，并会发送一个 POST 请求。可选的数据有效载荷参数有 ArrayBufferView、Blob、DOMString、FormData 实例。如果请求成功进入了最终要发送的任务队列，则这个方法返回 true，否则返回 false。

```js
// 发送 POST 请求
// URL: 'https://example.com/analytics-reporting-url'
// 请求负载：'{foo: "bar"}'
navigator.sendBeacon('https://example.com/analytics-reporting-url', '{foo: "bar"}'); 
```

这个方法虽然看起来只不过是 POST 请求的一个语法糖，但它有几个重要的特性。

- sendBeacon()并不是只能在页面生命周期末尾使用，而是任何时候都可以使用。 
- 调用 sendBeacon()后，浏览器会把请求添加到一个内部的请求队列。浏览器会主动地发送队 列中的请求。 
- 浏览器保证在原始页面已经关闭的情况下也会发送请求。 
- 状态码、超时和其他网络原因造成的失败完全是不透明的，不能通过编程方式处理。
- 信标（beacon）请求会携带调用 sendBeacon()时所有相关的 cookie。

### Web Socket 

Web Socket使用了**自定义协议**，所以 URL方案（scheme）稍有变化：不能再使用 http://或 https://， 而要使用 ws://和 wss://。前者是不安全的连接，后者是安全连接。在指定 Web Socket URL 时，必须包含 URL 方案，因为将来有可能再支持其他方案。

```js
let socket = new WebSocket("ws://www.example.com/server.php");
let stringData = "Hello world!";
let arrayBufferData = Uint8Array.from(['f', 'o', 'o']);
let blobData = new Blob(['f', 'o', 'o']);
//发送和接收数据
socket.send(stringData);
socket.send(arrayBufferData.buffer);
socket.send(blobData); 

socket.onmessage = function(event) {
 let data = event.data;
 // 对数据执行某些操作
}; 
//在连接成功建立时触发。
socket.onopen = function() {
 alert("Connection established.");
};
//在发生错误时触发。连接无法存续。
socket.onerror = function() {
 alert("Connection error.");
};
//在连接关闭时触发。
//只有 close 事件的 event 对象上有额外信息。这个对象上有 3 个额外属性：
// wasClean、code 和 reason。
//其中，wasClean 是一个布尔值，表示连接是否干净地关闭；code 是一个来自服务器的数值状态码；reason 是一个字符串，包含服务器发来的消息。
socket.onclose = function(event) {
  console.log(`as clean? ${event.wasClean} Code=${event.code} Reason=${event.reason}`); 
}; 
```

## 客户端存储

### cookie 

cookie 是与特定域绑定的。设置 cookie 后，它会与请求一起发送到创建它的域。这个限制能保证 cookie 中存储的信息只对被认可的接收者开放，不被其他域访问。 

因为 cookie 存储在客户端机器上，所以为保证它不会被恶意利用，浏览器会施加限制。同时，cookie 也不会占用太多磁盘空间

- 不超过 300 个 cookie； 
- 每个 cookie 不超过 4096 字节； 
- 每个域不超过 20 个 cookie； 
- 每个域不超过 81 920 字节。

#### 使用

```js
//secure :只能在ssl链接上发送
//domain : cookie 有效的域。发送到这个域的所有请求都会包含对应的 cookie
//path   :请求 URL 中包含这个路径才会把 cookie 发送到服务器。
Set-Cookie: name=value; expires=Mon, 22-Jan-07 07:10:24 GMT; domain=.wrox.com; secure
```

#### JS中使用Cookie

所有名和值都是 URL 编码的，因此必须使用 decodeURIComponent()解码。

```js
class CookieUtil {
 static get(name) {
 let cookieName = `${encodeURIComponent(name)}=`,
 cookieStart = document.cookie.indexOf(cookieName),
 cookieValue = null;
 if (cookieStart > -1){
 let cookieEnd = document.cookie.indexOf(";", cookieStart);
 if (cookieEnd == -1){
 cookieEnd = document.cookie.length;
 }
 cookieValue = decodeURIComponent(document.cookie.substring(cookieStart
 + cookieName.length, cookieEnd));
 }
 return cookieValue;
 }
 static set(name, value, expires, path, domain, secure) {
 let cookieText =
 `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
 if (expires instanceof Date) {
 cookieText += `; expires=${expires.toGMTString()}`;
 }
 if (path) {
 cookieText += `; path=${path}`;
 }
 if (domain) {
 cookieText += `; domain=${domain}`;
 }
 if (secure) {
 cookieText += "; secure";
 }
 document.cookie = cookieText;
 }
 static unset(name, path, domain, secure) {
 CookieUtil.set(name, "", new Date(0), path, domain, secure);
 }
}; 
```

#### 子Cookie

子 cookie 的格式类似于查询字符串。这些值可以存储为单个 cookie，而不用单独存储为自己的名/值对。结果就是网站或 Web 应用程序能够在单域 cookie 数限制下存储更多的结构化数据。

```js
name=name1=value1&name2=value2&name3=value3&name4=value4&name5=value5
```

#### 注意事项

还有一种叫作 **HTTP-only** 的 cookie。HTTP-only 可以在浏览器设置，也可以在服务器设置，但只能 在服务器上读取，这是因为 JavaScript 无法取得这种 cookie 的值

### sessionStorage

sessionStorage 对象只存储会话数据，这意味着数据只会存储到浏览器关闭。这跟浏览器关闭时 会消失的会话 cookie 类似。存储在 sessionStorage 中的数据不受页面刷新影响，可以在浏览器崩溃 并重启后恢复。（取决于浏览器，Firefox 和 WebKit 支持，IE 不支持。）

### localStorage

在修订的 HTML5 规范里，localStorage 对象取代了 globalStorage，作为在客户端持久存储 数据的机制。要访问同一个 localStorage 对象，**页面必须来自同一个域（子域不可以）、在相同的端口上使用相同的协议。**

两种存储方法的区别在于，存储在 localStorage 中的数据会保留到通过 JavaScript 删除或者用户 清除浏览器缓存。localStorage 数据不受页面刷新影响，也不会因关闭窗口、标签页或重新启动浏览 器而丢失。

### indexDB

IndexedDB 背后的思想是创造一套 API，方便 JavaScript 对象的 存储和获取，同时也支持查询和搜索。

IndexedDB 的设计几乎完全是异步的。为此，大多数操作以请求的形式执行，这些请求会异步执行， 产生成功的结果或错误。

## 模块

将代码拆分成独立的块，然后再把这些块连接起来可以通过模块模式来实现。这种模式背后的思想 很简单：把**逻辑分块，各自封装，相互独立，每个块自行决定对外暴露什么**，同时自行决定引入执行哪些外部代码。

### 凑合的模块系统-IIFE

```js
// 为了暴露公共 API，模块 IIFE 会返回一个对象，其属性就是模块命名空间中的公共成员：
var Foo = (function() {
 return {
 bar: 'baz',
 baz: function() {
 console.log(this.bar);
 }
 };
})();
console.log(Foo.bar); // 'baz'
Foo.baz(); // 'baz'
```

### ES6之前的模块系统

在 ES6 原生支持模块之前，使用模块的 JavaScript 代码本质上是希望使用默认没有的语言特性。因 此，必须按照符合某种规范的模块语法来编写代码，另外还需要单独的模块工具把这些模块语法与 JavaScript 运行时连接起来。这里的模块语法和连接方式有不同的表现形式**，通常需要在浏览器中额外 加载库或者在构建时完成预处理。**

#### CommonJS 

CommonJS 规范概述了同步声明依赖的模块定义。这个规范主要用于在服务器端实现模块化代码组织，但也可用于定义在浏览器中使用的模块依赖。CommonJS 模块语法不能在浏览器中直接运行。

**在 CommonJS 中，模块加载是模块系统执行的同步操作。**

```js
//定义
var moduleB = require('./moduleB');
module.exports = {
 stuff: moduleB.doStuff();
}; 

//使用
console.log('moduleA');
require('./moduleA'); // "moduleA" 
```

**无论一个模块在 require()中被引用多少次，模块永远是单例。在下面的例子中，moduleA 只会 被打印一次。这是因为无论请求多少次，moduleA 只会被加载一次。**

```js
console.log('moduleA');
var a1 = require('./moduleA');
var a2 = require('./moduleA');
console.log(a1 === a2); // true 
```

模块第一次加载后会被缓存，后续加载会取得缓存的模块



module.exports 对象非常灵活，有多种使用方式。

```js
//单值
module.exports = 'foo'; 
// 多值
module.exports = {
 a: 'A',
 b: 'B'
}; 
// 等同
module.exports.a = 'A';
module.exports.b = 'B'; 


```



#### AMD

AMD 模块实现的核心是用**函数包装模块定义**。这样可以防止声明全局变量，并允许加载器库控制何时加载模块。包装函数也便于模块代码的移植，因为包装函数内部的所有模块代码使用的都是原生 JavaScript 结构。包装模块的函数是全局 define 的参数，它是由 AMD 加载器库的实现定义的

```js
// ID 为'moduleA'的模块定义。moduleA 依赖 moduleB，
// moduleB 会异步加载
define('moduleA', ['moduleB'], function(moduleB) {
 return {
 stuff: moduleB.doStuff();
 };
}); 	
```

#### UMD

为了**统一** CommonJS 和 AMD 生态系统，通用模块定义（UMD，Universal Module Definition）规范应运而生。UMD 可用于创建这两个系统都可以使用的模块代码。本质上，UMD 定义的模块会在启动时 **检测要使用哪个模块系统**，然后进行适当配置，并把所有逻辑包装在一个立即调用的函数表达式（IIFE） 中。虽然这种组合并不完美，但在很多场景下足以实现两个生态的共存。

```js
(function (root, factory) {
 if (typeof define === 'function' && define.amd) {
 // AMD。注册为匿名模块
 define(['moduleB'], factory);
 } else if (typeof module === 'object' && module.exports) {
 // Node。不支持严格 CommonJS
 // 但可以在 Node 这样支持 module.exports 的
 // 类 CommonJS 环境下使用
 module.exports = factory(require(' moduleB '));
 } else {
 // 浏览器全局上下文（root 是 window）
 root.returnExports = factory(root. moduleB);
 }
}(this, function (moduleB) {
 // 以某种方式使用 moduleB
 // 将返回值作为模块的导出
 // 这个例子返回了一个对象
 // 但是模块也可以返回函数作为导出值
 return {};
})); 
```

### ES6 模块

ES6 最大的一个改进就是引入了模块规范。这个规范全方位简化了之前出现的模块加载器，原生浏览器支持意味着加载器及其他预处理都不再必要。从很多方面看，ES6 模块系统是集 AMD 和 CommonJS 之大成者。

ECMAScript 6 模块是作为一整块 JavaScript 代码而存在的。带有 type="module"属性的`<script>`标签会告诉浏览器相关代码应该作为模块执行，而不是作为传统的脚本执行。

与传统脚本不同，所有模块都会像`<script defer>`加载的脚本一样按顺序执行。解析到`<script type="module">`标签后会立即下载模块文件，但执行会延迟到文档解析完成。

#### 模块行为

ECMAScript 6 模块借用了 CommonJS 和 AMD 的很多优秀特性。下面简单列举一些。 

- 模块代码只在加载后执行。 

-  模块只能加载一次。 

-  模块是单例。 

-  模块可以定义公共接口，其他模块可以基于这个公共接口观察和交互。 

-  模块可以请求加载其他模块。 

- 支持循环依赖。 ES6 模块系统也增加了一些新行为。 

-  ES6 模块默认在严格模式下执行。 

-  ES6 模块不共享全局命名空间。 

-  模块顶级 this 的值是 undefined（常规脚本中是 window）。 

-  模块中的 var 声明不会添加到 window 对象。 

-  ES6 模块是异步加载和执行的。

    

#### 导出

```js
// 默认导出 只能一个
export default foo
// 等同于
export { foo as default }; 
// 导出多个
export { foo, bar as myBar, baz }; 
```

#### 导入

import 语句被提升到模块顶部。因此，与 export 关键字类似，import 语句与使用导入值的语句 的相对位置并不重要。不过，还是**推荐**把导入语句**放在模块顶部**。

导入对模块而言是只读的，实际上相当于 const 声明的变量。在使用*执行批量导入时，赋值给别名的命名导出就好像使用  `Object.freeze() `冻结过一样。直接修改导出的值是不可能的，但**可以修改导出对象的属性**。同样，也不能给导出的集合添加或删除导出的属性。要修改导出的值，必须使用有内部变量和属性访问权限的导出方法。

#### 工作者模块

```js
// 下面是两种类型的 Worker 的实例化行为：
// 第二个参数默认为{ type: 'classic' }
const scriptWorker = new Worker('scriptWorker.js');
const moduleWorker = new Worker('moduleWorker.js', { type: 'module' })
```

#### 兼容性

```js
// 支持模块的浏览器会执行这段脚本
// 不支持模块的浏览器不会执行这段脚本
<script type="module" src="module.js"></script>
// 支持模块的浏览器不会执行这段脚本
// 不支持模块的浏览器会执行这段脚本
<script nomodule src="script.js"></script>
```

## Web Worker

### 简介

JavaScript 环境实际上是运行在托管操作系统中的虚拟环境。在浏览器中每打开一个页面，就会分 配一个它自己的环境。这样，每个页面都有自己的内存、事件循环、DOM，等等。每个页面就相当于一个**沙盒**，不会干扰其他页面。对于浏览器来说，同时管理多个环境是非常简单的，因为所有这些环境都是**并行执行**的。

#### WorkerGlobalScope

在网页上，window 对象可以向运行在其中的脚本暴露各种全局变量。在工作者线程内部，没有 window 的概念。这里的全局对象是 WorkerGlobalScope 的实例，通过 self 关键字暴露出来。

### 使用

```js
// emptyWorker.js
// 空的 JS 工作者线程文件

// main.js
console.log(location.href); // "https://example.com/"
const worker = new Worker(location.href + 'emptyWorker.js');
console.log(worker); // Worker {} 
```

#### 安全限制

工作者线程的脚本文件**只能从与父页面相同的源加载**。从其他源加载工作者线程的脚本文件会导致错误!

## 最佳实践

说代码“可维护”就意味着它具备如下特点。 

* **容易理解**：无须求助原始开发者，任何人一看代码就知道它是干什么的，以及它是怎么实现的。
* **符合常识**：代码中的一切都显得顺理成章，无论操作有多么复杂。 
* **容易适配**：即使数据发生变化也不用完全重写。 
* **容易扩展**：代码架构经过认真设计，支持未来扩展核心功能。 
* **容易调试**：出问题时，代码可以给出明确的信息，通过它能直接定位问题。

### 编码规范

#### 可读性

-  使用合适的代码缩进

- 写注释
  - **函数和方法：**每个函数和方法都应该有注释来描述其用途，以及完成任务所用的算法。
  - **大型代码块。**多行代码但用于完成单一任务的，应该在前面给出注释，把要完成的任务写清楚。
  -  **复杂的算法**:  如果使用了独特的方法解决问题，要通过注释解释明白。
  - **使用黑科技。**由于浏览器之间的差异，JavaScript 代码中通常包含一些黑科技。

#### 变量和函数命名

- **变量名应该是名词**，例如 car 或 person。
- **函数名应该以动词开始**，例如 getName()。**返回布尔值的函数通常以 is 开头**，比如 isEnabled()。
- **变量、函数和方法应该以小写字母开头，使用驼峰大小写（camelCase）形式**，如 getName()和 isPerson。**类名应该首字母大写**，如 Person、RequestFactory。**常量值应该全部大写并以 下划线相接**，比如 REQUEST_TIMEOUT
- 名称要尽量用描述性和直观的词汇

#### 使用常量

关键在于把数据从使用它们的逻辑中分离出来。可以使用以下标准检查哪些数据需要提取。 

- **重复出现的值**：任何使用超过一次的值都应该提取到常量中，这样可以消除一个值改了而另一 个值没改造成的错误。这里也包括 CSS 的类名。 
-  **用户界面字符串**：任何会显示给用户的字符串都应该提取出来，以方便实现国际化。 
-  **URL**：Web 应用程序中资源的地址经常会发生变化，因此建议把所有 URL 集中放在一个地方管理。 
-  **任何可能变化的值**：任何时候，只要在代码中使用字面值，就问问自己这个值将来是否可能会变。如果答案是“是”，那么就应该把它提取到常量中

### 性能

#### 作用域意识

- 避免全局查找

  **只要函数中有引用超过两次的全局对象，就应该把这个对象保存为一个局部变量。**

- 不使用 with 语句

#### 选择正确的方法

1.  避免不必要的属性查找

   **使用变量和数组相比访问对象属性效率更高**，访问对象属性的算法复杂度是 O(n)。访问对象的每个属性都比访问变量或数组花费的时间长，因为查找属性名要搜索原型链。简单来说，查找的属性越多， 执行时间就越长。

   ```js
   let query = window.location.href.substring(window.location.href.indexOf("?")); 
   //只要使用某个 object 属性超过一次，就应该将其保存在局部变量中。第一次仍然要用 O(n)的复杂度去访问这个属性，但后续每次访问就都是 O(1)，
   let url = window.location.href;
   let query = url.substring(url.indexOf("?")); 
   ```

2. 优化循环

   - **简化终止条件。**
   -  **简化循环体。**
   -  **使用后测试循环。**最常见的循环就是 for 和 while 循环，这两种循环都属于先测试循环。do-while 就是后测试循环，避免了对终止条件初始评估 ，因此应该会更快。

3. 展开循环

   达夫设备实现，**展开循环对于大型数据集可以节省很多时间，但对于小型数据集来说，则可能不值得。因为实现同 样的任务需要多写很多代码，所以如果处理的数据量不大，那么显然没有必要。**

4. 其他

   - **原生方法很快**，应该尽可能使用原生方法，而不是使用 JavaScript 写的方法。
   - **switch 语句很快。**
   - **位操作很快。**

#### DOM优化

1. **实时更新最小化**

   **访问 DOM 时，只要访问的部分是显示页面的一部分，就是在执行实时更新操作。**之所以称其为实时更新，是因为涉及立即（实时）更新页面的显示，让用户看到。每次这样的更新，无论是插入一个字符还是删除页面上的一节内容，都会导致性能损失。这是因为浏览器需要为此重新计算数千项指标，之后才能执行更新。实时更新的次数越多，执行代码所需的时间也越长。反之，实时更新的次数越少，代码执行就越快

   - 从页面中移除列表，执行更新，然后再把列表插回页面中相同的位置。**不可取，因为每次更新时页面都会闪烁。**

   - 使用文档片段构建 DOM 结构，然后一次性将它添加到 list 元素。这个办法可以减少实时更新，也可以避免页面闪烁。

     ```js
     let list = document.getElementById("myList"),
       fragment = document.createDocumentFragment(),
       item;
     for (let i = 0; i < 10; i++) {
       item = document.createElement("li");
       fragment.appendChild(item);
       item.appendChild(document.createTextNode("Item " + i));
     }
     list.appendChild(fragment);
     ```

     

2. **使用 innerHTML**

在页面中创建新 DOM节点的方式有两种：使用 DOM方法如 **createElement()**和 **appendChild()**， 以及使用 **innerHTML**。

3.  **使用事件委托**

### 部署

## ES2019



