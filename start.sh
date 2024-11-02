   
export JWT_SECRET=$(openssl rand -base64 32)

docker compose build --no-cache
docker compose up -d
