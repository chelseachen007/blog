# Router

## 监听实现

## router-link

## router-view

## H5 history API

```js
// 在history中向后跳转
window.history.back();
window.history.go(-1);

// 向前跳转
window.history.forward();
window.history.go(1);

// 当前页
window.history.go(0);

//pushState()需要三个参数：一个状态对象，一个标题（目前被忽略）和一个URL（可选的）。
var stateObj = { foo: 'bar' };
window.history.pushState(stateObj, 'page 2', 'bar.html');
```

