import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import products_routes from './handlers/products';
import user_routes from './handlers/user';
dotenv.config();

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

const corsOptions = {
  origin: 'http://someotherdomain.com',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});
products_routes(app);
user_routes(app);
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
