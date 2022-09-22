import express from 'express';
import {promises as fs} from 'fs';
import path from 'path';
import getFileNames from '../filehelper';
import resizeImage from '../resize';
import sharp from 'sharp';

function isNumber(value: string): boolean
{
   return (!isNaN(Number(value)) && (Number(value) >= 1 && Number(value)<=999 ));
}

const validator = async(req: express.Request, res: express.Response, next: Function) => {

    const imageName = req.query.name as string;
    const imageWidth = req.query.width as string;
    const imageHeight = req.query.height as string;
    const filenames = await getFileNames(false);
    const thumbFileNames = await getFileNames(true);

     // Check if the name width & height are included
    if (imageName === undefined || imageWidth === undefined || imageHeight === undefined) {
        return res
          .status(400)
          .send('<h2> Bad request , Please check that name, width and height are included <h2>');
      }

    // Check if the nwidth and height correct number between 1 & 999
    if(!isNumber(imageWidth) || !isNumber(imageHeight))
    {
        return res
          .status(400)
          .send('<h2 >Bad request , Please check that height and width between 1 & 999 <h2>');
    }

    // Check if the filename not existed
    if(filenames.includes(imageName) === false)
    {
        return res
          .status(404)
          .send('<h2 > File Name Not Found <h2>');
    }
 
    next();
};

export default validator;