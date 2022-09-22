import express from 'express';
import imageprocessing from '../../utility/middleware/imgprocessing'
import validator from '../../utility/middleware/validator';
import { Router, Request, Response } from 'express';
import path from 'path';
import {promises as fs} from 'fs';


const images = express.Router();

 images.get('/', [validator , imageprocessing ] , (req: Request, res: Response) => {

   const imageName = req.query.name as string;
   const imageWidth = req.query.width as string;
   const imageHeight = req.query.height as string;
   const imgLocation = path.resolve('./') + `/src/assets/full/${imageName}.jpg`;
   const imgResizedLocation = path.resolve('./') + `/src/assets/thumb/${imageName}_${imageWidth}_${imageHeight}.jpg`;

   return res.sendFile(imgResizedLocation);

});

export default images;