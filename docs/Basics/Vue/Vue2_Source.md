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

Vue 的 _update 是实例的⼀个私有⽅法，**它被调⽤的时机有 2 个，⼀个是⾸次渲染，⼀个是数据更新的时候；**

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

这里逻辑不用看，下面会详细说，我们知道最后会进入`__patch__` 即可

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

## 组件化

### **createElement**

createElement 有三个分支逻辑

1. 假如是普通的html标签，渲染一个VNode
2. 假如是componen且options中注册了 ，就进入createComponent 逻辑
3. 不命名tag，也创建一个VNode

```js
//src\core\vdom\create-element.js  function _createElement
if (typeof tag === 'string') {
    let Ctor
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      )
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag)
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      )
    }
  } else {
    // 组件的构造函数
    vnode = createComponent(tag, data, context, children)
  }
```

### createComponent

```js
export function createComponent (
  Ctor: Class<Component> | Function | Object | void,
  data: ?VNodeData,
  context: Component,
  children: ?Array<VNode>,
  tag?: string
): VNode | Array<VNode> | void {
    
  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor)
  }
  // async component
  let asyncFactory
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor)
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {}

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor)

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data)
  }

  // extract props
  const propsData = extractPropsFromVNodeData(data, Ctor, tag)

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }


  const listeners = data.on
  data.on = data.nativeOn

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    const slot = data.slot
    data = {}
    if (slot) {
      data.slot = slot
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data)

  // return a placeholder vnode
  const name = Ctor.options.name || tag
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data, undefined, undefined, undefined, context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  )
  return vnode
}
```

去掉多余的判断，可以整理出他做了三件事

#### 构造⼦类构造函数

```js
export default {
    name: 'app',
    components: {
        HelloWorld
    }
}
// 我们平时传入的都是一个对象
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor)
  }
//src/core/global-api/extend.js 

```

Vue.extend 的作⽤就是构造⼀个 Vue 的⼦类，它使⽤⼀种⾮常经典的原型继承的⽅式把⼀个纯对 象转换⼀个继承于 Vue 的构造器 Sub 并返回，然后对 Sub 这个对象本⾝扩展了⼀些属性，如扩 展 options 、添加全局 API 等；并且对配置中的 props 和 computed 做了初始化⼯作；最后对于 这个 Sub 构造函数做了缓存，避免多次执⾏ Vue.extend 的时候对同⼀个⼦组件重复构造。

```js
Vue.extend = function (extendOptions: Object): Function {
    extendOptions = extendOptions || {}
    const Super = this
    const SuperId = Super.cid
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    const name = extendOptions.name || Super.options.name
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name)
    }

    const Sub = function VueComponent (options) {
      this._init(options)
    }
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )
    Sub['super'] = Super

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps(Sub)
    }
    if (Sub.options.computed) {
      initComputed(Sub)
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type]
    })
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions
    Sub.sealedOptions = extend({}, Sub.options)

    // cache constructor
    cachedCtors[SuperId] = Sub
    return Sub
  }
```



#### 安装组件钩⼦函数

整个 **installComponentHooks** 的过程就是把 componentVNodeHooks 的钩⼦函数合并到 **data.hook** 中，在 VNode 执⾏ patch 的过程中执⾏相关的钩⼦函数,但他的Marge不是覆盖，而是按顺序执行。

#### 实例化VNode

最后⼀步⾮常简单，通过 new VNode 实例化⼀个 vnode 并返回。需要注意的是和普通元素节点的 vnode 不同，组件的 vnode 是没有 children 的，这点很关键。

### patch

**执⾏ vm.patch 去把 VNode 转换成真正的 DOM 节点。**

```js
//src/core/vdom/patch.js 
function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
) {
    // ...
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
        return
    }
    // ...
  }
```

#### createComponent

```js
	function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
		let i = vnode.data
		if (isDef(i)) {
			const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
			if (isDef(i = i.hook) && isDef(i = i.init)) {
				i(vnode, false /* hydrating */)
			}
			//调用init钩子后，如果vnode为子组件。
            //它应该已经创建子实例并挂载它。这孩子。
            //组件还设置了占位符vnode的elm。
            //在这种情况下，我们只需返回元素即可完成。
			if (isDef(vnode.componentInstance)) {
				//属性回调执行
				initComponent(vnode, insertedVnodeQueue)
				//追加到父组件
				insert(parentElm, vnode.elm, refElm)
				if (isTrue(isReactivated)) {
					reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
				}
				return true
			}
		}
	}
```

如果 vnode 是⼀个组件 VNode，那么条件会满⾜，并且得到 i 就是 init 钩⼦函数，执行`_init`

⼦组件的实例化实际上就是在这个时机执⾏的，并且它会执⾏实例的 _init ⽅法，

#### _render()

然后进行_render()

```js
// src/core/instance/render.js
  Vue.prototype._render = function (): VNode {
    const vm: Component = this
    const { render, _parentVnode } = vm.$options

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      )
    }
    vm.$vnode = _parentVnode
    // render self
    let vnode
    try {
      currentRenderingInstance = vm
      vnode = render.call(vm._renderProxy, vm.$createElement)
    } 
    // 如果返回的数组只包含一个节点，则允许它
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0]
    }

      vnode = createEmptyVNode()
    }
    // set parent
    vnode.parent = _parentVnode
    return vnode
  }
```

