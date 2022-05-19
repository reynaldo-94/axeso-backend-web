FROM node:12.22.7-alpine3.14
RUN apk add tzdata
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
COPY .babelrc /app
COPY .env /app
COPY src/ /app/src
RUN npm install
COPY . .
COPY /usr/share/zoneinfo/America/Lima /etc/localtime
CMD [ "npm","run","dev" ]