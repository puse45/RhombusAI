# Use a Node.js image as the base image
FROM node:14-slim

MAINTAINER Pius Musyoki

LABEL authors="pius"

# Create a new directory
RUN mkdir -p /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY package.json /app

# Install dependencies using yarn
RUN npm install

# Get all the code needed to run the ap
COPY . /app


# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application
CMD ["npm", "start","-g", "daemon off;"]
