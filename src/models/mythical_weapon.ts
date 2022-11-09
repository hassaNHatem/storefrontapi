import client from '../database';

export type weapon = {
  id: Number;
  name: string;
  type: string;
  weight: number;
};

export class MythicalWeaponStore {
  async index(): Promise<weapon[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM mythical_weapons';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get weapons ${err}`);
    }
  }
}
