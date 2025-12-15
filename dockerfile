FROM node:20.10.0-alpine3.18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


FROM nginx:1.25-alpine

# Borramos config por defecto
RUN rm /etc/nginx/conf.d/default.conf

# Config personalizada para SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos el build de Vite
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
