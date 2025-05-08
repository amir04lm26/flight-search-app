up: ## Start all services
	@echo "Starting Docker images..."
	docker-compose up -d
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
	docker exec -it $$(docker ps -qf "name=postgres") psql -h localhost -p 5435 -U $$(echo $$POSTGRES_USER) -d $$(echo $$POSTGRES_DB)

## Testing

test: ## Run tests (you should customize this per your test runner)
	docker exec -it $$(docker ps -qf "name=next-service") npm test