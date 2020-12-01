# Vue2 源码阅读

## 准备工作

vue中使用的类型检查工具是 Flow.js 有点类似TypeScript 。

### 目录

```js
src
├── compiler # 编译相关 包括把模板解析成 ast 语法树，ast 语法树优化，代码⽣成等功能。
├── core # 核⼼代码  包括内置组件、全局 API 封装，Vue 实例化、观察者、虚拟 DOM、⼯具函数等等。
├── platforms # 不同平台的⽀持 web和 weex入口，
├── server # 服务端渲染
├── sfc # .vue ⽂件解析
├── shared # 共享代码
```

### 选择版本

- Runtime Only

  我们在使⽤ Runtime Only 版本的 Vue.js 的时候，通常需要借助如 webpack 的 vue-loader ⼯具把 .vue ⽂ 件编译成 JavaScript，因为是在编译阶段做的，所以它只包含运⾏时的 Vue.js 代码，因此代码体积也会 更轻量。

- Runtime+Compiler

```js
// 需要编译器的版本
new Vue({
template: '<div>{{ hi }}</div>'
})

```

## 从入口开始

初始化全局api

```js
initGlobalAPI(Vue)

//
export function initGlobalAPI (Vue: GlobalAPI) {
    Vue.util = { warn, extend, mergeOptions, defineReactive, };
    Vue.set = set;
    Vue.delete = del;
    Vue.nextTick = nextTick; // TODO：nnextTick

    Vue.options = Object.create(null);
    ASSET_TYPES.forEach((type) => {
        Vue.options[type + "s"] = Object.create(null);
    });

    Vue.options._base = Vue;

    extend(Vue.options.components, builtInComponents);

    initUse(Vue); // TODO：initUse
    initMixin(Vue); // TODO：initMixin
    initExtend(Vue);
    initAssetRegisters(Vue); // 注册实现Vue.component/directive/filter
}

```

传入的Vue 将生命周期等混入

```js
//src\core\instance\index.js
function Vue (options) {
    if (process.env.NODE_ENV !== 'production' &&
        !(this instanceof Vue)
    ) {
        warn('Vue is a constructor and should be called with the `new` keyword')
    }
    this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue) 

export default Vue
```

**所以Vue本质上就是⼀个⽤ Function 实现的 Class，然后它的原型 prototype 以及它本⾝都扩展了⼀系列的 ⽅法和属性，**

### init

```js
// src/core/instance/init.js
export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++
    if (options && options._isComponent) {
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm) // $parent,$root,$children,$refs
    initEvents(vm) // 处理父组件传递的事件和回调
    initRender(vm) // $slots,$scopedSlots,_c,$createElement
    callHook(vm, 'beforeCreate')
    initInjections(vm) // 获取注入数据
    initState(vm) // 初始化props，methods，data，computed，watch
    initProvide(vm) // 提供数据注入
    callHook(vm, 'created')

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
```

Vue 初始化主要就⼲了⼏件事情，合并配置，初始化⽣命周期，初始化事件中⼼，初始化渲染，初始 化 data、props、computed、watcher 等等。

### $mount

```js
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  const options = this.$options
  // resolve template/el and convert to render function
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        return this
      }
    } else if (el) {
      template = getOuterHTML(el)
    }
    if (template) {
      options.render = render
      options.staticRenderFns = staticRenderFns

    }
  }
  return mount.call(this, el, hydrating)
}
```

⾸先，它 对 el 做了限制，Vue 不能挂载在 body 、 html 这样的根节点上。

接下来的是很关键的逻辑 —— 如果没有定义 render ⽅法，则会把 el 或者 template 字符串**转换成 render ⽅法**。

#### mountComponent

```js
// src/core/instance/lifecycle.js 
export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  callHook(vm, 'beforeMount')

  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = () => {
      const name = vm._name
      const id = vm._uid
      const startTag = `vue-perf-start:${id}`
      const endTag = `vue-perf-end:${id}`

      mark(startTag)
      const vnode = vm._render()
      mark(endTag)
      measure(`vue ${name} render`, startTag, endTag)

      mark(startTag)
      vm._update(vnode, hydrating)
      mark(endTag)
      measure(`vue ${name} patch`, startTag, endTag)
    }
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }

  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false

  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}
```

