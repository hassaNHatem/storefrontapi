# database info

## database name : storefront

## database test name : storefront_test

## user for both : magical

## user password for both : password123

to get the database up and running just run db-migrate up

# api endpoints

## users

- creating user :domain/register(post request) body: {firstname:string , lastname:string , password:string} (require token)
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
