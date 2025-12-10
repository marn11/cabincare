FROM node:20-alpine

WORKDIR /frontend

COPY package*.json ./

COPY .env.example .env

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]