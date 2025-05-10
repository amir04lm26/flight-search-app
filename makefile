# Load environment variables from .env file if it exists
ifneq (,$(wildcard .env))
	include .env
	export
endif

up: ## Start all services
	@echo "Starting Docker images..."
	docker-compose up
	@echo "Docker images started!"

up_build: ## Build all services
	@echo "Stopping docker images (if running...)"
	docker-compose down
	@echo "Building (when required) and starting docker images..."
	docker-compose up --build -d
	@echo "Docker images built and started!"

down: ## Stop and remove all services
	@echo "Stopping docker compose..."
	docker-compose down
	@echo "Done!"

logs: ## Show logs for all services
	@echo "Show services logs..."
	docker-compose logs -f
	@echo "Done!"

ps: ## List running services
	@echo "Listing running services..."
	docker-compose ps
	@echo "Done!"

restart: ## Restart all services
	@echo "Restart all of the services"
	$(MAKE) down
	$(MAKE) up
	@echo "Done!"


## Database
db-shell: ## Open psql shell to the database
	docker exec -e PGPASSWORD=$$POSTGRES_PASSWORD -it flight-search-app-postgres-1 \
	psql -h localhost -U $$POSTGRES_USER -d $$POSTGRES_DB

db-migrate: ## Apply schema changes using Drizzle
	@echo "Migrating database schema with Drizzle(Generate + Migrate)..."
	npx drizzle-kit push
	@echo "Database migration complete!"


## Redis
redis-shell: ## Open a Redis CLI shell to the Redis container
	docker exec -it flight-search-app-redis-1 redis-cli


## Testing
test: ## Run tests (you should customize this per your test runner)
	docker exec -it $$(docker ps -qf "name=next-service") npm test
