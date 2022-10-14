CREATE TABLE IF NOT EXISTS order_products(
    id SERIAL PRIMARY KEY,
    quantity integer NOT NULL,
    order_id bigint references orders(id),
    product_id bigint references products(id)
);