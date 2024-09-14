FROM node:14.15.4-alpine3.12

WORKDIR /server
COPY package.json .
RUN npm install
COPY . .
# expose the port from .env file
EXPOSE 5000
CMD ["npm", "start"]