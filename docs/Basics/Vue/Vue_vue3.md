# Vue3 学习

因为最近想参与到 elementui3 的升级中，所以复习下 vue3 的 API。

## composition API

```JavaScript
const {
            createApp,
            reactive, // 创建响应式数据对象
            ref, // 创建一个响应式的数据对象
            toRefs, // 将响应式数据对象转换为单一响应式对象
            isRef, // 判断某值是否是引用类型
            computed, // 创建计算属性
            watch, // 创建watch监听
            // 生命周期钩子
            onMounted,
            onUpdated,
            onUnmounted,
        } = Vue
```

### setup

**setup 函数会在 beforeCreate 之后 created 之前执行**

### reactive

reactive() 函数接受一个普通对象 返回一个响应式数据对象

```JavaScript

    const state = reactive({
        count: 0,
        plusOne: computed(() => state.count + 1)
    })
    return {
        state
    }
    // 模板渲染要这样写
    template: `
    <div>
        <div>count is {{ state.count }} </div>
        <div>plusOne is {{ state.plusOne }}</div>
    </div>

```

### ref

创建一个响应式变量，传入默认值

```JavaScript
 const closed = ref(false)
```

### unref

传入一个可能是响应式对象，也可能不是的对象

```JavaScript
// if 响应式  ref =>value
// if(!) 取值本身
unref(a)
```

### toRefs

toRefs 可以将 reactive 创建出的对象展开为基础类型

可以与上面 reactive 比对，toRefs 将对象解构

```JavaScript
    // 我们再看看用了toRefs
    const state = reactive({
        count: 0,
        plusOne: computed(() => state.count + 1)
    })
    return {
        ...toRefs(state)
    }
    // 模板渲染要这样写
    template: `
    <div>
        <div>count is {{ count }} </div>
        <div>plusOne is {{ plusOne }}</div>
    </div>
```

### ref 与 isRef

- ref 将给定的值(确切的说是基本数据类型 ini 或 string)创建一个响应式的数据对象
- isRef 其实就是判断一下是不是 ref 生成的响应式数据对象

```JavaScript
    // 定义创建响应式数据
    const time = ref(new Date())
    // 设置定时器为了测试数据响应
    setInterval(() => time.value = new Date(), 1000)

    // 判断某值是否是响应式类型
    console.log('time is ref:', isRef(time))
    console.log('time', time)
    console.log('time.value', time.value)

    // 我们看看模板里面我们这样展示
    template: `
        <div>
            <div>Date is {{ time }}</div>
        </div>
    `
```

### effect 副作用函数

响应式对象修改会触发这个函数

```JavaScript
    // 副作用函数
    effect(() => {
        console.log('数值被修改了..',state.count)
    })
```

`watch`和 `computed` 没有什么新东西

### computed 计算属性

```JavaScript
const state = reactive({
    count: 0,
    plusOne: computed(() => state.count + 1)
})
```

### watch 定义监听器

```JavaScript
   watch(() => state.count * 2, val => {
        console.log(`count * 2 is ${val}`)
    })
```

### 生命周期钩子 Hooks

| Vue3          | Vue3            |
| ------------- | --------------- |
| beforeCreate  | setup(替代)     |
| created       | setup(替代)     |
| beforeMount   | onBeforeMount   |
| mounted       | onMounted       |
| beforeUpdate  | onBeforeUpdate  |
| updated       | onUpdated       |
| beforeDestroy | onBeforeUnmount |
| destroyed     | onUnmounted     |
| errorCaptured | onErrorCaptured |

## 静态节点

vue3 会找到静态根结点，并直接提升到顶层，传入 render 的时候，对这部分节点不进行 path

而 Vue 2 则是在通过生成 AST 树后进行一次遍历，将节点标记成 isStatic ，但这样在 diff 的时候还是要递归遍历到，只不过会走到另一个分支。

```JavaScript
// vue2 的静态节点
render(){
  createVNode("h1", null, "Hello World")
  // ...
}

// vue3 的静态节点
const hoisted = createVNode("h1", null, "Hello World")
function render(){
  // 直接使用 hoisted 即可
}
```
