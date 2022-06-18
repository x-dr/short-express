## 一个基于express+mysql网址缩短服务。

### 安装

```bash
git clone https://github.com/x-dr/short.git
cd short
npm install
cp .env.example .env
# 修改env文件
vi .env
npm start
```


### docker
```bash
docker run -itd \
--name short \
-e DB_URL="mysql://user:password@host:port/databases" \
-e PORT=3001  \
-p 3001:3001   \
gindex/short:latest

```
### 环境变量

+ `DB_URL` 数据库URL `"mysql://user:password@host:port/databases"`

+ `PORT` 端口`（默认 3001）`



### 使用 nginx 反代

>  参考[short.conf](https://github.com/x-dr/short/blob/main/short.conf)