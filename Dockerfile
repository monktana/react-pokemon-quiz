FROM node:latest as build

WORKDIR /app
COPY . /app

ARG VITE_POKE_API_URL
ENV VITE_POKE_API_URL=$VITE_POKE_API_URL

RUN npm install
RUN npm run build

FROM ubuntu:latest
RUN apt-get update
RUN apt-get install nginx -y
COPY --from=build /app/dist /var/www/html/
EXPOSE 80
CMD ["nginx","-g","daemon off;"]