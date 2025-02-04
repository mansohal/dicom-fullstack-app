# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Install netcat-openbsd for MySQL health check
RUN apt-get update && apt-get install -y netcat-openbsd

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy backend code
COPY . .

# Expose backend port
EXPOSE 4000

# Start backend (wait for MySQL first)
CMD ["sh", "-c", "until nc -z dicom-db 3306; do sleep 3; done && node index.js"]
