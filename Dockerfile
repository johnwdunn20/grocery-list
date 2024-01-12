# Use a standard Node.js runtime as the base image for the builder
FROM node:20 as builder

# Set working directory for the server
WORKDIR /app

# Copy package files for both client and server
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install server dependencies
WORKDIR /app/server
RUN npm install

# Install client dependencies
WORKDIR /app/client
RUN npm install

# Copy and build server
WORKDIR /app/server
COPY server/ .
RUN npm run build

# Copy and build client
WORKDIR /app/client
COPY client/ .
RUN npm run build 

# Final production image
FROM node:20

# Set working directory
WORKDIR /app

# Copy built assets and node_modules from the builder stage
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/node_modules ./server/node_modules
COPY --from=builder /app/client/dist ./client/dist
COPY --from=builder /app/client/node_modules ./client/node_modules

# Expose the port the app runs on
EXPOSE 3000

# Start the server
ENTRYPOINT ["node", "./server/dist/server.js"]
