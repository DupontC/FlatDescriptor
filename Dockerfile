FROM node:0.10-onbuild
EXPOSE 3000

RUN npm install
RUN npm test
CMD npm start
