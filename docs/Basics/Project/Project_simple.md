# 简易项目

```cmd
cnpm init egg --type=simple
npx create-nuxt-app front
```

## 项目规范

commitlint，eslint，prettier，

husky 验证

git flow actions 验证

## 登录权限

图片验证码 svg-captcha

密码加密 md5

session 模式 后端 setCookie 前端无需操作鉴权， redis 存储 取值

jwt 模式 前端登录后 后端将登录信息和过期时间加密成一个 token，前端存入 localstorage 并在 axios 为每个请求携带上 jsonwebtoken

middleware 验证头部 header.authorization 的 token

邮箱验证 nodemailer

## 文件上传

文件管理 fs-extra

formData.append('file',)

### 不同事件上传 + 进度条

拖拽上传

```js
drag.addEventListener("dragover", () => {});
drag.addEventListener("dragleave", () => {});
drag.addEventListener("drop", () => {});
```
