# Docker

## Docker简介

### **Docker 镜像**

是一种UnionFS（联合文件系统），是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下.

镜像同时也很小，因为我们pull的镜像剔除了无用的东西，只是一个精简功能版的镜像

下载是一层一层下载，这样便于共享资源。

### **Docker 容器数据卷**

卷就是目录或文件，存在于一个或多个容器中，由docker挂载到容器，但不属于联合文件系统，因此能够绕过Union File System提供一些用于持续存储或共享数据的特性，卷的设计目的就是数据的持久化，完全独立于容器的生存周期，因此Docker不会在容器删除时删除其挂载的数据卷。

dockerfile也就是添加 容器数据卷的一种方式

### dockerfile

```dockerfile
FROM        #基础镜像，当前新镜像是基于哪个镜像的
MAINTAINER    #镜像维护者的姓名和邮箱地址
RUN        #容器构建时需要运行的命令
EXPOSE        #当前容器对外暴露出的端口
WORKDIR        #指定在创建容器后，终端默认登陆的进来工作目录
ENV        #用来在构建镜像过程中设置环境变量
ADD        #将宿主机目录下的文件拷贝进镜像且ADD命令会自动处理URL和解压tar压缩包
COPY        #类似ADD，拷贝文件和目录到镜像中。将从构建上下文目录中 <源路径> 的文件/目录复制到新的一层的镜像内的 <目标路径> 位置
VOLUME        #容器数据卷，用于数据保存和持久化工作
CMD        #指定一个容器启动时要运行的命令，Dockerfile 中可以有多个 CMD 指令，但只有最后一个生效，CMD 会被 docker run 之后的参数替换
ENTRYPOINT     #指定一个容器启动时要运行的命令，ENTRYPOINT 的目的和 CMD 一样，都是在指定容器启动程序及参数
ONBUILD        #当构建一个被继承的Dockerfile时运行命令，父镜像在被子继承后父镜像的onbuild被触发
```

例：

```dockerfile
#Dockerfile
#制定node镜像的版本
FROM node:10-alpine
#移动当前目录下面的文件到app目录下
ADD . /app/
#进入到app目录下面，类似cd
WORKDIR /app
#安装依赖
RUN npm install
#对外暴露的端口
EXPOSE 3000
#程序启动脚本
CMD ["node", "app.js"]
```

### 优势

| **特性**   | **容器**           | **虚拟机** |
| ---------- | ------------------ | ---------- |
| 启动       | 秒级               | 分钟级     |
| 硬盘使用   | 一般为 MB          | 一般为 GB  |
| 性能       | 接近原生           | 弱于       |
| 系统支持量 | 单机支持上千个容器 | 一般几十个 |

## 流程整理

```cmd
docker search nginx
docker pull nginx
docker images
docker run -it -p 8080:8080 nginx
docker ps
docker stop ff6
```

## Docker 安装

```js
# apt升级 
sudo apt-get update 

# 添加相关软件包
apt-get install apt-transport-https
apt-get install ca-certificates curl software-properties-common

# 下载软件包的合法性，需要添加软件源的 GPG 密钥
curl -fsSL https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu/gpg | sudo apt-key add 

# source.list 中添加 Docker 软件源 
sudo add-apt-repository 
"deb [arch=amd64] https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu   
$(lsb_release -cs)    
stable" 

# 安装 Docker CE
sudo apt-get update 
sudo apt-get install docker-ce

# Helloworld测试 
docker run hello-world

```

### 安装node

```cmd
# 安装nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

# 将nvm作为环境变量
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

#安装最新版 node
nvm install node

#安装pm2
npm i pm2 -g
```

### 自动化部署CI/CD

