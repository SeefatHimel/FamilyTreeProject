# Use an official Node.js runtime as the base image
FROM node:14.17.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the application will be running on
EXPOSE 3006

# Start the application
CMD ["npm", "dev"]
