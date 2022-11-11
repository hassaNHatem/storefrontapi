import { connect } from 'http2';
import client from '../database';

export type product = {
  id: Number;
  name: string;
  price: number;
};

export class productStore {
  async index(): Promise<product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM product';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get products ${err}`);
    }
  }

  async create(product: product): Promise<product> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO product (product_name , price) VALUES($1 , $2) RETURNING *';
      const result = await conn.query(sql, [product.name, product.price]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot create new product ${product.name}`);
    }
  }
}
