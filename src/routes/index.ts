import express from 'express';
import images from "./api/images";
import { Router, Request, Response } from 'express';
const routes = express.Router();


routes.get('/', (req: Request, res: Response) => {
  res.send('Udacity Image Processing Project');
});

routes.use('/images',images);

export default routes;