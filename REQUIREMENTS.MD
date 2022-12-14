# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- getAll (args: id)[token required] -> http://localhost:3000/api/products
- getItem (args: id)[token required] -> http://localhost:3000/api/products/:id
- deleteItem (args: id)[token required] -> http://localhost:3000/api/products/:id
- Create (args: User)[token required] -> http://localhost:3000/api/products

#### Users
- getAll (args: id)[token required] -> http://localhost:3000/api/users
- getItem (args: id)[token required] -> http://localhost:3000/api/users/:id
- deleteItem (args: id)[token required] -> http://localhost:3000/api/users/:id
- authenticate (args: id)[token required] -> http://localhost:3000/api/users/login
- Create (args: User)[token required] -> http://localhost:3000/api/users

#### Orders
products
- getAll (args: id)[token required] -> http://localhost:3000/api/orders
- getItem (args: id)[token required] -> http://localhost:3000/api/orders/:id
- deleteItem (args: id)[token required] -> http://localhost:3000/api/orders/:id
- Create (args: User)[token required] -> http://localhost:3000/api/orders

## Data Shapes

#### User
                                      Table "public.users"
   Column   |          Type          | Collation | Nullable |              Default
------------+------------------------+-----------+----------+-----------------------------------
 id         | integer                |           | not null | nextval('users_id_seq'::regclass)
 email      | character varying(100) |           |          |
 password   | character varying(100) |           | not null |
 first_name | character varying(100) |           | not null |
 last_name  | character varying(100) |           | not null |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_email_key" UNIQUE CONSTRAINT, btree (email)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

#### Products
                                  Table "public.products"
 Column |          Type          | Collation | Nullable |               Default
--------+------------------------+-----------+----------+--------------------------------------
 id     | integer                |           | not null | nextval('products_id_seq'::regclass)
 name   | character varying(100) |           | not null |
 price  | integer                |           | not null |
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

#### Orders
                                     Table "public.orders"
 Column  |          Type          | Collation | Nullable |              Default
---------+------------------------+-----------+----------+------------------------------------
 id      | integer                |           | not null | nextval('orders_id_seq'::regclass)
 status  | character varying(100) |           |          |
 user_id | bigint                 |           |          |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    
#### Order_Products
                              Table "public.order_products"
   Column   |  Type   | Collation | Nullable |                  Default
------------+---------+-----------+----------+--------------------------------------------
 id         | integer |           | not null | nextval('order_products_id_seq'::regclass)
 quantity   | integer |           | not null |
 order_id   | bigint  |           |          |
 product_id | bigint  |           |          |
Indexes:
    "order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE