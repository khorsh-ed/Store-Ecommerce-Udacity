import express, { NextFunction } from 'express';
import getFileNames from '../filehelper';
import resizeImage from '../resize';

const imageProcessing = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  const imageName = req.query.name as string;
  const imageWidth = req.query.width as string;
  const imageHeight = req.query.height as string;
  const thumbFileNames = await getFileNames(true);

  // handling cashing check if it is already included in cashed folder
  if (thumbFileNames.includes(`${imageName}_${imageWidth}_${imageHeight}`)) {
    return next();
  }
  // resizing the image
  await resizeImage(imageName, +imageWidth, +imageHeight);

  next();
};

export default imageProcessing;
