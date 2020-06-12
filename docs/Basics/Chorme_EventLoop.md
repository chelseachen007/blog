# EventLoop

## 宏任务

我们都知道JS是单线程的，我们按照代码顺序写入主线程，然后主线程再依次执行。但是浏览器是多个线程合作运行的，并不是执行之前统一安排好的。所以浏览器的主线程通过一个事件循环机制，**可以接受并执行新的任务**。我们可以通过一个 for 循环语句来监听是否有新的任务，可以在线程运行过程中，等待用户输入的数字，等待过程中线程处于暂停状态，一旦接收到用户输入的信息，那么线程会被激活，然后执行相加运算，最后输出结果。然后一直循环执行。

那么我们如何实现按序的将任务添加到for循环中呢，那么答案就是**消息队列**

**消息队列是一种数据结构，可以存放要执行的任务**。它符合队列“**先进先出**”的特点，也就是说**要添加任务的话，添加到队列的尾部；要取出任务的话，从队列头部去取**。

### 页面使用单线程的缺点

**第一个问题是如何处理高优先级的任务。**

因为 DOM 变化非常频繁，如果每次发生变化的时候，都直接调用相应的 JavaScript 接口，那么这个当前的任务执行时间会被拉长，从而导致**执行效率的下降**。

如果将这些 DOM 变化做成异步的消息事件，添加到消息队列的尾部，那么又会影响到监控的实时性，因为在添加到消息队列的过程中，可能前面就有很多任务在排队了。

这也就是说，如果 DOM 发生变化，采用同步通知的方式，会影响当前任务的**执行效率**；如果采用异步方式，又会影响到**监控的实时性**



##### **第二个是如何解决单个任务执行时长过久的问题。**

因为所有的任务都是在单线程中执行的，所以每次只能执行一个任务，而其他任务就都处于等待状态。如果其中一个任务执行时间过久，那么下一个任务就要等待很长时间。

### 宏任务列表

- 渲染事件（如解析 DOM、计算布局、绘制）；
- 用户交互事件（如鼠标点击、滚动页面、放大缩小等）；
- JavaScript 脚本执行事件；
- 网络请求完成、文件读写完成事件。

### setTimeout 

1.  如果当前任务执行时间过久，会影延迟到期定时器任务的执行
2.  如果 setTimeout 存在嵌套调用，那么系统会设置最短时间间隔为 4 毫秒
3.  未激活的页面，setTimeout 执行最小间隔是 1000 毫秒
4.   延时执行时间有最大值

`Chrome`、`Safari`、`Firefox `都是以 32 个 bit 来存储延时值的，32bit 最大只能存放的数字是 2147483647 毫秒，这就意味着，如果 setTimeout 设置的延迟值大于 2147483647 毫秒（大约 24.8 天）时就会溢出，这导致定时器会被立即执行.

5. 如果被 setTimeout 推迟执行的回调函数是某个对象的方法，那么该方法中的 this 关键字将指向全局环境，而不是定义时所在的那个对象。

### requestAnimationFrame 

 requestAnimationFrame 提供一个原生的API去执行动画的效果，它会在一帧（一般是16ms）间隔内根据选择浏览器情况去执行相关动作。

## 微任务

为了解决消息队列的种种问题，浏览器引入了微任务。**微任务可以在实时性和效率之间做一个有效的权衡**。

每个宏任务都有一个微任务列表，在宏任务的执行过程中产生微任务会被添加到该列表中。**执行时机是在主函数执行结束之后、当前宏任务结束之前。**



在现代浏览器里面，产生微任务有两种方式:

第一种方式是使用 MutationObserver 监控某个 DOM 节点，然后再通过 JavaScript 来修改这个节点，或者为这个节点添加、删除部分子节点，当 DOM 节点发生变化时，就会产生 DOM 变化记录的微任务。

第二种方式是使用 Promise，当调用 Promise.resolve() 或者 Promise.reject() 的时候，也会产生微任务。



### MutationObserver 

