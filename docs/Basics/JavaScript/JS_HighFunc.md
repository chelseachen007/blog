# 高阶函数





## 函数柯里化



一遍编程题引发的思考

#### 实现sum函数使得下面输出结果一致

```js
sum(1,2,3).sumOf()
sum(2,3)(1).sumOf()
sum(2)(1)(3).sumOf()
```



第一反应是柯里化

```js
function add(a, b) {
  return a + b;
}
function curry(add) {
  let arr = [];
  return function reply() {
    let arg = [...arguments];
    arr = arr.concat(arg);
    if (arg.length == 0) {
      return arr.reduce((p, c) => (p = add(p, c)), 0);
    } else {
      return reply;
    }
  };
}

let sum = curry(add);

console.log(sum(1, 2, 3)()); // 6
console.log(sum(2, 3)(1)()); //12
```

显然 这一没有sumof实现 也完全复用了

## 防抖和节流

强调一下它们的区别：

- 节流是让事件处理函数隔一个指定毫秒再触发
- 防抖则忽略中间的操作，只响应用户最后一次操作

## 函数拦截器

对废弃API进行提示增加

一个小细节，定义`notice = once(console.warn)`，用`notice`输出，这样的话，调用相同的函数只会在控制台显示一遍警告，就避免了输出太多重复的信息。

```js
function deprecate(fn, oldApi, newApi) {
  const message = `The ${oldApi} is deprecated.
Please use the ${newApi} instead.`;
  const notice = once(console.warn);

  return function(...args) {
    notice(message);
    return fn.apply(this, args);
  }
}
```

## WEB拦截器

```js
function intercept(fn, {beforeCall = null, afterCall = null}) {
  return function (...args) {
    if(!beforeCall || beforeCall.call(this, args) !== false) {
      // 如果beforeCall返回false，不执行后续函数
      const ret = fn.apply(this, args);
      if(afterCall) return afterCall.call(this, ret);
      return ret;
    }
  };
}
```

axios 请求队列拦截器的实现

## 高阶函数的范式

```js
function HOF0(fn) {
  return function(...args) {
    return fn.apply(this, args);
  }
}
```

`HOF0`是高阶函数的**等价范式**，或者说，`HOF0`修饰的函数功能和原函数`fn`的功能完全相同。因为被修饰后的函数就只是采用调用的`this`上下文和参数来调用`fn`，并将结果返回。也就是说，执行它和直接执行`fn`完全没区别。

## compose

**高阶函数可以任意组合**，形成更强大的功能。

另外，像这样`fn1(fn2(fn3(args...)))`嵌套的写法，我们也可以用高阶函数改变成更加友好的形式： 也就是compose

### redux版本(同步函数)

```js
function f1(arg) {
  console.log("f1", arg);
  return arg;
}
function f2(arg) {
  console.log("f2", arg);
  return arg;
}
function f3(arg) {
  console.log("f3", arg);
  return arg;
}

const res = f1(f2(f3("omg")));
console.log("res", res); //sy-log
// f3 omg
// f2 omg
// f1 omg
// res omg
```

优化写法

```js
function compose(...funcs) {
  if (!funcs.length) {
    return (arg) => arg;
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

compose(f1, f2, f3)("omg");
// f3 omg
// f2 omg
// f1 omg
```



### koa版本(异步中间件)

例子

```js
function compose(middlewares){
     return () = >{
         
     }
}

async function fn1(next) {
    console.log("fn1");
    await next();
    console.log("end fn1");
}

async function fn2(next) {
    console.log("fn2");
    await delay();
    await next();
    console.log("end fn2");
}

function fn3(next) {
    console.log("fn3");
}

function delay() {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            reslove();
        }, 2000);
    });
}


const middlewares = [fn1, fn2, fn3];
const finalFn = compose(middlewares);
finalFn();
```



#### compose实现

- compose 接受一个 函数数组
- 返回一个 具有一个 next函数参数的 函数
- 用Promise包装，
- 考虑边界条件 

```js
function compose(middlewares){
     return () = >{
         dispatch(0)
     }
     function  dispatch(i){
         let fn = middlewares[i]
         if(!fn) return Promise.resolve()
         return fn(()=> Promise.resolve(dispatch(i +1 )))
     }

}
```

