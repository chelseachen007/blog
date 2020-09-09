# 浏览器安全问题

## 同源策略

跨域，是指浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对JavaScript实施的安全限制。

所谓的同源是指，**域名、协议、端口**均为相同。

同源策略限制了以下行为：

- Cookie、LocalStorage 和 IndexDB 无法读取
- DOM 和 JS 对象无法获取
- Ajax请求发送不出去

| URL                                               | 结果 | 原因                               |
| :------------------------------------------------ | :--- | :--------------------------------- |
| `http://store.company.com/dir2/other.html`        | 同源 | 只有路径不同                       |
| `http://store.company.com/dir/inner/another.html` | 同源 | 只有路径不同                       |
| `https://store.company.com/secure.html`           | 失败 | 协议不同                           |
| `http://store.company.com:81/dir/etc.html`        | 失败 | 端口不同 ( `http://` 默认端口是80) |
| `http://news.company.com/dir/other.html`          | 失败 | 主机不同                           |

### **CORS**标准

**CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。**

它允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。

浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

分为两种请求，一种是简单请求，另一种是非简单请求。只要满足下面条件就是简单请求

- 请求方式为HEAD、POST 或者 GET
- http头信息不超出一下字段：Accept、Accept-Language 、 Content-Language、 Last-Event-ID、 Content-Type(限于三个值：application/x-www-form-urlencoded、multipart/form-data、text/plain)

如果Origin指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。

```http
   Access-Control-Allow-Origin: http://api.bob.com
   Access-Control-Allow-Credentials:true
   Access-Control-Expose-Headers: FooBar
   Content-Type: text/html; charset=utf-8
```

上面的头信息之中，有三个与CORS请求相关的字段，都以Access-Control-开头

- **Access-Control-Allow-Origin** :该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求
- **Access-Control-Allow-Credentials**: 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。
- **Access-Control-Expose-Headers**:该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：**Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma**。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。

#### withCredentials 属性

##### 允许服务器读写cookie

需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。

##### 非简单请求

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是**application/json**。

**非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。**

```http
OPTIONS /cors HTTP/1.1
   Origin: http://api.bob.com  //关键字段是Origin，表示请求来自哪个源。
   Access-Control-Request-Method: PUT
   Access-Control-Request-Headers: X-Custom-Header
   Host: api.alice.com
   Accept-Language: en-US
   Connection: keep-alive
   User-Agent: Mozilla/5.0...
```

除了Origin字段，"预检"请求的头信息包括两个特殊字段。

- **Access-Control-Request-Method**：该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT。
- **Access-Control-Request-Headers**：该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是X-Custom-Header

服务器收到"预检"请求以后，检查了`Origin`、`Access-Control-Request-Method`和`Access-Control-Request-Headers`字段以后，确认允许跨源请求，就可以做出回应

```http
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 1728000	
```



- **Access-Control-Allow-Methods**：该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。
- **Access-Control-Allow-Headers**：如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。
- **Access-Control-Allow-Credentials**：该字段与简单请求时的含义相同。
- **Access-Control-Max-Age**：该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。

一旦服务器通过了"预检"请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个Origin头信息字段。服务器的回应，也都会有一个`Access-Control-Allow-Origin`头信息字段。

**CORS与JSONP的使用目的相同，但是比JSONP更强大。JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。**

### 跨域的解决办法

#### **jsonp**

jsonp跨域其实也是JavaScript设计模式中的一种代理模式。**在html页面中通过相应的标签从不同域名下加载静态资源文件是被浏览器允许的，**所以我们可以通过这个“犯罪漏洞”来进行跨域。一般，我们可以动态的创建script标签，再去请求一个带参网址来实现跨域通信

虽然这种方式非常好用，但是一个最大的缺陷是，只能够实现get请求

```js
// create script
script = document. createElement('script');
script.src=url;
target.parentNode.insertBefore(script,target);
```

#### CORS

后端配置CORS允许跨域即可

#### nginx反向代理跨域

#### node代理跨域

node中间件实现跨域代理，是通过启一个代理服务器，实现数据的转发，也可以通过设置cookieDomainRewrite参数修改响应头中cookie中域名，实现当前域的cookie写入，方便接口登录认证。

#### **iframe跨域**

```js
document.domain + iframe 跨域
window.name + iframe 跨域//window.names属性值在文档刷新后依然存在的能力
location.hash + iframe 跨域
```

#### **postMessage跨域**

HTML5全新的API

允许跨窗口通信，不论这两个窗口是否同源。

#### WebSocket协议跨域

WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。

webSocket本身不存在跨域问题，所以我们可以利用webSocket来进行非同源之间的通信。

#### 修改快捷方式

谷歌浏览器 快捷方式添加  --args --disable-web-security --user-data-dir

下面的那几种跨域看看就好了,平时主要使用的还是**CORS**、**JSONP**和**代理**



### **Cookie 遵守同源策略吗？**

