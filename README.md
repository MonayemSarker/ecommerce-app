# E-Commerce Backend

## Project Overview
An e-commerce backend built with NestJS, Prisma, PostgreSQL, and Redis.

## Prerequisites
- Docker
- Docker Compose
- Node.js (v18+)

> **Note:**
> - You need to have a **PostgreSQL server** running locally at **`localhost:5433`** while setting up the project with docker.
> - The project includes **Swagger API documentation** for testing and exploring APIs.
>   Swagger setup code is commented out by default. You can **uncomment it to use Swagger locally** during development.



## Project Setup

### Local Development Setup (with Docker)

1. Clone the repository
    ```bash
    git clone https://github.com/MonayemSarker/ecommerce-app.git
    cd ecommerce-app
    ```

2. Create a `.env` file
    ```bash
    touch .env
    cp .env.example .env
    ```

3. Build and start the project
    ```bash
    # Build and start the project
    docker-compose up --build

    # Or start in detached mode
    docker-compose up -d --build
    ```

---

### Manual Project Setup (without Docker)

1. Clone the repository
    ```bash
    git clone https://github.com/MonayemSarker/ecommerce-app.git
    cd ecommerce-app
    ```

2. Create a `.env` file
    ```bash
    touch .env
    cp .env.example .env
    ```

3. **Comment out all Swagger setup code** in `main.ts` and all other files

4. Install dependencies
    ```bash
    pnpm install
    ```

5. Generate Prisma Client
    ```bash
    npx prisma generate
    ```

6. Push schema to database
    ```bash
    npx prisma db push
    ```

7. Seed the database
    ```bash
    pnpm run prisma:seed
    ```

8. Start the development server
    ```bash
    pnpm run start:dev
    ```

---

## API Routes

### Authentication Routes

| Method | Route           | Description  |
|--------|------------------|--------------|
| GET    | `/users`  | All Users    |
| POST   | `/users/login`| User Login   |
| POST   | `/users/validate-session` | Validate Session |

### Report Routes

| Method | Route                        | Description            |
|--------|------------------------------|------------------------|
| GET    | `/reports/monthly-sales`| Monthly Sales Report   |
| GET    | `/reports/user-orders`  | User Order Report      |
| GET    | `/reports/product-sales`| Product Sales Report   |

---
