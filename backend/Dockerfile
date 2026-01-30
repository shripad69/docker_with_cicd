FROM node:18

WORKDIR /app

# Add this line to see what actually got copied
COPY package*.json ./
RUN ls -la

RUN npm i 

COPY . .
EXPOSE 8080
CMD ["node", "index.js"]