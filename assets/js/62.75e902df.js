(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{433:function(t,a,s){"use strict";s.r(a);var e=s(42),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"hooks"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#hooks"}},[t._v("#")]),t._v(" Hooks")]),t._v(" "),s("h3",{attrs:{id:"hooks-简介"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#hooks-简介"}},[t._v("#")]),t._v(" hooks 简介")]),t._v(" "),s("h3",{attrs:{id:"hook-使用规则"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#hook-使用规则"}},[t._v("#")]),t._v(" Hook 使用规则")]),t._v(" "),s("p",[t._v("Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：")]),t._v(" "),s("ul",[s("li",[t._v("只能在"),s("strong",[t._v("函数最外层")]),t._v("调用 Hook。不要在循环、条件判断或者子函数中调用。")]),t._v(" "),s("li",[t._v("只能在 "),s("strong",[t._v("React 的函数组件")]),t._v("中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。）")])]),t._v(" "),s("h4",{attrs:{id:"usesatate"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#usesatate"}},[t._v("#")]),t._v(" useSatate")]),t._v(" "),s("h3",{attrs:{id:"useeffect"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#useeffect"}},[t._v("#")]),t._v(" useEffect")]),t._v(" "),s("h4",{attrs:{id:"副作用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#副作用"}},[t._v("#")]),t._v(" 副作用")]),t._v(" "),s("p",[t._v("你之前可能已经在 React 组件中执行过数据获取、订阅或者手动修改过 DOM。我们统一把这些操作称为“副作用”，或者简称为“作用”。")]),t._v(" "),s("p",[s("code",[t._v("useEffect")]),t._v(" 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 "),s("code",[t._v("componentDidMount")]),t._v("、"),s("code",[t._v("componentDidUpdate")]),t._v(" 和 "),s("code",[t._v("componentWillUnmount")]),t._v(" 具有相同的用途，只不过被合并成了一个 API。")]),t._v(" "),s("h3",{attrs:{id:"usememo"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#usememo"}},[t._v("#")]),t._v(" useMemo")]),t._v(" "),s("p",[t._v("把“创建”函数和依赖项数组作为参数传入 "),s("code",[t._v("useMemo")]),t._v("，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。")]),t._v(" "),s("div",{staticClass:"language-JavaScript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" memoizedValue "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("useMemo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("computeExpensiveValue")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h3",{attrs:{id:"usecallback"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#usecallback"}},[t._v("#")]),t._v(" useCallback")]),t._v(" "),s("p",[t._v("useCallback 跟 useMemo 比较类似，但它返回的是缓存的函数。")]),t._v(" "),s("div",{staticClass:"language-JavaScript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" memoizedCallback "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("useCallback")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("doSomething")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("使用场景是：有一个父组件，其中包含子组件，子组件接收一个函数作为 props；通常而言，如果父组件更新了，子组件也会执行更新；但是大多数场景下，更新是没有必要的，我们可以借助 useCallback 来返回函数，然后把这个函数作为 props 传递给子组件；这样，子组件就能避免不必要的更新。")]),t._v(" "),s("p",[t._v("useEffect、useMemo、useCallback 都是自带闭包的。也就是说，每一次组件的渲染，其都会捕获当前组件函数上下文中的状态(state, props)，所以每一次这三种 hooks 的执行，反映的也都是当前的状态，你无法使用它们来捕获上一次的状态。对于这种情况，我们应该使用 ref 来访问。")]),t._v(" "),s("h2",{attrs:{id:"高阶组件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#高阶组件"}},[t._v("#")]),t._v(" 高阶组件")]),t._v(" "),s("p",[t._v("将组件更加颗粒度的细化，")]),t._v(" "),s("p",[t._v("connect，withRouter")]),t._v(" "),s("p",[t._v("antd3 rc-form 高阶组件实现form表单")])])}),[],!1,null,null,null);a.default=n.exports}}]);