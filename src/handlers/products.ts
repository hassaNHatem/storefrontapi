import express, { Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { ensureToken } from '..';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { product, productStore } from '../models/product';

const store = new productStore();
dotenv.config();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};
const create = async (_req: any, res: Response) => {
  try {
    jwt.verify(_req.token, process.env.TOKEN_SECRET as string);
    const product = await store.create(_req.body);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (_req: Request, res: Response) => {
  try {
    const product = await store.show(Number(_req.query.id));
    console.log(_req.query.id);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const products_routes = (app: express.Application) => {
  app.get('/products', index);
  app.post('/products/add', ensureToken, create);
  app.get('/products/get', show);
};
export default products_routes;
