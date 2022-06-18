FROM node:alpine 


LABEL maintainer="xd9722@gmail.com"
RUN  ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone 

ADD . /app/

WORKDIR /app

RUN npm install

#程序启动脚本
CMD ["npm", "start"]