```dockerfile
# dockerfile
# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

逐行解析配置：

- FROM node:lts-alpine as build-stage：基于 node  `lts-alpine` 版本镜像，并通过构建阶段命名，将有 node 环境的阶段命名为 `build-stage`（包含 alpine 的镜像版本相比于 latest 版本更加小巧，更适合作为 docker 镜像使用）
- WORKDIR /app：将工作区设为 /app，和其他系统文件隔离
- COPY package*.json ./：拷贝 package.json/package-lock.json 到容器的 /app 目录
- RUN npm install：运行 `npm install` 在容器中安装依赖
- COPY . .：拷贝其他文件到容器 /app 目录，分两次拷贝是因为保持 node_modules 一致
- RUN npm run build：运行 `npm run build` 在容器中构建

## docker优化

### 利用镜像缓存

相对于项目的源文件来讲，`package.json` 是相对稳定的。如果没有新的安装包需要下载，则再次构建镜像时，无需重新构建依赖。则可以在 npm install 上节省一半的时间。

对于 `ADD` 来讲，如果需要添加的文件内容的 `checksum` 没有发生变化，则可以利用缓存。把 `package.json/package-lock.json` 与源文件分隔开写入镜像是一个很好的选择。目前，如果没有新的安装包更新的话，可以节省一半时间

```dockerfile
...
# 首次添加此两个文件，充分利用缓存
ADD package.json package-lock.json /code
RUN npm install --production

...
```

### 减少 npm install 时间

1. 选择时延低的 `registry`，需要企业技术基础建设支持

```cmd
npm config set registry https://registry-npm.shanyue.tech/
```

2. `NODE_ENV=production`，只安装生产环境必要的包(如果 dep 与 devDep 没有仔细分割开来，工作量很大，可以放弃)
3. `CI=true`，npm 会在此环境变量下自动优化
4. 结合 CI 的缓存功能，充分利用 `npm cache`

```yaml
install:
- npm ci
# keep the npm cache around to speed up installs
cache:
  directories:
  - "$HOME/.npm"
```

5. 使用 `npm ci` 代替 `npm i`，既提升速度又保障应用安全性

```bash
npm ci
```



### 多阶段构建

得益于缓存，现在镜像构建时间已经快了不少。但是，此时镜像的体积依旧过于庞大，这也将会导致部署时间的加长。原因如下

考虑下每次 CI/CD 部署的流程

1. 在构建服务器 (Runer) 构建镜像
2. 把镜像推至镜像仓库服务器
3. 在生产服务器拉取镜像，启动容器



## Docker Compose

Docker Compose是 docker 提供的一个命令行工具，用来定义和运行由多个容器组成的应用。

使用 compose，我们可以通过 YAML 文件声明式的定义应用程序的各个服务，并由单个命令完成应用的创建和启动。

```yaml
version: '3.1'
services:
  nginx:
    restart: always
    #　image是指定服务的镜像名称或镜像ID。如果镜像在本地不存在，Compose将会尝试拉取镜像。
    image: nginx
    ports:
      - 8091:80
    #挂载一个目录或者一个已存在的数据卷容器，可以直接使用 [HOST:CONTAINER]格式，或者使用[HOST:CONTAINER:ro]格式，后者对于容器来说，数据卷是只读的，可以有效保护宿主机的文件系统。
    volumes:
      - ./nginx/conf.d/:/etc/nginx/conf.d
      - ./frontend/dist/:/var/www/html/
      - ./static/:/static/
  app-pm2:
    container_name: app-pm2
    #构建容器
    #服务除了可以基于指定的镜像，还可以基于一份Dockerfile，在使用up启动时执行构建任务，构建标签是build，可以指定Dockerfile所在文件夹的路径。Compose将会利用Dockerfile自动构建镜像，然后使用镜像启动服务容器。
    build: ./backend
    ports:
      - '3000:3000'

