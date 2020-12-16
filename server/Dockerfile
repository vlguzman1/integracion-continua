FROM node:15.4.0-alpine3.10

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN npm install

RUN npm install -g nodemon -g --quiet


COPY . .

EXPOSE 8080


CMD nodemon server.js