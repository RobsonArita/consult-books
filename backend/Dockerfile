FROM node:20-alpine

WORKDIR /server

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

EXPOSE 3000

CMD ["node", "build/src/server.js"]
