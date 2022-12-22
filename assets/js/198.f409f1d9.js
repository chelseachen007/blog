(window.webpackJsonp=window.webpackJsonp||[]).push([[198],{576:function(a,t,r){"use strict";r.r(t);var s=r(42),e=Object(s.a)({},(function(){var a=this,t=a.$createElement,r=a._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[r("h1",{attrs:{id:"【进阶篇-day-45】-2020-12-15-924-尽量减少恶意软件的传播"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#【进阶篇-day-45】-2020-12-15-924-尽量减少恶意软件的传播"}},[a._v("#")]),a._v(" 【进阶篇 - Day 45】 2020-12-15 - 924. 尽量减少恶意软件的传播")]),a._v(" "),r("h2",{attrs:{id:"题目描述"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#题目描述"}},[a._v("#")]),a._v(" 题目描述")]),a._v(" "),r("blockquote",[r("h2",{attrs:{id:"入选理由"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#入选理由"}},[a._v("#")]),a._v(" 入选理由")]),a._v(" "),r("ol",[r("li",[a._v("并查集的应用")])]),a._v(" "),r("h2",{attrs:{id:"题目描述-2"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#题目描述-2"}},[a._v("#")]),a._v(" 题目描述")]),a._v(" "),r("p",[a._v("在节点网络中，只有当 graph[i][j] = 1 时，每个节点 i 能够直接连接到另一个节点 j。")]),a._v(" "),r("p",[a._v("一些节点 initial 最初被恶意软件感染。只要两个节点直接连接，且其中至少一个节点受到恶意软件的感染，那么两个节点都将被恶意软件感染。这种恶意软件的传播将继续，直到没有更多的节点可以被这种方式感染。")]),a._v(" "),r("p",[a._v("假设 M(initial) 是在恶意软件停止传播之后，整个网络中感染恶意软件的最终节点数。")]),a._v(" "),r("p",[a._v("我们可以从初始列表中删除一个节点。如果移除这一节点将最小化 M(initial)， 则返回该节点。如果有多个节点满足条件，就返回索引最小的节点。")]),a._v(" "),r("p",[a._v("请注意，如果某个节点已从受感染节点的列表 initial 中删除，它以后可能仍然因恶意软件传播而受到感染。")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("示例 1：\n\n输入：graph = [[1,1,0],[1,1,0],[0,0,1]], initial = [0,1]\n输出：0\n示例 2：\n\n输入：graph = [[1,0,0],[0,1,0],[0,0,1]], initial = [0,2]\n输出：0\n示例 3：\n\n输入：graph = [[1,1,1],[1,1,1],[1,1,1]], initial = [1,2]\n输出：1\n\n\n提示：\n\n1 < graph.length = graph[0].length <= 300\n0 <= graph[i][j] == graph[j][i] <= 1\ngraph[i][i] == 1\n1 <= initial.length < graph.length\n0 <= initial[i] < graph.length\n")])])]),r("p",[a._v("来源：力扣（LeetCode）\n链接：https://leetcode-cn.com/problems/minimize-malware-spread\n著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。")])]),a._v(" "),r("h2",{attrs:{id:"我的回答"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#我的回答"}},[a._v("#")]),a._v(" 我的回答")]),a._v(" "),r("h3",{attrs:{id:"解法一"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#解法一"}},[a._v("#")]),a._v(" 解法一")]),a._v(" "),r("h4",{attrs:{id:"时空复杂度"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#时空复杂度"}},[a._v("#")]),a._v(" 时空复杂度")]),a._v(" "),r("p",[a._v("时间复杂度：O(n)")]),a._v(" "),r("p",[a._v("空间复杂度: O(1)")]),a._v(" "),r("div",{staticClass:"language-JavaScript extra-class"},[r("pre",{pre:!0,attrs:{class:"language-javascript"}},[r("code",[a._v("\n")])])]),r("h2",{attrs:{id:"参考回答"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#参考回答"}},[a._v("#")]),a._v(" 参考回答")]),a._v(" "),r("ul",[r("li")])])}),[],!1,null,null,null);t.default=e.exports}}]);