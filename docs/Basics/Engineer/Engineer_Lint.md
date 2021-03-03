# 前端工程化

Lint 工具相当于为 js 增加了编译过程，在代码部署运行前进行静态分析，找到出错的地方和不规范的代码。

**总结一下 ESLint 的作用及优势：**

- **检查语法错误，避免低级 bug；**

> 比如：api 语法错误、使用了未定义的变量、修改 const 变量

- **统一团队代码风格**

> 比如：使用 tab 还是空格，使用单引号还是双引号等

- **确保代码遵循最佳实践**

## commitlint

```JavaScript
npm install -g commitizen
```

### cz-conventional-changelog

```JavaScript
commitizen init cz-conventional-changelog --save --save-exact

"devDependencies": {
 "cz-conventional-changelog": "^2.1.0"
},
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
}
```

### cz-customizable

```JavaScript
npm install cz-customizable --save-dev
"devDependencies": {
  "cz-customizable": "^5.3.0"
},
"config": {
  "commitizen": {
    "path": "node_modules/cz-customizable"
  }
}

```

### .cz-config.js

```JavaScript

'use strict';

module.exports = {

  types: [
    { value: 'feat', name: '特性:    一个新的特性' },
    { value: 'fix', name: '修复:    修复一个Bug' },
    { value: 'docs', name: '文档:    变更的只有文档' },
    { value: 'style', name: '格式:    空格, 分号等格式修复' },
    { value: 'refactor', name: '重构:    代码重构，注意和特性、修复区分开' },
    { value: 'perf', name: '性能:    提升性能' },
    { value: 'test', name: '测试:    添加一个测试' },
    { value: 'chore', name: '工具:    开发工具变动(构建、脚手架工具等)' },
    { value: 'revert', name: '回滚:    代码回退' },
    { value: 'WIP', name: 'WIP:     正在进行工作' }
  ],

  // scopes: [
  //   { name: 'accounts' },
  //   { name: 'admin' },
  //   { name: 'exampleScope' },
  //   { name: 'changeMe' }
  // ],

  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: 'Select the type of change that you\'re committing:',
    scope: '\nDenote the SCOPE of this change (optional):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],

  // limit subject length
  subjectLimit: 100

};

```

### Commitizen 校验

```JavaScript
npm install --save-dev @commitlint/cli
npm install --save-dev @commitlint/config-conventional

// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional']
};


npm install husky --save-dev


//package.json
"husky": {
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

## ESLint

```JavaScript
npm i --save-dev eslint

> eslint --init

