# Use Node.js LTS for frontend
FROM node:18

WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy frontend code
COPY . .

# Build React app
RUN npm run build

# Install serve to host static files
RUN npm install -g serve

# Expose frontend port
EXPOSE 5173

# Start the frontend
CMD ["serve", "-s", "build"]
