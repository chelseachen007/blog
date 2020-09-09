# 前端工程化



## commitlint

```js
npm install -g commitizen

```



### cz-conventional-changelog

```js
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

```js
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

```js

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

### Commitizen校验

```js
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

```js
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

## Prettier

VS Code 的 [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 

## lint-staged

```js
npx mrm lint-staged

//package.json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
```
