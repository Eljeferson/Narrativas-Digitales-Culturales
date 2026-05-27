# Stage 1: Build the Angular app
FROM node:22-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
# Copy the built files from the build-stage
# Note: Newer Angular versions build into dist/[project-name]/browser
COPY --from=build-stage /app/dist/culturastory-pmv/browser /usr/share/nginx/html
# Copy default nginx configuration if needed (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
