ARG TAG=10.9
FROM mariadb:$TAG

COPY ./conf.d/ /etc/mysql/conf.d/
COPY ./fixtures/ /docker-entrypoint-initdb.d/
