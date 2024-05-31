# Trendy Store API

A back-end application is built using Node.js, Express.js, Mongoose, and TypeScript. This application is designed to handle various CRUD operations related to products, users, orders, and categories. It utilizes MongoDB as its database.

Front-end Repository: [The Trendy Store](https://github.com/Kudoo39/the-trendy-store)

## Table of Contents

1. [Getting Started](#getting-started)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Project Structure](#project-structure)
5. [Error Handling](#error-handling)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [CI/CD Workflow](#ci-cd-workflow)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v20.0.0 or later recommended)
- npm (Node Package Manager) or yarn


### Installation

To get started with the project, follow these steps:

1. Clone the repository: `git clone https://github.com/Kudoo39/trendy-store-api`
2. Navigate to the project directory: `cd trendy-store-api`
3. Install dependencies: `npm install` or `yarn install`
4. Run the project: `npm run start` or `yarn start`
5. Run the application in developer mode: `npm run dev` or `yarn dev`

### Building and Running with Docker

To pull the Docker image and run the container, follow these steps:

1. Clone the repository: `git clone https://github.com/Kudoo39/trendy-store-api`
2. Navigate to the project directory: `cd trendy-store-api`
3. Pull the Docker image: `docker pull kudoo39/trending-api`
4. Run the Docker container: `docker run -p 8080:8080 kudoo39/trending-api`

## Features

The following endpoints are available in the application:

### Products

- GET /api/v1/products: Get all products.
- GET /api/v1/products/category/:categoryId: Get products by category.
- POST /api/v1/products: Create a new product. **(Authentication: Required, Authorization: Admin)**
- GET /api/v1/products/:productId: Get a product by ID. 
- PUT /api/v1/products/:productId: Update a product. **(Authentication: Required, Authorization: Admin)**
- DELETE /api/v1/products/:productId: Delete a product. **(Authentication: Required, Authorization: Admin)**

### Users

- GET /api/v1/users: Get all users.
- POST /api/v1/users: Register a new user.
- POST /api/v1/users/login: Login a user.
- PUT /api/v1/users/:userId: Update a user. **(Authentication: Required)**
- PATCH /api/v1/users/password: Update user password. **(Authentication: Required)**
- DELETE /api/v1/users/:userId: Delete a user. **(Authentication: Required, Authorization: Admin)**
- GET /api/v1/users/profile: Authenticate a user. **(Authentication: Required)**
- POST /api/v1/users/:userId/ban: Ban a user. **(Authentication: Required, Authorization: Admin)**
- POST /api/v1/users/:userId/unban: Unban a user. **(Authentication: Required, Authorization: Admin)**
- POST /api/v1/users/password: Request a one-time password for a user.

### Orders

- GET /api/v1/orders: Get all orders. **(Authentication: Required, Authorization: Admin)**
- POST /api/v1/orders/:userId: Create a new order for a user. **(Authentication: Required)**
- GET /api/v1/orders/:userId: Get orders for a user. **(Authentication: Required)**
- PUT /api/v1/orders/:orderId: Update an order. **(Authentication: Required)**
- DELETE /api/v1/orders/:orderId: Delete an order. **(Authentication: Required)**

### Categories

- GET /api/v1/categories: Get all categories.
- POST /api/v1/categories: Create a new category.
- GET /api/v1/categories/:categoryId: Get a category by ID. **(Authentication: Required, Authorization: Admin)**
- PUT /api/v1/categories/:categoryId: Update a category. **(Authentication: Required, Authorization: Admin)**
- DELETE /api/v1/categories/:categoryId: Delete a category. **(Authentication: Required, Authorization: Admin)**

## Error Handling

Errors are handled centrally using custom error classes defined in the `errors/ApiErrors.ts` file. These errors are then caught and processed in the middleware `middlewares/apiErrorHandler.ts`.

### Custom Error Classes

- NotFoundError: Thrown when the requested resource is not found.
- ForbiddenError: Thrown when the user does not have permission to access a resource.
- UnauthorizedError: Thrown when the user is not authenticated to access a resource.
- InternalServerError: Thrown when an unexpected error occurs on the server.
- BadRequest: Thrown when the request is malformed or invalid.
- ConflictError: Thrown when there is a conflict with the current state of the server.

## Technologies Used

- Node.js / Express.js
- TypeScript
- Mongoose
- Joi
- nodemon
- bcrypt
- JWT (JSON Web Tokens)
- validator
- jest
- AWS EC2
- Nginx
- Certbot

## Project Structure

```
src
 ┣ assets
 ┃ ┗ erd.png
 ┣ controllers
 ┃ ┣ categories.ts
 ┃ ┣ orders.ts
 ┃ ┣ products.ts
 ┃ ┗ users.ts
 ┣ errors
 ┃ ┗ ApiError.ts
 ┣ middlewares
 ┃ ┣ adminCheck.ts
 ┃ ┣ apiErrorHandler.ts
 ┃ ┗ verifyJWT.ts
 ┣ misc
 ┃ ┗ type.ts
 ┣ model
 ┃ ┣ Category.ts
 ┃ ┣ Order.ts
 ┃ ┣ OrderProduct.ts
 ┃ ┣ Product.ts
 ┃ ┗ User.ts
 ┣ routers
 ┃ ┣ categoriesRouter.ts
 ┃ ┣ ordersRouter.ts
 ┃ ┣ productsRouter.ts
 ┃ ┗ usersRouter.ts
 ┣ services
 ┃ ┣ categories.ts
 ┃ ┣ orders.ts
 ┃ ┣ products.ts
 ┃ ┗ users.ts
 ┣ utils
 ┃ ┣ generateToken.ts
 ┃ ┗ hashPassword.ts
 ┣ validations
 ┃ ┣ categoryValidation.ts
 ┃ ┣ productValidation.ts
 ┃ ┗ userValidation.ts
 ┣ app.ts
 ┗ server.ts
 ```

 ## Entity Relationship Diagram

 ![erd](./src/assets/erd.png)

 ## Testing

1. Ensure all dependencies are installed: `npm install` or `yarn install`
2. Run the test suite: `npm run test` or `yarn test`

 ## Deployment

 - The project is deployed using Render: https://trending-api-rggn.onrender.com
 - AWS Cloud: [AWS Cloud URL, ](http://ec2-51-20-223-48.eu-north-1.compute.amazonaws.com:8080)[Alternative AWS Cloud URL, ](http://51.20.223.48:8080/)[Custom Domain URL (HTTPS)](trendingapi.chickenkiller.com)
 - Docker Hub: [kudoo39/trending-api](https://hub.docker.com/r/kudoo39/trending-api)

 ## CI/CD Workflow

 - This GitHub Actions workflow is located in the `.github/workflows/backend-workflow.yaml`. It automates the build and test processes of the back-end application as well as ensures the code quality.
