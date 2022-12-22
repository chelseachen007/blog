(window.webpackJsonp=window.webpackJsonp||[]).push([[230],{611:function(t,a,s){"use strict";s.r(a);var n=s(42),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"【-day-11-】2021-05-20-142-环形链表-ii"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#【-day-11-】2021-05-20-142-环形链表-ii"}},[t._v("#")]),t._v(" 【 Day 11 】2021-05-20 - 142. 环形链表 II")]),t._v(" "),s("h2",{attrs:{id:"题目描述"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#题目描述"}},[t._v("#")]),t._v(" 题目描述")]),t._v(" "),s("blockquote",[s("h1",{attrs:{id:"_142-环形链表-ii"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_142-环形链表-ii"}},[t._v("#")]),t._v(" 142. 环形链表 II")]),t._v(" "),s("h2",{attrs:{id:"入选理由"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#入选理由"}},[t._v("#")]),t._v(" 入选理由")]),t._v(" "),s("p",[t._v("暂无")]),t._v(" "),s("h2",{attrs:{id:"题目地址"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#题目地址"}},[t._v("#")]),t._v(" 题目地址")]),t._v(" "),s("p",[t._v("https://leetcode-cn.com/problems/linked-list-cycle-ii/")]),t._v(" "),s("h2",{attrs:{id:"前置知识"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#前置知识"}},[t._v("#")]),t._v(" 前置知识")]),t._v(" "),s("p",[t._v("暂无")]),t._v(" "),s("h2",{attrs:{id:"题目描述-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#题目描述-2"}},[t._v("#")]),t._v(" 题目描述")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。\n\n为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意，pos 仅仅是用于标识环的情况，并不会作为参数传递到函数中。\n\n说明：不允许修改给定的链表。\n\n进阶：\n\n你是否可以使用 O(1) 空间解决此题？\n")])])])]),t._v(" "),s("h2",{attrs:{id:"我的回答"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#我的回答"}},[t._v("#")]),t._v(" 我的回答")]),t._v(" "),s("h3",{attrs:{id:"解法一"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解法一"}},[t._v("#")]),t._v(" 解法一")]),t._v(" "),s("h4",{attrs:{id:"时空复杂度"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#时空复杂度"}},[t._v("#")]),t._v(" 时空复杂度")]),t._v(" "),s("p",[t._v("时间复杂度：O(n)")]),t._v(" "),s("p",[t._v("空间复杂度: O(n)")]),t._v(" "),s("p",[t._v("链表问题首先使用Map记录结点，有环就会重复走一个结点")]),t._v(" "),s("div",{staticClass:"language-JavaScript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("detectCycle")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("head")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" map "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Map")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("head"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("map"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("has")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("head"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" head\n        map"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("set")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("head"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        head "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" head"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("next\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h3",{attrs:{id:"解法二"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解法二"}},[t._v("#")]),t._v(" 解法二")]),t._v(" "),s("h4",{attrs:{id:"时空复杂度-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#时空复杂度-2"}},[t._v("#")]),t._v(" 时空复杂度")]),t._v(" "),s("p",[t._v("时间复杂度：O(n)")]),t._v(" "),s("p",[t._v("空间复杂度: O(1)")]),t._v(" "),s("p",[t._v("快慢指针，快慢指针第一次相遇的时候，头结点和慢指针离入环点的距离相等")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("detectCycle")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("head")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" slow "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" head\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" fast "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" head\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fast"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        slow "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" slow"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("next\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("fast"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("next"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v("\n        fast "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" fast"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("next"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("next\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fast "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" slow"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("continue")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" pre "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" head\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("pre "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" slow"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            pre "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" pre"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("next\n            slow "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" slow"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("next\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" slow\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h2",{attrs:{id:"参考回答"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考回答"}},[t._v("#")]),t._v(" 参考回答")]),t._v(" "),s("ul",[s("li")])])}),[],!1,null,null,null);a.default=e.exports}}]);