也有，不过跟 AJAX 的同源策略稍微有些不同：

- 当请求 [qq.com](https://link.zhihu.com/?target=http%3A//qq.com/) 下的资源时，浏览器会默认带上 [qq.com](https://link.zhihu.com/?target=http%3A//qq.com/) 对应的 Cookie，不会带上[baidu.com](https://link.zhihu.com/?target=http%3A//baidu.com/) 对应的 Cookie
- 当请求 [v.qq.com](https://link.zhihu.com/?target=http%3A//v.qq.com/) 下的资源时，浏览器不仅会带上 [v.qq.com](https://link.zhihu.com/?target=http%3A//v.qq.com/) 的Cookie，还会带上 [qq.com](https://link.zhihu.com/?target=http%3A//qq.com/) 的 Cookie



## XSS 攻击

XSS 全称是 Cross Site Scripting，为了与“CSS”区分开来，故简称 XSS，翻译过来就是“跨站脚本”。XSS 攻击是指黑客往 HTML 文件中或者 DOM 中注入恶意脚本，从而在用户浏览页面时利用注入的恶意脚本对用户实施攻击的一种手段。
如果页面被注入了恶意 JavaScript 脚本，恶意脚本都能做哪些事情。

- 可以窃取 Cookie 信息。恶意 JavaScript 可以通过“document.cookie”获取 Cookie 信息，然后通过 XMLHttpRequest 或者 Fetch 加上 CORS 功能将数据发送给恶意服务器；恶意服务器拿到用户的 Cookie 信息之后，就可以在其他电脑上模拟用户的登录，然后进行转账等操作。
- 可以监听用户行为。恶意 JavaScript 可以使用“addEventListener”接口来监听键盘事件，比如可以获取用户输入的信用卡等信息，将其发送到恶意服务器。黑客掌握了这些信息之后，又可以做很多违法的事情。
- 可以通过修改 DOM 伪造假的登录窗口，用来欺骗用户输入用户名和密码等信息。
- 还可以在页面内生成浮窗广告，这些广告会严重地影响用户体验。

### 恶意脚本是怎么注入的

1. **存储型 XSS 攻击**
   黑客利用站点漏洞将一段恶意 JavaScript 代码提交到网站的数据库中；

2. **反射型 XSS 攻击**
   在一个反射型 XSS 攻击过程中，恶意 JavaScript 脚本属于用户发送给网站请求中的一部分，随后网站又把恶意 JavaScript 脚本返回给用户
3. **基于 DOM 的 XSS 攻击**
   具体来讲，黑客通过各种手段将恶意脚本注入用户的页面中，比如通过网络劫持在页面传输过程中修改 HTML 页面的内容，这种劫持类型很多，有通过 WiFi 路由器劫持的，有通过本地恶意软件来劫持的，它们的共同点是在 Web 资源传输过程或者在用户使用页面的过程中修改 Web 页面的数据。

### 如何阻止 XSS 攻击

1. **服务器对输入脚本进行过滤或转码**
2. **充分利用 CSP**
   CSP 有如下几个功能：

- 限制加载其他域下的资源文件，这样即使黑客插入了一个 JavaScript 文件，这个 JavaScript 文件也是无法被加载的；
- 禁止向第三方域提交数据，这样用户数据也不会外泄；
- 禁止执行内联脚本和未授权的脚本；
- 还提供了上报机制，这样可以帮助我们尽快发现有哪些 XSS 攻击，以便尽快修复问题。

3. **使用 HttpOnly 属性**

由于很多 XSS 攻击都是来盗用 Cookie 的，因此还可以通过使用 HttpOnly 属性来保护我们 Cookie 的安全。

## CSRF 攻击：陌生链接不要随便点

CSRF 英文全称是**Cross-site request forgery**,所以又称为“跨站请求伪造”，是指黑客引
诱用户打开黑客的网站，在黑客的网站中，利用用户的登录状态发起的跨站请求。简单来讲，
**CSRF 攻击就是黑客利用了用户的登录状态，并通过第三方的站点来做一些坏事。**

### 自动发起 GET 请求

当页面被加载时，浏览器会自动发起资源请求

```html
<img src="https://xxxx.com/session?user=xxx&psw=xxx" />
```

### 自动发起 POST 请求

```html
<form id="hacker-form"></form>
<script>
  document.getElementById("hacker-form").submit();
</script>
```

通过表单自动提交 POST 请求

### 引诱客户点击链接

### 如何防止 CSRF 攻击

发起 `CSRF` 攻击的三个必要条件：

- 第一个，目标站点一定要有 `CSRF` 漏洞；
- 第二个，用户要登录过目标站点，并且在浏览器上保持有该站点的登录状态；
- 第三个，需要用户打开一个第三方站点，可以是黑客的站点，也可以是一些论坛。

要避免发生 `CSRF 攻击，通常有以下几种途径：

1. **充分利用好 `Cookie` 的 `SameSite` 属性**

- **Strict** 最为严格。如果 SameSite 的值是 Strict,那么浏览器会完全禁止第三方 Cookie。
- **Lax** 相对宽松一点。在跨站点的情况下，从第三方站点的链接打开和从第三方站点提交 Get
  方式的表单这两种方式都会携带 Cookie。但如果在第三方站点中使用 Post 方法，或者通
  过 img、iframe 等标签加载的 URL,这些场景都不会携带 Cookie。
- 而如果使用 **None** 的话，在任何情况下都会发送 Cookie 数据。

2. **验证请求的来源站点**

服务器的策略是优先判断 **Origin**,如果请求头中没有包含 `Origin` 属性，再根据实际情
况判断是否使用 **Referer** 值。
Origin 属性只包含了域名信息，并没有包含具体的 URL 路径，这是 Origin
和 Referer 的一个主要区别。
在这里需要补充一点，Origin 的值之所以不包含详细路径信息，是有些站点因为安全考虑，不想把源站点的详细路径暴露给服务器。

3. **CSRF Toekn**
   服务器生成一个随机字符串，在之后的请求都携带上

## 安全沙箱

安全沙箱，就是将渲染进程和操作系统隔离的一道墙，由于这道墙，黑客就获取不到渲染进程之外的任何操作权限。

我们知道安全沙箱最小的保护单位是进程，并且能限制进程对操作系统资源的访问和修改，这就意味着如果要让安全沙箱应用在某个进程上，那么这个进程必须没有读写操作系统的功能，比如读写本地文件、发起网络请求、调用GPU接口等。

<img src="./Chrome/image-20200612160419524.png" alt="image-20200612160419524" style="zoom: 80%;" />

### 持久存储

具体地讲，如下文件内容的读写都是在浏览器内核中完成的：

- 存储Cookie数据的读写。通常浏览器内核会维护一个存放所有Cookie的Cookie数据
  库，然后当渲染进程通过JavaScript来读取Cookie时，渲染进程会通过IPC将读取
  Cookie的信息发送给浏览器内核，浏览器内核读取Cookie之后再将内容返回给渲染进
  程。
- 一些缓存文件的读写也是由浏览器内核实现的，比如网络文件缓存的读取。

### 网络访问

同样有了安全沙箱的保护，在渲染进程内部也是不能直接访问网络的，如果要访问网络，则需要通过浏览器内核。不过浏览器内核在处理URL请求之前，会检查渲染进程是否有权限请求该URL,比如检查XMLHttpRequest或者Fetch是否是跨站点请求，或者检测HTTPS的站点中是否包含了HTTP的请求。

### 用户交互

通常情况下，如果你要实现一个UI程序，操作系统会提供一个界面给你，该界面允许应用程序与用户交互，允许应用程序在该界面上进行绘制，比如Windows提供的是HWND,Linux提供的XWindow,我们就把`HWND`和`XWindow`统称为**窗口句柄**。应用程序可以在窗口
句柄上进行绘制和接收键盘鼠标消息。

渲染进程不能直接访问窗口句柄，所以渲染进程需要完成以下两点大的改变。
第一点，**渲染进程需要渲染出位图**。为了向用户显示渲染进程渲染出来的位图，渲染进程需要将生成好的位图发送到浏览器内核，然后浏览器内核将位图复制到屏幕上。
第二点，**操作系统没有将用户输入事件直接传递给渲染进程，而是将这些事件传递给浏览器内核**。然后浏览器内核再根据当前浏览器界面的状态来判断如何调度这些事件，如果当前焦点位于浏览器地址栏中，则输入事件会在浏览器内核内部处理；如果当前焦点在页面的区域内，则浏览器内核会将输入事件转发给渲染进程。

### 站点隔离（Site Isolation)

所谓站点隔离是指Chrome将同一站点（包含了相同根域名和相同协议的地址）中相互关联的页面放到同一个渲染进程中执行。

最开始Chrome划分渲染进程是以标签页为单位，也就是说整个标签页会被划分给某个渲染进程。但是，按照标签页划分渲染进程存在一些问题，原因就是一个标签页中可能包含了多个`iframe`,而这些`iframe`又有可能来自于不同的站点，这就导致了多个不同站点中的内容通过`iframe`同时运行在同一个渲染进程中。

因此Chrome几年前就开始重构代码，将标签级的渲染进程重构为iframe级的渲染进程，然后严格按照同一站点的策略来分配渲染进程，这就是Chrome中的站点隔离。
实现了站点隔离，就可以将恶意的iframe隔离在恶意进程内部，使得它无法继续访问其他iframe进程的内容，因此也就无法攻击其他站点了。

为什么要让他们跑在一个进程里面呢？

因为在一个渲染进程里面，他们就会共享JS的执行环境，也就是说A页面可以直接在B页面中执行脚本。因为是同一家的站点，所以是有这个需求的。