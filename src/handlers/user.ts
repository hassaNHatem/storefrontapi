import express, { Request, Response } from 'express';
import { User, user } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const store = new User();

const create = async (req: Request, res: Response) => {
  try {
    const user = await store.create(req.body);
    var token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err + req.body);
  }
};
const authenticate = async (req: Request, res: Response) => {
  const user: user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };
  try {
    const u = await store.authenticate(
      user.firstname,
      user.lastname,
      user.password
    );
    var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const user_routes = (app: express.Application) => {
  app.post('/register', create);
  app.post('/login', authenticate);
};
export default user_routes;
