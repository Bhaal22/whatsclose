FROM node:0.10.41

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ONBUILD COPY ../../src/www/package.json /usr/src/app/
ONBUILD RUN npm install
ONBUILD COPY ../../src/www/ /usr/src/app

CMD [ "npm", "start" ]

EXPOSE 3000