```

### 启动

```cmd
docker-compose up
// or
docker-compose up -d
```



## 配置镜像

```json
{
  "registry-mirrors": [
"https://registry.docker-cn.com",
"http://hub-mirror.c.163.com",
"https://docker.mirrors.ustc.edu.cn",
"http://dockerhub.azk8s.cn/" ],
  "insecure-registries": [],
  "debug": true,
  "experimental": false
}
```



## docker常用命令

### 镜像命令

```cmd
docker images                    #查看当前Docker中的镜像
docker search 某个镜像名字                #查询某个镜像
docker pull 某个镜像名字                #拉取(下载)某个镜像
docker rmi 某个镜像名字ID                 #删除某个镜像
```

### 容器基本命令(切记，有镜像才能创建容器)

```cmd
docker run [OPTIONS] image [COMMAND] [ARG...]   #新建并启动容器
docker ps [OPTIONS]                             #列出当前所有正在运行的容器
exit                        #容器停止退出
ctrl+P+Q                    #容器不停止退出
docker start 容器ID或者容器名            #启动容器
docker restart 容器ID或者容器名            #重启容器
docker stop 容器ID或者容器名            #停止容器
docker kill 容器ID或者容器名            #强制停止容器
docker rm 容器ID                    #删除已停止的容器
docker rm -f $(docker ps -a -q)            #一次性删除多个容器
docker ps -a -q | xargs docker rm        #一次性删除多个容器
```

### **容器重要命令**

```cmd
docker run -d 容器名                #启动守护式容器
docker logs -f -t --tail 容器ID            #查看容器日志,-t是加入时间戳，-f是最新的日志打印,--tail数字显示最后多少条

docker top 容器ID                #查看容器内运行的进程
docker inspect 容器ID                #查看容器内部细节
docker exec -it 容器ID bashShell            #进入正在运行的容器并以命令行交互
docker attach 容器ID                #重新进入Docker容器
docker cp  容器ID:容器内路径 目的主机路径        #从容器内拷贝文件到主机上
```



## docker命令帮助

```cmd
Commands:
    attach    Attach to a running container                 # 当前 shell 下 attach 连接指定运行镜像
    build     Build an image from a Dockerfile              # 通过 Dockerfile 定制镜像
    commit    Create a new image from a container's changes # 提交当前容器为新的镜像
    cp        Copy files/folders from the containers filesystem to the host path
              # 从容器中拷贝指定文件或者目录到宿主机中
    create    Create a new container                        # 创建一个新的容器，同 run，但不启动容器
    diff      Inspect changes on a container's filesystem   # 查看 docker 容器变化
    events    Get real time events from the server          # 从 docker 服务获取容器实时事件
    exec      Run a command in an existing container        # 在已存在的容器上运行命令
    export    Stream the contents of a container as a tar archive   
              # 导出容器的内容流作为一个 tar 归档文件[对应 import ]
    history   Show the history of an image                  # 展示一个镜像形成历史
    images    List images                                   # 列出系统当前镜像
    import    Create a new filesystem image from the contents of a tarball  
              # 从tar包中的内容创建一个新的文件系统映像[对应 export]
    info      Display system-wide information               # 显示系统相关信息
    inspect   Return low-level information on a container   # 查看容器详细信息
    kill      Kill a running container                      # kill 指定 docker 容器
    load      Load an image from a tar archive              # 从一个 tar 包中加载一个镜像[对应 save]
    login     Register or Login to the docker registry server   
              # 注册或者登陆一个 docker 源服务器
    logout    Log out from a Docker registry server         # 从当前 Docker registry 退出
    logs      Fetch the logs of a container                 # 输出当前容器日志信息
    port      Lookup the public-facing port which is NAT-ed to PRIVATE_PORT
              # 查看映射端口对应的容器内部源端口
    pause     Pause all processes within a container        # 暂停容器
    ps        List containers                               # 列出容器列表
    pull      Pull an image or a repository from the docker registry server
              # 从docker镜像源服务器拉取指定镜像或者库镜像
    push      Push an image or a repository to the docker registry server
              # 推送指定镜像或者库镜像至docker源服务器
    restart   Restart a running container                   # 重启运行的容器
    rm        Remove one or more containers                 # 移除一个或者多个容器
    rmi       Remove one or more images                 
              # 移除一个或多个镜像[无容器使用该镜像才可删除，否则需删除相关容器才可继续或 -f 强制删除]
    run       Run a command in a new container
              # 创建一个新的容器并运行一个命令
    save      Save an image to a tar archive                # 保存一个镜像为一个 tar 包[对应 load]
    search    Search for an image on the Docker Hub         # 在 docker hub 中搜索镜像
    start     Start a stopped containers                    # 启动容器
    stop      Stop a running containers                     # 停止容器
    tag       Tag an image into a repository                # 给源中镜像打标签
    top       Lookup the running processes of a container   # 查看容器中运行的进程信息
    unpause   Unpause a paused container                    # 取消暂停容器
    version   Show the docker version information           # 查看 docker 版本号
    wait      Block until a container stops, then print its exit code   
              # 截取容器停止时的退出状态值
