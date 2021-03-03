# 浏览器存储

## cookie

cookie 的产生是为了解决 http 传输无状态问题

### 优点

产生的时间较早，各大浏览器兼容性较好

### 缺点

1. 存储量小，虽然各大浏览器的实现不同，但大部分都是**4KB**
2. 在每个请求上都会携带，增加无用的传输成本，降低传输效率
3. 只能存储字符串
4. 安全问题：可以随意访问，并且可以修改，所以重要数据不能存储在 cookie
5. 由于第三方 Cookie 的滥用，所以很多老司机在浏览网页时会禁用 Cookie，所以我们不得不测试用户是否支持 Cookie，这也是很麻烦的一件事。

### 操作

#### 基本操作

```JavaScript
//通过 key=value 形式增加  同名视作更新
// expires= 过期时间
// domain= cookie 所属的域（默认为当前域）：
// path = cookie 所属的路径（默认值是当前页面的路径）：
// secure 设置web页面只有在HTTPS安全连接时，才可以发送Cookie。
// HttpOnly 它使JavaScript 脚本无法获得Cookie
document.cookie = "logcookie=3qjj; expires=Wed, 13-Mar-2019 12:08:53 GMT; Max-Age=31536000; path=/;domain=fafa.com;secure; HttpOnly;"
```

#### 读取具有特定名称的 Cookie

```JavaScript
export function getCookie(name) {
  var arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if ((arr = document.cookie.match(reg))) return unescape(arr[2])
  else return null
}
```

#### 删除具有特定名称的 Cookie

```JavaScript
export function delCookie(name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null)
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
}
```

### SameSite 属性

- **Strict** 最为严格。如果 SameSite 的值是 Strict,那么浏览器会完全禁止第三方 Cookie。
- **Lax** 相对宽松一点。在跨站点的情况下，从第三方站点的链接打开和从第三方站点提交 Get
  方式的表单这两种方式都会携带 Cookie。但如果在第三方站点中使用 Post 方法，或者通
  过 img、iframe 等标签加载的 URL,这些场景都不会携带 Cookie。
- 而如果使用 **None** 的话，在任何情况下都会发送 Cookie 数据。

[session 和 Token 鉴权](./JWT.md)

## web 存储

它所产生的主要原因主要出于以下两个原因：

- 人们希望有一种在 cookie 之外存储回话数据的途径。
- 人们希望有一种存储大量可以跨会话存在的数据的机制。

### Local Storage

- 同样只能存储字符串，但 LocalStorage 可以存储序列化以后的 JSON。

- 提供了简单明了的 API
- 相对更加安全，不参与服务器通信
- 可储存的数据量更大 ，可以保存 5MB 的信息。
- 持久化存储

#### 基本语法

```JavaScript
// 使用方法存储数据
localStorage.setItem('name', 'Srtian')
// 使用属性存储数据
localStorage.say = 'Hello world'
// 使用方法读取数据
const name = localStorage.getItem('name')
// 使用属性读取数据
const say = localStorage.say
// 删除数据
localStorage.removeItem('name')
```

### Session Strorage

仅在当前网页会话下有效，关闭页面或浏览器后就会被清除。

其他基本同上

注：兼容性 ie8 以上

## IndexedDB

为了存储更大量的结构化数据，诞生了 IndexedDB

### 使用

```JavaScript
const request = indexedDB.open('myDatabase', 1)

request.addEventListener('success', (e) => {
  console.log('连接数据库成功')
})

request.addEventListener('error', (e) => {
  console.log('连接数据库失败')
})
```
