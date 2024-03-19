# Rhombus AI API Challenge

This API application enables users to upload CSV or Excel documents for data processing and visualization, focusing on data type inference and conversion using Python and Pandas.

#### Expected Deliverables

Develop a Django application with a RESTful API.

- Set up a Django project integrating your Python script for data processing.
- Define Django models, views, and URLs to manage the data processing logic and user interactions.
- Implement a backend API that collaborates with the frontend to handle data input and output.

## Deployment

The project can be deployed in two ways:

1. Docker Container
2. Django Server (Development)

## Deployment via Docker

For a quick setup, utilize Docker.

### Requirements

- Docker
- Docker-compose

### Ports

Ensure that the following port is not occupied by any other service:

- :8001 (Development Server)

### Deployment Procedure

```shell
docker-compose up --build -d && docker system prune --all --force --volumes
```

### Admin Access

```shell
https://<host>:<port>/admin
username: admin
password: admin
```

### Requirements

- Python 3.8+

### Running the Application

Launch the development server.

```shell
# Install necessary Python libraries
pip install -r requirements.txt
# Copy env.example to .env
cp env.example .env
# Apply migrations
./manage.py migrate
# Start the server
./manage.py runserver
```

### Swagger Documentation
[Swagger](http://localhost:8000/api/playground/)
