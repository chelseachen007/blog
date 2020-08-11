# Redux

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。

## Redux 三大原则

### 单一数据源

整个应用的 state 被储存在一棵 **object tree** 中，并且这个 object tree 只存在于唯一一个 **store** 中。

这让同构应用开发变得非常容易

### State 是只读的

唯一改变 state 的方法就是触发 **action**，**action** 是一个用于描述已发生事件的普通对象。

### 使用纯函数来执行修改

为了描述 action 如何改变 state tree ，你需要编写 **reducers**。



## Redux基础API

### Action

**Action** 是把数据从应用传到 store 的有效载荷。它是 store 数据的**唯一**来源。

```js
let nextTodoId = 0
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})
```

### Reducer

**Reducers** 指定了应用状态的变化如何响应 actions 并发送到 store 的，记住 actions 只是描述了*有事情发生了*这一事实，并没有描述应用如何更新 state。

**reducer** 就是一个**纯函数**，接收旧的 state 和 action，返回新的 state。

#### 纯函数

1. 如果**函数**的调用参数相同，则永远返回相同的结果。它不依赖于程序执行期间 **函数** 外部任何状态或数据的变化，必须只依赖于其输入参数。
2. 该 **函数** 不会产生任何可观察的副作用，例如网络请求，输入和输出设备或数据突变（mutation）



所以 **永远不要**在 reducer里做这些操作：

1. 修改传入参数；
2. 执行有副作用的操作，如 API 请求和路由跳转；
3. 调用非纯函数，如 Date.now() 或 Math.random() 。

#### 如何使用：

```js
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    default:
      return state
  }
}

export default todos
```

### store

**Store** 就是把它们联系到一起的对象。Store 有以下职责：

- 维持应用的 state；
- 提供 `getState()`方法获取 state；
- 提供 `  dispatch(action)   `方法更新 state；
- 通过  ` subscribe(listener) `注册监听器;
- 通过 ` subscribe(listener) `返回的函数注销监听器。

