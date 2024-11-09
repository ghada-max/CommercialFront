FROM node:20.11.0 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 
FROM nginx:stable
COPY --from=build /app/dist/commercial18/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
