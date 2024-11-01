#!/bin/bash

# Generate a JWT secret
JWT_SECRET=$(openssl rand -base64 32)

# Export the JWT_SECRET as an environment variable
export JWT_SECRET

# Start your application
exec "$@"
