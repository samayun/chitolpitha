FROM node:lts-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
RUN npm install

COPY . /app/

EXPOSE 2023
CMD ["npm", "run", "dev"]
