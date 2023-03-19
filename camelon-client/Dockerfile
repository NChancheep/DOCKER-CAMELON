# Use an official Node.js runtime as a parent image
FROM node:18.15.0

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build


# Expose port 80 for the container
EXPOSE 3000

# Start Nginx in the foreground
CMD ["npm", "start"]
