set -e
docker build . -t rofleksey/maksakov-frontend:latest
docker push rofleksey/maksakov-frontend:latest
