import express, { Request, Response } from 'express';
import { User, user } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ensureToken } from '..';

dotenv.config();
const store = new User();

const create = async (req: any, res: Response) => {
  try {
    jwt.verify(req.token, process.env.TOKEN_SECRET as string);
    const user = await store.create(req.body);
    var token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err + req.body);
  }
};
const index = async (req: any, res: Response) => {
  try {
    jwt.verify(req.token, process.env.TOKEN_SECRET as string);
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const show = async (req: any, res: Response) => {
  try {
    jwt.verify(req.token, process.env.TOKEN_SECRET as string);
    const user = await store.show(Number(req.query.id));
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const authenticate = async (req: any, res: Response) => {
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
  app.post('/register', ensureToken, create);
  app.post('/login', authenticate);
  app.get('/users', ensureToken, index);
  app.get('/users/get', ensureToken, show);
};
export default user_routes;
