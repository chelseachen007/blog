# Vue 专题

## v-show 与 v-if 区别

1. v-show 只是 display：none 和 display：block 的切换。而 v-if 是将 DOM 移除，并重新渲染
2. v-show 适合 频繁切换的模块，一次渲染则使用 v-if
3. 使用 v-if 时可以默认设 false 让其不渲染，等待需要时再进行 nextTick 异步渲染

## 计算属性和 watch 的区别

计算属性其实是一个惰性的 Watcher，他在内部维护的一个 `diary` 根据 产生的新值是否有变化来判断是否要通知 `notify` 更新视图,是一种为了减少不必要渲染的优化措施。

`computed` 可以监听多个值，动态返回结果，`watch` 是一个过程，在值变化的时候出一个回调并做一些事。所以在需要一个动态值时，就使用 `computed`，需要知道值 的变化后执行逻辑使用 `watch`。

#### computed 是一个对象时，它有哪些选项？

get()和 set()

#### computed 和 methods 有什么区别？

computed 不能接受参数，具有缓存，可以监听动态值

#### computed 是否能依赖其它组件的数据？

computed 可以依赖其它 computed，甚至是其它组件的 data。

#### watch 是一个对象时，它有哪些选项？

- deep 是否深度
- handler 执行的函数
- immediate 是否立即执行

## 组件中 data 为什么是函数

组件是用来复用的，注册组件本质上是创造了一个组件构造器的引用。使用对象的话，会公用一个引用地址，造成一个组件值之间的相互影响，这明显不是我们想要看到的。所以使用函数每次都返回一个新的对象。

## 自定义组件的 v-model 是怎样实现的

组件的 v-model 是 Vue 为我们写的一种语法糖，他为我们传入一个值为`value`的`props`和绑定了一个`input`的`emit`事件，将值传递上来赋值。在制作一些特殊组件值需要重新命名时，可以使用``model``进行`value`和`input` 的改名。另外Vue在2.+的时候推出了一个修饰.sync支持多个v-model值绑定，只需要将事件变成`‘updata：value’`
