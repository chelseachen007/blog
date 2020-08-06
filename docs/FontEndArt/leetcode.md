# 编程题

## 实现交通灯的逻辑：红灯亮5s,绿灯亮10s,黄灯亮3s,红灯亮5s...不停循环执行，亮的动作可以用一个伪函数来表示。

```js
      function sleep(wait) {
        return new Promise((reslove) => {
          setTimeout(reslove, wait);
        });
      }
      async function changeColor(color, wait) {
        // this.color = color;
        console.log(color);
        await sleep(wait);
      }
      async function go() {
        while (true) {
          await changeColor("red", 5000);
          await changeColor("green", 15000);
          await changeColor("yellow", 3000);
        }
      }
```





## 要求设计LazyMan类，实现以下功能

```js

LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
```

代码

```js
      class LazyMans {
        constructor(name) {
          this.name = name;
          this.queen = [];
          setTimeout(() => {
            this._next();
          }, 0);
        }
        sleep(wait, isFiset = false) {
          const _sleep = () => {
            setTimeout(() => {
              console.log(`等待了${wait}秒`);
              this._next();
            }, wait * 1000);
          };
          isFiset ? this.queen.unshift(_sleep) : this.queen.push(_sleep);
          return this;
        }
        _next() {
          if (!this.queen.length) return;
          let shift = this.queen.shift();
          shift.call(this);
        }
        eat(food) {
          const _eat = () => {
            console.log(`I am eating ${food}`);
            this._next();
          };
          this.queen.push(_eat);
          return this;
        }
        sleepFirst(wait) {
          return this.sleep(wait, true);
        }
      }
      function LazyMan(name) {
        return new LazyMans(name);
      }
```





## 实现一个批量请求函数

要求：

1. 批量请求函数，最大并发数maxNum
2. 每当有一个请求返回，就留下一个空位，可以增加新的请求
3. 所有请求完成后，结果按照urls里面的顺序依次发出。

```js
function handleFetchQueue(func, urls, max, callback) {
  const urlCount = urls.length;
  const requestsQueue = [];
  const results = [];
  const errList = [];
  let i = 0;
  const isCallBack = () => {
    const allLen = results.length + errList.length;
    if (allLen === urlCount) {
      "function" === typeof callback && callback(results, errList);
    }
  };
  const handleRequest = (url) => {
    const req = func(url)
      .then((res) => {
        console.log("当前并发： " + requestsQueue);
        results.push(res);
        const allLen = results.length + errList.length;
        if (allLen < urlCount && i + 1 < urlCount) {
          requestsQueue.shift();
          handleRequest(urls[++i]);
        } else {
          isCallBack();
        }
      })
      .catch((e) => {
        errList.push(e);
        isCallBack();
      });
    if (requestsQueue.push(req) < max) {
      handleRequest(urls[++i]);
    }
  };
  handleRequest(urls[i]);
}
```



### 