FROM node:15.6.0-alpine3.11 

WORKDIR /workspace/vote-web

COPY . .

RUN npm run build

RUN npm install -g serve

ENTRYPOINT ["serve", "-s", "build"]
