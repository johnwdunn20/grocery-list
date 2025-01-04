# Stage 1: Building the server
FROM node:20 AS build
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Setting up the final image
FROM node:20
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
# Note: Environment variables need to be set when running the container

# Expose the port the app runs in
EXPOSE 443

# Set up your start command
CMD ["node", "./dist/server.js"]