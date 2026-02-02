# --- Stage 1: Build Stage ---
FROM node:18-alpine AS build

WORKDIR /app

# Declare the Build Argument (passed from GitHub Actions)
ARG VITE_API_URL

# Set it as an Environment Variable for the build process
# Vite looks for VITE_ prefix variables during 'npm run build'
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm ci

COPY . .

# The build process replaces import.meta.env.VITE_API_URL with the actual value
RUN npm run build

# --- Stage 2: Production Stage ---
FROM nginx:stable-alpine

# Clean default nginx contents
RUN rm -rf /usr/share/nginx/html/*

# Copy your custom nginx config (if you have one)
# If you don't have a custom one, you can comment this out
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the static files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]