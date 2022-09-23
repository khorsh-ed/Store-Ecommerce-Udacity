import express from 'express';
import imageprocessing from '../../utility/middleware/imgprocessing';
import validator from '../../utility/middleware/validator';
import { Request, Response } from 'express';
import path from 'path';

const images = express.Router();

images.get('/', [validator, imageprocessing], (req: Request, res: Response) => {
  const imageName = req.query.name as string;
  const imageWidth = req.query.width as string;
  const imageHeight = req.query.height as string;
  const imgResizedLocation =
    path.resolve('./') +
    `/src/assets/thumb/${imageName}_${imageWidth}_${imageHeight}.jpg`;

  return res.sendFile(imgResizedLocation);
});

export default images;
