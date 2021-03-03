# 防抖和节流

## 前言

在我们工作场景有很多频繁触发的,比如：

1. window 事件:`resize`,`scroll`
2. 鼠标事件:`mouseMove`,`mousedown` 等
3. 键盘事件:`keyup`,`keydown` 等等

比如鼠标经过事件,如果你监听他去执行一个函数回调,你会发现一个鼠标滑过区块就会触发成百上千次函数,这对性能显然是个考验。

一般为了解决这个问题,我们有两个解决方案：

1. **debounce 防抖**
2. **throttle 节流**

## 防抖

防抖的原理：无论你触发多少次事件,我一定在事件触发 N 秒后才执行。如果你一直频繁操作,我就一直不触发,等你停止操作 N 庙后再去执行。

### 简单防抖

```JavaScript
// 第一版
function debounce(func, wait) {
  var timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}
```

### 绑定 this 和 event 事件,返回 result

在我们使用`debounce`函数的时候会把`this`绑定到`windows`对象上,这显然不是我们想要的

函数可能是有返回值的,我们也要考虑

另外事件传入我们也没有接受到,所以还要将参数传入

```JavaScript
function debouce(func, wait) {
  var timeout, result;
  return function () {
    var content = this;
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      result = func.apply(content, args);
    }, wait);
    return result;
  };
}
```

### 立即执行

客户：哎 我怎么点半天都没有用啊,能不能给我点了就执行啊,害

得嘞

我们通过传入一个`immediate`来控制函数是否立即执行,

```JavaScript
function debouce(func, wait, immediate = false) {
  var timeout, result;

  var debounced = function () {
    var content = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      //如果执行过,那么就不执行了
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(content, args);
    } else {
      timeout = setTimeout(() => {
        result = func.apply(content, args);
      }, wait);
    }
  };
  return debounced;
}
```

### 考虑一下取消

```JavaScript
debounced.cancel = function () {
  clearTimeout(timeout);
  timeout = null;
};
```

## 节流

节流的原理：如果你持续触发事件,每隔 N 秒,**只执行一次事件**

### 时间戳版本

时间戳版本原理：第一次拿到当前时间的时间戳并保存在闭包里,拿到下次执行的时间戳比较,如果大于等待时间就执行,并将时间更新。那么我们开始写代码。

```JavaScript
function throttle(func, wait) {
  var context, args;
  var previous = 0;
  var throttled = function () {
    context = this;
    args = arguments;
    var now = +new Date();
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  };
  return throttled;
}
```

### 定时器版本

定时器版本原理:和上面基本一致,就是变成通过一个标记`timeout`来记录是否有一个定时器在执行了,如果没有就执行一个新的定时器

```JavaScript
function throttle(func, wait) {
  var context, args;
  js;
  var timeout;
  var throttled = function () {
    context = this;
    args = arguments;

    if (!timeout) {
      timeout = setTimeout(() => {
        func.apply(context, args);
        timeout = null;
      }, wait);
    }
  };
  return throttled;
}
```

所以比较两个方法：

1. 第一种事件会立刻执行,第二种事件会在 n 秒后第一次执行
2. 第一种事件停止触发后没有办法再执行事件,第二种事件停止触发后依然会再执行一次事件

### 合并版本

拥有执行和停止触发后还会执行 一次的特性

```JavaScript
function throttle(func, wait) {
  var context, args, timeout;
  var previous = 0;
  var throttled = function () {
    var now = +new Date();
    context = this;
    args = arguments;
    function later() {
      previous = +new Date();
      timeout = null;
    }
    //还有多少剩余时间
    let newDate = wait - (now - previous);

    if (newDate < 0 || newDate > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(later, wait);
    }
  };
  return throttled;
}
```

再加个取消就很完整了

## 扩展

// TODO:
可以使用 vue 写个函数防抖组件,

## 应用场景

### debounce

- search 搜索联想,用户在不断输入值时,用防抖来节约请求资源。
- window 触发 resize 的时候,不断的调整浏览器窗口大小会不断的触发这个事件,用防抖来让其只触发一次

### throttle

- 鼠标不断点击触发,mousedown(单位时间内只触发一次)
- 监听滚动事件,比如是否滑到底部自动加载更多,用 throttle 来判断
