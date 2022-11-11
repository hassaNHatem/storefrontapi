import express, { Request, Response } from 'express';
import { product, productStore } from '../models/product';

const store = new productStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};
const create = async (_req: Request, res: Response) => {
  const product = await store.create(_req.body);
  res.json(product);
};
const products_routes = (app: express.Application) => {
  app.get('/products', index);
  app.post('/products/add', create);
};
export default products_routes;