Run 'docker COMMAND --help' for more information on a command.
```

## docker options

```cmd
Usage of docker:
  --api-enable-cors=false                Enable CORS headers in the remote API                      # 远程 API 中开启 CORS 头
  -b, --bridge=""                        Attach containers to a pre-existing network bridge         # 桥接网络
                                           use 'none' to disable container networking
  --bip=""                               Use this CIDR notation address for the network bridge's IP, not compatible with -b
                                         # 和 -b 选项不兼容，具体没有测试过
  -d, --daemon=false                     Enable daemon mode                                         # daemon 模式
  -D, --debug=false                      Enable debug mode                                          # debug 模式
  --dns=[]                               Force docker to use specific DNS servers                   # 强制 docker 使用指定 dns 服务器
  --dns-search=[]                        Force Docker to use specific DNS search domains            # 强制 docker 使用指定 dns 搜索域
  -e, --exec-driver="native"             Force the docker runtime to use a specific exec driver     # 强制 docker 运行时使用指定执行驱动器
  --fixed-cidr=""                        IPv4 subnet for fixed IPs (ex: 10.20.0.0/16)
                                           this subnet must be nested in the bridge subnet (which is defined by -b or --bip)
  -G, --group="docker"                   Group to assign the unix socket specified by -H when running in daemon mode
                                           use '' (the empty string) to disable setting of a group
  -g, --graph="/var/lib/docker"          Path to use as the root of the docker runtime              # 容器运行的根目录路径
  -H, --host=[]                          The socket(s) to bind to in daemon mode                    # daemon 模式下 docker 指定绑定方式[tcp or 本地 socket]
                                           specified using one or more tcp://host:port, unix:///path/to/socket, fd://* or fd://socketfd.
  --icc=true                             Enable inter-container communication                       # 跨容器通信
  --insecure-registry=[]                 Enable insecure communication with specified registries (no certificate verification for HTTPS and enable HTTP fallback) (e.g., localhost:5000 or 10.20.0.0/16)
  --ip="0.0.0.0"                         Default IP address to use when binding container ports     # 指定监听地址，默认所有 ip
  --ip-forward=true                      Enable net.ipv4.ip_forward                                 # 开启转发
  --ip-masq=true                         Enable IP masquerading for bridge's IP range
  --iptables=true                        Enable Docker's addition of iptables rules                 # 添加对应 iptables 规则
  --mtu=0                                Set the containers network MTU                             # 设置网络 mtu
                                           if no value is provided: default to the default route MTU or 1500 if no default route is available
  -p, --pidfile="/var/run/docker.pid"    Path to use for daemon PID file                            # 指定 pid 文件位置
  --registry-mirror=[]                   Specify a preferred Docker registry mirror                  
  -s, --storage-driver=""                Force the docker runtime to use a specific storage driver  # 强制 docker 运行时使用指定存储驱动
  --selinux-enabled=false                Enable selinux support                                     # 开启 selinux 支持
  --storage-opt=[]                       Set storage driver options                                 # 设置存储驱动选项
  --tls=false                            Use TLS; implied by tls-verify flags                       # 开启 tls
  --tlscacert="/root/.docker/ca.pem"     Trust only remotes providing a certificate signed by the CA given here
  --tlscert="/root/.docker/cert.pem"     Path to TLS certificate file                               # tls 证书文件位置
  --tlskey="/root/.docker/key.pem"       Path to TLS key file                                       # tls key 文件位置
  --tlsverify=false                      Use TLS and verify the remote (daemon: verify client, client: verify daemon) # 使用 tls 并确认远程控制主机
  -v, --version=false                    Print version information and quit                         # 输出 docker 版本信息
```

