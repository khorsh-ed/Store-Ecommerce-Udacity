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
#### Product
-  id
- name
- price


#### User
- id
-email
- firstName
- lastName
- password

#### Orders
- id
- status of order (active or complete)
- user_id