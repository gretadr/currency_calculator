# Use Node.js 22 as base image
FROM node:22-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the server
CMD ["npm", "start"]