# Establecer la etapa de construcción
FROM node:18 AS build

WORKDIR /usr/local/app
COPY ./ /usr/local/app
RUN npm install
RUN npm run build


# Stage 2:

# Use official nginx image as the base image
FROM nginx:alpine
# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/frontend-cloud-arch /usr/share/nginx/html
COPY --from=build /usr/local/app/nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 42001
