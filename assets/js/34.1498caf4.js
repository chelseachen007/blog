(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{403:function(t,n,a){"use strict";a.r(n);var r=a(42),s=Object(r.a)({},(function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"工程化工具发展"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#工程化工具发展"}},[t._v("#")]),t._v(" 工程化工具发展")]),t._v(" "),a("h2",{attrs:{id:"npm-问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#npm-问题"}},[t._v("#")]),t._v(" npm 问题")]),t._v(" "),a("p",[t._v("一个问题是，在 npm 安装依赖的过程中会引入大量的子包，，在早期版本（npm 3 之前）中会产生相同依赖包的大量重复拷贝，这在前端项目中会导致无谓的请求流量损耗")]),t._v(" "),a("p",[t._v("另一个饱受诟病的问题是本地依赖管理算法的复杂性以及随之而来的性能、冗余、冲突等问题。而 2016 年发布的 Yarn 正是为解决这些问题而诞生的。和 "),a("strong",[t._v("npm")]),t._v(" 相比，"),a("strong",[t._v("Yarn")]),t._v(" 的主要优点有：")]),t._v(" "),a("ol",[a("li",[a("strong",[t._v("安装速度")]),t._v("：由于 Yarn 在安装依赖时采用的是并行操作，以及它在缓存依赖包时相比 npm 缓存的数据更完整，因此它在初次与重复安装依赖时，普遍都会比 npm 更快。")]),t._v(" "),a("li",[a("strong",[t._v("稳定性")]),t._v("：npm 5 引入的 package-lock 文件，在每次执行 npm install 时仍然会检查更新符合语义规则的依赖包版本，而 yarn.lock 则会严格保证版本的稳定性（尽管，yarn.lock 不能保证 node_modules 的拓扑稳定性）。")]),t._v(" "),a("li",[a("strong",[t._v("Plug'n'Play（PnP）")]),t._v("：Yarn 2.0 发布了 PnP的功能（在更早期的 1.12 版本中就已实现）。PnP 方案具有提升项目安装与解析依赖的速度，以及多项目共享缓存（与普通缓存相比，免去了读写 node_modules 的大量 I/O 操作)，节省占用空间等优势。")])]),t._v(" "),a("h2",{attrs:{id:"任务式构建工具"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#任务式构建工具"}},[t._v("#")]),t._v(" 任务式构建工具")]),t._v(" "),a("blockquote",[a("p",[t._v("任务式构建工具发展历程回顾：\n2012 年，Ben Alman 发布了基于任务的构建工具 Grunt。\n2013 年，Eric Schoffstall 发布了流式的构建工具 Gulp。")])]),t._v(" "),a("p",[t._v("Grunt vs Gulp\n这两种工具的差异性主要体现在：")]),t._v(" "),a("ol",[a("li",[t._v("**读写速度：**Gulp 在处理任务的过程中基于 NodeJS 的数据流，本质上是操读写内存，而 Grunt 则是基于临时文件，因此在读写速度上 Gulp 要快于Grunt。")]),t._v(" "),a("li",[t._v("**社区使用规模：**截止编写课程的时间点，在 npmjs.com 的周下载量方面，Gulp 为 1,200,000+，约是 Grunt 的两倍。而在插件数量方面，Grunt 社区提供了超过 6000 个不同功能的插件，而 Gulp 社区的插件数量则是 4000 多个。")]),t._v(" "),a("li",[t._v("**配置文件的易用性：**相比描述不同插件配置信息的 Gruntfile 而言，使用 pipe 函数描述任务处理过程的方式通常更易于阅读，但编写时需要对数据流有更深入的理解。")])]),t._v(" "),a("p",[t._v("任务式的构建工具，虽然解决了开发流程中自动化执行预设任务的问题，但不能解决项目中代码如何组织成不同功能的代码包、不同代码之间如何相互依赖等问题。而解决这类问题的方式就是：模块化。")]),t._v(" "),a("h2",{attrs:{id:"模块化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#模块化"}},[t._v("#")]),t._v(" 模块化")]),t._v(" "),a("h3",{attrs:{id:"commonjs"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#commonjs"}},[t._v("#")]),t._v(" commonjs")]),t._v(" "),a("p",[t._v("CommonJS 是一个非浏览器端的 JS 规范， Nodejs就是基于commonjs实现了一套实用的文件管理系统。")]),t._v(" "),a("p",[t._v("不能用在浏览器端的原因：")]),t._v(" "),a("ol",[a("li",[t._v("模块文件中没有函数包裹，变量直接暴露到全局")]),t._v(" "),a("li",[t._v("浏览器端文件是异步并行下载，不适合同步的依赖加载方式")])]),t._v(" "),a("h3",{attrs:{id:"amd"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#amd"}},[t._v("#")]),t._v(" AMD")]),t._v(" "),a("p",[t._v("为了弥补commonjs不能在浏览器端使用的空缺")])])}),[],!1,null,null,null);n.default=s.exports}}]);