# Stage 1: Building the client
FROM node:20 AS client-build
WORKDIR /app
COPY ./client/package*.json ./
RUN npm install
COPY ./client/ .
RUN npm run build

# Stage 2: Building the server
FROM node:20 AS server-build
WORKDIR /app
COPY ./server/package*.json ./
RUN npm install
COPY ./server/ .
RUN npm run build

# Stage 3: Setting up the final image
FROM node:20
WORKDIR /app
COPY --from=client-build /app/dist ./client/dist
COPY --from=server-build /app/dist ./server/dist
COPY --from=server-build /app/node_modules ./server/node_modules
# not sure why I need to copy only server node modules
# right now it's not copying environment variables - need to set them up when I run the container

# Expose the port the app runs in
EXPOSE 3000

# Set up your start command
CMD ["node", "./server/dist/server.js"]
