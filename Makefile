REDIS=chitolpitha-cache

######################
###  DEVELOPMENT   ###
######################

build:
	sudo docker-compose up --build --detach

up:
	sudo docker-compose up -d

down:
	sudo docker-compose down

destroy:
	sudo docker-compose down

stop:
	sudo docker-compose stop

restart:
	sudo docker-compose restart

logs:
	sudo docker-compose logs --follow app

ps:
	sudo docker-compose ps

lint:
	sudo docker-compose exec app npm run lint

shell:
	sudo docker-compose exec app sh


redis-cli:
	docker exec -it ${REDIS} redis-cli

generate:
	sudo docker-compose exec app npm run generate:crud