ARG TAG=latest
FROM minio/minio:$TAG

COPY --from=docker.io/minio/mc:latest /usr/bin/mc /usr/bin/mc
COPY ./data/ /tmp/data
RUN mkdir /buckets
RUN minio server /buckets & \
    server_pid=$!; \
    until mc alias set local http://localhost:9000 minioadmin minioadmin; do \
        sleep 1; \
    done; \
    mc mb local/public/assets; \
    mc mirror /tmp/data/public local/public; \
    mc anonymous set download local/public; \
    kill $server_pid
RUN rm -rf /tmp/data