从上⾯的代码可以看到， mountComponent 核⼼就是先调⽤ vm._render ⽅法先⽣成虚拟 Node，再 实例化⼀个渲染 Watcher ，在它的回调函数中会调⽤ updateComponent ⽅法，最终调⽤ vm._update 更新 DOM。 

Watcher 在这⾥起到两个作⽤，⼀个是初始化的时候会执⾏回调函数，另⼀个是当 vm 实例中的监测 的数据发⽣变化的时候执⾏回调函数。

函数最后判断为根节点的时候设置 vm._isMounted 为 true ， 表⽰这个实例已经挂载了，同时执⾏ mounted 钩⼦函数。 这⾥注意 vm.$vnode 表⽰ Vue 实例的⽗虚拟 Node，所以它为 Null 则表⽰ 当前是根 Vue 的实例。



#### render

Vue 的 _render ⽅法是实例的⼀个私有⽅法，它⽤来把实例渲染成⼀个虚拟 Node。

```js
<div id="app">
{{ message }}
</div>
```

转化成

```js
render: function (createElement) {
    return createElement('div', {
        attrs: {
            id: 'app'
        },
    }, this.message)
}
```

#### Virtual DOM

Virtual DOM 就是⽤⼀个原⽣的 JS 对象去描述⼀个 DOM 节点，所以它⽐创建⼀个 DOM 的代价要 ⼩很多。

```js
export default class VNode {
  tag: string | void; // 标签
  data: VNodeData | void; // 数据
  children: ?Array<VNode>; // 子节点
  text: string | void; // 文本
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // 包含原始HTML？(仅限服务器)。
  isStatic: boolean; // 是静态节点吗
  isRootInsert: boolean; // 进入Root必须吗
  isComment: boolean; // 空注释占位符?
  isCloned: boolean; // 是克隆节点吗?
  isOnce: boolean; // 是v-once节点吗?
  asyncFactory: Function | void; // 异步组件工厂函数。
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // 功能节点的真实上下文虚拟机
  fnOptions: ?ComponentOptions; // for SSR caching
  devtoolsMeta: ?Object; // 用于存储DevTools的功能渲染上下文
  fnScopeId: ?string; // functional scope id support

  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {

  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child (): Component | void {
    return this.componentInstance
  }
}
```

其实 VNode 是对真实 DOM 的⼀种抽象描述，它的核⼼定义⽆⾮就⼏个关键属性，**标签名、数据、⼦ 节点、键值等**，其它属性都是都是⽤来扩展 VNode 的灵活性以及实现⼀些特殊 feature 的。由于 VNode 只是⽤来映射到真实 DOM 的渲染，不需要包含操作 DOM 的⽅法，因此它是⾮常轻量和简单的。

#### update

Vue 的 _update 是实例的⼀个私有⽅法，它被调⽤的时机有 2 个，⼀个是⾸次渲染，⼀个是数据更 新的时候；

```js
//src/core/instance/lifecycle.js 
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    const vm: Component = this
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    const restoreActiveInstance = setActiveInstance(vm)
    vm._vnode = vnode
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
    restoreActiveInstance()
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  }
```

核心方法`__patch__`  区分服务端渲染

```js
// src/platforms/web/runtime/index.js 
Vue.prototype.__patch__ = inBrowser ? patch : noop
// src\platforms\web\runtime\patch.js
//每个平台都有各⾃的 nodeOps 和 modules
export const patch: Function = createPatchFunction({ nodeOps, modules })
```

VDom 进行diff 的地方 ，后面再来分析

// TODO:diff

```js
// src/core/vdom/patch.js

```

### 总结

- 首先new Vue() 
- => init() 进行全局属性和生命周期等注入 
  - beforeMount
- => 将$mount 挂载 
- => `_render` 函数将temlate转化成Vdom 
- =>  `_patch`将Vdom转化成真实DOM
  - 初次渲染，不用diff
  - Dom变化，diff算法后 异步更新
- 渲染完成，等待更新
  - Mounted