#### Mutation Event

 2000 年的时候引入了 Mutation Event，Mutation Event 采用了**观察者的设计模式**，当 DOM 有变动时就会立刻触发相应的事件，这种方式属于同步回调。

采用 Mutation Event 解决了实时性的问题，因为 DOM 一旦发生变化，就会立即调用 JavaScript 接口。但也正是这种实时性造成了严重的性能问题，因为每次 DOM 变动，渲染引擎都会去调用 JavaScript，这样会产生较大的性能开销。

#### MutationObserver 

MutationObserver 将响应函数改成异步调用，可以不用在每次 DOM 变化都触发异步调用，而是等多次 DOM 变化后，**一次触发异步调用**，并且还会使用一个数据结构来记录这期间所有的 DOM 变化。这样即使频繁地操纵 DOM，也不会对性能造成太大的影响。

如果采用 setTimeout 创建宏任务来触发回调的话，那么实时性就会大打折扣，因为上面我们分析过，在两个任务之间，可能会被渲染进程插入其他的事件，从而影响到**响应的实时性**。

MutationObserver 采用了“**异步 + 微任务**”的策略。

- 通过**异步**操作解决了同步操作的**性能问题**；
- 通过**微任务**解决了**实时性的问题**。

### Pormise

#### 为什么会有promise

首先让我们来了解下，回调函数有什么缺点:

1. 多重嵌套，导致回调地狱
2. 代码跳跃，并非人类习惯的思维模式
3. 信任问题，你不能把你的回调完全寄托与第三方库，因为你不知道第三方库到底会怎么执行回调（多次执行）
4. 第三方库可能没有提供错误处理
5. 不清楚回调是否都是异步调用的（可以同步调用ajax，在收到响应前会阻塞整个线程，会陷入假死状态，非常不推荐）

为了兼容一些promise库，Promise采用了一种鸭子模型（**如果它看起来像只鸭子，叫起来 像只鸭子，那它一定就是只鸭子**）来判断这个函数是不是一个promise函数，也就是判断.then()方法是否注册了 "`fullfillment`" 和 / 或 "`rejection`" 事件.

代码跳跃则是通过事件穿透解决的

#### promise方法

##### 1.Promise.prototype.finally()

finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

相当于

```js
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```

##### 2.Promise.all() 

Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

另外，Promise.all()方法的参数可以不是数组，但**必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。**

（1）只有p1、p2、p3的状态**都变成fulfilled**，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中**有一个被rejected**，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

##### 3.Promise.race()

```js
const p = Promise.race([p1, p2, p3]);
```

上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

下面是一个例子，如果指定时间内没有获得结果，就将 Promise 的状态变为reject，否则变为resolve。

```js
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);

p
.then(console.log)
.catch(console.error);
```

上面代码中，如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。

这种可以使用axios的超时拦截，别的什么作用还没想到

##### 4.Promise.allSettled()

Promise.allSettled()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束。该方法由 **ES2020** 引入。

有时候，我们**不关心异步操作的结果，只关心这些操作有没有结束**。这时，Promise.allSettled()方法就很有用。如果没有这个方法，想要确保所有操作都结束，就很麻烦。Promise.all()方法无法做到这一点。

##### 5.Promise.any()

与promise.all()相反

Promise.any()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。该方法目前是一个第三阶段的提案 。

##### 6.Promise.resolve() 

有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。

Promise.resolve()等价于下面的写法

Promise.resolve('foo') // 等价于 new Promise(resolve => resolve('foo'))

Promise.resolve方法的参数分成四种情况。

**（**1）参数是一个 Promise 实例

如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

（2）参数是一个thenable对象

thenable对象指的是具有then方法的对象，比如下面这个对象。

let thenable = {  then: function(resolve, reject) {    resolve(42);  } };

（3）参数不是具有then方法的对象，或根本就不是对象

（4）不带有任何参数

相当于new Promise

需要注意的是，立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。

##### 7.Promise.reject() 

