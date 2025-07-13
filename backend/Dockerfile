# backend/Dockerfile
FROM node:22

WORKDIR /app

COPY package*.json ./

# Reinstall bcrypt cleanly inside the container
RUN npm install bcrypt && npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]