FROM node:22.3.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3800
CMD ["node","server.js"]