**Redux 应用只有一个单一的 store**。当需要拆分数据处理逻辑时，你应该使用 [reducer 组合](http://cn.redux.js.org/docs/basics/Reducers.html#splitting-reducers)而不是创建多个 store。

举个例子：

```js
export default class ReduxPage extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      // store state 改变
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  add = () => {
    store.dispatch({ type: "ADD" });
  };

  asyAdd = () => {
    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        dispatch({ type: "ADD" });
        console.log("getState", getState());
      }, 1000);
    });
  };

  promiseMinus = () => {
    store.dispatch(
      Promise.resolve({
        type: "MINUS",
        payload: 100,
      })
    );
  };

  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState()}</p>
        {/* <p>{store.getState().home}</p> */}
        <button onClick={this.add}>add</button>
        <button onClick={this.asyAdd}>asyAdd</button>
        <button onClick={this.promiseMinus}>promise minus</button>
      </div>
    );
  }
}
```

## API分解实现



### createStore

```js
const store = createStore(
  countReducer,
  applyMiddleware(thunk, logger, promise)
);
```

从使用实例可以搭出函数框架

```js
export default function createStore(reducer, enhancer) {
  let currentState; // 选中的状态值，记录下方便获取
  let currentListeners = []; // 选中的监听器,方便订阅和取消订阅
  function getState() {}
  function dispatch() {}
  function subscribe() {}
  return {
    getState,
    dispatch,
    subscribe,
  };
}
```

然后依次实现

getState比较简单 直接返回选中值即可

```js
  function getState() {
    return currentState;
  }
```

dispatch函数只是在reducer中找到对应的函数执行以后，进行对视图的通知更新

```js
  // add = () => {
  //     store.dispatch({ type: "ADD" });
  //   };
  function dispatch(actions) {
    //将reducer执行一遍，获取变化后的值
    currentState = reducer(currentState, actions);
    // 发布订阅模式 都是通过一个数组进行遍历通知视图进行更新
    currentListeners.forEach((listener) => listener());
  }
```

订阅函数subscribe则是标准的发布订阅函数，记得返回一个取消订阅的函数

```js
  //订阅函数
  function subscribe(fn) {
    currentListeners.push(fn);
    // 返回一个取消订阅函数
    return () => (currentListeners = []);
  }
```

最后执行一次dispatch进行默认值的设定

```js
  dispatch({ type: "随机生成一段Type进行初始值设置" });
```



### applyMiddleware

顾名思义中间件，把createStore 通过一轮Middleware增强一遍

```js
  if (enhancer) {
    enhancer(createStore)(reducer);
  }
```

这样我们就可以搭出如下框架

```js
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    let store = createStore(reducer);
    // 这是原版的dispatch，这个dispatch只能接受plain object，不能处理异步、promise
    let dispatch = store.dispatch;

    return {
      ...store,
      // 加强版的dispatch
      dispatch,
    };
  };
}
```

这里需要注意 ，我们传入了多个增强函数，需要一次执行增强同一个参数,like this

将参数向下传递，进行加强后，继续向下传递

```js
function f1(arg) {
  console.log("f1", arg);
  return arg;
}
function f2(arg) {
  console.log("f2", arg);
  return arg;
}
function f3(arg) {
  console.log("f3", arg);
  return arg;
}

const res = f1(f2(f3("omg")));
console.log("res", res); //sy-log
// f3 omg
// f2 omg
// f1 omg
// res omg
```

但是这么写不免繁琐，所以就有了

### compose

也叫函数合成，执行顺序是越后面越内层，也就是越早执行

```js
function compose(...funcs) {
  if (!funcs.length) {
    return (arg) => arg;
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

compose(f1, f2, f3)("omg");
// f3 omg
// f2 omg
// f1 omg
```

这样我们就可以开始使用中间件进行函数增强了

```js
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    .....
    
    const API = {
      state: store.getState(),
      dispatch: (actions, ...args) => store.dispatch(actions, ...args),
    };
    //将middlewares转化成 参数为 API 的函数数组
    const middlewaresChain = middlewares.map((middleware) => middleware(API));
    // 对 dispatch 进行增强
    dispatch = compose(...middlewaresChain)(store.dispatch);

    .....
  };
}
```



### combineReducers

#### 用法改变

```html
  <p>{store.getState()}</p>  =>  <p>{store.getState().home}</p>
```

```js
const store = createStore(
  // combineReducers用法
  combineReducers({home: countReducer}),
  applyMiddleware(thunk, logger, promise)
);
```

**combineReducers** 辅助函数的作用是

1. 把一个由多个不同 reducer 函数作为 value 的 object，
2. *合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore。*

#### 使用规则：

- 每个传入 combineReducers 的 reducer 都需满足以下规则：

- 所有未匹配到的 action，必须把它接收到的第一个参数也就是那个 state 原封不动返回。

- 永远不能返回 undefined。当过早 return 时非常容易犯这个错误，为了避免错误扩散，遇到这种情况时 combineReducers 会抛异常。

- 如果传入的 state 就是 undefined，一定要返回对应 reducer 的初始 state。根据上一条规则，初始 state 禁止使用 undefined。

  使用 ES6 的默认参数值语法来设置初始 state 很容易，但你也可以手动检查第一个参数是否为 undefined。

#### 实现：

```js
export default function combineReducers(reducers) {
  return function combination(state = {}, action) {
    var hasChanged = false; // 做缓存的标记
    var nextState = {};
    // 循环reducer，如果是函数就进行执行
    // 将执行完成的值，赋值给对象保存
    for (let key in reducers) {
      let reducer = reducers[key];
      if (typeof reducer !== "function") {
        break;
      }
      var previousStateForKey = state[key];
      var nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
     //判断值有没变化
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
     //判断有没新增state
    hasChanged =
      hasChanged || Object.keys(nextState).length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}
```

redux内部的API我们已经全部实现了。

接下来 我们再通过实现几个中间件，加强下对redux中间件的理解。



## Middleware

首先我们从上面applyMiddleware实现中可以获得一些参数

```js
function xxx( store ) {
  return (next) => (action) => {
    console.log(next);
    /*     dispatch(actions) {
      currentState = reducer(currentState, actions); 
      currentListeners.forEach(listener => listener());
    } */
    console.log(action);
    //  {type: "MINUS", payload: 100}

    return  next(action);
  };
}
```

那么就可以开始写功能了

#### thunk

thunk支持传入一个函数，只是把`dispatch` ,  `getState` 向下传递

```js
function thunk({ dispatch, getState }) {
  return (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}
```



#### Promise

支持 `dispatch `传入一个Promise

```js
function promise({ dispatch }) {
  return (next) => (action) => {
    return isPromise(action) ? action.then(dispatch) : next(action);
  };
}
```



#### logger

每次值改变的时候进行一次控制台输出

```js
function logger({ getState }) {
  return (next) => (action) => {
    console.log(next);
    console.log("*******************************"); 

    console.log(action.type + "执行了！"); 

    let prevState = getState();
    console.log("prev state", prevState); 

    const returnValue = next(action);
    let nextState = getState();
    console.log("next state", nextState); 

    console.log("*******************************"); 
    return returnValue;
  };
}
```



## React-redex

[Redux](https://github.com/reactjs/redux) 官方提供的 React 绑定库。 具有高效且灵活的特性。



### 如何使用

```js
@connect(
  // mapStateToProps
  ({count}) => ({count}),
  // mapDispatchToProps object | function
  {
    add: () => ({type: "ADD"})
  }
  // dispatch => {
  //   let creators = {
  //     add: () => ({type: "ADD"}),
  //     minus: () => ({type: "MINUS"})
  //   };
  //   creators = bindActionCreators(creators, dispatch);

  //   return {
  //     dispatch,
  //     ...creators
  //   };
  // }
)
class ReactReduxPage extends Component {
  render() {
    const {count, dispatch, add} = this.props;
    console.log("pr", this.props); 
    return (
      <div>
        <h3>ReactReduxPage</h3>
        <p>{count}</p>
        <button onClick={() => dispatch({type: "ADD"})}>dispatch add</button>
        <button onClick={add}>add</button>
      </div>
    );
  }
}
```



@connect 接受两个参数 `mapStateToProps `和 `mapDispatchToProps` 分别是 `state `和  `dispatch `的映射



