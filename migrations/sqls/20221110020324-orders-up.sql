create table orders(
    id SERIAL PRIMARY KEY,
    product_id integer , 
    quantity integer,
    user_id integer,
    status VARCHAR(100)
);