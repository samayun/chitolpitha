FROM node:lts-alpine

RUN npm install -g @nestjs/cli

RUN mkdir -p /app
WORKDIR /app

RUN chmod 777 .

COPY package*.json ./

RUN npm install

COPY . /app/

CMD ["npm", "run", "dev"]
