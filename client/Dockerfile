# Stage 1: Build the React app
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies first (layer caching)
COPY package*.json ./
RUN npm ci --silent

COPY . .

# REACT_APP_API_URL is a relative path so the browser hits the same nginx origin,
# which then proxies /api/ to the backend container.
ARG REACT_APP_API_URL=/api/v1
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

# Stage 2: Serve the built assets with nginx
FROM nginx:1.27-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
