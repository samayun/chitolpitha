FROM node:lts-alpine

RUN npm install -g pnpm

RUN mkdir -p /app
WORKDIR /app

RUN chmod 777 .

COPY package*.json ./

RUN pnpm install

COPY . /app/

RUN pnpm build
RUN pnpm prune --prod

CMD ["npm", "run", "dev"]
