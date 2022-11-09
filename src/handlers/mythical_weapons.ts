import express, { Request, Response } from 'express';
import { weapon, MythicalWeaponStore } from '../models/mythical_weapon';

const store = new MythicalWeaponStore();

const index = async (_req: Request, res: Response) => {
  const weapons = await store.index();
  res.json(weapons);
};

const methical_weapons_routes = (app: express.Application) => {
  app.get('/products', index);
};
export default methical_weapons_routes;
