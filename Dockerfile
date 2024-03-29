FROM node:12.22.7-alpine3.14
RUN apk add tzdata
ENV TZ="America/Lima"
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
COPY .babelrc /app
COPY .env /app
COPY src/ /app/src
RUN npm install
COPY . .
CMD [ "npm","run","dev" ]
