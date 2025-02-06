# Use Python base image
FROM python:3.9

# Set working directory
WORKDIR /app

# Ensure system packages are installed (needed for some Python dependencies)
RUN apt-get update && apt-get install -y \
    build-essential \
    libjpeg-dev \
    zlib1g-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the Flask app
COPY . .

# Expose Flask port
EXPOSE 5001

# Start Flask
CMD ["python", "app.py"]
