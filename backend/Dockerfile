FROM node:latest

WORKDIR /app

RUN npm install -g typescript

COPY package.json /app/

RUN npm install

COPY . /app/

RUN tsc

EXPOSE 8000

CMD ["node", "dist/app.js"]