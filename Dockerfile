FROM node:14-alpine
RUN apk update
RUN apk add ffmpeg
RUN npm install -g npm@latest

WORKDIR /usr/app/

COPY package*.json /usr/app/

RUN npm install

COPY . /usr/app/

RUN npm run build

ENV PORT 8070

EXPOSE $PORT

CMD [ "npm", "start" ]