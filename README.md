# Academic Support Frontend

Vue 3 frontend for Academic Support System.

## Prerequisites

- Docker
- Docker Compose (optional)

## Running with Docker

### Build and run using Docker commands

1. Build the Docker image:
   ```sh
   docker build -t academic-support-frontend .
   ```

2. Run the container:
   ```sh
   docker run -d -p 80:80 --name academic-support-frontend academic-support-frontend
   ```

### Using Docker Compose

We provide a `docker-compose.yml` file for convenience.

1. Start the container:
   ```sh
   docker-compose up -d
   ```

The application will be available at `http://localhost:80` (or the IP of your VPS).

## Configuration

The frontend requires the backend API URL to be set. This is done via the environment variable `VITE_API_BASE_URL`.

In development, we use a proxy (configured in `vite.config.js`) to avoid CORS issues. In production (Docker), the nginx server proxies requests to the backend.

For Docker, you can set the environment variable by:

- Editing the `Dockerfile` (not recommended) or
- Using an environment file (e.g., `.env.production`) and including it in the Docker build context, or
- Setting it at runtime: `docker run -e VITE_API_BASE_URL=http://your-backend-ip:port ...`

If using docker-compose, you can set the environment variable in the `docker-compose.yml` file.

Example for docker-compose:
```yaml
services:
  academic-support-frontend:
    image: academic-support-frontend
    environment:
      - VITE_API_BASE_URL=http://194.135.20.4:8080
    ports:
      - "80:80"
```

## Development

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

### Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
