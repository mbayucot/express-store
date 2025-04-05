# Define variables
DOCKER_COMPOSE = docker compose
SERVICE_APP = app
SERVICE_DB = postgres
SERVICE_REDIS = redis

# Build the project
build:
	$(DOCKER_COMPOSE) build

# Start all services
start:
	$(DOCKER_COMPOSE) up

# Stop all services
stop:
	$(DOCKER_COMPOSE) down

# Restart all services
restart:
	$(DOCKER_COMPOSE) down && $(DOCKER_COMPOSE) up

# Run Rails Console
console:
	$(DOCKER_COMPOSE) exec $(SERVICE_APP) rails console

# Run a Bash shell in the app container
shell:
	$(DOCKER_COMPOSE) exec $(SERVICE_APP) bash

# Enter PostgreSQL CLI inside the database container
db-cli:
	$(DOCKER_COMPOSE) exec $(SERVICE_DB) psql -U postgres -d store_development

# Run RSpec tests
test:
	$(DOCKER_COMPOSE) run --rm $(SERVICE_APP) bundle exec rspec
