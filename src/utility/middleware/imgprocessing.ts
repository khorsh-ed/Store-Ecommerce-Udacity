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

const imageProcessing = async(req: express.Request, res: express.Response, next: Function) => {

    const imageName = req.query.name as string;
    const imageWidth = req.query.width as string;
    const imageHeight = req.query.height as string;
    const thumbFileNames = await getFileNames(true);
     
  
    // handling cashing check if it is already included in cashed folder
    if(thumbFileNames.includes(`${imageName}_${imageWidth}_${imageHeight}`))
    {
       return next();
    }
    // resizing the image 
    await resizeImage(imageName, +imageWidth,+imageHeight);
 
    next();
};

export default imageProcessing;