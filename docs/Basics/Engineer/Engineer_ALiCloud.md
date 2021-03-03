# 阿里云服务器

创建一个抢占式 ESC

## ssh

```bash
# 生成公钥
ssh-keygen -t rsa -P ''

# 查看公钥
cat .ssh/id_rsa.pub

# 将公钥拷贝到服务器
scp ~/.ssh/id_rsa.pub root@47.98.252.XXX:/root

# 将公钥加入信任列表
cat id_dsa.pub >> ~/.ssh/authorized_keys
```

### 登录

```JavaScript
ssh <username>@<hostname or IP address>
ssh root@172.30.156.55
```