我们只保留关键部分的代码，这⾥的 _parentVnode 就是当前组件的⽗ VNode，⽽ render 函数⽣ 成的 vnode 当前组件的渲染 vnode ， vnode 的 parent 指向了 _parentVnode ，也就是 vm.$vnode ，它们是⼀种⽗⼦的关系。

#### _update

```js
//src/core/instance/lifecycle.js 
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    const vm: Component = this
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    //是保持当前上下⽂的 Vue 实例，它是在 lifecycle 模块的全局变量
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

这里要理清，vm._vnode 和 vm.$vnode 的关系就是⼀种⽗⼦关系，⽤代码表示就是   **vm.`vnode.parent `=== vm.$vnode**

restoreActiveInstance是用来保持递归过程中记录当前vm的parent，当⼀个 vm 实例完成它的所有⼦树的 patch 或者 update 过程后，

restoreActiveInstance回到他的父实例后，传入的Vue实例和vm.$parent 依然能保留

#### `__patch_`

```js
vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)

function patch (oldVnode, vnode, hydrating, removeOnly) {
    // ...
    let isInitialPatch = false
    const insertedVnodeQueue = []
    // 首次渲染
    if (isUndef(oldVnode)) {
        // empty mount (likely as component), create new root element
        isInitialPatch = true
        createElm(vnode, insertedVnodeQueue)
    } else {
        // ...
    }
    // ...
}
```

##### createElm

```js
	function createElm (
		vnode,
		insertedVnodeQueue,
		parentElm,
		refElm,
		nested,
		ownerArray,
		index
	) {
		if (isDef(vnode.elm) && isDef(ownerArray)) {
			// This vnode was used in a previous render!
			// now it's used as a new node, overwriting its elm would cause
			// potential patch errors down the road when it's used as an insertion
			// reference node. Instead, we clone the node on-demand before creating
			// associated DOM element for it.
			vnode = ownerArray[index] = cloneVNode(vnode)
		}

		vnode.isRootInsert = !nested // for transition enter check
		if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
			return
		}

		const data = vnode.data
		const children = vnode.children
		const tag = vnode.tag
		if (isDef(tag)) {
			if (process.env.NODE_ENV !== 'production') {
				if (data && data.pre) {
					creatingElmInVPre++
				}
				if (isUnknownElement(vnode, creatingElmInVPre)) {
					warn(
						'Unknown custom element: <' + tag + '> - did you ' +
						'register the component correctly? For recursive components, ' +
						'make sure to provide the "name" option.',
						vnode.context
					)
				}
			}

			vnode.elm = vnode.ns
				? nodeOps.createElementNS(vnode.ns, tag)
				: nodeOps.createElement(tag, vnode)
			setScope(vnode)

			/* istanbul ignore if */
			if (__WEEX__) {
				// in Weex, the default insertion order is parent-first.
				// List items can be optimized to use children-first insertion
				// with append="tree".
				const appendAsTree = isDef(data) && isTrue(data.appendAsTree)
				if (!appendAsTree) {
					if (isDef(data)) {
						invokeCreateHooks(vnode, insertedVnodeQueue)
					}
					insert(parentElm, vnode.elm, refElm)
				}
				createChildren(vnode, children, insertedVnodeQueue)
				if (appendAsTree) {
					if (isDef(data)) {
						invokeCreateHooks(vnode, insertedVnodeQueue)
					}
					insert(parentElm, vnode.elm, refElm)
				}
			} else {
				createChildren(vnode, children, insertedVnodeQueue)
				if (isDef(data)) {
					invokeCreateHooks(vnode, insertedVnodeQueue)
				}
				insert(parentElm, vnode.elm, refElm)
			}

			if (process.env.NODE_ENV !== 'production' && data && data.pre) {
				creatingElmInVPre--
			}
		} else if (isTrue(vnode.isComment)) {
			vnode.elm = nodeOps.createComment(vnode.text)
			insert(parentElm, vnode.elm, refElm)
		} else {
			vnode.elm = nodeOps.createTextNode(vnode.text)
			insert(parentElm, vnode.elm, refElm)
		}
	}
```

又回到了这里，当遇到普通的VNode createComponent就会返回false，然后重新上面创建父占位符，并遍历所有子VNode调用**createElm** 当遇到组件VNode则进行深入的递归

在完成组件的整个 patch 过程后，最后执⾏ **insert(parentElm, vnode.elm, refElm)** 完成组件 的 DOM 插⼊，**如果组件 patch 过程中⼜创建了子组件，那么DOM 的插入顺序是先子后父。**

### 总结

第一次渲染，没有oldVodeTree，就是创建占位符 => 遍历子VNode => 遇到组件VNode => 向下递归 然后开始DOM操作 直到回到占位符的位置。

这一圈下来，基本的执行流程和代码都有了眼缘了，我们开始深入一些细节进行学习。