##### 8Promise.try()

由于Promise.try为所有操作提供了统一的处理机制，所以如果想用then方法管理流程，最好都用Promise.try包装一下。这样有许多好处，其中一点就是可以更好地管理异常。

解决了try{}catch{} 无法处理异步错误的问题

### 手写promise

#### 简易实现

```js
function Promise(excutro) {
    let self = this
    self.onResolved = []
    self.onReject = []
    self.stauts = 'pedding'

    function resolve(value) {
        if (self.stauts === 'pedding') {
            self.stauts = 'resolved'
            self.value = value
            self.onResolved.forEach(fn => fn(value));
        }
    }

    function reject(reson) {
        if (self.stauts === 'pedding') {
            self.stauts = 'reject'
            self.reson = reson
            self.onResolved.forEach(fn => fn(value));
        }
    }
    excutro(resolve, reject)
}
```

#### then

```js
Promise.prototype.then = function (resolved, rejected) {
  let self = this;
  let promise2;
  resolved = typeof resolved === "function" ? resolved : (val) => val;
  if (self.stauts === "resolved") {
    return (promise2 = new Promise((resolve, reject) => {
      try {
        x = resolved(self.value);
        if (x instanceof Promise) {
          x = x.then;
        }
        resolve(x);
      } catch (e) {
        reject(e);
      }
    }));
  }
  if (self.stauts === "pedding") {
    return (promise2 = new Promise((resolve, reject) => {
      try {
        self.onResolved.push(function () {
          try {
            x = resolved(self.value);
            if (x instanceof Promise) x = x.then(resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } catch (e) {
        reject(e);
      }
    }));
  }
};
```

#### all

```js
Promise.prototype.all = function (promiseArr) {
  let index = 0;
  let result = [];
  return new MyPromise((resolve, reject) => {
    promiseArr.forEach((p, i) => {
      //Promise.resolve(p)用于处理传入值不为Promise的情况
      MyPromise.resolve(p).then(
        (val) => {
          index++;
          result[i] = val; //所有then执行后, resolve结果
          if (index === promiseArr.length) {
            resolve(result);
          }
        },
        (err) => { reject(err);} //有一个Promise被reject时，MyPromise的状态变为reject 
      );
    });
  });
};

```



#### race

```js
Promise.prototype.race = function (promiseArr) {
  return new MyPromise((resolve, reject) => {
    //同时执行Promise,如果有一个Promise的状态发生改变,就变更新MyPromise的状态
    for (let p of promiseArr) {
      MyPromise.resolve(p).then(
        //Promise.resolve(p)用于处理传入值不为Promise的情况
        (value) => { resolve(value);}, //注意这个resolve是上边new MyPromise的 
        (err) => { reject(err); }
      );
    }
  });
};
```



#### stop

```js
Promise.cancel = Promise.stop = function() {
  return new Promise(function(){})
}
```

#### done

```js
Promise.prototype.done = function(){
  return this.catch(function(e) { // 此处一定要确保这个函数不能再出错
    console.error(e)
  })
}
```

#### 出错时

出错时，是用throw new Error()还是用return Promise.reject(new Error())呢？

性能方面，throw new Error()会使代码进入catch块里的逻辑

而使用Promise.reject(new Error())，则需要构造一个新的Promise对象（里面包含2个数组，4个函数：resolve/reject，onResolved/onRejected），也会花费一定的时间和内存

综上，我觉得在Promise里发现显式的错误后，用throw抛出错误会比较好，而不是显式的构造一个被reject的Promise对象。

### await

async 函数是什么？一句话，它就是 Generator 函数的语法糖。

Generator 函数，依次读取两个文件。

```js
const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

async函数

```js
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

async函数对 Generator 函数的改进，体现在以下四点

（1）内置执行器。

（2）更好的语义。	

（3）更广的适用性。

（4）返回值是 Promise。

Promise 对象的状态变化 

async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。

#### 实现原理 

async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

```js
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}
```

spawn

```js
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```

