CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    status VARCHAR(100) ,
    user_id bigint references users(id) ON DELETE CASCADE
);