import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export type order = {
  quantity: number;
  order_id: number;
  product_id: number;
};

export class Order {
  async getOrder(userId: number): Promise<Order> {
    try {
      const sql = 'SELECT * from orders where user_id=($1) and status=($2)';
      const conn = await client.connect();
      console.log(userId);
      const result = await conn.query(sql, [userId, 'active']);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not get order`);
    }
  }
  async addOrder(userId: number): Promise<Order> {
    try {
      const sql = 'INSERT INTO orders (user_id , status) VALUES($1 , $2)';
      const conn = await client.connect();
      const result = await conn.query(sql, [userId, 'active']);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add order`);
    }
  }
  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    try {
      console.log(orderId);
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      //@ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
