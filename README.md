# 安装

```bash
git clone https://github.com/x-dr/short.git
cd short
npm install
cp .env.example .env
# 修改env文件
vi .env
npm start
```


# docker
```bash
docker run  -itd -e DB_URL="mysql://user:password@host:port/databases"  -e PORT=3001  -p 3001:3001/tcp  gindex/short:latest

```
# 环境变量

+ `DB_URL` 数据库URL `"mysql://user:password@host:port/databases"`

+ `PORT` 端口`（默认 3001）`