FROM node:10
WORKDIR /node-redis
COPY package-lock.json .
COPY package.json .
RUN npm install
COPY . .
RUN npm rebuild bcrypt --build-from-source
RUN npm run-script build
COPY sql/schema.sql ./pgdata/
# COPY wait-for-it.sh .
CMD node dis/index.js