# E-commerce Back-End Application

This is a back-end application for an e-commerce website built using the latest technologies. The application provides an Express.js API that allows users to interact with the e-commerce database.

## Functionality

The application provides the following functionality:

1. Database Connection: The application connects to a MySQL database using Sequelize. The database connection details are stored in environment variables for security.

2. Database Initialization: The application creates a development database and seeds it with test data using schema and seed commands.

3. Server Start: The application starts a server and listens on a specified port.

4. API Routes: The application provides API routes for categories, products, and tags. The routes support CRUD operations (Create, Read, Update, Delete) for managing data in the database.

5. Data Retrieval: The application retrieves data from the database and returns it in a formatted JSON response. The API routes support GET requests to retrieve categories, products, and tags.

6. Data Manipulation: The application allows data manipulation through POST, PUT, and DELETE requests. Users can create, update, and delete categories, products, and tags in the database.

## Setup and Usage

To run the application locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install dependencies: `npm install`
4. Set up the database connection:
   - Create a `.env` file in the root directory.
   - Add the following environment variables to the `.env` file:
     - `DB_NAME`: The name of your MySQL database.
     - `DB_USER`: The username for your MySQL database.
     - `DB_PASSWORD`: The password for your MySQL database.
5. Create the database:
   - Open a MySQL client.
   - Run the contents of the `db/schema.sql` file to create the database.
6. Seed the database:
   - Run the seed command: `npm run seed`
7. Start the server:
   - Run the start command: `npm start`
8. Use an API testing tool like Insomnia Core to test the API routes.
   - Make requests to the following routes:
     - `/api/categories` for category-related operations.
     - `/api/products` for product-related operations.
     - `/api/tags` for tag-related operations.