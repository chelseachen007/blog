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

组件的 v-model 是 Vue 为我们写的一种语法糖，他为我们传入一个值为`value`的`props`和绑定了一个`input`的`emit`事件，将值传递上来赋值。在制作一些特殊组件值需要重新命名时，可以使用`model`进行`value`和`input` 的改名。另外 Vue 在 2.+的时候推出了一个修饰.sync 支持多个 v-model 值绑定，只需要将事件变成`‘updata：value’`

## mixins 原理知道吗？

`mixins`在 Vue 内部是将 mixins 和组件的`options`传入一个`margeOptions`函数，这个函数我觉得`assign`有点像，前者是一个默认属性，当组件有同名属性时，会使用后者覆盖前者，数据对象`data`会进行递归合并，`computed`等会进行键值对比较，优先组件 Key 值。

优点：逻辑相同的代码都可以抽离出来，放入 mixins 实现复用

缺点：因为是根据 Key 进行覆盖，容易出现命名空间混乱导致不想要发生的覆盖

## **vue3 和 vue2 双向绑定的区别,优化点在哪,用 proxy 为什么是一种优化**

Vue3 采用了 proxy 进行数据拦截，这是一个 ES6 自带的一个 API，支持拦截整个对象几乎所有操作，不需要像 Vue2 一样对每个 Key 进行循环递归生成 Watcher。

Vue2 在收集依赖的时候每个 Key 都有一个依赖收集器，Vue 使用 weakMap 来收集依赖，减少依赖收集的开销

## 你知道 vue 中 key 的作用和工作原理吗？说说你对它的理解。

1. key 的作用是为了高效的更新虚拟 DOM，其原理是 Vue 在进行 patch 过程中可通过 key 精准的判断两个节点是否是同一个，从而避免频繁的更新不同元素，使得整个 patch 过程更加高效，减少 DOM 操作。
2. 另外，若不设置 key 还可能在列表更新时引发一些隐蔽的 bug

## 你怎么理解 vue 中的 diff 算法？

1. DOM 操作是奢侈的，diff 算法通过比对新旧 Vnode 树，将变化的地方更新到新 DOM 上，另外将时间复杂度降低到 O(n)
2. Vue2.x 为了降低 Weather 粒度，每个组件只有一个 Weather，引入 diff 才能精准找到变化的地方
3. diff 过程整体遵循深度优先、同层比较的策略；两个节点之间比较会根据它们是否拥有子节点或者文 本节点做不同操作；比较两组子节点是算法的重点，首先假设头尾节点可能相同做 4 次比对尝试，如果 没有找到相同节点才按照通用方式遍历查找，查找结束再按情况处理剩下的节点；借助 key 通常可以非 常精确找到相同节点，因此整个 patch 过程非常高效。

## 谈一谈对 vue 组件化的理解

1. 组件是独立和可复用的代码组织单元。组件系统是 Vue 核心特性之一，它使开发者使用小型、独立和通常可复用的组件构建大型应用；
2. 组件化开发能大幅提高应用开发效率、测试性、复用性等；
3. vue 中常见组件化技术有：属性 prop，自定义事件，插槽等，它们主要用于组件通信、扩展等；
4. 合理的划分组件，有助于提升应用性能；
5. 组件应该是高内聚、低耦合的；
6. 遵循单向数据流的原则。

## MVC、MVP 和 MVVM 的理解

- 这三者都是框架模式，它们设计的目标都是为了解决 Model 和 View 的耦合问题。
- MVC 模式出现较早主要应用在后端，如 Spring MVC、ASP.NET MVC 等，在前端领域的早期也有应 用，如 Backbone.js。它的优点是分层清晰，缺点是数据流混乱，灵活性带来的维护性问题。
- MVP 模式在是 MVC 的进化形式，Presenter 作为中间层负责 MV 通信，解决了两者耦合问题，但 P 层 过于臃肿会导致维护问题。
- MVVM 模式在前端领域有广泛应用，它不仅解决 MV 耦合问题，还同时解决了维护两者映射关系的 大量繁杂代码和 DOM 操作代码，在提高开发效率、可读性同时还保持了优越的性能表现。

## vue 性能优化的方法

1. 使用路由懒加载
2. keep-alive 缓存页面

3. 长列表性能优化

- 虚拟列表
- 不展示，可以通过 Object.freeze 冻结数据

