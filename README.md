## Create Data base
CREATE DATABASE STORE_DEV
CREATE DATABASE STORE_TEST

## Database NAME
store_env
store_test

## Database Installation

CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price integer NOT NULL
);

CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    status VARCHAR(100) ,
    user_id bigint references users(id) ON DELETE CASCADE
);

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
bycrypt
jsonwebtoken

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