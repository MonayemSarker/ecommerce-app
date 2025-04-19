# E-Commerce Backend

## Project Overview
An e-commerce backend built with NestJS, Prisma, PostgreSQL, and Redis.

## Prerequisites
- Docker
- Docker Compose
- Node.js (v18+)

---

## Project Setup

### Local Development Setup (with Docker)

1. Clone the repository
    ```bash
    git clone https://github.com/MonayemSarker/ecommerce-app.git
    cd ecommerce-app
    ```

2. Create a `.env` file
    ```bash
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

## Guidelines
> After running the project using Docker, follow the steps below to interact with the API and test authentication-based features.
---

### Access the Swagger API Docs

Once the server is up, open your browser and go to: **`http://localhost:3000/api-docs`**. This will open the Swagger UI where you can explore all available API routes.


### Get All Users

1. In the Swagger UI, locate the endpoint: **`/user/all`**
2. Click on the "Try it out" button.
3. Click on the "Execute" button.
4. The response will contain a list of all users. Pick one user from the list to continue authorization.


### Login to Get Access Token

1. Find and open the endpoint: **`/user/login`**
2. Click on the "Try it out" button.
3. Enter the email and password(12345) of the user you picked in the previous step.
4. Click on the "Execute" button.
5. The response will contain an access token and session id. Copy the token and use it to authenticate at the top right of the Swagger UI "Authorize" button.

### Generate Reports

With authentication enabled, you can now use any **report generation APIs** available in the Swagger UI.

### Validate Session

1. Copy the `sessionId` returned from the login response.
2. Find the endpoint: **`/user/validate-session`**
3. Click on the "Try it out" button.
4. Enter the `sessionId` in the `sessionId` field.
5. Click on the "Execute" button.
6. The response will contain a message indicating whether the session is valid or not.

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
