FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies if package.json exists, otherwise strictly nothing yet
RUN if [ -f package.json ]; then npm install; fi

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
