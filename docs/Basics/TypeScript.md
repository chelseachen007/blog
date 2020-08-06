# TypeScript

#### 基础类型

```TS
// 常见原始类型: string,number,boolean,undefined,null,symbol
let var1: string; // 类型注解 

// 编译器类型推断可省略这个语法 
let var2 = true;

// 类型数组 
let arr: string[];

// 函数中的类型约束
// 函数中的类型约束 
function greet(person: string): string {
    return 'hello, ' + person; 
}

// void类型，常用于没有返回值的函数 
function warn(): void {}
```



#### 非空断言

```ts
function addFeatur(e:KeyboardEvent ){
    const inp = e.taget as HTMLInputElement 
    const inp = e.taget !
}
```



#### 类型别名

```ts
// 可以用下面这样方式定义对象类型 
const objType: { foo: string, bar: string } 

// 使用type定义类型别名，使用更便捷，还能复用 
type Foobar = { foo: string, bar: string }
```



#### 联合类型

```ts
let features:Features[] | null 
```

#### 交叉类型

```ts
type First = {first:number}
type Secord = {secord:string }
type third = First &  Secord
```

为了分离类型，比如前端类型和后端返回的类型应该分开定义后合并

##### 合起来，如果有同key，类型不一样，怎么处理的?



#### 重载

以函数参数数量或者类型，或者返回值的类型区分多个同名函数

``` ts
// 重载：以函数参数数量或者类型，或者返回值的类型区分多个同名函数
// 先声明，再实现
// 重载1
function watch(cb1: () => void): void
// 重载2
function watch(cb1: () => void, cb2: (v1: any, v2: any) => void): void
// 实现
function watch(cb1: () => void, cb2?: (v1: any, v2: any) => void) {
  if (cb2) {
    console.log('执行重载2');
    
  } else {
    console.log('执行重载1');
    
  }
}

 watch() 
```





#### 声明文件

```TS
// shims-vue.d.ts 
import Vue from "vue"; 
import { AxiosInstance } from "axios"; 
declare module "vue/types/vue" { 
    interface Vue { 
        $axios: AxiosInstance; 
    } 
}
```



#### Class

```ts
// 03-class.ts 
class Parent { 
    private _foo = "foo"; // 私有属性，不能在类的外部访问 
    protected bar = "bar"; // 保护属性，可以在子类中访问
    // 参数属性：构造函数参数加修饰符，能够定义为成员属性 
    constructor(public tua = "tua") {} 
    // 方法也有修饰符 
    private someMethod() {} 
    // 存取器：属性方式访问，可添加额外逻辑，控制读写性
    get foo() { 
        return this._foo;
    }
    set foo(val) { 
        this._foo = val; 
    } 
}
```

## 泛型

#### 使用时机：

当你的函数，接口或者类：

- 需要作用到很多类型的时候，
- 需要被用到很多地方的时候，

#### 泛型使用

可以作为一个动态参数传入，使类型使用更加灵活

```ts
interface Result<T> {
  ok: 0 | 1;
  data: T[];
}

function getResult<T>(data: T): Result<T> {
  return { ok: 1, data: [data] };
}

getResult<string>("1");
```



#### **TS 泛型工具** (目前16种)

[点击查看官方实现](https://github.com/microsoft/TypeScript/blob/master/src/lib/es5.d.ts#L1431)

- [Partial](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)

功能是将类型的属性**「变成可选」**。

```ts
type Partial<T> = { [P in keyof T]?: T[P] };
```

- [Readonly](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)

功能是将类型的属性**「变成只读」**， 在属性前面增加 `readonly` 意思会将其变成只读。

```ts
type Readonly<T> = { readonly [P in keyof T]: T[P] };
```

- [Record](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype)
- [Pick](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)
- [Omit](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)
- [Exclude](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludetype-excludedunion)
- [Extract](https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union)
- [NonNullable](https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype)
- [Parameters](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)
- [ConstructorParameters](https://www.typescriptlang.org/docs/handbook/utility-types.html#constructorparameterstype)
- [ReturnType](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype)

功能是用来得到一个函数的返回值类型。

```ts
type ReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any;
```



- [InstanceType](https://www.typescriptlang.org/docs/handbook/utility-types.html#instancetypetype)
- [Required](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype)

功能和`Partial` 相反，是将类型的属性**「变成必填」**， 这里的 `-`指的是去除。 `-?`意思就是去除可选，也就是必填啦。

```ts
type Required<T> = { [P in keyof T]-?: T[P] };
```

- [ThisParameterType](https://www.typescriptlang.org/docs/handbook/utility-types.html#thisparametertypetype)
- [OmitThisParameter](https://www.typescriptlang.org/docs/handbook/utility-types.html#omitthisparametertype)
- [ThisType](https://www.typescriptlang.org/docs/handbook/utility-types.html#thistypetype)





