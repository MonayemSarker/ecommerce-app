FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD /bin/sh -c "npx prisma db push && npm run prisma:seed && npm run start:dev"
