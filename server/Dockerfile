FROM node:20-alpine AS base

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY /package*.json ./

# Copy the rest of the application code
COPY / ./

# Install dependencies using pnpm
RUN pnpm install
RUN npx prisma generate

# Build the application with pnpm
RUN pnpm build

# Expose the port the app runs on
EXPOSE 8080

# Start command with migrations using pnpm
CMD ["sh", "-c", "pnpm start"]