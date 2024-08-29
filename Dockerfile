FROM node:18

WORKDIR /usr/src

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]
