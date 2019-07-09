FROM node:8
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
EXPOSE 5000
RUN yarn build
RUN yarn global add serve
CMD [ "serve", "-s", "build" ]