4. 图片懒加载
5. 第三方库按需引入

## vue3 新特性

1. 优化 diff 算法，跳过一些静态节点和静态树
2. 引入 Composition API
3. hooks 写法使逻辑更加内聚
4. 通过 Tree-shark 进行优化包体积
5. 使用 proxy 实现双向绑定

## vuex 使用及理解

## vue 中组件之间的通信方式？

1. 跨组件通信

   - Provide 和 inject // 不是响应式的，
   - $attrs/$listeners

2. 父子通信

   - Prop 和 \$emit
   - \$refs
   - $parent 和$children

3. 兄弟通信

   - Vuex
   - VueBus

4. 组件库通信方式

   - 自行实现 dispatch 和 broadcast 方法

     前者用于向上级派发事件，只要是它的父级（一级或多级以上），都可以在组件内通过 \$on （或 events，2.x 已废弃）监听到，后者相反，是由上级向下级广播事件的。

   - 向上/下找到所有/最近的指定组件——findComponentsUpward 通过 Component Name 去寻找

## vue-router 中如何保护指定路由的安全？

## 你知道 nextTick 吗？它是干什么的？实现原理是什么？

- vue 如何检测到 DOM 更新完毕呢？
  能监听到 DOM 改动的 API：MutationObserver

- 理解 MutationObserver
  MutationObserver 是 HTML5 新增的属性，用于监听 DOM 修改事件，能够监听到节点的属性、文本内容、子节点等的改动，是一个功能强大的利器。

Vue 的 nextTick 采用的是降级策略， 优先使用的是微任务的 Promise 和 MutationObserver 兼容性不支持则降级为宏任务的 setImmediate、MessageChannel、setTimeout.

## 谈一谈你对 vue 响应式原理的理解？

1. 由于 Vue 执行一个组件的 `render` 函数是由 `Watcher` 去代理执行的，`Watcher` 在执行前会把 `Watcher` 自身先赋值给 `Dep.target` 这个全局变量，等待响应式属性去收集它
2. 这样在哪个组件执行 `render` 函数时访问了响应式属性，响应式属性就会精确的收集到当前全局存在的 `Dep.target` 作为自身的依赖
3. 在响应式属性发生更新时通知 `Watcher` 去重新调用 `vm._update(vm._render())` 进行组件的视图更新

## 手写一个简单的 diff 算法

```JavaScript
function patchNode (oldNode, newNode) {
    const oldChildren = oldNode.children
    const newChildren = newNode.children
    // 老的有子节点，新的没有就移除
    if (oldChildren.length && !newChildren.length) {
        // remove oldChildren
    }
    // 老的没有子节点，新的有 就 清空老节点并将新节点加入到DOM下
    else if (oldChildren.length && !newChildren.length) {
        // oldChildren =null
        // Dom.append(newChildren)
    }
    // 都没有 就只做文本的替换
    else if (!oldChildren.length && !newChildren.length) {
        // 替换文本
    }
    else {
        update(oldChildren, newChildren)
    }

}
function someNode () {
    // 优先判断 key 是否相同
    // 异步组件 判断 asyncFactory  是否相同
    // 同步组件 判断input,data,isComment  是否相同
}
function update (oldNode, newNode) {
    let newStart
    let oldStart
    let oldEnd
    let newEnd
    while (oldStart <= oldEnd && newStart <= newEnd) {
        // someNode 判断后 都进入 patchVnode
        //新头和旧头
        if (newStart === oldStart) {
            newStart++
            oldStart++
        }
        //旧尾和新尾
        else if (oldEnd === newEnd) {
            oldEnd--
            newEnd--
        }
        //旧头和新尾
        else if (oldStart === newEnd) {
            oldStart++
            newEnd--
        }
        //新头和旧尾
        else if (newStart === oldEnd) {
            newStart++
            oldEnd--
        }
        //都找不到 就遍历oldNode 生成一个 {key:index} 的Map
        let oldKeyToIdx = {}
        if (oldKeyToIdx[newStart.key]) {
            // move 这个节点到 oldStart 之前 然后继续遍历
            newStart++
        }
        // 如果找不到，或者 key 相同 但内容不相同
        else {
            //createElm创建一个新的DOM节点。
        }
    }
    //循环完
    // 新的比老的长 addVnodes 多出来的节点
    // 老的比新的长 removeVnodes 多出来的节点
}
```
