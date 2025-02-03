# Use Python base image
FROM python:3.9

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the Flask app
COPY . .

# Expose Flask port
EXPOSE 5001

# Start Flask
CMD ["python", "app.py"]
