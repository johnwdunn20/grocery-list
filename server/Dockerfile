# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the rest of the application code to the working directory
COPY . .

# Install dependencies
RUN npm install

# build app?

# Expose the port that the server will listen on
EXPOSE 3000

# Start the server
CMD ["npm", "start"]

# Define entry point?