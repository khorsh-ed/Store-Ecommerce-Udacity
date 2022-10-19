## Create Data base
CREATE DATABASE STORE_DEV
CREATE DATABASE STORE_TEST

## Database NAME
store_env
store_test

## Database Installation

  # connect to default postgres sql user
  - psql -U postgres

  # in psql run the following command
  - CREATE DATABASE STORE_DEV
  - CREATE DATABASE STORE_TEST

  # connect to the database
  - \c store_test

  # in psql run command for creating user table

    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL
    );


  # in psql run command for creating products table

    CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price integer NOT NULL
    );

  # in psql run command for creating orders table

    CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    status VARCHAR(100) ,
    user_id bigint references users(id) ON DELETE CASCADE
     );

   # in psql run command for creating orders product tables
    CREATE TABLE IF NOT EXISTS order_products(
    id SERIAL PRIMARY KEY,
    quantity integer NOT NULL,
    order_id bigint references orders(id) ON DELETE CASCADE,
    product_id bigint references products(id) ON DELETE CASCADE
     );


## Backend Port
3000

## Database Port
5432 

### package installation
bycrypt -> npm install bcrypt
jsonwebtoken ->  npm install jsonwebtoken

## Env Variable
POSTGRES_HOST 
POSTGRES_DB
POSTGRES_TEST_DB 
POSTGRES_USER 
POSTGRES_PASSWORD 
ENV 
BCRYPT_PASSWORD
SALT_ROUNDS
TOKEN_SECRET