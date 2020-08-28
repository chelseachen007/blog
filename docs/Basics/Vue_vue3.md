# Vue3学习

因为最近想参与到elementui3的升级中，所以复习下vue3的API。



## composition API

```js
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

**setup函数会在 beforeCreate之后 created之前执行**



### reactive

reactive() 函数接受一个普通对象 返回一个响应式数据对象

```js

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



### toRefs

 toRefs 可以将reactive创建出的对象展开为基础类型

可以与上面reactive比对，toRefs将对象解构

```js
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
- isRef 其实就是判断一下是不是ref生成的响应式数据对象



```js
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

```js
    // 副作用函数
    effect(() => {
        console.log('数值被修改了..',state.count)
    })
```



`watch  `和 `computed` 没有什么新东西

### computed 计算属性

```js
const state = reactive({
    count: 0,
    plusOne: computed(() => state.count + 1)
})
```

### watch 定义监听器

```js
   watch(() => state.count * 2, val => {
        console.log(`count * 2 is ${val}`)
    })
```



### 生命周期钩子Hooks

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


