> 如果做完这个笔记，还需要回头看原文，那么讲毫无意义。

# 深入浅出搞定React

## 常见问题

React的声明周期，对比15 16的区别

diff算法以及实现

React是什么样的框架，和Vue的对比

React的介绍以及原理实现



## 基础知识

### JSX

- JSX 的本质是什么，它和 JS 之间到底是什么关系？

- 为什么要用 JSX？不用会有什么后果？

- JSX 背后的功能模块是什么，这个功能模块都做了哪些事情？



Facebook 公司给 JSX 的定位是 JavaScript 的“扩展”，他在js编译后，会变成React.createElement，这个编译过程使用的就是 ` Babel `

JSX 语法糖允许前端开发者使用我们最为熟悉的类 HTML 标签语法来创建虚拟 DOM，在降低学习成本的同时，也提升了研发效率与研发体验。

![Drawing 3.png](https://s0.lgstatic.com/i/image/M00/5C/69/Ciqc1F-BeuGAepNsAACqreYXrj0410.png)

**在实际的面试场景下，许多候选人由于缺乏对源码的了解，谈及 createElement 时总会倾向于去夸大它的“工作量”**。但其实，相信你也已经发现了，createElement 中并没有十分复杂的涉及算法或真实 DOM 的逻辑，它的**每一个步骤几乎都是在格式化数据**。



可以联想到字节码和机器码之间的转换

![Drawing 7.png](https://s0.lgstatic.com/i/image/M00/5C/74/CgqCHl-Bex6AM5rhAACJMrix5bk913.png)

ReactElement 就是我们常说的虚拟DOM, 他和真实DOM之间还有个 **ReactDOM**.render()



## React 生命周期

```javascript
// React 15
componentWillReceiveProps()

shouldComponentUpdate()

componentWillMount()

componentWillUpdate()

componentDidUpdate()

componentDidMount()

render()

componentWillUnmount()
```

![1.png](https://s0.lgstatic.com/i/image/M00/5E/31/Ciqc1F-GZbGAGNcBAAE775qohj8453.png)



组件的更新分为两种：一种是由父组件更新触发的更新；另一种是组件自身调用自己的 setState 触发的更新。



> **componentReceiveProps 并不是由 props 的变化触发的，而是由父组件的更新触发的**，这个结论，请你谨记。



### React 16.3

![Drawing 0.png](https://s0.lgstatic.com/i/image/M00/5D/D9/CgqCHl-FVVeAaMJvAAKXOyLlUwM592.png)

React 15 生命周期和 React 16.3 生命周期在挂载阶段的主要差异在于，**废弃了 componentWillMount，新增了 getDerivedStateFromProps**。



**消失的 componentWillUpdate 与新增的 getSnapshotBeforeUpdate**

区别在于 **getSnapshotBeforeUpdate 的返回值会作为第三个参数给到 componentDidUpdate**。**它的执行时机是在 render 方法之后，真实 DOM 更新之前**。在这个阶段里，我们可以**同时获取到更新前的真实 DOM 和更新前后的 state&props 信息**。

> 这个生命周期的设计初衷，是为了“与 componentDidUpdate 一起，涵盖过时的 componentWillUpdate 的所有用例”（引用自 React 官网）。



#### 为什么要去除掉 componentWillUpdate

因为react 15是同步进行渲染，同步渲染的递归栈是非常深的，而且不能打断，这样就很容易一直占据着主线程，直到递归结束释放主线程**。在这个过程中，浏览器没有办法处理任何渲染之外的事情，会进入一种无法处理用户交互**的状态。因此若渲染时间稍微长一点，页面就会面临卡顿甚至卡死的风险。

在 Fiber 机制下，**render 阶段是允许暂停、终止和重启的**。当一个任务执行到一半被打断后，下一次渲染线程抢回主动权时，这个任务被重启的形式是“重复执行一遍整个任务”而非“接着上次执行到的那行代码往下走”。**这就导致 render 阶段的生命周期都是有可能被重复执行的**。

我们再来看看 React 16 打算废弃的是哪些生命周期：

- componentWillMount；
- componentWillUpdate；
- componentWillReceiveProps。

这些生命周期的共性，**就是它们都处于 render 阶段，都可能重复被执行**，而且由于这些 API 常年被滥用，它们在重复执行的过程中都存在着不可小觑的风险。

 [React 团队给出的这篇文章](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.htmlÏ) 就帮助大家规避“误操作”来说是绰绰有余的。



## React 数据通信

所谓**单向数据流**，指的就是当前组件的 state 以 props 的形式流动时，只能流向组件树中比自己层级更低的组件。

- 父 - 子 props
- 子 - 父  传递方法
- 兄弟组件  通过连接同一个属性值 进行并且传递方法
- 跨层级  事件中心 发布中心



### Context

```javascript
const AppContext = React.createContext()
const { Provider, Consumer } = AppContext


//Provider
<Provider value={title: this.state.title, content: this.state.content}>
  <Title />
  <Content />
 </Provider>

//Consumer
<Consumer>
  {value => <div>{value.title}</div>}
</Consumer>
```



### 过时的Context

- **代码不够优雅**
- 如果组件提供的一个Context发生了变化，而中间父组件的 shouldComponentUpdate 返回 false，**那么使用到该值的后代组件不会进行更新**。使用了 Context 的组件则完全失控，所以基本上没有办法能够可靠的更新 Context。[这篇博客文章](https://medium.com/@mweststrate/how-to-safely-use-react-context-b7e343eff076)很好地解释了为何会出现此类问题，以及你该如何规避它。  ——React 官方



### Redux



## Hooks

React-Hooks 自 **React 16.8 以来**才真正被推而广之

### 函数组件与类组件

函数组件与类组件的对比：无关“优劣”，只谈“不同”

- 类组件需要继承 class，函数组件不需要；
- 类组件可以访问生命周期方法，函数组件不能；
- 类组件中可以获取到实例化后的 this，并基于这个 this 做各种各样的事情，而函数组件不可以；
- 类组件中可以定义并维护 state（状态），而函数组件不可以；
- ......

### 类组件

React 类组件内部预置了相当多的“现成的东西”等着你去调度/定制，state 和生命周期就是这些“现成东西”中的典型。要想得到这些东西，难度也不大，你只需要轻轻地**继承**一个 React.Component 即可。

**但是 多就是好吗**

他增加了我们的学习成本，这时就显得类组件太重了。



### 函数组件

，函数组件肉眼可见的特质自然包括轻量、灵活、易于组织和维护、较低的学习成本等。这些要素毫无疑问是重要的，它们也确实驱动着 React 团队做出改变。但是除此之外，还有一个非常容易被大家忽视、也极少有人能真正理解到的知识点，我在这里要着重讲一下。这个知识点缘起于 React 作者 Dan 早期特意为类组件和函数组件写过的[一篇非常棒的对比文章](https://overreacted.io/how-are-function-components-different-from-classes/)，这篇文章很长，但是通篇都在论证这一句话：

> **函数组件会捕获 render 内部的状态，这是两类组件最大的不同。**

**函数组件更加契合 React 框架的设计理念**。 

> UI = render(data)



### 为什么需要 React-Hooks”

1. #### 告别难以理解的 Class：把握 Class 的两大“痛点”

   **this 和生命周期**两个痛点

2. #### Hooks 如何实现更好的逻辑拆分

   ***\*我们可以有专门管理订阅的函数组件、专门处理 DOM 的函数组件、专门获取数据的函数组件等。Hooks 能够帮助我们\**实现业务逻辑的聚合，避免复杂的组件和冗余的代码**。

3. #### 状态复用：Hooks 将复杂的问题变简单



### 使用原则

使用原则，原则的内容如下：

1. 只在 React 函数中调用 Hook；
2. 不要在循环、条件或嵌套函数中调用 Hook。



### 原理

**从源码调用流程看原理：Hooks 的正常运作，在底层依赖于顺序链表**

```javascript
function mountWorkInProgressHook() {

  // 注意，单个 hook 是以对象的形式存在的
  var hook = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };

  if (workInProgressHook === null) {
    // 这行代码每个 React 版本不太一样，但做的都是同一件事：将 hook 作为链表的头节点处理
    firstWorkInProgressHook = workInProgressHook = hook;
  } else {
    // 若链表不为空，则将 hook 追加到链表尾部
    workInProgressHook = workInProgressHook.next = hook;
  }
  // 返回当前的 hook
  return workInProgressHook;
}
```

到这里可以看出，**hook 相关的所有信息收敛在一个 hook 对象里，而 hook 对象之间以单向链表的形式相互串联**。



## 虚拟DOM

### 发展

1. 原生 JS 支配下的“人肉 DOM” 时期

2. 解放生产力的先导阶段：jQuery 时期

   对DOM API进行封装

3. 民智初启：早期模板引擎方案

   它更新 DOM 的方式是将已经渲染出 DOM 整体注销后再整体重渲染，并且不存在更新缓冲这一说。所以有性能上的问题

4. 全自动:虚拟DOM

   **虚拟 DOM 的优越之处在于，它能够在提供更爽、更高效的研发模式（也就是函数式的 UI 编程方式）的同时，仍然保持一个还不错的性能**。

   误区：虚拟DOM性能上具有优势，**虚拟 DOM 的劣势主要在于 JS 计算的耗时，而 DOM 操作的能耗和 JS 计算的能耗根本不在一个量级**。但是在实际使用中，频繁的setState这种修改少量信息的情况下，虚拟DOM具有性能上的优势。



### 价值

虚拟 DOM 解决的关键问题有以下两个。

1. 研发体验/研发效率的问题
2. 跨平台的问题



### 栈调和

**Diff 确实是调和过程中最具代表性的一环**，但是 **`调和 !== Diff`**



## setState 是同步还是异步的

结论：**并不是 setTimeout 改变了 setState，而是 setTimeout 帮助 setState “逃脱”了 React 对它的管控。只要是在 React 管控下的 setState，一定是异步的**

### 主流程：

![3.png](https://s0.lgstatic.com/i/image2/M01/04/81/Cip5yF_yswuAWzDfAAEc1lISh-Q211.png)

### 锁结构

```javascript
reduce = () => {

  // 进来先锁上
  isBatchingUpdates = true
  setTimeout(() => {
    console.log('reduce setState前的count', this.state.count)
    this.setState({
      count: this.state.count - 1
    });
    console.log('reduce setState后的count', this.state.count)
  },0);
  // 执行完函数再放开
  isBatchingUpdates = false
}
```

咱们开头锁上的那个 isBatchingUpdates，对 setTimeout 内部的执行逻辑完全没有约束力。因为 isBatchingUpdates 是在同步代码中变化的，而 setTimeout 的逻辑是异步执行的。当 this.setState 调用真正发生的时候，isBatchingUpdates 早已经被重置为了 false，这就使得当前场景下的 setState 具备了立刻发起同步更新的能力。所以咱们前面说的没错——**setState 并不是具备同步这种特性，只是在特定的情境下，它会从 React 的异步管控中“逃脱”掉**。



## Fiber

React 团队在用户体验方面最为要紧的一个追求。 **快速响应**

**实现增量渲染的目的，是为了实现任务的可中断、可恢复，并给不同的任务赋予不同的优先级，最终达成更加顺滑的用户体验**



React 16 前，**Reconciler(找不同)** => **Renderer(渲染不同)** ，从 Reconciler 到 Renderer 这个过程是严格同步的。

React 16以后，增加了一层 Scheduler（调度器），首先，**每个更新任务都会被赋予一个优先级**。当更新任务抵达调度器时，高优先级的更新任务（记为 A）会更快地被调度进 Reconciler 层；此时若有新的更新任务（记为 B）抵达调度器，调度器会检查它的优先级，若发现 B 的优先级高于当前任务 A，那么当前处于 Reconciler 层的 A 任务就会被**中断**，调度器会将 B 任务推入 Reconciler 层。当 B 任务完成渲染后，新一轮的调度开始，之前被中断的 **A 任务将会被重新推入 Reconciler 层，继续它的渲染之旅，这便是所谓“可恢复”**。

### 