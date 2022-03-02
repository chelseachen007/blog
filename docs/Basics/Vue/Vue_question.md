# 问题

## 设置index或者random为key会产生的后果

首先index为key，在sameNode阶段都会判定是同一个节点，然后进行patchNode，发现内容变化后，进行class，style等的更新，而其实原本只需要进行Vnode的交换

使用random则会是sameNode 判断完全失效，全部节点重新销毁，重建，性能损坏很大

## 组件中的 data 为什么是函数

如果组件里 data 直接写了一个对象的话，那么如果你在模板中多次声明这个组件，组件中的 data 会指向同一个引用。

此时如果在某个组件中对 data 进行修改，会导致其他组件里的 data 也被污染。而如果使用函数的话，每个组件里的 data 会有单独的引用，这个问题就可以避免了。

## Watch 中的 deep:true 是如何实现的

当你设置deep：true的时候，源码内部会对对象进行递归访问，在此过程中不断的进行依赖收集。但这种情况会增加大量的依赖收集的性能上的损耗，可以通过watch指定字符串的方式减少。

## nextTick 实现原理

nextTick 通过去检测兼容性，遵循优先使用微任务的原则进行降级，分别是promise.then => mutationObserver = > setImmediate => setTimeout。

在nextTick接收到fn的时候，将其push到一个队列中，到下个任务队列时进行统一的执行清空 

## 请说一下响应式数据的原理