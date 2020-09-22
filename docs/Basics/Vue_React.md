# Vue和React差异

## React 

### 编译时优化

```js
functinon react(){
  return <div></div>   
}

===>
function react(){
    return React.creatElement(div,'')
}
```

因为js是一种运行时的动态语言，所以无法做编译时优化

### 运行时优化

触发渲染：this.setState,props,事件啊

触发后进行全局DOM diff，所以将DOM树拆分成一个个fiber

1. 调度 选择优先级比较高的任务, 顶堆
2. 协调 计算要执行的任务 -> 执行任务  计算系统空闲时间是否足够
3. 提交 根据提交的内容修改 => render

## Vue

Vue是模板代码

运行时编译（runtime）

Vue的template模板只有自己的编译器才能编译

### 编译时优化

1. HTML转化成AST（抽象语法树）

   使用了大量正则进行标签匹配，优化静态节点做上标记，提取if，@，v-等方法

   通过一个栈，进行标签拼接

2. options.optimize 进行静态节点优化

   在静态节点标记	Ast static

   静态节点创建提升 VNode \__static__

3. 优化后的AST转换成代码

   

### 运行时优化

vue 双向数据绑定

vue1 每一个动态数据对应一个watcher 占用内存大

vue2  Watcher 是组件级的 => 所以需要 dom diff  也是组件级

