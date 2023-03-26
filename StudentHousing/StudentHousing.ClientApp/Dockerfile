
FROM node AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY nginx.conf /etc/nginx/conf.d/default.conf 
COPY --from=builder /app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]