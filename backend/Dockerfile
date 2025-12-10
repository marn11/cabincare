FROM node:20-alpine

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY .env.example .env

COPY . .

RUN npm run build

EXPOSE 3001

CMD [ "npm", "run", "start:dev" ]