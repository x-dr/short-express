FROM node:lts-alpine 

#声明作者
LABEL maintainer="xd9722@gmail.com"
RUN  ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone 
#移动当前目录下面的文件到app目录下
ADD . /app/
#进入到app目录下面，类似cd
WORKDIR /app
#安装依赖
RUN npm install
#对外暴露的端口
EXPOSE 8080
#程序启动脚本
CMD ["npm", "start"]