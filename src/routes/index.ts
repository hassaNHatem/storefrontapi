import express from 'express';
const routes = express.Router();

routes.get('/api', (req: express.Request, res: express.Response) => {
  res.send('main api');
});
export default routes;
