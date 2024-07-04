FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install dependencies for building native modules
RUN apt-get update && apt-get install -y python3 build-essential

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Run tests
RUN npm test

# Expose port
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 CMD curl --fail http://localhost:3000 || exit 1
