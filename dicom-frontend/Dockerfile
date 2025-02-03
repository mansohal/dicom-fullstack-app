# Use Node.js LTS for frontend
FROM node:18

WORKDIR /app

# Copy package.json first to install dependencies (Docker caching optimization)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire frontend code
COPY . .

# Build React app
RUN npm run build

# Install serve to host static files
RUN npm install -g serve

# Expose frontend port
EXPOSE 5173

# Start the frontend
CMD ["serve", "-s", "build"]
