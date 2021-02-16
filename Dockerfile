FROM node:15.6.0-alpine3.11 

WORKDIR /workspace/vote-web

COPY . .

RUN npm install -g

ENTRYPOINT ["npm", "start"]
