```cmd
cnpm init egg --type=simple
npx create-nuxt-app front
```



## 项目规范

commitlint，eslint，prettier，

husky验证 

git flow actions验证



## 登录权限

图片验证码 svg-captcha

密码加密 md5



session模式 后端setCookie 前端无需操作鉴权， redis存储 取值

jwt模式 前端登录后 后端将登录信息和过期时间加密成一个token，前端存入localstorage并在axios为每个请求携带上  jsonwebtoken

middleware	验证头部header.authorization 的token



邮箱验证 nodemailer

## 文件上传

文件管理 fs-extra

formData.append('file',)

### 不同事件上传 + 进度条

拖拽上传  

```js
drag.addEventListener('dragover',()=>{})
drag.addEventListener('dragleave',()=>{})
drag.addEventListener('drop',()=>{})
```

