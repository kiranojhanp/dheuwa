#!make
include .env
export $(shell sed 's/=.*//' .env)

clean: stop
	@printf "\033[0;32m>>> Cleaning up database data\033[0m\n"
	docker volume rm ${WORKSPACE}_mariadb-data

export:
	@printf "\033[0;32m>>> Dumping MariaDB database\033[0m\n"
	docker exec -it ${WORKSPACE}-mariadb mysqldump \
		-u${WORKSPACE} \
		-p${WORKSPACE} \
		--no-data \
		${WORKSPACE} > mariadb/fixtures/${WORKSPACE}.sql
	docker exec -it ${WORKSPACE}-mariadb mysqldump \
		-u${WORKSPACE} -p${WORKSPACE} --no-create-info \
		# --ignore-table ...
		-c ${WORKSPACE} | awk '{gsub(/\),/, "&\n")}1' | awk '{gsub(/ VALUES /, " VALUES\n")}1' \
		>> mariadb/fixtures/${WORKSPACE}.sql
	gzip -k fixtures/${WORKSPACE}.sql
	rm fixtures/mariadb/${WORKSPACE}.sql

start:
	@printf "\033[0;32m>>> Starting local services\033[0m\n"
	docker compose -p ${WORKSPACE} up -d

stop:
	@printf "\033[0;32m>>> Stopping local services\033[0m\n"
	docker compose -p ${WORKSPACE} down \
		--remove-orphans \
		--rmi local
