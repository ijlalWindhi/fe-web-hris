FROM node:20-alpine

RUN apk add --no-cache tzdata
ENV tz=Asia/Jakarta
RUN ln -fs /usr/share/zoneinfo/Asia/Jakarta /etc/localtime

WORKDIR /app
COPY  . .

RUN npm config set legacy-peer-deps true
RUN npm install --force
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start" ]