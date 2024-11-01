   
export JWT_SECRET=$(openssl rand -base64 32)

docker compose build
docker compose up
