import { Order } from '../models/order';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { ensureToken } from '..';
const store = new Order();
dotenv.config();
const addOrder = async (_req: any, res: Response) => {
  try {
    jwt.verify(_req.token, process.env.TOKEN_SECRET as string);
    const order = await store.addOrder(parseInt(_req.body.userId));
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const addProduct = async (_req: any, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: string = _req.body.product_id;
  const quantity: number = parseInt(_req.body.quantity);

  try {
    process.env.ENV !== 'test' &&
      jwt.verify(_req.token, process.env.TOKEN_SECRET as string);
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    console.log(orderId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const getOrder = async (_req: any, res: Response) => {
  try {
    jwt.verify(_req.token, process.env.TOKEN_SECRET as string);
    const order = await store.getOrder(_req.body.userId);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
export const orderRoutes = (app: express.Application) => {
  app.post('/orders', ensureToken, addOrder);
  app.post('/orders/:id/products', ensureToken, addProduct);
  app.get('/orders/:id', ensureToken, getOrder);
};
