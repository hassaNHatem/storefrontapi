import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import products_routes from './handlers/products';
import user_routes from './handlers/user';
import { orderRoutes } from './handlers/orders';
dotenv.config();

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

const corsOptions = {
  origin: 'http://someotherdomain.com',
  optionsSuccessStatus: 200,
};
export function ensureToken(req: any, res: Response, next: NextFunction) {
  const bearerheader = req.headers['authorization'];
  if (typeof bearerheader !== 'undefined') {
    const bearer = bearerheader.split(' ');
    const bearertoken = bearer[1];
    req.token = bearertoken;
    next();
  } else {
    res.sendStatus(403);
  }
}
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});
products_routes(app);
orderRoutes(app);
user_routes(app);
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
export default app;
