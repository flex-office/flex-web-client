FROM node:8
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
EXPOSE 5000
RUN yarn build
CMD [ "yarn", "run", "serve" ]
