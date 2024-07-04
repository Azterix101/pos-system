# POS System API

## Overview
The POS System API is a robust point-of-sale system built using Fastify, Sequelize, and TypeScript. It supports various functionalities such as user authentication, product management, upsell product management, and handling sales transactions.

## Features
- **User Authentication**: Sign up, log in, and token-based authentication.
- **Product Management**: Create, read, update, and delete products.
- **Upsell Product Management**: Link and manage upsell products.
- **Sales Transactions**: Handle sales transactions with product and upsell product details.

## Requirements
- Node.js (v20 or higher)
- MySQL

## Setup

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/pos-system.git
   cd pos-system
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   DB_HOST=db
   DB_USER=user
   DB_PASSWORD=user_password
   DB_NAME=pos_system
   JWT_SECRET=your_jwt_secret
   ```

4. **Database setup**:
   Ensure your MySQL server is running and the database specified in `.env` is created. You can use the following Docker setup for MySQL:

   ```yaml
   version: '3.8'

   services:
     db:
       image: mysql:8.0
       environment:
         MYSQL_ROOT_PASSWORD: root_password
         MYSQL_DATABASE: pos_system
         MYSQL_USER: user
         MYSQL_PASSWORD: user_password
       ports:
         - "3306:3306"
       volumes:
         - ./init-db:/docker-entrypoint-initdb.d
       healthcheck:
         test: ["CMD-SHELL", "mysqladmin ping -h localhost"]
         interval: 10s
         timeout: 5s
         retries: 5

     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         DB_HOST: db
         DB_USER: user
         DB_PASSWORD: user_password
         DB_NAME: pos_system
       depends_on:
         db:
           condition: service_healthy
       healthcheck:
         test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
         interval: 30s
         timeout: 10s
         retries: 3
   ```

5. **Run migrations and seed database**:
   ```sh
   npm run seed
   ```

6. **Start the server**:
   ```sh
   npm start
   ```

7. **Run tests**:
   ```sh
   npm test
   ```

## API Documentation
The API documentation is available at [http://localhost:3000/documentation](http://localhost:3000/documentation) after starting the server.

## Postman Collection
A Postman collection is provided for testing the API endpoints. Import the collection using the Postman application:

1. Open Postman.
2. Click on the Import button.
3. Select the provided JSON file (postman_collection.json).
4. Click on Import.

## Linting
To check for linting errors:
```sh
npm run lint
```

To fix linting errors automatically:
```sh
npm run lint:fix
```

## Project Structure
```
src/
├── models/
│   ├── product.ts
│   ├── transaction.ts
│   ├── upsell.ts
│   └── user.ts
├── routes/
│   ├── authRoutes.ts
    ├── index.ts
│   ├── productRoutes.ts
│   ├── transactionRoutes.ts
│   └── upsellRoutes.ts
├── schemas/
    ├── authSchemas.ts
│   ├── productSchemas.ts
│   ├── transactionSchemas.ts
│   ├── upsellSchemas.ts
│   └── index.ts
├── services/
│   ├── authService.ts
    ├── index.ts
│   ├── productService.ts
│   ├── transactionService.ts
│   └── upsellService.ts
├── tests/
│   ├── authService.test.ts
│   ├── productService.test.ts
│   ├── transactionService.test.ts
│   └── upsellService.test.ts
├── utils/
│   └── database.ts
├── index.ts
└── seed.ts
```

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Make sure to update tests as appropriate.

For any further questions or assistance, please feel free to contact me or open an issue in the repository.