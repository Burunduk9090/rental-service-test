# Base image
FROM python:3.13-slim AS base

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_DISABLE_PIP_VERSION_CHECK=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Development stage
FROM base AS dev

# Install dependencies
COPY requirements/ requirements/
RUN pip install --no-cache-dir -r requirements/dev.txt

# Copy project
COPY . .

# Entrypoint
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]

# Command
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# Production stage
# TODO: Add production stage
