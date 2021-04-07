# 前端函数式演进

## 编程范式

我们经常接触的有以下两种。

1. 告诉机器怎么利用穷举、跳转和记忆，逐步完成我们交付的事情（ **命令式** )
2. 告诉机器我们想要什么（**声明式**），由机器按照已在编译器中实现的策略来完成任务。



### 命令式编程

我们一般将命令式编程理解为顺序编程加一些控制流程的语句，比如运算语句、循环语句（while、for）、条件分支语句（if）、无条件分支语句（goto、程序调用）。



### 面向对象

面向对象把计算机程序视为一组对象的集合，而每个对象都可以接收并处理其他对象发来的消息，换句话说，面向对象认为计算机程序的执行过程就是一系列消息在各个对象之间的传递。

框架中的组件概念。大家可以暂时放下Class类的内容，思考一下组件或者前端的业务模块是怎样实现继承（扩展）、封装、多态和消息传递的。是不是就是一种面向对象变成的例子



### 元编程

在元编程模式下执行开发者编写的代码时，可以改变其他程序（或者自身）的行为，或者在运行代码时完成部分本应在代码编译时完成的工作。



## 函数式编程

函数式编程思维的目标：程序执行时，应该把程序对结果以外的数据的影响控制到最小。

### 副作用

副作用（Side Effect）的主体是一个“过程”，即我们在命令式编程中提到的函数、方法等。副作用指这个“过程”运行后，不只是对传入值操作产生传出值，还对这两个值以外的部分产生了影响。



### react hooks

在类组件中，我们使用成员方法带来配置型声明式的编码风格，Hooks的设计思想是使用升级版的函数式组件，以更清晰的过程来厘清事件流转。这也是我认为React使用Hooks后的理想方向。ReactHooks的官方介绍中提到了Hooks的“动机”，其中包含组件之间复用状态逻辑的便捷化、复杂组件易理解程度等内容。React在类组件非常成熟的情况下推动这些特性，是为了实现React事件流的清晰化。

#### useState

```js
// 申明变量_state、生成标记
// 申明两个方法，分别对应useState所在函数组件和它被调用镶嵌的位置
const _state = [], _genIndex = 0;
const reRenderThisComponet = （state, contextCptFunc) => contextCptFunc(state)
const componetAnchorPosition = contextCptFunc => getCptParentPosition(contextCptFunc)

function useState (initialState, contextCptFunc) {
  const currentIndex = _genIndex;
  if (_state[currentIndex] === undefined) { _state[currentIndex] = initialState }
  const setState = newState => {
    _state[currentIndex] = newState;
    // 在外层重新render调用state的组件, 虚拟调用
    ReactDOM.render(reRenderThisComponet(_state, contextCptFunc),
      componetAnchorPosition);
    _genIndex = 0;
  }
  _genIndex += 1;
  return [_state[currentIndex], setState];
}
```

React Hooks的意义更多是承担函数组件之间的衔接和调用作用。



## 前端稳定性

### 用户交互时

React的Fiber思想和游戏、动画按帧渲染一样，都是追求间隙稳定态的表现。



**SPA的优势在于能通过Web应用间的高耦合结构，提前部署业务逻辑更多的可能性并做一些预处理工作，进而大量节省网络通信和服务端负载的成本，提供更流畅的交互体验。SPA最大的缺点是冗余数据集中性能消耗大，在保障前端数据安全时会存在更大的负担。**



### 代码编译时

一些代码编译时常用的辅助工具，比如Webpack打包构建工具，同时集成了Babel适配、Typescript转换、Lint检校，以及一些框架如Vue的模板解析能力



### 系统开发时

使用Redux之类的工具会增加前端代码运行的圈复杂度，加之前端分层类型的多样性，维护者很难基于历史代码梳理已有的业务逻辑。如果我们将核心代码更换成较为合理的函数式逻辑，或者使用函数式工具和规范对已有逻辑进行归纳，就可以明显提高代码的可读性和代码运行时的可调试性，这也是对历史代码进行升级、改造的方法之一。



