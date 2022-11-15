# database info

## database name : storefront

## database test name : storefront_test

## user for both : magical

## user password for both : password123

## port number : 5432

    to get the database up and running just run db-migrate up

## enviroument varibales

- POSTGRES_HOST=127.0.0.1
- POSTGRES_DB=storefront
- POSTGRES_TEST_DB = storefront_test
- POSTGRES_USER=magical
- POSTGRES_PASSWORD=password123
- ENV=dev
- BCRYPT_PASSWORD=speak-friend-and-enter
- SALT_ROUNDS=10
- TOKEN_SECRET=alohomora123

### db setup

in sql run :
create database storefront;
create database storefront_test;
create user magical with password 'password123';
grant all privileges on database storefront to magical;
grant all privileges on database storefront_test to magical;

### packages setup

    npm i

### database schema

- users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(100),
  lastname VARCHAR(100),
  password_digest VARCHAR(100)
  );
- product (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(100),
  price VARCHAR(100)
  );
- orders (
  id SERIAL PRIMARY KEY,
  user_id bigint REFERENCES users(id),
  status VARCHAR(100)
  );
- order_products (
  id SERIAL PRIMARY KEY,
  quantity integer,
  order_id bigint REFERENCES orders(id),
  product_id bigint REFERENCES product(id)
  );

### api endpoints

## users

- creating user :domain/register(post request) body: {firstname:string , lastname:string , password:string}
- login : domain/login(post request) body: {firstname:string , lastname:string , password:string}
- index : domain/users(get request) (require token)
- getuser : domain/users/get/{userid}(get request) (require token)

## products

- index : domain/products(get request)
- add : domian/products/add(post request) body:{name:string , price:string} (require token)
- get product : domain/products/get/{productid}(post request)

## orders

- add order : domain/orders(post request) body:{userId:string} (require token)
- get order : /orders(get request) body:{userId:string} (require token)
- add product to oder :domain/orders/:id/products body:{quantity:number , product_id:string} (require token)

### testing

    to start testing run : npm run build then npm run test
