FROM node:16

WORKDIR "/app"

COPY package*.json ./
RUN npm install

COPY . .
RUN npx tsc
EXPOSE 6967
CMD ["node", "dist/index.js"]