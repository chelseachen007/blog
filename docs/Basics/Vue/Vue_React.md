# Vue 和 React 差异

## React

### 编译时优化

```JavaScript
functinon react(){
  return <div></div>
}

===>
function react(){
    return React.creatElement(div,'')
}
```

因为 js 是一种运行时的动态语言，所以无法做编译时优化

### 运行时优化

触发渲染：this.setState,props,事件啊

触发后进行全局 DOM diff，所以将 DOM 树拆分成一个个 fiber

1. 调度 选择优先级比较高的任务, 顶堆
2. 协调 计算要执行的任务 -> 执行任务 计算系统空闲时间是否足够
3. 提交 根据提交的内容修改 => render

### React v17

在 React V17 中， React 不会再将事件处理添加到 document 上，而是将事件处理添加到渲染 React 树的根 DOM 容器中.也就是事件委托

## Vue

Vue 是模板代码

运行时编译（runtime）

Vue 的 template 模板只有自己的编译器才能编译

### 编译时优化

1. HTML 转化成 AST（抽象语法树）

   使用了大量正则进行标签匹配，优化静态节点做上标记，提取 if，@，v-等方法

   通过一个栈，进行标签拼接

2. options.optimize 进行静态节点优化

   在静态节点标记 Ast static

   静态节点创建提升 VNode \_\_static\_\_

3. 优化后的 AST 转换成代码

### 运行时优化

vue 双向数据绑定

vue1 每一个动态数据对应一个 watcher 占用内存大

vue2 Watcher 是组件级的 => 所以需要 dom diff 也是组件级

## 更新性能

简单来说，在 React 应用中，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树。

当然我们可以使用 `PureComponent`，或是手动实现 `shouldComponentUpdate` 方法，来规避不必要的渲染。

在 Vue 应用中，组件的依赖是在渲染过程中`自动追踪`的，因此系统能`精确知晓`哪个组件需要被重渲染。

从理论上看，Vue 的渲染更新机制`更加细粒度`，也更加`精确`。
