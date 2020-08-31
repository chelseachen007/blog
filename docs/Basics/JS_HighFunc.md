# 高阶函数



### compose

##### redux版本(同步函数)

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



##### koa版本(异步中间件)

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



###### compose实现

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



### 函数柯里化



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

