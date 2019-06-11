FROM node
WORKDIR /app
COPY ./ .
RUN yarn
CMD yarn start
EXPOSE 3000