? How would you like to configure ESLint? Answer questions about your style
// 是否校验 Es6 语法
? Are you using ECMAScript 6 features? Yes
// 是否校验 Es6 模块语法
? Are you using ES6 modules? Yes
// 代码运行环境，Browser 指浏览器
? Where will your code run? Browser
// 是否校验 CommonJs 语法
? Do you use CommonJS? Yes
// 是否校验 JSX 语法
? Do you use JSX? Yes
// 是否校验 React 语法
? Do you use React? Yes
// 首行空白选择 Tab 键还是 Space
? What style of indentation do you use? Tabs
// 字符串使用单引号 'string' 还是双引号 "string"
? What quotes do you use for strings? Double
// 操作系统
? What line endings do you use? Windows
// 每行代码结尾是否校验加分号
? Do you require semicolons? Yes
// 以 .js 格式生成配置文件
? What format do you want your config file to be in? JavaScript
// 因为要校验 Reac 语法，所以这里需要下载一个 React 语法规则的包
Installing eslint-plugin-react@latest
```

off" 或 0 - 关闭规则

"warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)

"error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

```JavaScript
// http://eslint.org/docs/user-guide/configuring
// .eslintrc.js
module.exports = {
  //此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,
  //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
   // "node": true,
    //"commonjs": true,
    //"es6": true,
    //"amd": true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  // 此项是用来配置标准的js风格，
  extends: 'standard',
   // 此项是用来提供插件的，插件名称省略了eslint-plugin-，
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'prettier/prettier': ['error'],// [error,wran,off]
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-irregular-whitespace": 0,//不能有不规则的空格
    "no-mixed-operators": 0,
    "sort-vars": 0,//变量声明时排序
    "prefer-const": 0,//首选const
    "newline-after-var": 0,//变量声明后是否需要空一行
    "quotes": [0, "single"],//引号类型 `` "" ''
    "quote-props":[0, "always"],//对象字面量中的属性名是否强制双引号
    "array-bracket-spacing": [2, "never"],//是否允许非空数组里面有多余的空格
    "arrow-spacing": 0,//=>的前/后括号
    "spaced-comment": 0,//注释风格要不要有空格什么的
    "eol-last": 0,//文件以单一的换行符结束
    "no-extra-semi": 0,//禁止多余的冒号
    "no-inline-comments": 0,//禁止行内备注
    "no-else-return": 0,//如果if语句里面有return,后面不能跟else语句
    "comma-dangle": [0, "never"],//对象字面量项尾不能有逗号
    "comma-spacing": 0,//逗号前后的空格
    "func-names": 0,//函数表达式必须有名字
    "guard-for-in": 0,//for in循环要用if语句过滤
    "handle-callback-err": 0,//nodejs 处理错误
    "space-after-keywords": [0, "always"],//关键字后面是否要空一格
    "space-before-blocks": [0, "always"],//不以新行开始的块{前面要不要有空格
    "max-len": [0, 80, 4],//字符串最大长度
    "no-unneeded-ternary":0,
    "camelcase": 'off',
    '@typescript-eslint/camelcase': 0,
    "no-self-assign": 0,
    "no-delete-var": 1,//不能对var声明的变量使用delete操作符
    "no-div-regex": 1,//不能使用看起来像除法的正则表达式/=foo/
    "indent": [2, 4],//缩进风格
    "semi-spacing": [2, {"before": false, "after": false}],//分号前后空格
    "no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
    "no-duplicate-case": 2,//switch中的case标签不能重复
    "comma-style": [2, "last"],//逗号风格，换行时在行首还是行尾
    "no-ex-assign": 2,//禁止给catch语句中的异常参数赋值
    "no-extend-native": 2,//禁止扩展native对象
    "no-extra-bind": 2,//禁止不必要的函数绑定
    "no-extra-boolean-cast": 2,//禁止不必要的bool转换
    "no-extra-parens": 2,//禁止非必要的括号
    "eqeqeq": 2,//必须使用全等
    "no-implied-eval": 2,//禁止使用隐式eval
    "no-inner-declarations": [2, "functions"],//禁止在块语句中使用声明（变量或函数）
    "no-invalid-regexp": 2,//禁止无效的正则表达式
    "no-invalid-this": 2,//禁止无效的this，只能用在构造器，类，对象字面量
    "no-dupe-args": 2,//函数参数不能重复
    "valid-typeof": 2,//必须使用合法的typeof的值
    "no-with": 2,//禁用with
    "semi": [2, "always"],//语句强制分号结尾
    "key-spacing": [2, { "beforeColon": false, "afterColon": true }],//对象字面量中冒号的前后空格
  }
}
```

## Prettier

VS Code 的 [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### 常用配置

```JavaScript
{
    // tab缩进大小,默认为2
    "tabWidth": 4,
    // 使用tab缩进，默认false
    "useTabs": false,
    // 使用分号, 默认true
    "semi": false,
    // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
    "singleQuote": false,
    // 行尾逗号,默认none,可选 none|es5|all
    // es5 包括es5中的数组、对象
    // all 包括函数对象等所有可选
    "TrailingCooma": "all",
    // 对象中的空格 默认true
    // true: { foo: bar }
    // false: {foo: bar}
    "bracketSpacing": true,
    // JSX标签闭合位置 默认false
    // false: <div
    //          className=""
    //          style={{}}
    //       >
    // true: <div
    //          className=""
    //          style={{}} >
    "jsxBracketSameLine": false,
    // 箭头函数参数括号 默认avoid 可选 avoid| always
    // avoid 能省略括号的时候就省略 例如x => x
    // always 总是有括号
    "arrowParens": "avoid"
}
```

## lint-staged

```JavaScript
npx mrm lint-staged

//package.json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
```

他具有三个钩子：

1. `"pre-commit": "npm run lint"`，在`git commit`前执行`npm run lint`检查代码格式。
2. `"commit-msg": "node script/verify-commit.js"`，在`git commit`时执行脚本`verify-commit.js`验证 commit 消息。如果不符合脚本中定义的格式，将会报错。
3. `"pre-push": "npm test"`，在你执行`git push`将代码推送到远程仓库前，执行`npm test`进行测试。如果测试失败，将不会执行这次推送

## workflow

在.git/workflows 文件夹创建一个 xx.yml 文件

以我的博客自动部署为例

```yml
name: GitHub Actions Build and Deploy Demo
on:
  push:  // 可以使用数组
    branches:
      - master // 这部分代表监听每一次到 master 分支的 push ，有一次 push 就会执行一次 actions 。
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest //一个名为 build-and-deploy 的工作需要在 ubuntu-latest 环境中运行，这是因为后文 actions 脚本是在 ubuntu 编写的，所以要求环境使用 ubuntu 。
    steps:
    - name: Checkout
      uses: actions/checkout@master

    - name: Build and Deploy
      uses: JamesIves/github-pages-deploy-action@master
      env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}  // 配置的秘钥
        BRANCH: gh-pages  // 发布的分支
        FOLDER: docs/.vuepress/dist // 上传的文件地址
        BUILD_SCRIPT: npm install && npm run docs:build  // 需要执行的脚本
```

代码查看：https://github.com/chelseachen007/Blog

## webhooks

这是一种自己全量操作的服务器部署方法，在私有服务器上接收 github 传输过来的请求，并做出对应的 docker 部署操作

具体操作看 [docker](./Engineer__Docker.md)

## 代码

详细代码都在 git 文件，并且附有详细的 webpack 配置，为后续实现一个完整的脚手架做好准备 https://github.com/chelseachen007/engineer
