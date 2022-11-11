import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export type user = {
  firstname: string;
  lastname: string;
  password: string;
};

export class User {
  async create(u: user): Promise<user> {
    const pepper = process.env.BCRYPT_PASSWORD;

    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (firstname,lastname,password_digest) VALUES($1, $2,$3) RETURNING *';

      const hash = bcrypt.hashSync(
        u.password + pepper,
        process.env.saltRounds ? parseInt(process.env.saltRounds) : 10
      );

      const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(
        `unable create user (${u.firstname} ${u.lastname}): ${err}`
      );
    }
  }

  async authenticate(
    firstname: string,
    lastname: string,
    password: string
  ): Promise<User | null> {
    const pepper = process.env.BCRYPT_PASSWORD;
    const conn = await client.connect();
    const sql =
      'SELECT password_digest FROM users WHERE firstname=($1) and lastname=($2)';

    const result = await conn.query(sql, [firstname, lastname]);
    console.log(result.rows.length);
    console.log(password + pepper);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      console.log(bcrypt.compareSync(password + pepper, user.password_digest));

      if (bcrypt.compareSync(password + pepper, user.password_digest))
        return user;
    }

    return null;
  }
}
